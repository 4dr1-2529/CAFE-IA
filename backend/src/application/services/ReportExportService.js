import PDFDocument from 'pdfkit'
import ExcelJS from 'exceljs'
import { query, queryOne } from '../../infrastructure/database/pool.js'

function scopeSql(userId, alias = 'l') {
  return userId ? ` AND ${alias}.user_id = ? AND ${alias}.deleted_at IS NULL ` : ` AND ${alias}.deleted_at IS NULL `
}

export class ReportExportService {
  static async buildReportData(tipo, userId = null, meta = {}) {
    const fecha = new Date().toLocaleString('es-PE')
    const scope = scopeSql(userId)
    const params = userId ? [userId] : []
    const alcance = meta.alcance || (userId ? 'PERSONAL' : 'GLOBAL')
    const headerMeta = {
      fecha,
      alcance,
      rol: meta.rol || (userId ? 'CLIENTE' : 'ADMIN'),
      usuario: meta.email || meta.nombre || '—',
    }

    if (tipo === 'produccion') {
      const resumen = await queryOne(
        `SELECT COUNT(*) AS total_lotes, COALESCE(SUM(cantidad_kg),0) AS total_kg
         FROM lotes l WHERE 1=1 ${scope}`,
        params
      )
      const rows = await query(
        `SELECT codigo_lote, variedad_cafe, cantidad_kg, fecha_cosecha, estado
         FROM lotes l WHERE 1=1 ${scope}
         ORDER BY id DESC LIMIT 50`,
        params
      )
      return {
        titulo: alcance === 'GLOBAL' ? 'Reporte global de Producción' : 'Mi reporte de Producción',
        ...headerMeta,
        resumen,
        rows,
        columns: ['Código', 'Variedad', 'Kg', 'Cosecha', 'Estado'],
      }
    }
    if (tipo === 'calidad') {
      const rows = await query(
        `SELECT l.codigo_lote, c.puntaje_taza, c.calidad_final, c.fecha_evaluacion
         FROM control_calidad c JOIN lotes l ON c.lote_id=l.id AND l.deleted_at IS NULL
         WHERE 1=1 ${scope} ORDER BY c.id DESC LIMIT 50`,
        params
      )
      return {
        titulo: alcance === 'GLOBAL' ? 'Reporte global de Calidad' : 'Mi reporte de Calidad',
        ...headerMeta,
        rows,
        columns: ['Lote', 'Puntaje', 'Calidad', 'Fecha'],
      }
    }
    if (tipo === 'ia') {
      const rows = await query(
        `SELECT l.codigo_lote, p.calidad_predicha, p.confianza, p.porcentaje_riesgo, p.fecha_prediccion
         FROM predicciones_ia p JOIN lotes l ON p.lote_id=l.id AND l.deleted_at IS NULL
         WHERE p.origen='usuario' ${scope} ORDER BY p.id DESC LIMIT 50`,
        params
      )
      return {
        titulo: alcance === 'GLOBAL' ? 'Reporte global IA / Predicciones' : 'Mi reporte IA / Predicciones',
        ...headerMeta,
        rows,
        columns: ['Lote', 'Calidad predicha', 'Confianza %', 'Riesgo %', 'Fecha'],
      }
    }
    if (tipo === 'trazabilidad') {
      const clienteCol = userId
        ? ''
        : `, CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')) AS cliente`
      const joinCliente = userId ? '' : ' LEFT JOIN usuarios u ON u.id = l.user_id'
      const rows = await query(
        `SELECT l.codigo_lote,
                CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
                ${clienteCol},
                CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
                     ELSE (SELECT t.etapa FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1)
                END AS etapa_actual,
                CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Registrado'
                     ELSE 'En trazabilidad'
                END AS estado,
                CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
                     ELSE COALESCE((SELECT MAX(t.fecha) FROM trazabilidad t WHERE t.lote_id = l.id), 'Pendiente')
                END AS ultima_fecha,
                CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN '-'
                     ELSE COALESCE((SELECT t.ubicacion FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1), '-')
                END AS ubicacion
         FROM lotes l
         LEFT JOIN productores p ON p.id = l.productor_id
         ${joinCliente}
         WHERE 1=1 ${scope}
         ORDER BY l.id DESC LIMIT 100`,
        params
      )
      return {
        titulo: alcance === 'GLOBAL' ? 'Reporte global de Trazabilidad' : 'Mi reporte de Trazabilidad',
        ...headerMeta,
        rows,
        columns: userId
          ? ['Lote', 'Productor', 'Etapa actual', 'Estado', 'Última fecha', 'Ubicación']
          : ['Lote', 'Productor', 'Cliente', 'Etapa actual', 'Estado', 'Última fecha', 'Ubicación'],
      }
    }
    throw Object.assign(new Error('Tipo de reporte inválido'), { status: 400 })
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
