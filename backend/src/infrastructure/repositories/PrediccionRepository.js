import { query, queryOne } from '../database/pool.js'

export class PrediccionRepository {
  static async findAllUsuario() {
    const rows = await query(
      `SELECT p.*, l.codigo_lote, CONCAT(pr.nombres,' ',COALESCE(pr.apellidos,'')) AS productor
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id=l.id
       LEFT JOIN productores pr ON l.productor_id=pr.id
       WHERE p.origen='usuario' ORDER BY p.id DESC`
    )
    rows.forEach((r) => {
      if (typeof r.factores_influyentes === 'string') {
        try {
          r.factores_influyentes = JSON.parse(r.factores_influyentes)
        } catch {
          /* ignore */
        }
      }
    })
    return rows
  }

  static async existsForLote(loteId) {
    return queryOne(`SELECT id FROM predicciones_ia WHERE lote_id=? AND origen='usuario'`, [loteId])
  }
}
