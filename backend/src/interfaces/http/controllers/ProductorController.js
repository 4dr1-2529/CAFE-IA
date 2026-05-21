import { ProductorService } from '../../../application/services/ProductorService.js'

export class ProductorController {
  static async list(req, res) {
    res.json(await ProductorService.list())
  }

  static async create(req, res) {
    const row = await ProductorService.create(req.body)
    res.status(201).json(row)
  }

  static async update(req, res) {
    const row = await ProductorService.update(parseInt(req.params.id, 10), req.body)
    res.json(row)
  }

  static async remove(req, res) {
    await ProductorService.remove(parseInt(req.params.id, 10))
    res.status(204).send()
  }
}
