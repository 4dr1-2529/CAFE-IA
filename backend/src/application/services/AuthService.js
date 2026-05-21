import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { env } from '../../config/env.js'
import { query, queryOne, execute } from '../../infrastructure/database/pool.js'

export class AuthService {
  static async login(email, password, meta = {}) {
    const user = await queryOne(
      `SELECT u.id, u.email, u.password_hash, u.nombres, u.apellidos, u.activo, u.rol_id, u.productor_id,
              r.codigo AS rol_codigo, r.nombre AS rol_nombre
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.email = ? AND u.deleted_at IS NULL LIMIT 1`,
      [email.trim().toLowerCase()]
    )
    if (!user || !user.activo) {
      throw Object.assign(new Error('Credenciales inválidas'), { status: 401 })
    }
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      throw Object.assign(new Error('Credenciales inválidas'), { status: 401 })
    }

    const payload = { sub: user.id, email: user.email, rol: user.rol_codigo }
    const accessToken = jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn })
    const refreshToken = crypto.randomBytes(40).toString('hex')
    const refreshHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const expira = new Date()
    expira.setDate(expira.getDate() + 7)

    await execute(
      `INSERT INTO sesiones (usuario_id, refresh_token_hash, ip_address, user_agent, expira_en) VALUES (?, ?, ?, ?, ?)`,
      [user.id, refreshHash, meta.ip || null, meta.userAgent || null, expira]
    )
    await execute(`UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?`, [user.id])
    await execute(
      `INSERT INTO auditoria_logs (usuario_id, accion, entidad, detalle) VALUES (?, 'LOGIN', 'usuarios', ?)`,
      [user.id, JSON.stringify({ email: user.email })]
    )

    return {
      user: {
        id: user.id,
        email: user.email,
        nombres: user.nombres,
        apellidos: user.apellidos,
        rol: user.rol_codigo,
        rolNombre: user.rol_nombre,
        productor_id: user.productor_id
      },
      accessToken,
      refreshToken,
      expiresIn: env.jwt.expiresIn
    }
  }

  static async register(data) {
    const { email, password, nombres, apellidos, rol = 'productor' } = data
    if (!email || !password || !nombres) {
      throw Object.assign(new Error('Email, contraseña y nombres son obligatorios'), { status: 400 })
    }
    const roleRow = await queryOne(`SELECT id FROM roles WHERE codigo = ?`, [rol])
    if (!roleRow) throw Object.assign(new Error('Rol inválido'), { status: 400 })

    const exists = await queryOne(`SELECT id FROM usuarios WHERE email = ?`, [email.trim().toLowerCase()])
    if (exists) throw Object.assign(new Error('El correo ya está registrado'), { status: 409 })

    const hash = await bcrypt.hash(password, 10)
    const result = await execute(
      `INSERT INTO usuarios (rol_id, email, password_hash, nombres, apellidos) VALUES (?, ?, ?, ?, ?)`,
      [roleRow.id, email.trim().toLowerCase(), hash, nombres, apellidos || '']
    )
    return { id: result.insertId, email }
  }

  static async logout(refreshToken) {
    if (!refreshToken) return
    const hash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    await execute(`UPDATE sesiones SET revocado = 1 WHERE refresh_token_hash = ?`, [hash])
  }

  static verifyToken(token) {
    return jwt.verify(token, env.jwt.secret)
  }
}
