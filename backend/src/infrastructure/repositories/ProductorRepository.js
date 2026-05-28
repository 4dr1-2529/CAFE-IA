import { query, queryOne, execute } from '../database/pool.js'
import { CodeGenerator } from '../../shared/CodeGenerator.js'

export class ProductorRepository {
  static async findAll() {
    return query(
      `SELECT id, codigo_productor AS codigo, nombres, COALESCE(apellidos,'') AS apellidos,
              dni, telefono, correo, parcela, ubicacion, altitud, estado, user_id
       FROM productores WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 1000`
    )
  }

  static async findAllForUser({ userId, isAdmin }) {
    if (isAdmin) return ProductorRepository.findAll()
    return ProductorRepository.findByUserId(userId)
  }

  static async findByUserId(userId) {
    return query(
      `SELECT id, codigo_productor AS codigo, nombres, COALESCE(apellidos,'') AS apellidos,
              dni, telefono, correo, parcela, ubicacion, altitud, estado, user_id
       FROM productores WHERE deleted_at IS NULL AND user_id = ?
       ORDER BY id DESC LIMIT 1000`,
      [userId]
    )
  }

  static async findById(id) {
    return queryOne(
      `SELECT id, codigo_productor AS codigo, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado, user_id
       FROM productores WHERE id=? AND deleted_at IS NULL`,
      [id]
    )
  }

  static async countLotesByProductor(id) {
    const row = await queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE productor_id=? AND deleted_at IS NULL`, [id])
    return Number(row?.c) || 0
  }

  static async nextCodigo() {
    const row = await queryOne(
      `SELECT MAX(CAST(SUBSTRING(codigo_productor, 2) AS UNSIGNED)) AS m
       FROM productores WHERE codigo_productor LIKE 'P%' AND deleted_at IS NULL`
    )
    return `P${String((Number(row?.m) || 0) + 1).padStart(3, '0')}`
  }

  static async nextCodigoForUser(userId) {
    const user = await queryOne(`SELECT codigo_usuario FROM usuarios WHERE id = ? AND deleted_at IS NULL`, [userId])
    const codigoUsuario = user?.codigo_usuario || `USR-${userId}`
    const row = await queryOne(
      `SELECT COUNT(*) AS c FROM productores WHERE user_id = ? AND deleted_at IS NULL`,
      [userId]
    )
    return CodeGenerator.productorCode(codigoUsuario, Number(row?.c || 0) + 1)
  }

  static async create(data) {
    const codigo = data.codigo_productor || (data.user_id ? await ProductorRepository.nextCodigoForUser(data.user_id) : await ProductorRepository.nextCodigo())
    const result = await execute(
      `INSERT INTO productores (codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        codigo,
        data.nombres,
        data.apellidos,
        data.dni,
        data.telefono || '',
        data.correo,
        data.parcela || '',
        data.ubicacion || '',
        data.altitud || 0,
        data.estado || 'Activo',
        data.user_id ?? null,
      ]
    )
    return ProductorRepository.findById(result.insertId)
  }

  static async update(id, data, userId = undefined) {
    if (userId != null) {
      await execute(
        `UPDATE productores SET nombres=?, apellidos=?, dni=?, telefono=?, correo=?, parcela=?, ubicacion=?, altitud=?, estado=?, user_id=? WHERE id=? AND deleted_at IS NULL`,
        [
          data.nombres,
          data.apellidos,
          data.dni,
          data.telefono || '',
          data.correo,
          data.parcela || '',
          data.ubicacion || '',
          data.altitud || 0,
          data.estado || 'Activo',
          userId,
          id,
        ]
      )
      await execute(
        `UPDATE lotes SET user_id = ? WHERE productor_id = ? AND deleted_at IS NULL`,
        [userId, id]
      )
    } else {
      await execute(
        `UPDATE productores SET nombres=?, apellidos=?, dni=?, telefono=?, correo=?, parcela=?, ubicacion=?, altitud=?, estado=? WHERE id=? AND deleted_at IS NULL`,
        [
          data.nombres,
          data.apellidos,
          data.dni,
          data.telefono || '',
          data.correo,
          data.parcela || '',
          data.ubicacion || '',
          data.altitud || 0,
          data.estado || 'Activo',
          id,
        ]
      )
    }
    return ProductorRepository.findById(id)
  }

  static async softDelete(id) {
    const result = await execute(`UPDATE productores SET deleted_at=NOW() WHERE id=?`, [id])
    return result.affectedRows
  }
}
