import { query, queryOne } from '../database/pool.js'
import { loteScope, productorScope } from '../../shared/sqlScope.js'

const LIMIT_TABLA = 8

/** Cuenta usuarios con rol CLIENTE (tabla roles, no columna rol en usuarios) */
const SQL_COUNT_CLIENTES = `
  SELECT COUNT(*) AS c FROM usuarios u
  INNER JOIN roles r ON u.rol_id = r.id
  WHERE r.codigo = 'cliente' AND u.deleted_at IS NULL
`

function toCount(row, field = 'c') {
  if (!row) return 0
  const v = row[field] ?? row.total ?? row.count
  if (typeof v === 'bigint') return Number(v)
  return Number(v) || 0
}

export class DashboardRepository {
  static async getAdminDashboard() {
    return DashboardRepository._build(null, true)
  }

  static async getUserDashboard(userId) {
    return DashboardRepository._build(userId, false)
  }

  static async _build(userId, isAdmin) {
    const ls = loteScope(userId)
    const ps = productorScope(userId)

    const [
      totalClientesRow,
      totalProductores,
      lotesAgg,
      calidadAgg,
      predAgg,
      reportesAgg,
      auditoriaAgg,
      estadosLotes,
      distribucionCalidad,
      produccionMensual,
      calidadMensual,
      prediccionesResultado,
      produccionPorProductor,
      actividadPorUsuario,
      productorMayorProd,
      productorMejorCalidad,
      mejorLote,
      lotesRiesgo,
      ultimaPrediccion,
      usuarioMasActivo,
      moduloMasUsado,
      produccionMes,
      ultimoRegistroProd,
      alertasIA,
      ultimosLotes,
      ultimosProductores,
      ultimasAcciones,
      lotesBajaCalidad,
      lotesRiesgoTabla,
      controlesRecientes,
      prediccionesRecientes,
      mejorLoteUser,
      peorLoteUser,
      lotesConTrazabilidad,
      lotesSinTrazabilidad,
      lotesConIA,
      lotesSinIA,
      clienteMayorProduccion,
      lotesPendientesCliente,
    ] = await Promise.all([
      isAdmin ? queryOne(SQL_COUNT_CLIENTES) : Promise.resolve(null),
      queryOne(
        `SELECT COUNT(*) AS c FROM productores p WHERE p.deleted_at IS NULL ${ps.clause}`,
        ps.params
      ),
      queryOne(
        `SELECT COUNT(*) AS total,
                COALESCE(SUM(l.cantidad_kg), 0) AS kg,
                SUM(CASE WHEN l.estado NOT IN ('Comercializacion', 'Vendido') THEN 1 ELSE 0 END) AS activos
         FROM lotes l
         WHERE l.deleted_at IS NULL ${ls.clause}`,
        ls.params
      ),
      queryOne(
        `SELECT COUNT(*) AS total, COALESCE(AVG(cc.puntaje_taza), 0) AS promedio
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}`,
        ls.params
      ),
      queryOne(
        `SELECT COUNT(*) AS total
         FROM predicciones_ia p
         INNER JOIN lotes l ON l.id = p.lote_id AND l.deleted_at IS NULL ${ls.clause}
         WHERE p.origen = 'usuario'`,
        ls.params
      ),
      isAdmin
        ? queryOne(`SELECT COUNT(*) AS c FROM reportes`)
        : queryOne(`SELECT COUNT(*) AS c FROM reportes WHERE usuario_id = ?`, [userId]),
      isAdmin
        ? queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs`)
        : Promise.resolve({ c: 0 }),
      query(
        `SELECT l.estado, COUNT(*) AS cantidad
         FROM lotes l WHERE l.deleted_at IS NULL ${ls.clause}
         GROUP BY l.estado ORDER BY cantidad DESC`,
        ls.params
      ),
      query(
        `SELECT cc.calidad_final, COUNT(*) AS cantidad
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         GROUP BY cc.calidad_final`,
        ls.params
      ),
      query(
        `SELECT DATE_FORMAT(l.fecha_cosecha, '%Y-%m') AS mes, SUM(l.cantidad_kg) AS kg
         FROM lotes l
         WHERE l.deleted_at IS NULL AND l.fecha_cosecha IS NOT NULL ${ls.clause}
         GROUP BY DATE_FORMAT(l.fecha_cosecha, '%Y-%m')
         ORDER BY mes DESC LIMIT 6`,
        ls.params
      ),
      query(
        `SELECT DATE_FORMAT(COALESCE(cc.fecha_evaluacion, cc.created_at), '%Y-%m') AS mes,
                ROUND(AVG(cc.puntaje_taza), 1) AS promedio
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         GROUP BY DATE_FORMAT(COALESCE(cc.fecha_evaluacion, cc.created_at), '%Y-%m')
         ORDER BY mes DESC LIMIT 6`,
        ls.params
      ),
      query(
        `SELECT p.calidad_predicha AS resultado, COUNT(*) AS cantidad
         FROM predicciones_ia p
         INNER JOIN lotes l ON l.id = p.lote_id AND l.deleted_at IS NULL ${ls.clause}
         WHERE p.origen = 'usuario'
         GROUP BY p.calidad_predicha`,
        ls.params
      ),
      isAdmin
        ? query(
            `SELECT CONCAT(pr.nombres, ' ', COALESCE(pr.apellidos, '')) AS productor,
                    SUM(l.cantidad_kg) AS kg
             FROM lotes l
             INNER JOIN productores pr ON pr.id = l.productor_id
             WHERE l.deleted_at IS NULL
             GROUP BY l.productor_id, pr.nombres, pr.apellidos
             ORDER BY kg DESC LIMIT 8`
          )
        : Promise.resolve([]),
      isAdmin
        ? query(
            `SELECT COALESCE(CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')), u.email, 'Sistema') AS usuario,
                    COUNT(*) AS acciones
             FROM auditoria_logs a
             LEFT JOIN usuarios u ON u.id = a.usuario_id
             GROUP BY a.usuario_id, u.nombres, u.apellidos, u.email
             ORDER BY acciones DESC LIMIT 8`
          )
        : Promise.resolve([]),
      queryOne(
        `SELECT CONCAT(pr.nombres, ' ', COALESCE(pr.apellidos, '')) AS nombre,
                SUM(l.cantidad_kg) AS kg
         FROM lotes l
         INNER JOIN productores pr ON pr.id = l.productor_id
         WHERE l.deleted_at IS NULL ${ls.clause}
         GROUP BY l.productor_id, pr.nombres, pr.apellidos
         ORDER BY kg DESC LIMIT 1`,
        ls.params
      ),
      queryOne(
        `SELECT CONCAT(pr.nombres, ' ', COALESCE(pr.apellidos, '')) AS nombre,
                ROUND(AVG(cc.puntaje_taza), 1) AS puntaje
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         INNER JOIN productores pr ON pr.id = l.productor_id
         GROUP BY l.productor_id, pr.nombres, pr.apellidos
         HAVING puntaje IS NOT NULL
         ORDER BY puntaje DESC LIMIT 1`,
        ls.params
      ),
      queryOne(
        `SELECT l.codigo_lote, l.id, ROUND(cc.puntaje_taza, 1) AS puntaje, cc.calidad_final
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         ORDER BY cc.puntaje_taza DESC LIMIT 1`,
        ls.params
      ),
      query(
        `SELECT l.codigo_lote, p.porcentaje_riesgo, p.calidad_predicha, p.confianza
         FROM predicciones_ia p
         INNER JOIN lotes l ON l.id = p.lote_id AND l.deleted_at IS NULL ${ls.clause}
         WHERE p.porcentaje_riesgo >= 40 OR p.calidad_predicha IN ('Deficiente', 'Regular')
         ORDER BY p.porcentaje_riesgo DESC LIMIT ${LIMIT_TABLA}`,
        ls.params
      ),
      queryOne(
        `SELECT p.id, p.calidad_predicha, p.confianza, p.porcentaje_riesgo, p.recomendacion,
                p.fecha_prediccion, l.codigo_lote
         FROM predicciones_ia p
         INNER JOIN lotes l ON l.id = p.lote_id AND l.deleted_at IS NULL ${ls.clause}
         WHERE p.origen = 'usuario'
         ORDER BY p.id DESC LIMIT 1`,
        ls.params
      ),
      isAdmin
        ? queryOne(
            `SELECT COALESCE(CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')), u.email) AS nombre,
                    COUNT(*) AS acciones
             FROM auditoria_logs a
             LEFT JOIN usuarios u ON u.id = a.usuario_id
             GROUP BY a.usuario_id, u.nombres, u.apellidos, u.email
             ORDER BY acciones DESC LIMIT 1`
          )
        : Promise.resolve(null),
      isAdmin
        ? queryOne(
            `SELECT COALESCE(JSON_UNQUOTE(JSON_EXTRACT(detalle, '$.modulo')), entidad, 'general') AS modulo,
                    COUNT(*) AS cantidad
             FROM auditoria_logs
             GROUP BY modulo
             ORDER BY cantidad DESC LIMIT 1`
          )
        : Promise.resolve(null),
      queryOne(
        `SELECT COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l
         WHERE l.deleted_at IS NULL
           AND YEAR(l.fecha_cosecha) = YEAR(CURDATE())
           AND MONTH(l.fecha_cosecha) = MONTH(CURDATE()) ${ls.clause}`,
        ls.params
      ),
      queryOne(
        `SELECT pr.fecha_registro, l.codigo_lote, pr.cantidad_kg
         FROM produccion pr
         INNER JOIN lotes l ON l.id = pr.lote_id AND l.deleted_at IS NULL ${ls.clause}
         ORDER BY pr.created_at DESC LIMIT 1`,
        ls.params
      ),
      query(
        `SELECT a.id, a.tipo_alerta, a.severidad, a.mensaje, l.codigo_lote
         FROM alertas_ia a
         INNER JOIN lotes l ON l.id = a.lote_id AND l.deleted_at IS NULL ${ls.clause}
         ORDER BY a.id DESC LIMIT 10`,
        ls.params
      ),
      query(
        `SELECT l.id, l.codigo_lote, l.cantidad_kg, l.estado, l.fecha_cosecha, l.created_at,
                CONCAT(pr.nombres, ' ', COALESCE(pr.apellidos, '')) AS productor
         FROM lotes l
         LEFT JOIN productores pr ON pr.id = l.productor_id
         WHERE l.deleted_at IS NULL ${ls.clause}
         ORDER BY l.created_at DESC LIMIT ${LIMIT_TABLA}`,
        ls.params
      ),
      isAdmin
        ? query(
            `SELECT p.id, p.codigo_productor AS codigo, p.nombres, p.apellidos, p.parcela, p.created_at
             FROM productores p
             WHERE p.deleted_at IS NULL
             ORDER BY p.created_at DESC LIMIT ${LIMIT_TABLA}`
          )
        : Promise.resolve([]),
      isAdmin
        ? query(
            `SELECT a.id,
                    COALESCE(CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')), u.email, 'sistema') AS usuario,
                    a.accion,
                    COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad) AS modulo,
                    COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.descripcion')), '') AS descripcion,
                    a.created_at
             FROM auditoria_logs a
             LEFT JOIN usuarios u ON u.id = a.usuario_id
             ORDER BY a.created_at DESC LIMIT ${LIMIT_TABLA}`
          )
        : Promise.resolve([]),
      query(
        `SELECT l.codigo_lote, cc.puntaje_taza, cc.calidad_final, cc.fecha_evaluacion
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         WHERE cc.puntaje_taza < 75 OR cc.calidad_final IN ('Regular', 'Deficiente', 'Baja')
         ORDER BY cc.puntaje_taza ASC LIMIT ${LIMIT_TABLA}`,
        ls.params
      ),
      query(
        `SELECT l.codigo_lote, p.porcentaje_riesgo, p.calidad_predicha, p.confianza, p.fecha_prediccion
         FROM predicciones_ia p
         INNER JOIN lotes l ON l.id = p.lote_id AND l.deleted_at IS NULL ${ls.clause}
         WHERE p.porcentaje_riesgo >= 40
         ORDER BY p.porcentaje_riesgo DESC LIMIT ${LIMIT_TABLA}`,
        ls.params
      ),
      query(
        `SELECT cc.id, l.codigo_lote, cc.puntaje_taza, cc.calidad_final, cc.fecha_evaluacion
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         ORDER BY cc.created_at DESC LIMIT ${LIMIT_TABLA}`,
        ls.params
      ),
      query(
        `SELECT p.id, l.codigo_lote, p.calidad_predicha, p.confianza, p.porcentaje_riesgo, p.fecha_prediccion
         FROM predicciones_ia p
         INNER JOIN lotes l ON l.id = p.lote_id AND l.deleted_at IS NULL ${ls.clause}
         WHERE p.origen = 'usuario'
         ORDER BY p.id DESC LIMIT ${LIMIT_TABLA}`,
        ls.params
      ),
      queryOne(
        `SELECT l.codigo_lote, ROUND(cc.puntaje_taza, 1) AS puntaje
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         ORDER BY cc.puntaje_taza DESC LIMIT 1`,
        ls.params
      ),
      queryOne(
        `SELECT l.codigo_lote, ROUND(cc.puntaje_taza, 1) AS puntaje
         FROM control_calidad cc
         INNER JOIN lotes l ON l.id = cc.lote_id AND l.deleted_at IS NULL ${ls.clause}
         ORDER BY cc.puntaje_taza ASC LIMIT 1`,
        ls.params
      ),
      queryOne(
        `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
         INNER JOIN trazabilidad t ON t.lote_id = l.id
         WHERE l.deleted_at IS NULL ${ls.clause}`,
        ls.params
      ),
      queryOne(
        `SELECT COUNT(*) AS c FROM lotes l
         WHERE l.deleted_at IS NULL ${ls.clause}
         AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)`,
        ls.params
      ),
      queryOne(
        `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
         INNER JOIN predicciones_ia p ON p.lote_id = l.id AND p.origen = 'usuario'
         WHERE l.deleted_at IS NULL ${ls.clause}`,
        ls.params
      ),
      queryOne(
        `SELECT COUNT(*) AS c FROM lotes l
         WHERE l.deleted_at IS NULL ${ls.clause}
         AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`,
        ls.params
      ),
      isAdmin
        ? queryOne(
            `SELECT CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre, COALESCE(SUM(l.cantidad_kg),0) AS kg
             FROM usuarios u
             JOIN roles r ON u.rol_id=r.id AND r.codigo='cliente'
             LEFT JOIN lotes l ON l.user_id=u.id AND l.deleted_at IS NULL
             WHERE u.deleted_at IS NULL
             GROUP BY u.id ORDER BY kg DESC LIMIT 1`
          )
        : Promise.resolve(null),
      !isAdmin
        ? query(
            `SELECT l.codigo_lote, l.estado, l.cantidad_kg
             FROM lotes l
             WHERE l.deleted_at IS NULL ${ls.clause}
             AND (
               NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)
               OR NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')
               OR NOT EXISTS (SELECT 1 FROM control_calidad c WHERE c.lote_id = l.id)
             )
             ORDER BY l.created_at DESC LIMIT 8`,
            ls.params
          )
        : Promise.resolve([]),
    ])

    const totalLotes = toCount(lotesAgg, 'total')
    const conTraz = toCount(lotesConTrazabilidad)
    const sinTraz = toCount(lotesSinTrazabilidad)
    const conIa = toCount(lotesConIA)
    const sinIa = toCount(lotesSinIA)
    const totalClientes = isAdmin ? toCount(totalClientesRow) : 0

    const cards = isAdmin
      ? {
          totalClientes,
          totalUsuarios: totalClientes,
          totalProductores: toCount(totalProductores),
          totalLotes,
          lotesConTrazabilidad: conTraz,
          lotesSinTrazabilidad: sinTraz || Math.max(0, totalLotes - conTraz),
          lotesConIA: conIa,
          lotesSinIA: sinIa || Math.max(0, totalLotes - conIa),
          produccionTotalKg: Number(lotesAgg?.kg) || 0,
          promedioCalidad: Math.round(Number(calidadAgg?.promedio) || 0),
          prediccionesIA: toCount(predAgg, 'total'),
          reportesGenerados: toCount(reportesAgg),
          accionesAuditoria: toCount(auditoriaAgg),
          lotesActivos: Number(lotesAgg?.activos) || 0,
        }
      : {
          misProductores: toCount(totalProductores),
          misLotes: totalLotes,
          misLotesActivos: Number(lotesAgg?.activos) || 0,
          misLotesConTrazabilidad: conTraz,
          misLotesSinTrazabilidad: sinTraz || Math.max(0, totalLotes - conTraz),
          misLotesConIA: conIa,
          misLotesSinIA: sinIa || Math.max(0, totalLotes - conIa),
          miProduccionKg: Number(lotesAgg?.kg) || 0,
          miPromedioCalidad: Math.round(Number(calidadAgg?.promedio) || 0),
          misPrediccionesIA: Number(predAgg?.total) || 0,
          misReportes: Number(reportesAgg?.c) || 0,
          lotesActivos: Number(lotesAgg?.activos) || 0,
          misPendientes: Array.isArray(lotesPendientesCliente) ? lotesPendientesCliente.length : 0,
        }

    const indicadores = isAdmin
      ? {
          productorMayorProduccion: productorMayorProd || null,
          productorMejorCalidad: productorMejorCalidad || null,
          mejorLote: mejorLote || null,
          loteRiesgoAlto: lotesRiesgo[0] || null,
          ultimaPrediccionIA: ultimaPrediccion || null,
          usuarioMasActivo: usuarioMasActivo || null,
          moduloMasUsado: moduloMasUsado || null,
          produccionMesActual: Number(produccionMes?.kg) || 0,
          clienteMayorProduccion: clienteMayorProduccion || null,
        }
      : {
          miMejorLote: mejorLoteUser || mejorLote || null,
          miLoteMenorCalidad: peorLoteUser || null,
          miUltimaPrediccionIA: ultimaPrediccion || null,
          miProduccionMes: Number(produccionMes?.kg) || 0,
          miUltimoRegistroProduccion: ultimoRegistroProd || null,
        }

    return {
      cards,
      indicadores,
      graficas: {
        produccionPorMes: (produccionMensual || []).reverse().map((r) => ({
          mes: r.mes,
          produccion: Number(r.kg) || 0,
        })),
        calidadPorMes: (calidadMensual || []).reverse().map((r) => ({
          mes: r.mes,
          promedio: Number(r.promedio) || 0,
        })),
        lotesPorEstado: estadosLotes || [],
        prediccionesPorResultado: prediccionesResultado || [],
        produccionPorProductor: (produccionPorProductor || []).map((r) => ({
          productor: r.productor,
          kg: Number(r.kg) || 0,
        })),
        actividadPorUsuario: actividadPorUsuario || [],
        distribucionCalidad: distribucionCalidad || [],
      },
      tablas: {
        ultimosLotes: ultimosLotes || [],
        ultimosProductores: ultimosProductores || [],
        ultimasAcciones: ultimasAcciones || [],
        lotesBajaCalidad: lotesBajaCalidad || [],
        lotesRiesgoAlto: lotesRiesgoTabla || [],
        misControlesCalidad: controlesRecientes || [],
        misPredicciones: prediccionesRecientes || [],
      },
      alertasIA: alertasIA || [],
      ultimaPrediccionDestacada: ultimaPrediccion || null,
      trazabilidadActiva: conTraz,
      lotesPendientes: lotesPendientesCliente || [],
    }
  }
}
