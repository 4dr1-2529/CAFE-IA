import { TrazabilidadService } from '../../../application/services/TrazabilidadService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class TrazabilidadController {
  static async list(req, res) {
    res.json(await TrazabilidadService.list(req.query.lote_id, requestMeta(req)))
  }

  static async create(req, res) {
    const row = await TrazabilidadService.create(req.body, requestMeta(req))
    res.status(201).json(row)
  }
}
