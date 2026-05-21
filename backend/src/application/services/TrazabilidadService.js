import { TrazabilidadRepository } from '../../infrastructure/repositories/TrazabilidadRepository.js'

export class TrazabilidadService {
  static async list(loteId) {
    const id = loteId ? Number(loteId) : null
    return TrazabilidadRepository.findAll(id || undefined)
  }

  static async create(body) {
    return TrazabilidadRepository.insertManual({
      lote_id: body.lote_id,
      etapa: body.etapa,
      descripcion: body.descripcion || '',
      fecha: body.fecha || null,
      ubicacion: body.ubicacion || '',
      estado: body.estado || 'Pendiente',
    })
  }
}
