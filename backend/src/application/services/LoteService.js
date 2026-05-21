import { LoteRepository } from '../../infrastructure/repositories/LoteRepository.js'
import { TrazabilidadRepository } from '../../infrastructure/repositories/TrazabilidadRepository.js'
import { CatalogRepository } from '../../infrastructure/repositories/CatalogRepository.js'
import { AppError } from '../../shared/AppError.js'

export class LoteService {
  static async list() {
    return LoteRepository.findAll()
  }

  static async getById(id) {
    if (!id) throw new AppError('ID inválido', 400)
    const row = await LoteRepository.findById(id)
    if (!row) throw new AppError('Lote no encontrado', 404)
    return row
  }

  static async nextCode() {
    return { nextCode: await LoteRepository.nextCode() }
  }

  static async create(body) {
    let code = body.codigo_lote?.trim()
    if (!code) code = await LoteRepository.nextCode()

    try {
      const catalog = await CatalogRepository.resolveLoteFk(body)
      const loteId = await LoteRepository.create({ ...body, ...catalog, codigo_lote: code })
      const prod = await LoteRepository.getProductorUbicacion(body.productor_id)
      const ubicacion = prod?.parcela || prod?.ubicacion || ''
      await TrazabilidadRepository.seedDefaultEtapas(loteId, body.fecha_cosecha, ubicacion)
      const qr = `CAFE-${loteId}-${Date.now().toString(36).toUpperCase()}`
      await LoteRepository.updateQr(loteId, qr)
      await LoteRepository.seedInventario(loteId, body.cantidad_kg)
      return LoteRepository.findRawById(loteId)
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') throw new AppError('Ya existe un lote con ese código', 409)
      throw e
    }
  }
}
