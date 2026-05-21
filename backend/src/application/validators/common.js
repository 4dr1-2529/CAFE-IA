/** @returns {string[]} */
export function required(body, fields) {
  const errors = []
  for (const field of fields) {
    const v = body?.[field]
    if (v === undefined || v === null || v === '') errors.push(`${field} es obligatorio`)
  }
  return errors
}

/** @returns {string[]} */
export function isPositiveNumber(value, label) {
  const n = Number(value)
  if (Number.isNaN(n) || n < 0) return [`${label} debe ser un número válido`]
  return []
}

/** @returns {string[]} */
export function inRange(value, min, max, label) {
  const n = Number(value)
  if (Number.isNaN(n) || n < min || n > max) return [`${label} debe estar entre ${min} y ${max}`]
  return []
}
