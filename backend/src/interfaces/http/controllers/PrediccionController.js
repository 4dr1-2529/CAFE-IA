import { PrediccionService } from '../../../application/services/PrediccionService.js'

export class PrediccionController {
  static async list(_req, res) {
    res.json(await PrediccionService.list())
  }

  static async execute(req, res) {
    const loteId = Number(req.body?.lote_id ?? req.body?.loteId)
    const result = await PrediccionService.execute(loteId)
    res.status(201).json(result)
  }
}
