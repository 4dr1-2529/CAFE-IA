import { required, inRange } from './common.js'

const ATTRS = ['aroma', 'sabor', 'cuerpo', 'acidez', 'dulzor', 'balance']

export function validateCreateCalidad(body = {}) {
  const errors = [...required(body, ['lote_id'])]
  for (const attr of ATTRS) {
    errors.push(...inRange(body[attr], 1, 10, attr))
  }
  return errors
}
