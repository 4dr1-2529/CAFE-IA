import { required, isPositiveNumber } from './common.js'

export function validateCreateLote(body = {}) {
  const errors = [
    ...required(body, ['productor_id', 'variedad_cafe', 'fecha_cosecha', 'tipo_secado']),
    ...isPositiveNumber(body.cantidad_kg, 'cantidad_kg'),
    ...isPositiveNumber(body.humedad, 'humedad'),
    ...isPositiveNumber(body.temperatura, 'temperatura'),
    ...isPositiveNumber(body.altitud, 'altitud'),
  ]
  if (body.cantidad_kg == null) errors.push('cantidad_kg es obligatorio')
  if (body.humedad == null) errors.push('humedad es obligatorio')
  if (body.temperatura == null) errors.push('temperatura es obligatorio')
  if (body.altitud == null) errors.push('altitud es obligatorio')
  return errors
}
