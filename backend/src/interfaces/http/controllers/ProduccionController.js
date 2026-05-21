import { ProduccionService } from '../../../application/services/ProduccionService.js'

export class ProduccionController {
  static async list(_req, res) {
    res.json(await ProduccionService.list())
  }

  static async create(req, res) {
    const row = await ProduccionService.create(req.body)
    res.status(201).json(row)
  }
}
