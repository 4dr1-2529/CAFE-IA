/** Validación de entrada sin regex propensas a ReDoS (Sonar S5852). */

const MAX_EMAIL_LEN = 254
const MIN_PHONE_DIGITS = 6
const MAX_PHONE_DIGITS = 15

export function isValidEmail(value) {
  if (value === undefined || value === null) return false
  const s = String(value).trim()
  if (!s || s.length > MAX_EMAIL_LEN) return false
  if (/\s/.test(s)) return false
  const at = s.indexOf('@')
  if (at <= 0 || at >= s.length - 1) return false
  const local = s.slice(0, at)
  const domain = s.slice(at + 1)
  if (!local || !domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) return false
  return true
}

export function isValidPhone(value) {
  if (value === undefined || value === null || value === '') return true
  const digits = String(value).replaceAll(/\s/g, '')
  if (!/^\d+$/.test(digits)) return false
  return digits.length >= MIN_PHONE_DIGITS && digits.length <= MAX_PHONE_DIGITS
}
