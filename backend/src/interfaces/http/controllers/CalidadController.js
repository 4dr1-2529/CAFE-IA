import { CalidadService } from '../../../application/services/CalidadService.js'

export class CalidadController {
  static async list(req, res) {
    res.json(await CalidadService.list({ user: req.user }))
  }

  static async create(req, res) {
    const row = await CalidadService.create(req.body, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.status(201).json(row)
  }
}
