import { UsuarioService } from '../../../application/services/UsuarioService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class UsuarioController {
  static async list(req, res) {
    res.json(await UsuarioService.list(requestMeta(req)))
  }

  static async listActive(req, res) {
    res.json(await UsuarioService.listActive(requestMeta(req)))
  }

  static async getById(req, res) {
    res.json(await UsuarioService.getById(Number.parseInt(req.params.id, 10), requestMeta(req)))
  }

  static async create(req, res) {
    const row = await UsuarioService.create(req.body, requestMeta(req))
    res.status(201).json(row)
  }

  static async update(req, res) {
    const row = await UsuarioService.update(Number.parseInt(req.params.id, 10), req.body, requestMeta(req))
    res.json(row)
  }

  static async setEstado(req, res) {
    const row = await UsuarioService.setEstado(Number.parseInt(req.params.id, 10), req.body, requestMeta(req))
    res.json(row)
  }

  static async changeRol(req, res) {
    const row = await UsuarioService.changeRol(Number.parseInt(req.params.id, 10), req.body, requestMeta(req))
    res.json(row)
  }

  static async resetPassword(req, res) {
    res.json(await UsuarioService.resetPassword(Number.parseInt(req.params.id, 10), req.body, requestMeta(req)))
  }
}
