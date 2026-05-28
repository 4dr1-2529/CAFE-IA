import { query, queryOne } from '../database/pool.js'
import * as R from '../../shared/reportesSql.js'
import { queryOneScoped, queryScoped } from '../../shared/scopedQuery.js'
import {
  sqlKpisEtapasLotes,
  sqlResumenEtapas,
  TRAZA_LOTES_GLOBAL,
  TRAZA_LOTES_SCOPED,
  TRAZA_REGISTROS_GLOBAL,
  TRAZA_REGISTROS_SCOPED,
} from '../../shared/trazabilidadSql.js'

function toNum(row, field = 'c') {
  if (!row) return 0
  const v = row[field] ?? row.total ?? row.count
  if (typeof v === 'bigint') return Number(v)
  return Number(v) || 0
}

export class ReportesRepository {
  static async produccion(userId = null) {
    const isGlobal = !userId

    const resumen = await queryOneScoped(
      userId,
      R.PRODUCCION_RESUMEN_GLOBAL,
      R.PRODUCCION_RESUMEN_SCOPED
    )
    const prediccionesResumen = await queryOneScoped(
      userId,
      R.PRODUCCION_PREDICCIONES_GLOBAL,
      R.PRODUCCION_PREDICCIONES_SCOPED
    )

    const [porVariedad, porMes, porProductor, top5Lotes, registros] = await Promise.all([
      queryScoped(userId, R.PRODUCCION_VARIEDAD_GLOBAL, R.PRODUCCION_VARIEDAD_SCOPED),
      queryScoped(userId, R.PRODUCCION_MES_GLOBAL, R.PRODUCCION_MES_SCOPED),
      queryScoped(userId, R.PRODUCCION_PRODUCTOR_GLOBAL, R.PRODUCCION_PRODUCTOR_SCOPED),
      queryScoped(userId, R.PRODUCCION_TOP5_GLOBAL, R.PRODUCCION_TOP5_SCOPED),
      queryScoped(userId, R.PRODUCCION_REGISTROS_GLOBAL, R.PRODUCCION_REGISTROS_SCOPED),
    ])

    const [lotesConTraz, lotesSinTraz, lotesConIa, lotesSinIa] = await Promise.all([
      queryOneScoped(userId, R.PRODUCCION_LOTES_TRAZ_GLOBAL, R.PRODUCCION_LOTES_TRAZ_SCOPED),
      queryOneScoped(userId, R.PRODUCCION_LOTES_SIN_TRAZ_GLOBAL, R.PRODUCCION_LOTES_SIN_TRAZ_SCOPED),
      queryOneScoped(userId, R.PRODUCCION_LOTES_IA_GLOBAL, R.PRODUCCION_LOTES_IA_SCOPED),
      queryOneScoped(userId, R.PRODUCCION_LOTES_SIN_IA_GLOBAL, R.PRODUCCION_LOTES_SIN_IA_SCOPED),
    ])

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
      const id = Number(userId)
      const [totalProductores, lotesRecientes, sinTrazaList, sinIAList, misProductores] = await Promise.all([
        queryOne(R.PRODUCCION_COUNT_PRODUCTORES_SCOPED, [id]),
        query(R.PRODUCCION_LOTES_RECIENTES_SCOPED, [id]),
        query(R.PRODUCCION_SIN_TRAZ_LIST_SCOPED, [id]),
        query(R.PRODUCCION_SIN_IA_LIST_SCOPED, [id]),
        query(R.PRODUCCION_MIS_PRODUCTORES_SCOPED, [id]),
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
    const resumen = await queryOneScoped(userId, R.CALIDAD_RESUMEN_GLOBAL, R.CALIDAD_RESUMEN_SCOPED)
    const evaluaciones = await queryScoped(
      userId,
      R.CALIDAD_EVALUACIONES_GLOBAL,
      R.CALIDAD_EVALUACIONES_SCOPED
    )
    return { resumen, evaluaciones, totalEvaluacionesUnicas: evaluaciones.length }
  }

  static async predicciones(userId = null) {
    const resumen = await queryOneScoped(userId, R.IA_RESUMEN_GLOBAL, R.IA_RESUMEN_SCOPED)
    const porCalidad = await queryScoped(userId, R.IA_POR_CALIDAD_GLOBAL, R.IA_POR_CALIDAD_SCOPED)
    const predicciones = await queryScoped(userId, R.IA_LISTA_GLOBAL, R.IA_LISTA_SCOPED)
    const lotesPendientes = await queryOneScoped(
      userId,
      R.IA_LOTES_PENDIENTES_GLOBAL,
      R.IA_LOTES_PENDIENTES_SCOPED
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

    const registros = await queryScoped(userId, TRAZA_REGISTROS_GLOBAL, TRAZA_REGISTROS_SCOPED)
    const lotesRows = await queryScoped(userId, TRAZA_LOTES_GLOBAL, TRAZA_LOTES_SCOPED)

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
