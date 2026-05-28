import { ReportesService } from '../../../application/services/ReportesService.js'

export class ReportesController {
  static async produccion(req, res) {
    res.json(await ReportesService.getProduccion({ user: req.user }))
  }

  static async calidad(req, res) {
    res.json(await ReportesService.getCalidad({ user: req.user }))
  }

  static async predicciones(req, res) {
    res.json(await ReportesService.getPredicciones({ user: req.user }))
  }

  static async trazabilidad(req, res) {
    res.json(await ReportesService.getTrazabilidad({ user: req.user }))
  }

  static async export(req, res) {
    const { tipo, formato } = req.params
    const { buffer, contentType, ext } = await ReportesService.export(tipo, formato, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename=reporte-${tipo}.${ext}`)
    res.send(buffer)
  }
}
