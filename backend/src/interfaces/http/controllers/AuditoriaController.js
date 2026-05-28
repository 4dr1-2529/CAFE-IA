import { AuditoriaService } from '../../../application/services/AuditoriaService.js'

export class AuditoriaController {
  static async list(req, res) {
    const meta = { user: req.user, ip: req.ip, userAgent: req.get('user-agent') }
    const [data, resumen] = await Promise.all([
      AuditoriaService.list(req.query, meta),
      AuditoriaService.summary(meta),
    ])
    res.json({ ...data, resumen })
  }

  static async create(req, res) {
    const data = await AuditoriaService.create(req.body, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.status(201).json(data)
  }
}
