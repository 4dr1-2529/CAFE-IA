import { PrediccionService } from '../../../application/services/PrediccionService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class PrediccionController {
  static async list(req, res) {
    res.json(await PrediccionService.list(requestMeta(req)))
  }

  static async execute(req, res) {
    const loteId = Number(req.body?.lote_id ?? req.body?.loteId)
    const result = await PrediccionService.execute(loteId, requestMeta(req))
    res.status(201).json(result)
  }
}
