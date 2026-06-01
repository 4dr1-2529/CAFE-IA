/** Convierte BigInt y estructuras anidadas para res.json() sin TypeError. */
export function sanitizeForJson(value) {
  if (value === null || value === undefined) return value
  if (typeof value === 'bigint') return Number(value)
  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.map(sanitizeForJson)
  if (typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = sanitizeForJson(v)
    }
    return out
  }
  return value
}
