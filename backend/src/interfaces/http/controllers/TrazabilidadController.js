import { TrazabilidadService } from '../../../application/services/TrazabilidadService.js'

export class TrazabilidadController {
  static async list(req, res) {
    res.json(await TrazabilidadService.list(req.query.lote_id, { user: req.user }))
  }

  static async create(req, res) {
    const row = await TrazabilidadService.create(req.body, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.status(201).json(row)
  }
}
