import { query, queryOne } from '../database/pool.js'
import { columnExists, ensureAuditoriaColumns } from '../database/schemaHelpers.js'

let extendedColumnsCache = null

async function hasExtendedColumns() {
  if (extendedColumnsCache === null) {
    extendedColumnsCache = await columnExists('auditoria_logs', 'modulo')
  }
  return extendedColumnsCache
}

async function ensureReady() {
  await ensureAuditoriaColumns()
  extendedColumnsCache = await columnExists('auditoria_logs', 'modulo')
}

function safeLimitOffset(limit, offset) {
  const l = Math.min(100, Math.max(1, Number(limit) || 20))
  const o = Math.max(0, Number(offset) || 0)
  return { limit: l, offset: o }
}

function buildFilters(params = {}, extended = true) {
  const where = []
  const values = []

  if (params.user_id || params.userId) {
    where.push(`a.usuario_id = ?`)
    values.push(Number(params.user_id || params.userId))
  }
  if (params.usuario) {
    if (extended) {
      where.push(`(
        a.usuario_email LIKE ? OR a.usuario_nombre LIKE ?
        OR u.email LIKE ? OR CONCAT(COALESCE(u.nombres,''), ' ', COALESCE(u.apellidos,'')) LIKE ?
      )`)
    } else {
      where.push(`(u.email LIKE ? OR CONCAT(COALESCE(u.nombres,''), ' ', COALESCE(u.apellidos,'')) LIKE ?)`)
    }
    const q = `%${params.usuario}%`
    values.push(...(extended ? [q, q, q, q] : [q, q]))
  }
  if (params.rol) {
    where.push(extended ? `COALESCE(a.rol, r.codigo, '') = ?` : `COALESCE(r.codigo, '') = ?`)
    values.push(params.rol)
  }
  if (params.modulo) {
    where.push(
      extended
        ? `COALESCE(a.modulo, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad, 'general') = ?`
        : `COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad, 'general') = ?`
    )
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
    const q = `%${params.search}%`
    if (extended) {
      where.push(`(
        a.accion LIKE ? OR a.entidad LIKE ? OR a.ruta LIKE ?
        OR COALESCE(a.descripcion, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.descripcion')), '') LIKE ?
        OR COALESCE(a.modulo, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), '') LIKE ?
        OR COALESCE(a.usuario_nombre, '') LIKE ?
      )`)
      values.push(q, q, q, q, q, q)
    } else {
      where.push(`(
        a.accion LIKE ? OR a.entidad LIKE ?
        OR JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.descripcion')) LIKE ?
        OR JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')) LIKE ?
      )`)
      values.push(q, q, q, q)
    }
  }

  return { where, values }
}

function joinSql() {
  return `
    FROM auditoria_logs a
    LEFT JOIN usuarios u ON a.usuario_id = u.id
    LEFT JOIN roles r ON u.rol_id = r.id
  `
}

function selectFields(extended) {
  if (extended) {
    return `
      a.id,
      a.usuario_id AS user_id,
      COALESCE(NULLIF(TRIM(a.usuario_nombre), ''), CONCAT(TRIM(COALESCE(u.nombres,'')), ' ', TRIM(COALESCE(u.apellidos,''))), u.email, 'sistema') AS usuario,
      COALESCE(a.usuario_nombre, CONCAT(TRIM(COALESCE(u.nombres,'')), ' ', TRIM(COALESCE(u.apellidos,''))), u.email) AS usuario_nombre,
      COALESCE(a.usuario_email, u.email, '') AS usuario_email,
      COALESCE(a.rol, r.codigo, 'sistema') AS rol,
      a.accion,
      COALESCE(a.modulo, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad, 'general') AS modulo,
      COALESCE(a.descripcion, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.descripcion')), '') AS descripcion,
      a.entidad,
      a.entidad_id AS entidad_id,
      COALESCE(a.metodo, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.metodo')), '') AS metodo,
      COALESCE(a.ruta, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.ruta')), '') AS ruta,
      COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.resultado')), 'exito') AS resultado,
      a.ip_address AS ip,
      COALESCE(a.user_agent, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.user_agent')), '') AS user_agent,
      a.created_at AS fecha_creacion
    `
  }
  return `
    a.id,
    a.usuario_id AS user_id,
    COALESCE(CONCAT(TRIM(COALESCE(u.nombres,'')), ' ', TRIM(COALESCE(u.apellidos,''))), u.email, 'sistema') AS usuario,
    COALESCE(CONCAT(TRIM(COALESCE(u.nombres,'')), ' ', TRIM(COALESCE(u.apellidos,''))), u.email) AS usuario_nombre,
    COALESCE(u.email, '') AS usuario_email,
    COALESCE(r.codigo, 'sistema') AS rol,
    a.accion,
    COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad, 'general') AS modulo,
    COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.descripcion')), '') AS descripcion,
    a.entidad,
    a.entidad_id AS entidad_id,
    '' AS metodo,
    '' AS ruta,
    COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.resultado')), 'exito') AS resultado,
    a.ip_address AS ip,
    COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.user_agent')), '') AS user_agent,
    a.created_at AS fecha_creacion
  `
}

export class AuditoriaRepository {
  static async list(params = {}) {
    await ensureReady()
    const extended = await hasExtendedColumns()
    const page = Math.max(1, Number(params.page) || 1)
    const { limit, offset } = safeLimitOffset(params.limit, (page - 1) * (Number(params.limit) || 20))
    const { where, values } = buildFilters(params, extended)
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''

    const totalRow = await queryOne(`SELECT COUNT(*) AS total ${joinSql()} ${whereSql}`, values)
    const rows = await query(
      `SELECT ${selectFields(extended)} ${joinSql()} ${whereSql} ORDER BY a.created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      values
    )
    return {
      page,
      limit,
      total: Number(totalRow?.total || 0),
      rows,
    }
  }

  static async summaryToday() {
    await ensureReady()
    const [tot, hoy, activos, errores] = await Promise.all([
      queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs`),
      queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs WHERE DATE(created_at)=CURDATE()`),
      queryOne(`SELECT COUNT(DISTINCT usuario_id) AS c FROM auditoria_logs WHERE DATE(created_at)=CURDATE() AND usuario_id IS NOT NULL`),
      queryOne(
        `SELECT COUNT(*) AS c FROM auditoria_logs
         WHERE COALESCE(JSON_UNQUOTE(JSON_EXTRACT(detalle, '$.resultado')), 'exito') = 'error'
            OR accion LIKE '%ERROR%'`
      ),
    ])
    return {
      totalAcciones: Number(tot?.c || 0),
      accionesHoy: Number(hoy?.c || 0),
      usuariosActivos: Number(activos?.c || 0),
      erroresRegistrados: Number(errores?.c || 0),
    }
  }

  static async resumen() {
    await ensureReady()
    const extended = await hasExtendedColumns()
    const nombreExpr = extended
      ? `COALESCE(a.usuario_nombre, CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')), u.email)`
      : `COALESCE(CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')), u.email)`
    const moduloExpr = extended
      ? `COALESCE(a.modulo, JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad, 'general')`
      : `COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle, '$.modulo')), a.entidad, 'general')`

    const [base, usuarioMasActivo, moduloMasUsado, ultimas] = await Promise.all([
      AuditoriaRepository.summaryToday(),
      queryOne(
        `SELECT ${nombreExpr} AS nombre, COUNT(*) AS acciones
         FROM auditoria_logs a
         LEFT JOIN usuarios u ON u.id = a.usuario_id
         GROUP BY a.usuario_id, ${nombreExpr}
         ORDER BY acciones DESC LIMIT 1`
      ),
      queryOne(
        `SELECT ${moduloExpr} AS modulo, COUNT(*) AS acciones
         FROM auditoria_logs a
         GROUP BY ${moduloExpr}
         ORDER BY acciones DESC LIMIT 1`
      ),
      query(`SELECT ${selectFields(extended)} ${joinSql()} ORDER BY a.created_at DESC LIMIT 10`),
    ])
    return {
      ...base,
      usuarioMasActivo: usuarioMasActivo?.nombre || '—',
      accionesUsuarioMasActivo: Number(usuarioMasActivo?.acciones || 0),
      moduloMasUsado: moduloMasUsado?.modulo || '—',
      accionesModuloMasUsado: Number(moduloMasUsado?.acciones || 0),
      ultimasAcciones: ultimas || [],
    }
  }
}

export async function auditoriaHasExtendedColumns() {
  return hasExtendedColumns()
}
