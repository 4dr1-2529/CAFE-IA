/** Validaciones reutilizables PMV2 */
import { isValidEmail } from './inputValidation.js'

export function required(value, label) {
  if (value === undefined || value === null || String(value).trim() === '') {
    return `${label} es obligatorio`
  }
  return null
}

export function numberRange(value, min, max, label) {
  const n = Number(value)
  if (Number.isNaN(n)) return `${label} debe ser un número válido`
  if (n < min || n > max) return `${label} debe estar entre ${min} y ${max}`
  return null
}

export function strictPositive(value, label) {
  const n = Number(value)
  if (Number.isNaN(n) || n <= 0) return `${label} debe ser mayor a 0`
  return null
}

export function nonNegative(value, label) {
  const n = Number(value)
  if (Number.isNaN(n) || n < 0) return `${label} debe ser un número válido`
  return null
}

export function email(value) {
  if (!value) return null
  if (!isValidEmail(value)) return 'Correo electrónico no válido'
  return null
}

export function runRules(rules) {
  const errors = {}
  for (const [field, msgs] of Object.entries(rules)) {
    const list = msgs.filter(Boolean)
    if (list.length) errors[field] = list[0]
  }
  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateProductorForm(data) {
  return runRules({
    nombres: [required(data.nombres || data.nombre, 'Nombres')],
    apellidos: [required(data.apellidos || data.apellido, 'Apellidos')],
    dni: [required(data.dni, 'DNI')],
    correo: [required(data.correo || data.email, 'Correo'), email(data.correo || data.email)],
  })
}

export function validateLoteForm(data) {
  return runRules({
    productor_id: [required(data.productor_id, 'Productor')],
    variedad_cafe: [required(data.variedad_cafe, 'Variedad')],
    fecha_cosecha: [required(data.fecha_cosecha, 'Fecha de cosecha')],
    cantidad_kg: [numberRange(data.cantidad_kg, 1, 50000, 'Cantidad (kg)')],
    humedad: [numberRange(data.humedad, 8, 16, 'Humedad (%)')],
    temperatura: [numberRange(data.temperatura, 10, 35, 'Temperatura (°C)')],
    altitud: [numberRange(data.altitud, 800, 2800, 'Altitud')],
    tipo_secado: [required(data.tipo_secado, 'Tipo de secado')],
  })
}

/** Validación alineada con el backend (evita 400 en API). */
export function validateLoteApiForm(data) {
  return runRules({
    productor_id: [required(data.productor_id, 'Productor')],
    variedad_cafe: [required(data.variedad_cafe, 'Variedad')],
    fecha_cosecha: [required(data.fecha_cosecha, 'Fecha de cosecha')],
    tipo_secado: [required(data.tipo_secado, 'Tipo de secado')],
    cantidad_kg: [strictPositive(data.cantidad_kg, 'Cantidad (kg)')],
    humedad: [nonNegative(data.humedad, 'Humedad (%)')],
    temperatura: [nonNegative(data.temperatura, 'Temperatura (°C)')],
    altitud: [nonNegative(data.altitud, 'Altitud')],
  })
}

export function validateCalidadForm(data) {
  const attrs = ['aroma', 'sabor', 'cuerpo', 'acidez', 'dulzor', 'balance']
  const rules = { lote_id: [required(data.lote_id, 'Lote')] }
  for (const a of attrs) {
    rules[a] = [numberRange(data[a], 1, 10, a)]
  }
  return runRules(rules)
}
