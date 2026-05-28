import { ProduccionService } from '../../../application/services/ProduccionService.js'

export class ProduccionController {
  static async list(req, res) {
    res.json(await ProduccionService.list({ user: req.user }))
  }

  static async create(req, res) {
    const row = await ProduccionService.create(req.body, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.status(201).json(row)
  }
}
