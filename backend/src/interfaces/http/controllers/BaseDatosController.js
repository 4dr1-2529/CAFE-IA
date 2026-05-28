import { BaseDatosService } from '../../../application/services/BaseDatosService.js'

const metaFromReq = (req) => ({
  user: req.user,
  ip: req.ip,
  userAgent: req.get('user-agent'),
})

export class BaseDatosController {
  static async resumen(req, res) {
    res.json(await BaseDatosService.resumen(metaFromReq(req)))
  }

  static async tabla(req, res) {
    res.json(await BaseDatosService.getTabla(req.params.tabla, metaFromReq(req)))
  }
}
