import { query, queryOne, execute } from '../database/pool.js'

const SELECT_BASE = `
  SELECT u.id, u.codigo_usuario, u.email, u.nombres, u.apellidos, u.telefono, u.activo, u.productor_id,
         u.ultimo_login AS ultimo_acceso, u.created_at, u.updated_at,
         r.id AS rol_id, r.codigo AS rol, r.nombre AS rol_nombre
  FROM usuarios u
  JOIN roles r ON u.rol_id = r.id
  WHERE u.deleted_at IS NULL
`

export class UsuarioRepository {
  static async findById(id) {
    return queryOne(`${SELECT_BASE} AND u.id = ?`, [id])
  }

  static async findByEmail(email) {
    return queryOne(`${SELECT_BASE} AND u.email = ?`, [email.trim().toLowerCase()])
  }

  static async listAll({ limit = 200 } = {}) {
    return query(
      `${SELECT_BASE} ORDER BY u.created_at DESC LIMIT ?`,
      [Math.min(500, Math.max(1, limit))]
    )
  }

  static async listActive() {
    return query(
      `${SELECT_BASE} AND u.activo = 1 ORDER BY u.nombres, u.apellidos`
    )
  }

  static async getRolId(codigo) {
    return queryOne(`SELECT id FROM roles WHERE codigo = ?`, [codigo])
  }

  static async findByCodigo(codigo) {
    return queryOne(`${SELECT_BASE} AND u.codigo_usuario = ?`, [codigo])
  }

  static async create({ rolId, email, passwordHash, nombres, apellidos, telefono, activo = 1, codigoUsuario = null }) {
    const result = await execute(
      `INSERT INTO usuarios (rol_id, codigo_usuario, email, password_hash, nombres, apellidos, telefono, activo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        rolId,
        codigoUsuario || null,
        email.trim().toLowerCase(),
        passwordHash,
        nombres.trim(),
        (apellidos || '').trim(),
        telefono || null,
        activo ? 1 : 0,
      ]
    )
    return UsuarioRepository.findById(result.insertId)
  }

  static async update(id, data) {
    await execute(
      `UPDATE usuarios SET nombres = ?, apellidos = ?, email = ?, telefono = ?, updated_at = NOW()
       WHERE id = ? AND deleted_at IS NULL`,
      [data.nombres, data.apellidos || '', data.email.trim().toLowerCase(), data.telefono || null, id]
    )
    return UsuarioRepository.findById(id)
  }

  static async updateRol(id, rolId) {
    await execute(`UPDATE usuarios SET rol_id = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [rolId, id])
    return UsuarioRepository.findById(id)
  }

  static async setActivo(id, activo) {
    await execute(`UPDATE usuarios SET activo = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [activo ? 1 : 0, id])
    return UsuarioRepository.findById(id)
  }

  static async updatePassword(id, passwordHash) {
    await execute(`UPDATE usuarios SET password_hash = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [
      passwordHash,
      id,
    ])
    return UsuarioRepository.findById(id)
  }

  static toPublic(row) {
    if (!row) return null
    return {
      id: row.id,
      codigo_usuario: row.codigo_usuario,
      email: row.email,
      nombres: row.nombres,
      apellidos: row.apellidos,
      nombre: `${row.nombres} ${row.apellidos || ''}`.trim(),
      telefono: row.telefono,
      rol: row.rol,
      rol_nombre: row.rol_nombre,
      activo: Boolean(row.activo),
      estado: row.activo ? 'activo' : 'inactivo',
      ultimo_acceso: row.ultimo_acceso,
      created_at: row.created_at,
    }
  }
}
