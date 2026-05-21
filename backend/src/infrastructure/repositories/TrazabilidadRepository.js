import { query, execute } from '../database/pool.js'

export class TrazabilidadRepository {
  static async findAll(loteId) {
    let sql = `SELECT t.*, l.codigo_lote FROM trazabilidad t JOIN lotes l ON t.lote_id=l.id`
    const params = []
    if (loteId) {
      sql += ` WHERE t.lote_id=?`
      params.push(loteId)
    }
    sql += ` ORDER BY t.lote_id, t.orden, t.id`
    return query(sql, params)
  }

  static async insertEtapa(data) {
    const r = await execute(
      `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, orden) VALUES (?,?,?,?,?,?,?)`,
      [data.lote_id, data.etapa, data.descripcion, data.fecha, data.ubicacion, data.estado, data.orden ?? null]
    )
    return r.insertId
  }

  static async insertManual(data) {
    const r = await execute(
      `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado) VALUES (?,?,?,?,?,?)`,
      [data.lote_id, data.etapa, data.descripcion, data.fecha, data.ubicacion, data.estado]
    )
    return (await query(`SELECT * FROM trazabilidad WHERE id=?`, [r.insertId]))[0]
  }

  static async seedDefaultEtapas(loteId, fechaCosecha, ubicacion) {
    const etapas = [
      { etapa: 'Producción', descripcion: 'Registro inicial del lote.', orden: 1, estado: 'Completado', dias: 0 },
      { etapa: 'Secado', descripcion: 'Secado del café tras la cosecha.', orden: 2, estado: 'Pendiente', dias: 7 },
      { etapa: 'Control de calidad', descripcion: 'Inspección sensorial del lote.', orden: 3, estado: 'Pendiente', dias: 14 },
      { etapa: 'Almacenamiento', descripcion: 'Guardado en sala de almacenamiento.', orden: 4, estado: 'Pendiente', dias: 21 },
      { etapa: 'Comercialización', descripcion: 'Preparado para venta y entrega.', orden: 5, estado: 'Pendiente', dias: 28 },
    ]
    for (const e of etapas) {
      const fecha = e.dias === 0 ? fechaCosecha : null
      await TrazabilidadRepository.insertEtapa({
        lote_id: loteId,
        etapa: e.etapa,
        descripcion: e.descripcion,
        fecha,
        ubicacion,
        estado: e.estado,
        orden: e.orden,
      })
    }
  }
}
