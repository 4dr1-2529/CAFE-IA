import { query, queryOne, execute } from '../database/pool.js'

export class CalidadRepository {
  static async findAll(userId = null) {
    const scope = userId ? ' AND l.user_id = ? ' : ''
    const params = userId ? [userId] : []
    return query(
      `SELECT c.*, l.codigo_lote, CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS productor
       FROM control_calidad c
       JOIN lotes l ON c.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON l.productor_id = p.id
       WHERE 1=1 ${scope}
       ORDER BY c.id DESC`,
      params
    )
  }

  static async existsForLote(loteId) {
    return queryOne(`SELECT id FROM control_calidad WHERE lote_id=?`, [loteId])
  }

  static async create(data) {
    const r = await execute(
      `INSERT INTO control_calidad (lote_id, user_id, evaluador_id, aroma, sabor, cuerpo, acidez, dulzor, balance, puntaje_taza, calidad_final, estado, observaciones, fecha_evaluacion)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.lote_id,
        data.user_id ?? null,
        data.evaluador_id ?? data.user_id ?? null,
        data.aroma,
        data.sabor,
        data.cuerpo,
        data.acidez,
        data.dulzor,
        data.balance,
        data.puntaje_taza,
        data.calidad_final,
        data.estado,
        data.observaciones,
        data.fecha_evaluacion,
      ]
    )
    return (await query(`SELECT * FROM control_calidad WHERE id=?`, [r.insertId]))[0]
  }

  static async markLoteCalidad(loteId) {
    await execute(`UPDATE lotes SET estado='Calidad' WHERE id=?`, [loteId]).catch(() => {})
  }
}
