import { query, queryOne } from '../database/pool.js'
import { loteScope, productorScope } from '../../shared/sqlScope.js'
import {
  sqlKpisEtapasLotes,
  sqlResumenEtapas,
  sqlUltimaEtapaSubquery,
} from '../../shared/trazabilidadSql.js'

function toNum(row, field = 'c') {
  if (!row) return 0
  const v = row[field] ?? row.total ?? row.count
  if (typeof v === 'bigint') return Number(v)
  return Number(v) || 0
}

export class ReportesRepository {
  static async produccion(userId = null) {
    const ls = loteScope(userId)
    const ps = productorScope(userId)
    const isGlobal = !userId

    const resumen = await queryOne(
      `SELECT COUNT(*) AS total_lotes, COALESCE(SUM(l.cantidad_kg),0) AS total_kg,
              COALESCE(AVG(l.humedad),0) AS humedad_promedio, COALESCE(AVG(l.temperatura),0) AS temp_promedio
       FROM lotes l WHERE l.deleted_at IS NULL ${ls.clause}`,
      ls.params
    )

    const prediccionesResumen = await queryOne(
      `SELECT COUNT(*) AS total
       FROM predicciones_ia pr
       JOIN lotes l ON pr.lote_id = l.id AND l.deleted_at IS NULL
       WHERE pr.origen = 'usuario' ${ls.clause}`,
      ls.params
    )

    const [porVariedad, porMes, porProductor, top5Lotes, registros] = await Promise.all([
      query(
        `SELECT l.variedad_cafe, COUNT(*) AS lotes, COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l WHERE l.deleted_at IS NULL ${ls.clause}
         GROUP BY l.variedad_cafe ORDER BY kg DESC`,
        ls.params
      ),
      query(
        `SELECT DATE_FORMAT(COALESCE(l.fecha_cosecha, l.created_at), '%Y-%m') AS mes,
                COUNT(*) AS lotes,
                COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l
         WHERE l.deleted_at IS NULL
           AND COALESCE(l.fecha_cosecha, l.created_at) IS NOT NULL ${ls.clause}
         GROUP BY DATE_FORMAT(COALESCE(l.fecha_cosecha, l.created_at), '%Y-%m')
         ORDER BY mes ASC`,
        ls.params
      ),
      query(
        `SELECT CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
                p.codigo_productor,
                COUNT(l.id) AS lotes,
                COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l
         INNER JOIN productores p ON p.id = l.productor_id AND p.deleted_at IS NULL
         WHERE l.deleted_at IS NULL ${ls.clause}
         GROUP BY l.productor_id, p.nombres, p.apellidos, p.codigo_productor
         ORDER BY kg DESC`,
        ls.params
      ),
      query(
        `SELECT l.codigo_lote, l.cantidad_kg, l.fecha_cosecha, l.variedad_cafe, l.estado,
                CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
         FROM lotes l
         LEFT JOIN productores p ON p.id = l.productor_id
         WHERE l.deleted_at IS NULL ${ls.clause}
         ORDER BY l.cantidad_kg DESC LIMIT 5`,
        ls.params
      ),
      query(
        `SELECT pr.*, l.codigo_lote FROM produccion pr
         JOIN lotes l ON pr.lote_id = l.id AND l.deleted_at IS NULL
         WHERE 1=1 ${ls.clause}
         ORDER BY pr.fecha_registro DESC LIMIT 100`,
        ls.params
      ),
    ])

    const lotesConTraz = await queryOne(
      `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
       INNER JOIN trazabilidad t ON t.lote_id = l.id
       WHERE l.deleted_at IS NULL ${ls.clause}`,
      ls.params
    )
    const lotesSinTraz = await queryOne(
      `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL ${ls.clause}
       AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)`,
      ls.params
    )
    const lotesConIa = await queryOne(
      `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
       INNER JOIN predicciones_ia p ON p.lote_id = l.id AND p.origen = 'usuario'
       WHERE l.deleted_at IS NULL ${ls.clause}`,
      ls.params
    )
    const lotesSinIa = await queryOne(
      `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL ${ls.clause}
       AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`,
      ls.params
    )

    const totalLotes = toNum(resumen, 'total_lotes')
    const extras = {
      totalProductores: 0,
      totalClientes: 0,
      lotesConTrazabilidad: toNum(lotesConTraz),
      lotesSinTrazabilidad: toNum(lotesSinTraz),
      lotesConIA: toNum(lotesConIa),
      lotesSinIA: toNum(lotesSinIa),
      porCliente: [],
      topClientes: [],
      lotesRecientes: [],
      lotesSinTrazabilidadLista: [],
      lotesSinIALista: [],
    }

    if (isGlobal) {
      const [totalClientes, totalProductores, porCliente, topClientes, lotesRecientes, sinTrazaList, sinIAList] =
        await Promise.all([
          queryOne(
            `SELECT COUNT(*) AS c FROM usuarios u
             JOIN roles r ON u.rol_id = r.id
             WHERE r.codigo = 'cliente' AND u.deleted_at IS NULL`
          ),
          queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL`),
          query(
            `SELECT CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')) AS cliente,
                    COALESCE(SUM(l.cantidad_kg), 0) AS kg, COUNT(l.id) AS lotes
             FROM usuarios u
             JOIN roles r ON u.rol_id = r.id AND r.codigo = 'cliente'
             LEFT JOIN lotes l ON l.user_id = u.id AND l.deleted_at IS NULL
             WHERE u.deleted_at IS NULL
             GROUP BY u.id, u.nombres, u.apellidos ORDER BY kg DESC`
          ),
          query(
            `SELECT CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')) AS cliente,
                    COALESCE(SUM(l.cantidad_kg), 0) AS kg
             FROM usuarios u
             JOIN roles r ON u.rol_id = r.id AND r.codigo = 'cliente'
             LEFT JOIN lotes l ON l.user_id = u.id AND l.deleted_at IS NULL
             WHERE u.deleted_at IS NULL
             GROUP BY u.id ORDER BY kg DESC LIMIT 5`
          ),
          query(
            `SELECT l.codigo_lote, l.cantidad_kg, l.estado,
                    CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
                    CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')) AS cliente
             FROM lotes l
             LEFT JOIN productores p ON p.id = l.productor_id
             LEFT JOIN usuarios u ON u.id = l.user_id
             WHERE l.deleted_at IS NULL
             ORDER BY l.created_at DESC LIMIT 10`
          ),
          query(
            `SELECT l.codigo_lote, CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
             FROM lotes l
             LEFT JOIN productores p ON p.id = l.productor_id
             WHERE l.deleted_at IS NULL
             AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)
             ORDER BY l.id DESC LIMIT 8`
          ),
          query(
            `SELECT l.codigo_lote FROM lotes l
             WHERE l.deleted_at IS NULL
             AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')
             ORDER BY l.id DESC LIMIT 8`
          ),
        ])
      extras.totalClientes = toNum(totalClientes)
      extras.totalProductores = toNum(totalProductores)
      extras.porCliente = porCliente
      extras.topClientes = topClientes
      extras.lotesRecientes = lotesRecientes
      extras.lotesSinTrazabilidadLista = sinTrazaList
      extras.lotesSinIALista = sinIAList
    } else {
      const [totalProductores, lotesRecientes, sinTrazaList, sinIAList, misProductores] = await Promise.all([
        queryOne(`SELECT COUNT(*) AS c FROM productores p WHERE p.deleted_at IS NULL ${ps.clause}`, ps.params),
        query(
          `SELECT l.codigo_lote, l.cantidad_kg, l.estado,
                  CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
           FROM lotes l
           LEFT JOIN productores p ON p.id = l.productor_id
           WHERE l.deleted_at IS NULL ${ls.clause}
           ORDER BY l.created_at DESC LIMIT 10`,
          ls.params
        ),
        query(
          `SELECT l.codigo_lote, CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
           FROM lotes l
           LEFT JOIN productores p ON p.id = l.productor_id
           WHERE l.deleted_at IS NULL ${ls.clause}
           AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)
           ORDER BY l.id DESC LIMIT 8`,
          ls.params
        ),
        query(
          `SELECT l.codigo_lote FROM lotes l
           WHERE l.deleted_at IS NULL ${ls.clause}
           AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')
           ORDER BY l.id DESC LIMIT 8`,
          ls.params
        ),
        query(
          `SELECT p.id, p.codigo_productor, p.nombres, p.apellidos, p.parcela,
                  COUNT(l.id) AS lotes
           FROM productores p
           LEFT JOIN lotes l ON l.productor_id = p.id AND l.deleted_at IS NULL
           WHERE p.deleted_at IS NULL ${ps.clause}
           GROUP BY p.id ORDER BY p.nombres LIMIT 20`,
          ps.params
        ),
      ])
      extras.totalProductores = toNum(totalProductores)
      extras.lotesRecientes = lotesRecientes
      extras.lotesSinTrazabilidadLista = sinTrazaList
      extras.lotesSinIALista = sinIAList
      extras.misProductores = misProductores
    }

    return {
      resumen: {
        ...resumen,
        total_lotes: totalLotes,
        total_kg: Number(resumen?.total_kg) || 0,
        total_predicciones: toNum(prediccionesResumen, 'total'),
      },
      porVariedad,
      porMes,
      porProductor,
      top5Lotes,
      registros,
      ...extras,
    }
  }

  static async calidad(userId = null) {
    const ls = loteScope(userId)
    const resumen = await queryOne(
      `SELECT COUNT(*) AS total, COALESCE(AVG(c.puntaje_taza), 0) AS promedio
       FROM control_calidad c
       JOIN lotes l ON c.lote_id = l.id AND l.deleted_at IS NULL
       WHERE 1=1 ${ls.clause}`,
      ls.params
    )
    const evaluaciones = await query(
      `SELECT c.*, l.codigo_lote,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              l.variedad_cafe
       FROM control_calidad c
       JOIN lotes l ON c.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE 1=1 ${ls.clause}
       ORDER BY c.id DESC LIMIT 100`,
      ls.params
    )
    return { resumen, evaluaciones, totalEvaluacionesUnicas: evaluaciones.length }
  }

  static async predicciones(userId = null) {
    const ls = loteScope(userId)
    const resumen = await queryOne(
      `SELECT COUNT(*) AS total,
              COALESCE(AVG(p.confianza), 0) AS confianza_promedio,
              COALESCE(AVG(p.porcentaje_riesgo), 0) AS riesgo_promedio
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       WHERE p.origen = 'usuario' ${ls.clause}`,
      ls.params
    )
    const porCalidad = await query(
      `SELECT p.calidad_predicha, COUNT(*) AS cantidad
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       WHERE p.origen = 'usuario' ${ls.clause}
       GROUP BY p.calidad_predicha`,
      ls.params
    )
    const predicciones = await query(
      `SELECT p.*, l.codigo_lote,
              CONCAT(pr.nombres, ' ', COALESCE(pr.apellidos, '')) AS productor,
              l.variedad_cafe
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores pr ON pr.id = l.productor_id
       WHERE p.origen = 'usuario' ${ls.clause}
       ORDER BY p.id DESC LIMIT 100`,
      ls.params
    )
    const lotesPendientes = await queryOne(
      `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL ${ls.clause}
       AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`,
      ls.params
    )
    return {
      resumen: {
        ...resumen,
        total_predicciones_reales: toNum(resumen, 'total'),
        promedio_confianza: Math.round(Number(resumen?.confianza_promedio) || 0),
        lotes_pendientes_prediccion: toNum(lotesPendientes),
        alta: porCalidad.find((x) => x.calidad_predicha === 'Alta')?.cantidad || 0,
        media: porCalidad.find((x) => x.calidad_predicha === 'Media')?.cantidad || 0,
        baja: porCalidad.find((x) => x.calidad_predicha === 'Baja')?.cantidad || 0,
      },
      porCalidad,
      predicciones,
    }
  }

  static async trazabilidad(userId = null) {
    const ls = loteScope(userId)
    const isGlobal = !userId
    const ultimaEtapa = sqlUltimaEtapaSubquery()

    const resumenEtapasQuery = sqlResumenEtapas(userId)
    const resumenEtapas = await query(resumenEtapasQuery.sql, resumenEtapasQuery.params)

    const kpisQuery = sqlKpisEtapasLotes(userId)
    const resumenKpisRow = await queryOne(kpisQuery.sql, kpisQuery.params)

    const resumenKpis = {
      total_lotes: toNum(resumenKpisRow, 'total_lotes'),
      lotes_pendientes: toNum(resumenKpisRow, 'lotes_pendientes'),
      lotes_en_produccion: toNum(resumenKpisRow, 'lotes_en_produccion'),
      lotes_en_secado: toNum(resumenKpisRow, 'lotes_en_secado'),
      lotes_en_control_calidad: toNum(resumenKpisRow, 'lotes_en_control_calidad'),
      lotes_almacenados: toNum(resumenKpisRow, 'lotes_almacenados'),
      lotes_comercializados: toNum(resumenKpisRow, 'lotes_comercializados'),
    }

    const registros = await query(
      `SELECT t.*, l.codigo_lote, l.estado AS estado_lote, l.cantidad_kg,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
       FROM trazabilidad t
       JOIN lotes l ON t.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE 1=1 ${ls.clause}
       ORDER BY t.lote_id, t.orden LIMIT 200`,
      ls.params
    )

    const loteSelectBase = `SELECT l.id AS lote_id, l.codigo_lote, l.cantidad_kg, l.variedad_cafe,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
                   ELSE COALESCE(${ultimaEtapa}, 'Pendiente')
              END AS etapa_actual,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN NULL
                   ELSE (SELECT MAX(t.fecha) FROM trazabilidad t WHERE t.lote_id = l.id)
              END AS ultima_fecha,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN '-'
                   ELSE COALESCE((SELECT t.ubicacion FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1), '-')
              END AS ubicacion,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Registrado'
                   ELSE 'En trazabilidad'
              END AS estado_display,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 1 ELSE 0 END AS sin_trazabilidad`

    const lotesRows = isGlobal
      ? await query(
          `${loteSelectBase},
              CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')) AS cliente,
              u.codigo_usuario AS codigo_cliente,
              l.user_id
       FROM lotes l
       LEFT JOIN productores p ON p.id = l.productor_id
       LEFT JOIN usuarios u ON u.id = l.user_id
       WHERE l.deleted_at IS NULL
       ORDER BY l.id DESC LIMIT 100`,
          []
        )
      : await query(
          `${loteSelectBase}
       FROM lotes l
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE l.deleted_at IS NULL AND l.user_id = ?
       ORDER BY l.id DESC LIMIT 100`,
          ls.params
        )

    const lotesResumen = lotesRows.map((row) => ({
      ...row,
      etapa_actual: row.etapa_actual || 'Pendiente',
      ultima_fecha: row.ultima_fecha ? row.ultima_fecha : 'Pendiente',
      ubicacion: row.ubicacion || '-',
      estado: row.estado_display,
    }))

    return { resumen: resumenEtapas, resumenKpis, registros, lotesResumen }
  }
}
