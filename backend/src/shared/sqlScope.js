/**
 * Fragmentos SQL fijos para scope por usuario (sin concatenar entrada de request).
 * Solo placeholders ? para valores.
 */

export const REPORT_TABLE_KEYS = Object.freeze({
  produccion: 'lotes',
  calidad: 'control_calidad',
  trazabilidad: 'trazabilidad',
  ia: 'predicciones_ia',
  predicciones: 'predicciones_ia',
})

const ALLOWED_REPORT_TYPES = new Set(Object.keys(REPORT_TABLE_KEYS))

export function assertReportType(tipo) {
  const t = String(tipo || '').toLowerCase()
  const norm = t === 'predicciones' ? 'ia' : t
  if (!ALLOWED_REPORT_TYPES.has(norm)) {
    throw Object.assign(new Error('Tipo de reporte inválido'), { status: 400 })
  }
  return norm
}

function parseUserId(userId) {
  if (userId == null || userId === '') return null
  const id = Number(userId)
  if (!Number.isInteger(id) || id < 1) {
    throw Object.assign(new Error('userId inválido'), { status: 400 })
  }
  return id
}

/** Filtro lote por cliente: fragmento fijo + params */
export function loteScope(userId) {
  const id = parseUserId(userId)
  if (!id) return { clause: '', params: [] }
  return {
    clause: ' AND l.user_id = ? AND l.deleted_at IS NULL ',
    params: [id],
  }
}

/** Filtro productor por cliente */
export function productorScope(userId) {
  const id = parseUserId(userId)
  if (!id) return { clause: '', params: [] }
  return {
    clause: ' AND p.user_id = ? AND p.deleted_at IS NULL ',
    params: [id],
  }
}

/** Export PDF/Excel: siempre excluye lotes borrados */
export function loteExportScope(userId) {
  const id = parseUserId(userId)
  if (!id) {
    return { clause: ' AND l.deleted_at IS NULL ', params: [] }
  }
  return {
    clause: ' AND l.user_id = ? AND l.deleted_at IS NULL ',
    params: [id],
  }
}

export const WHERE_LOTE_ACTIVE = 'WHERE l.deleted_at IS NULL'
export const WHERE_LOTE_SCOPED = 'WHERE l.deleted_at IS NULL AND l.user_id = ?'

export function loteWhereSql(userId) {
  const id = parseUserId(userId)
  if (!id) return { sql: WHERE_LOTE_ACTIVE, params: [] }
  return { sql: WHERE_LOTE_SCOPED, params: [id] }
}
