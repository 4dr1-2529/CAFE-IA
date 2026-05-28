export function validateExecutePrediccion(body = {}) {
  const loteId = Number(body?.lote_id ?? body?.loteId)
  if (!Number.isInteger(loteId) || loteId <= 0) return ['lote_id es obligatorio y debe ser válido']
  return []
}
