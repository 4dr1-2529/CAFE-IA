import { TrazabilidadService } from '../../../application/services/TrazabilidadService.js'

export class TrazabilidadController {
  static async list(req, res) {
    res.json(await TrazabilidadService.list(req.query.lote_id))
  }

  static async create(req, res) {
    const row = await TrazabilidadService.create(req.body)
    res.status(201).json(row)
  }
}
