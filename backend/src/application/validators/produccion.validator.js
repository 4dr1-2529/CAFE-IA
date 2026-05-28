import { required, isPositiveNumber, inRange } from './common.js'

export function validateCreateProduccion(body = {}) {
  const errors = [...required(body, ['lote_id', 'cantidad_kg'])]
  errors.push(...isPositiveNumber(body.cantidad_kg, 'cantidad_kg'))
  if (Number(body.cantidad_kg) <= 0) errors.push('cantidad_kg debe ser mayor a 0')
  if (body.humedad != null) errors.push(...inRange(body.humedad, 0, 100, 'humedad'))
  if (body.temperatura != null) errors.push(...inRange(body.temperatura, -10, 100, 'temperatura'))
  if (body.fecha_registro && Number.isNaN(Date.parse(String(body.fecha_registro)))) errors.push('fecha_registro debe ser válida')
  if (body.observaciones && String(body.observaciones).length > 500) errors.push('observaciones no debe exceder 500 caracteres')
  return errors
}
