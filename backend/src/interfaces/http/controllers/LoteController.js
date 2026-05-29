import { LoteService } from '../../../application/services/LoteService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class LoteController {
  static async list(req, res) {
    res.json(await LoteService.list(requestMeta(req)))
  }

  static async nextCode(req, res) {
    res.json(await LoteService.nextCode({ user: req.user }, req.query))
  }

  static async getById(req, res) {
    res.json(await LoteService.getById(parseInt(req.params.id, 10), { user: req.user }))
  }

  static async create(req, res) {
    const row = await LoteService.create(req.body, requestMeta(req))
    res.status(201).json(row)
  }
}
