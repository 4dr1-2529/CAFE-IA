import { PrediccionService } from '../../../application/services/PrediccionService.js'

export class PrediccionController {
  static async list(req, res) {
    res.json(await PrediccionService.list({ user: req.user }))
  }

  static async execute(req, res) {
    const loteId = Number(req.body?.lote_id ?? req.body?.loteId)
    const result = await PrediccionService.execute(loteId, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.status(201).json(result)
  }
}
