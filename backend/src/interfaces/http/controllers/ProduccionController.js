import { ProduccionService } from '../../../application/services/ProduccionService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class ProduccionController {
  static async list(req, res) {
    res.json(await ProduccionService.list(requestMeta(req)))
  }

  static async create(req, res) {
    const row = await ProduccionService.create(req.body, requestMeta(req))
    res.status(201).json(row)
  }
}
