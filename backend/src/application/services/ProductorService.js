import { ProductorRepository } from '../../infrastructure/repositories/ProductorRepository.js'
import { AppError } from '../../shared/AppError.js'
import { validateProductorBody } from '../validators/productor.validator.js'

export class ProductorService {
  static async list() {
    return ProductorRepository.findAll()
  }

  static parseBody(body) {
    const errors = validateProductorBody(body)
    if (errors.length) throw new AppError(errors.join('; '), 400)
    const nombres = body.nombres || body.nombre || ''
    const apellidos = body.apellidos || body.apellido || ''
    const correo = body.correo || body.email || ''
    const { dni, telefono, parcela, ubicacion, altitud, estado } = body
    return { nombres: nombres.trim(), apellidos: apellidos.trim(), dni: String(dni).trim(), telefono, correo: correo.trim(), parcela, ubicacion, altitud, estado }
  }

  static async create(body) {
    const data = ProductorService.parseBody(body)
    return ProductorRepository.create(data)
  }

  static async update(id, body) {
    if (!id) throw new AppError('ID inválido', 400)
    const data = ProductorService.parseBody(body)
    const row = await ProductorRepository.update(id, data)
    if (!row) throw new AppError('Productor no encontrado', 404)
    return row
  }

  static async remove(id) {
    if (!id) throw new AppError('ID inválido', 400)
    const lotes = await ProductorRepository.countLotesByProductor(id)
    if (lotes > 0) throw new AppError('No se puede eliminar un productor con lotes registrados', 400)
    const n = await ProductorRepository.softDelete(id)
    if (!n) throw new AppError('Productor no encontrado', 404)
  }
}
