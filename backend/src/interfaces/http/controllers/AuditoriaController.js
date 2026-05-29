import { AuditoriaService } from '../../../application/services/AuditoriaService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class AuditoriaController {
  static async list(req, res) {
    const meta = requestMeta(req)
    const data = await AuditoriaService.list(req.query, meta)
    res.json(data)
  }

  static async resumen(req, res) {
    const data = await AuditoriaService.resumen(requestMeta(req))
    res.json({ ok: true, data })
  }

  static async create(req, res) {
    const data = await AuditoriaService.create(req.body, requestMeta(req))
    res.status(201).json(data)
  }
}
