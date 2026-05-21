import { ReportesService } from '../../../application/services/ReportesService.js'

export class ReportesController {
  static async produccion(_req, res) {
    res.json(await ReportesService.getProduccion())
  }

  static async calidad(_req, res) {
    res.json(await ReportesService.getCalidad())
  }

  static async predicciones(_req, res) {
    res.json(await ReportesService.getPredicciones())
  }

  static async trazabilidad(_req, res) {
    res.json(await ReportesService.getTrazabilidad())
  }

  static async export(req, res) {
    const { tipo, formato } = req.params
    const { buffer, contentType, ext } = await ReportesService.export(tipo, formato)
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename=reporte-${tipo}.${ext}`)
    res.send(buffer)
  }
}
