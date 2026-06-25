export { isValidEmail, isValidPhone } from '../../../shared/inputValidation.js'

export function isNumericValue(value) {
  if (value === undefined || value === null || value === '') return true
  return !Number.isNaN(Number(value))
}
