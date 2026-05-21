import PDFDocument from 'pdfkit'
import ExcelJS from 'exceljs'
import { query, queryOne } from '../../infrastructure/database/pool.js'

export class ReportExportService {
  static async buildReportData(tipo) {
    const fecha = new Date().toLocaleDateString('es-PE')
    if (tipo === 'produccion') {
      const resumen = await queryOne(`SELECT COUNT(*) AS total_lotes, COALESCE(SUM(cantidad_kg),0) AS total_kg FROM lotes WHERE deleted_at IS NULL`)
      const rows = await query(`SELECT codigo_lote, variedad_cafe, cantidad_kg, fecha_cosecha, estado FROM lotes WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 50`)
      return { titulo: 'Reporte de Producción', fecha, resumen, rows, columns: ['Código', 'Variedad', 'Kg', 'Cosecha', 'Estado'] }
    }
    if (tipo === 'calidad') {
      const rows = await query(`SELECT l.codigo_lote, c.puntaje_taza, c.calidad_final, c.fecha_evaluacion FROM control_calidad c JOIN lotes l ON c.lote_id=l.id ORDER BY c.id DESC`)
      return { titulo: 'Reporte de Calidad', fecha, rows, columns: ['Lote', 'Puntaje', 'Calidad', 'Fecha'] }
    }
    if (tipo === 'ia') {
      const rows = await query(`SELECT l.codigo_lote, p.calidad_predicha, p.confianza, p.porcentaje_riesgo, p.fecha_prediccion FROM predicciones_ia p JOIN lotes l ON p.lote_id=l.id WHERE origen='usuario'`)
      return { titulo: 'Reporte IA / Predicciones', fecha, rows, columns: ['Lote', 'Calidad predicha', 'Confianza %', 'Riesgo %', 'Fecha'] }
    }
    if (tipo === 'trazabilidad') {
      const rows = await query(`SELECT l.codigo_lote, t.etapa, t.estado, t.fecha, t.ubicacion FROM trazabilidad t JOIN lotes l ON t.lote_id=l.id ORDER BY l.codigo_lote, t.orden`)
      return { titulo: 'Reporte de Trazabilidad', fecha, rows, columns: ['Lote', 'Etapa', 'Estado', 'Fecha', 'Ubicación'] }
    }
    throw Object.assign(new Error('Tipo de reporte inválido'), { status: 400 })
  }

  static toPdf(tipo, data) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 })
      const chunks = []
      doc.on('data', c => chunks.push(c))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      doc.fontSize(18).text('Café Sostenible AI', { align: 'center' })
      doc.fontSize(14).text(data.titulo, { align: 'center' })
      doc.fontSize(10).text(`Fecha: ${data.fecha}`, { align: 'center' })
      doc.moveDown()
      if (data.resumen) {
        doc.text(`Total lotes: ${data.resumen.total_lotes || '-'} | Total kg: ${data.resumen.total_kg || '-'}`)
        doc.moveDown()
      }
      const rows = data.rows || []
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
    const cols = data.columns || Object.keys(data.rows?.[0] || {})
    ws.addRow([])
    ws.addRow(cols).font = { bold: true }
    for (const row of data.rows || []) {
      ws.addRow(Object.values(row).slice(0, cols.length))
    }
    return Buffer.from(await wb.xlsx.writeBuffer())
  }
}
