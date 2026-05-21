import { LoteService } from '../../../application/services/LoteService.js'

export class LoteController {
  static async list(_req, res) {
    res.json(await LoteService.list())
  }

  static async nextCode(_req, res) {
    res.json(await LoteService.nextCode())
  }

  static async getById(req, res) {
    res.json(await LoteService.getById(parseInt(req.params.id, 10)))
  }

  static async create(req, res) {
    const row = await LoteService.create(req.body)
    res.status(201).json(row)
  }
}
