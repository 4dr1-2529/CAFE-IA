import { UsuarioService } from '../../../application/services/UsuarioService.js'

const metaFromReq = (req) => ({
  user: req.user,
  ip: req.ip,
  userAgent: req.get('user-agent'),
})

export class UsuarioController {
  static async list(req, res) {
    res.json(await UsuarioService.list(metaFromReq(req)))
  }

  static async listActive(req, res) {
    res.json(await UsuarioService.listActive(metaFromReq(req)))
  }

  static async getById(req, res) {
    res.json(await UsuarioService.getById(parseInt(req.params.id, 10), metaFromReq(req)))
  }

  static async create(req, res) {
    const row = await UsuarioService.create(req.body, metaFromReq(req))
    res.status(201).json(row)
  }

  static async update(req, res) {
    const row = await UsuarioService.update(parseInt(req.params.id, 10), req.body, metaFromReq(req))
    res.json(row)
  }

  static async setEstado(req, res) {
    const row = await UsuarioService.setEstado(parseInt(req.params.id, 10), req.body, metaFromReq(req))
    res.json(row)
  }

  static async changeRol(req, res) {
    const row = await UsuarioService.changeRol(parseInt(req.params.id, 10), req.body, metaFromReq(req))
    res.json(row)
  }

  static async resetPassword(req, res) {
    res.json(await UsuarioService.resetPassword(parseInt(req.params.id, 10), req.body, metaFromReq(req)))
  }
}
