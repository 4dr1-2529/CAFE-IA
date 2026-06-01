import PDFDocument from 'pdfkit'
import ExcelJS from 'exceljs'
import * as R from '../../shared/reportesSql.js'
import { assertReportType } from '../../shared/sqlScope.js'
import { queryScoped, queryOneScoped } from '../../shared/scopedQuery.js'
import { TRAZA_LOTES_GLOBAL, TRAZA_LOTES_SCOPED } from '../../shared/trazabilidadSql.js'

function reportTitle(alcance, globalLabel, personalLabel) {
  return alcance === 'GLOBAL' ? globalLabel : personalLabel
}

async function buildProduccionReport(userId, headerMeta) {
  const resumen = await queryOneScoped(userId, R.EXPORT_PROD_RESUMEN_GLOBAL, R.EXPORT_PROD_RESUMEN_SCOPED)
  const rows = await queryScoped(userId, R.EXPORT_PROD_ROWS_GLOBAL, R.EXPORT_PROD_ROWS_SCOPED)
  return {
    titulo: reportTitle(headerMeta.alcance, 'Reporte global de Producción', 'Mi reporte de Producción'),
    ...headerMeta,
    resumen,
    rows,
    columns: ['Código', 'Variedad', 'Kg', 'Cosecha', 'Estado'],
  }
}

async function buildCalidadReport(userId, headerMeta) {
  const rows = await queryScoped(userId, R.EXPORT_CALIDAD_GLOBAL, R.EXPORT_CALIDAD_SCOPED)
  return {
    titulo: reportTitle(headerMeta.alcance, 'Reporte global de Calidad', 'Mi reporte de Calidad'),
    ...headerMeta,
    rows,
    columns: ['Lote', 'Puntaje', 'Calidad', 'Fecha'],
  }
}

async function buildIaReport(userId, headerMeta) {
  const rows = await queryScoped(userId, R.EXPORT_IA_GLOBAL, R.EXPORT_IA_SCOPED)
  return {
    titulo: reportTitle(headerMeta.alcance, 'Reporte global IA / Predicciones', 'Mi reporte IA / Predicciones'),
    ...headerMeta,
    rows,
    columns: ['Lote', 'Calidad predicha', 'Confianza %', 'Riesgo %', 'Fecha'],
  }
}

async function buildTrazabilidadReport(userId, headerMeta) {
  const rows = await queryScoped(userId, TRAZA_LOTES_GLOBAL, TRAZA_LOTES_SCOPED)
  return {
    titulo: reportTitle(headerMeta.alcance, 'Reporte global de Trazabilidad', 'Mi reporte de Trazabilidad'),
    ...headerMeta,
    rows,
    columns: userId
      ? ['Lote', 'Productor', 'Etapa actual', 'Estado', 'Última fecha', 'Ubicación']
      : ['Lote', 'Productor', 'Cliente', 'Etapa actual', 'Estado', 'Última fecha', 'Ubicación'],
  }
}

const REPORT_BUILDERS = {
  produccion: buildProduccionReport,
  calidad: buildCalidadReport,
  ia: buildIaReport,
  trazabilidad: buildTrazabilidadReport,
}

export class ReportExportService {
  static async buildReportData(tipo, userId = null, meta = {}) {
    const tipoNorm = assertReportType(tipo)
    const builder = REPORT_BUILDERS[tipoNorm]
    if (!builder) throw Object.assign(new Error('Tipo de reporte inválido'), { status: 400 })

    const headerMeta = {
      fecha: new Date().toLocaleString('es-PE'),
      alcance: meta.alcance || (userId ? 'PERSONAL' : 'GLOBAL'),
      rol: meta.rol || (userId ? 'CLIENTE' : 'ADMIN'),
      usuario: meta.email || meta.nombre || '—',
    }

    return builder(userId, headerMeta)
  }

  static toPdf(tipo, data) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 })
      const chunks = []
      doc.on('data', (c) => chunks.push(c))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      doc.fontSize(18).text('Café Sostenible AI', { align: 'center' })
      doc.fontSize(14).text(data.titulo, { align: 'center' })
      doc.fontSize(10).text(`Generado: ${data.fecha}`, { align: 'center' })
      doc.fontSize(10).text(`Usuario: ${data.usuario} | Rol: ${data.rol} | Alcance: ${data.alcance}`, { align: 'center' })
      doc.moveDown()
      if (data.resumen) {
        doc.text(`Total lotes: ${data.resumen.total_lotes ?? '-'} | Total kg: ${data.resumen.total_kg ?? '-'}`)
        doc.moveDown()
      }
      const rows = data.rows || []
      if (!rows.length) {
        doc.text('Sin registros para el alcance seleccionado.')
      }
      rows.slice(0, 40).forEach((row, i) => {
        const vals = Object.values(row).slice(0, 5)
        doc.fontSize(9).text(`${i + 1}. ${vals.join(' | ')}`)
      })
      doc.end()
    })
  }

  static async toExcel(tipo, data) {
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Reporte')
    ws.mergeCells('A1:E1')
    ws.getCell('A1').value = 'Café Sostenible AI'
    ws.getCell('A1').font = { bold: true, size: 14 }
    ws.getCell('A2').value = data.titulo
    ws.getCell('A3').value = `Generado: ${data.fecha}`
    ws.getCell('A4').value = `Usuario: ${data.usuario}`
    ws.getCell('A5').value = `Rol: ${data.rol} | Alcance: ${data.alcance}`
    const cols = data.columns || Object.keys(data.rows?.[0] || {})
    ws.addRow([])
    ws.addRow(cols).font = { bold: true }
    for (const row of data.rows || []) {
      ws.addRow(Object.values(row).slice(0, cols.length))
    }
    return Buffer.from(await wb.xlsx.writeBuffer())
  }
}
