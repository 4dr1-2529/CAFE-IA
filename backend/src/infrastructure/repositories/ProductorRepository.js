import { query, queryOne, execute } from '../database/pool.js'

export class ProductorRepository {
  static async findAll() {
    return query(
      `SELECT id, codigo_productor AS codigo, nombres, COALESCE(apellidos,'') AS apellidos,
              dni, telefono, correo, parcela, ubicacion, altitud, estado
       FROM productores WHERE deleted_at IS NULL ORDER BY id ASC`
    )
  }

  static async findById(id) {
    return queryOne(
      `SELECT id, codigo_productor AS codigo, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado
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

  static async create(data) {
    const codigo = await ProductorRepository.nextCodigo()
    const result = await execute(
      `INSERT INTO productores (codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [codigo, data.nombres, data.apellidos, data.dni, data.telefono || '', data.correo, data.parcela || '', data.ubicacion || '', data.altitud || 0, data.estado || 'Activo']
    )
    return ProductorRepository.findById(result.insertId)
  }

  static async update(id, data) {
    await execute(
      `UPDATE productores SET nombres=?, apellidos=?, dni=?, telefono=?, correo=?, parcela=?, ubicacion=?, altitud=?, estado=? WHERE id=? AND deleted_at IS NULL`,
      [data.nombres, data.apellidos, data.dni, data.telefono || '', data.correo, data.parcela || '', data.ubicacion || '', data.altitud || 0, data.estado || 'Activo', id]
    )
    return ProductorRepository.findById(id)
  }

  static async softDelete(id) {
    const result = await execute(`UPDATE productores SET deleted_at=NOW() WHERE id=?`, [id])
    return result.affectedRows
  }
}
