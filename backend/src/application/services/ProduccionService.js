import { ProduccionRepository } from '../../infrastructure/repositories/ProduccionRepository.js'
import { AppError } from '../../shared/AppError.js'

export class ProduccionService {
  static async list() {
    return ProduccionRepository.findAll()
  }

  static async create(body) {
    if (!body.lote_id) throw new AppError('lote_id es obligatorio', 400)
    const fecha = body.fecha_registro || new Date().toISOString().split('T')[0]
    return ProduccionRepository.create({
      lote_id: body.lote_id,
      fecha_registro: fecha,
      cantidad_kg: body.cantidad_kg,
      humedad: body.humedad,
      temperatura: body.temperatura,
      tipo_proceso: body.tipo_proceso || body.tipo_secado,
      observaciones: body.observaciones,
    })
  }
}
