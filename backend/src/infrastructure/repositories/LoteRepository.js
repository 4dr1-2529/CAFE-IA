import { query, queryOne, execute } from '../database/pool.js'

export class LoteRepository {
  static formatCode(n) {
    return `LOTE-${String(n).padStart(4, '0')}`
  }

  static async findAll() {
    return query(
      `SELECT l.id, l.codigo_lote, l.productor_id, l.variedad_cafe, l.fecha_cosecha, l.cantidad_kg, l.estado,
              l.humedad, l.temperatura, l.altitud, l.tipo_secado, l.qr_codigo, l.tiempo_almacenamiento_dias, l.calidad_grano,
              p.codigo_productor AS productor_codigo,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos,'')) AS productor,
              p.parcela, p.ubicacion AS ubicacion_productor
       FROM lotes l
       LEFT JOIN productores p ON l.productor_id = p.id
       WHERE l.deleted_at IS NULL ORDER BY l.id DESC`
    )
  }

  static async findById(id) {
    const row = await queryOne(
      `SELECT l.*, CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS productor, p.parcela, p.ubicacion AS ubicacion_productor
       FROM lotes l LEFT JOIN productores p ON l.productor_id=p.id
       WHERE l.id=? AND l.deleted_at IS NULL`,
      [id]
    )
    if (!row) return null
    const etapas = await query(`SELECT * FROM trazabilidad WHERE lote_id=? ORDER BY orden, id`, [id])
    return { ...row, trazabilidad: etapas }
  }

  static async nextCode() {
    const row = await queryOne(`SELECT COALESCE(MAX(id), 0) AS max_id FROM lotes`)
    return LoteRepository.formatCode(Number(row?.max_id) + 1)
  }

  static async create(data) {
    const result = await execute(
      `INSERT INTO lotes (codigo_lote, productor_id, variedad_id, proceso_secado_id, estado_lote_id,
        variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.codigo_lote,
        data.productor_id,
        data.variedad_id,
        data.proceso_secado_id,
        data.estado_lote_id,
        data.variedad_cafe,
        data.fecha_cosecha,
        data.cantidad_kg,
        data.estado || 'Produccion',
        data.humedad,
        data.temperatura,
        data.altitud,
        data.tipo_secado,
      ]
    )
    return result.insertId
  }

  static async updateQr(loteId, qr) {
    await execute(`UPDATE lotes SET qr_codigo=? WHERE id=?`, [qr, loteId]).catch(() => {})
  }

  static async seedInventario(loteId, cantidadKg) {
    await execute(`INSERT INTO inventario (lote_id, cantidad_disponible_kg, fecha_actualizacion) VALUES (?,?,CURDATE())`, [
      loteId,
      cantidadKg,
    ]).catch(() => {})
  }

  static async getProductorUbicacion(productorId) {
    return queryOne(`SELECT parcela, ubicacion FROM productores WHERE id=?`, [productorId])
  }

  static async findRawById(id) {
    return queryOne(`SELECT * FROM lotes WHERE id=?`, [id])
  }
}
