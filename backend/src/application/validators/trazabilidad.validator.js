import { required } from './common.js'

export function validateCreateTrazabilidad(body = {}) {
  return required(body, ['lote_id', 'etapa'])
}
