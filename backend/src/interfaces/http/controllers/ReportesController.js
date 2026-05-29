import { ReportesService } from '../../../application/services/ReportesService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class ReportesController {
  static async produccion(req, res) {
    res.json(await ReportesService.getProduccion(requestMeta(req)))
  }

  static async calidad(req, res) {
    res.json(await ReportesService.getCalidad(requestMeta(req)))
  }

  static async predicciones(req, res) {
    res.json(await ReportesService.getPredicciones(requestMeta(req)))
  }

  static async trazabilidad(req, res) {
    res.json(await ReportesService.getTrazabilidad(requestMeta(req)))
  }

  static async export(req, res) {
    const { tipo, formato } = req.params
    const { buffer, contentType, ext } = await ReportesService.export(tipo, formato, requestMeta(req))
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename=reporte-${tipo}.${ext}`)
    res.send(buffer)
  }
}
