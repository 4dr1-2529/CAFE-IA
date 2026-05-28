import { required, inRange } from './common.js'

const ATTRS = ['aroma', 'sabor', 'cuerpo', 'acidez', 'dulzor', 'balance']

export function validateCreateCalidad(body = {}) {
  const errors = [...required(body, ['lote_id'])]
  for (const attr of ATTRS) {
    errors.push(...inRange(body[attr], 1, 10, attr))
  }
  if (body.humedad != null) errors.push(...inRange(body.humedad, 0, 100, 'humedad'))
  if (body.puntaje_taza != null) errors.push(...inRange(body.puntaje_taza, 0, 100, 'puntaje_taza'))
  if (body.observaciones && String(body.observaciones).length > 500) errors.push('observaciones no debe exceder 500 caracteres')
  return errors
}
