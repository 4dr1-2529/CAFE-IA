import { query, queryOne, execute } from '../database/pool.js'
import { CodeGenerator } from '../../shared/CodeGenerator.js'

export class LoteRepository {
  static formatCodeForUser(userId, correlativo) {
    return `LOT-${userId}-${String(correlativo).padStart(3, '0')}`
  }

  /** @deprecated Solo compatibilidad con datos legacy */
  static formatCode(n) {
    return `LOTE-${String(n).padStart(4, '0')}`
  }

  static async countByUser(userId) {
    const row = await queryOne(
      `SELECT COUNT(*) AS c FROM lotes WHERE user_id = ? AND deleted_at IS NULL`,
      [userId]
    )
    return Number(row?.c) || 0
  }

  static async countByUserAndProductor(userId, productorId) {
    const row = await queryOne(
      `SELECT COUNT(*) AS c FROM lotes WHERE user_id = ? AND productor_id = ? AND deleted_at IS NULL`,
      [userId, productorId]
    )
    return Number(row?.c) || 0
  }

  static async nextCodeForUser(userId, productorId = null) {
    const user = await queryOne(`SELECT codigo_usuario FROM usuarios WHERE id = ?`, [userId])
    const codigoUsuario = user?.codigo_usuario || `USR-${userId}`

    if (productorId) {
      const prod = await queryOne(
        `SELECT codigo_productor FROM productores WHERE id = ? AND deleted_at IS NULL`,
        [productorId]
      )
      const prodShort = CodeGenerator.shortFromProductorCode(prod?.codigo_productor)
      let correlativo = (await LoteRepository.countByUserAndProductor(userId, productorId)) + 1
      for (let i = 0; i < 10; i++) {
        const code = CodeGenerator.loteCode(codigoUsuario, prodShort, correlativo + i)
        const dup = await queryOne(`SELECT id FROM lotes WHERE codigo_lote = ? AND deleted_at IS NULL`, [code])
        if (!dup) return code
      }
      return CodeGenerator.loteCode(codigoUsuario, prodShort, correlativo)
    }

    let correlativo = (await LoteRepository.countByUser(userId)) + 1
    for (let i = 0; i < 10; i++) {
      const code = LoteRepository.formatCodeForUser(userId, correlativo + i)
      const dup = await queryOne(`SELECT id FROM lotes WHERE codigo_lote = ? AND deleted_at IS NULL`, [code])
      if (!dup) return code
    }
    return LoteRepository.formatCodeForUser(userId, correlativo)
  }

  static async findAllAdmin() {
    return query(
      `SELECT l.id, l.codigo_lote, l.productor_id, l.user_id,
              CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')) AS nombre_usuario,
              u.email AS email_usuario,
              l.fecha_cosecha, l.cantidad_kg, l.estado, l.variedad_cafe AS variedad,
              l.created_at,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              p.parcela
       FROM lotes l
       LEFT JOIN productores p ON l.productor_id = p.id
       LEFT JOIN usuarios u ON l.user_id = u.id
       WHERE l.deleted_at IS NULL
       ORDER BY l.id DESC LIMIT 1000`
    )
  }

  static async findAllByUser(userId) {
    return query(
      `SELECT l.id, l.codigo_lote, l.productor_id,
              l.fecha_cosecha, l.cantidad_kg, l.estado, l.variedad_cafe AS variedad,
              l.created_at,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              p.parcela
       FROM lotes l
       LEFT JOIN productores p ON l.productor_id = p.id
       WHERE l.deleted_at IS NULL AND l.user_id = ?
       ORDER BY l.id DESC LIMIT 1000`,
      [userId]
    )
  }

  static async findById(id, { includeRegistrant = false } = {}) {
    const registrantCols = includeRegistrant
      ? `, l.user_id, CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre_usuario, u.email AS email_usuario`
      : ''
    const joinUser = includeRegistrant ? ' LEFT JOIN usuarios u ON l.user_id = u.id' : ''
    const row = await queryOne(
      `SELECT l.*, CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS productor, p.parcela, p.ubicacion AS ubicacion_productor
              ${registrantCols}
       FROM lotes l
       LEFT JOIN productores p ON l.productor_id = p.id
       ${joinUser}
       WHERE l.id = ? AND l.deleted_at IS NULL`,
      [id]
    )
    if (!row) return null
    const etapas = await query(`SELECT * FROM trazabilidad WHERE lote_id = ? ORDER BY orden, id`, [id])
    return { ...row, trazabilidad: etapas }
  }

  static async create(data) {
    const result = await execute(
      `INSERT INTO lotes (codigo_lote, productor_id, user_id, variedad_id, proceso_secado_id, estado_lote_id,
        variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.codigo_lote,
        data.productor_id,
        data.user_id,
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
    await execute(`UPDATE lotes SET qr_codigo = ? WHERE id = ?`, [qr, loteId]).catch(() => {})
  }

  static async seedInventario(loteId, cantidadKg) {
    await execute(
      `INSERT INTO inventario (lote_id, cantidad_disponible_kg, fecha_actualizacion) VALUES (?,?,CURDATE())`,
      [loteId, cantidadKg]
    ).catch(() => {})
  }

  static async getProductorUbicacion(productorId) {
    return queryOne(`SELECT id, parcela, ubicacion, user_id FROM productores WHERE id = ?`, [productorId])
  }

  static async findRawById(id) {
    return queryOne(`SELECT * FROM lotes WHERE id = ?`, [id])
  }
}
