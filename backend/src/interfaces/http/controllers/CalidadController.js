import { CalidadService } from '../../../application/services/CalidadService.js'

export class CalidadController {
  static async list(_req, res) {
    res.json(await CalidadService.list())
  }

  static async create(req, res) {
    const row = await CalidadService.create(req.body)
    res.status(201).json(row)
  }
}
