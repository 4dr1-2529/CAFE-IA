import { CalidadService } from '../../../application/services/CalidadService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class CalidadController {
  static async list(req, res) {
    res.json(await CalidadService.list(requestMeta(req)))
  }

  static async create(req, res) {
    const row = await CalidadService.create(req.body, requestMeta(req))
    res.status(201).json(row)
  }
}
