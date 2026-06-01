import { ProductorService } from '../../../application/services/ProductorService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class ProductorController {
  static async list(req, res) {
    res.json(await ProductorService.list(requestMeta(req), req.query))
  }

  static async create(req, res) {
    const row = await ProductorService.create(req.body, requestMeta(req))
    res.status(201).json(row)
  }

  static async update(req, res) {
    const row = await ProductorService.update(Number.parseInt(req.params.id, 10), req.body, requestMeta(req))
    res.json(row)
  }

  static async remove(req, res) {
    await ProductorService.remove(Number.parseInt(req.params.id, 10), requestMeta(req))
    res.status(204).send()
  }
}
