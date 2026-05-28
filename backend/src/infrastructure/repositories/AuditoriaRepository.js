import { query, queryOne } from '../database/pool.js'

function buildFilters(params = {}) {
  const where = []
  const values = []

  if (params.usuario) {
    where.push(`(u.email LIKE ? OR CONCAT(COALESCE(u.nombres,''), ' ', COALESCE(u.apellidos,'')) LIKE ?)`)
    const q = `%${params.usuario}%`
    values.push(q, q)
  }
  if (params.modulo) {
    where.push(`JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')) = ?`)
    values.push(params.modulo)
  }
  if (params.accion) {
    where.push(`a.accion = ?`)
    values.push(params.accion)
  }
  if (params.fechaInicio) {
    where.push(`DATE(a.created_at) >= DATE(?)`)
    values.push(params.fechaInicio)
  }
  if (params.fechaFin) {
    where.push(`DATE(a.created_at) <= DATE(?)`)
    values.push(params.fechaFin)
  }
  if (params.search) {
    where.push(
      `(a.accion LIKE ? OR a.entidad LIKE ? OR JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.descripcion')) LIKE ? OR JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')) LIKE ?)`
    )
    const q = `%${params.search}%`
    values.push(q, q, q, q)
  }

  return { where, values }
}

export class AuditoriaRepository {
  static async list(params = {}) {
    const page = Math.max(1, Number(params.page) || 1)
    const limit = Math.min(100, Math.max(1, Number(params.limit) || 20))
    const offset = (page - 1) * limit
    const { where, values } = buildFilters(params)
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''

    const totalRow = await queryOne(
      `SELECT COUNT(*) AS total
       FROM auditoria_logs a
       LEFT JOIN usuarios u ON a.usuario_id = u.id
       ${whereSql}`,
      values
    )
    const rows = await query(
      `SELECT a.id,
              COALESCE(CONCAT(TRIM(COALESCE(u.nombres,'')), ' ', TRIM(COALESCE(u.apellidos,''))), u.email, 'sistema') AS usuario,
              a.accion,
              COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad, 'general') AS modulo,
              COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.descripcion')), '') AS descripcion,
              a.entidad,
              a.entidad_id AS entidad_id,
              COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.resultado')), 'exito') AS resultado,
              a.ip_address AS ip,
              COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.user_agent')), '') AS user_agent,
              a.created_at AS fecha_creacion
       FROM auditoria_logs a
       LEFT JOIN usuarios u ON a.usuario_id = u.id
       ${whereSql}
       ORDER BY a.created_at DESC
       LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    )
    return {
      page,
      limit,
      total: Number(totalRow?.total || 0),
      rows,
    }
  }

  static async summaryToday() {
    const [tot, hoy, activos, errores] = await Promise.all([
      queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs`),
      queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs WHERE DATE(created_at)=CURDATE()`),
      queryOne(`SELECT COUNT(DISTINCT usuario_id) AS c FROM auditoria_logs WHERE DATE(created_at)=CURDATE() AND usuario_id IS NOT NULL`),
      queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs WHERE JSON_UNQUOTE(JSON_EXTRACT(detalle, '$.resultado'))='error'`),
    ])
    return {
      totalAcciones: Number(tot?.c || 0),
      accionesHoy: Number(hoy?.c || 0),
      usuariosActivos: Number(activos?.c || 0),
      erroresRegistrados: Number(errores?.c || 0),
    }
  }
}
