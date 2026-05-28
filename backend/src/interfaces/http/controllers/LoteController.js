import { LoteService } from '../../../application/services/LoteService.js'

export class LoteController {
  static async list(req, res) {
    res.json(
      await LoteService.list({
        user: req.user,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      })
    )
  }

  static async nextCode(req, res) {
    res.json(
      await LoteService.nextCode(
        { user: req.user },
        req.query
      )
    )
  }

  static async getById(req, res) {
    res.json(
      await LoteService.getById(parseInt(req.params.id, 10), {
        user: req.user,
      })
    )
  }

  static async create(req, res) {
    const row = await LoteService.create(req.body, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.status(201).json(row)
  }
}
