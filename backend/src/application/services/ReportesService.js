import { ReportesRepository } from '../../infrastructure/repositories/ReportesRepository.js'
import { ReportExportService } from './ReportExportService.js'

export class ReportesService {
  static async getProduccion() {
    return ReportesRepository.produccion()
  }

  static async getCalidad() {
    return ReportesRepository.calidad()
  }

  static async getPredicciones() {
    return ReportesRepository.predicciones()
  }

  static async getTrazabilidad() {
    return ReportesRepository.trazabilidad()
  }

  static async export(tipo, formato) {
    const data = await ReportExportService.buildReportData(tipo)
    if (formato === 'pdf') {
      return { buffer: await ReportExportService.toPdf(tipo, data), contentType: 'application/pdf', ext: 'pdf' }
    }
    if (formato === 'excel' || formato === 'xlsx') {
      return {
        buffer: await ReportExportService.toExcel(tipo, data),
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ext: 'xlsx',
      }
    }
    throw Object.assign(new Error('Formato no soportado. Use pdf o excel'), { status: 400 })
  }
}
