import { query, execute } from '../database/pool.js'

export class ProduccionRepository {
  static async findAll(userId = null) {
    const scope = userId ? ' AND l.user_id = ? ' : ''
    const params = userId ? [userId] : []
    return query(
      `SELECT p.*, l.codigo_lote
       FROM produccion p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       WHERE 1=1 ${scope}
       ORDER BY p.id DESC`,
      params
    )
  }

  static async create(data) {
    const r = await execute(
      `INSERT INTO produccion (lote_id, user_id, fecha_registro, cantidad_kg, humedad, temperatura, tipo_proceso, observaciones)
       VALUES (?,?,?,?,?,?,?,?)`,
      [
        data.lote_id,
        data.user_id ?? null,
        data.fecha_registro,
        data.cantidad_kg,
        data.humedad,
        data.temperatura,
        data.tipo_proceso || 'Procesamiento',
        data.observaciones || '',
      ]
    )
    await execute(
      `INSERT INTO produccion_diaria (lote_id, fecha, kg_procesados, humedad, temperatura) VALUES (?,?,?,?,?)
       ON DUPLICATE KEY UPDATE kg_procesados=VALUES(kg_procesados)`,
      [data.lote_id, data.fecha_registro, data.cantidad_kg || 0, data.humedad, data.temperatura]
    ).catch(() => {})
    return (await query(`SELECT * FROM produccion WHERE id=?`, [r.insertId]))[0]
  }
}
