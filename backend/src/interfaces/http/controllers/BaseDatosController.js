import { BaseDatosService } from '../../../application/services/BaseDatosService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class BaseDatosController {
  static async resumen(req, res) {
    res.json(await BaseDatosService.resumen(requestMeta(req)))
  }

  static async tabla(req, res) {
    res.json(await BaseDatosService.getTabla(req.params.tabla, requestMeta(req)))
  }
}
