import { query, execute } from '../database/pool.js'

export class TrazabilidadRepository {
  static async findAll(loteId, userId = null) {
    let sql = `SELECT t.*, l.codigo_lote
               FROM trazabilidad t
               JOIN lotes l ON t.lote_id = l.id AND l.deleted_at IS NULL`
    const params = []
    if (userId) {
      sql += ` WHERE l.user_id = ?`
      params.push(userId)
    }
    if (loteId) {
      sql += userId ? ` AND t.lote_id = ?` : ` WHERE t.lote_id = ?`
      params.push(loteId)
    }
    sql += ` ORDER BY t.lote_id, t.orden, t.id`
    return query(sql, params)
  }

  static async insertEtapa(data) {
    const r = await execute(
      `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, orden, usuario_registro_id) VALUES (?,?,?,?,?,?,?,?)`,
      [
        data.lote_id,
        data.etapa,
        data.descripcion,
        data.fecha,
        data.ubicacion,
        data.estado,
        data.orden ?? null,
        data.usuario_registro_id ?? null,
      ]
    )
    return r.insertId
  }

  static async insertManual(data) {
    const r = await execute(
      `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, usuario_registro_id) VALUES (?,?,?,?,?,?,?)`,
      [
        data.lote_id,
        data.etapa,
        data.descripcion,
        data.fecha,
        data.ubicacion,
        data.estado,
        data.usuario_registro_id ?? null,
      ]
    )
    return (await query(`SELECT * FROM trazabilidad WHERE id=?`, [r.insertId]))[0]
  }

  static async seedDefaultEtapas(loteId, fechaCosecha, ubicacion, userId = null) {
    const etapas = [
      { etapa: 'Cosecha', descripcion: 'Registro inicial del lote.', orden: 1, estado: 'En proceso', dias: 0 },
      { etapa: 'Secado', descripcion: 'Secado del café tras la cosecha.', orden: 2, estado: 'Pendiente', dias: 7 },
      { etapa: 'Control de calidad', descripcion: 'Inspección sensorial del lote.', orden: 3, estado: 'Pendiente', dias: 14 },
      { etapa: 'Almacenamiento', descripcion: 'Guardado en sala de almacenamiento.', orden: 4, estado: 'Pendiente', dias: 21 },
      { etapa: 'Comercialización', descripcion: 'Preparado para venta y entrega.', orden: 5, estado: 'Pendiente', dias: 28 },
    ]
    for (const e of etapas) {
      const esInicial = e.dias === 0
      await TrazabilidadRepository.insertEtapa({
        lote_id: loteId,
        etapa: e.etapa,
        descripcion: e.descripcion,
        fecha: esInicial ? fechaCosecha : null,
        ubicacion: ubicacion || '',
        estado: esInicial ? e.estado : 'Pendiente',
        orden: e.orden,
        usuario_registro_id: userId,
      })
    }
  }
}
