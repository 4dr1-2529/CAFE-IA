import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { env } from '../../config/env.js'
import { query, queryOne, execute } from '../../infrastructure/database/pool.js'
import { ActionLogService } from './ActionLogService.js'

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

    const nombre = `${user.nombres || ''} ${user.apellidos || ''}`.trim()
    const { user: userPayload, jwtPayload } = AuthService.buildUserPayload(user)
    const accessToken = jwt.sign(jwtPayload, env.jwt.secret, { expiresIn: env.jwt.expiresIn })
    const refreshToken = crypto.randomBytes(40).toString('hex')
    const refreshHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const expira = new Date()
    expira.setDate(expira.getDate() + 7)

    await execute(
      `INSERT INTO sesiones (usuario_id, refresh_token_hash, ip_address, user_agent, expira_en) VALUES (?, ?, ?, ?, ?)`,
      [user.id, refreshHash, meta.ip || null, meta.userAgent || null, expira]
    )
    await execute(`UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?`, [user.id])
    await ActionLogService.log({
      usuarioId: user.id,
      usuarioNombre: nombre,
      usuarioEmail: user.email,
      rol: jwtPayload.rol,
      accion: 'LOGIN',
      modulo: 'auth',
      descripcion: `${nombre || user.email} inició sesión`,
      entidad: 'usuarios',
      entidadId: user.id,
      metodo: meta.metodo || 'POST',
      ruta: meta.ruta || '/api/auth/login',
      ip: meta.ip || null,
      userAgent: meta.userAgent || null,
      resultado: 'exito',
      req: meta.req,
      detalle: { email: user.email },
    })

    return {
      user: userPayload,
      accessToken,
      refreshToken,
      expiresIn: env.jwt.expiresIn
    }
  }

  static async register(data) {
    const { email, password, nombres, apellidos, rol = 'cliente' } = data
    if (!email || !password || !nombres) {
      throw Object.assign(new Error('Email, contraseña y nombres son obligatorios'), { status: 400 })
    }
    if (String(password).length < 6) {
      throw Object.assign(new Error('La contraseña debe tener al menos 6 caracteres'), { status: 400 })
    }
    const rolCodigo = ['admin', 'cliente'].includes(rol) ? rol : 'cliente'
    const roleRow = await queryOne(`SELECT id FROM roles WHERE codigo = ?`, [rolCodigo])
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

  static async logout(refreshToken, meta = {}) {
    if (!refreshToken) return
    const hash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    await execute(`UPDATE sesiones SET revocado = 1 WHERE refresh_token_hash = ?`, [hash])
    await ActionLogService.fromMeta(meta, {
      accion: 'LOGOUT',
      modulo: 'auth',
      descripcion: `${meta.user?.nombre || meta.user?.email || 'Usuario'} cerró sesión`,
      entidad: 'sesiones',
      resultado: 'exito',
    })
  }

  static normalizeRol(codigo) {
    if (['admin', 'cliente'].includes(codigo)) return codigo
    if (['supervisor', 'productor', 'usuario'].includes(codigo)) return 'cliente'
    return codigo
  }

  static buildUserPayload(userRow) {
    const rol = AuthService.normalizeRol(userRow.rol_codigo)
    const nombre = `${userRow.nombres || ''} ${userRow.apellidos || ''}`.trim()
    return {
      user: {
        id: userRow.id ?? userRow.usuario_id,
        email: userRow.email,
        nombres: userRow.nombres,
        apellidos: userRow.apellidos,
        rol,
        rolNombre: rol === 'admin' ? 'Administrador' : 'Cliente',
        nombre: nombre || userRow.email,
        productor_id: userRow.productor_id ?? null,
      },
      jwtPayload: { sub: userRow.id ?? userRow.usuario_id, email: userRow.email, rol, nombre },
    }
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw Object.assign(new Error('Sesión expirada. Inicie sesión nuevamente.'), { status: 401 })
    }
    const hash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const row = await queryOne(
      `SELECT s.usuario_id, u.id, u.email, u.nombres, u.apellidos, u.activo, u.productor_id, r.codigo AS rol_codigo
       FROM sesiones s
       JOIN usuarios u ON u.id = s.usuario_id AND u.deleted_at IS NULL
       JOIN roles r ON u.rol_id = r.id
       WHERE s.refresh_token_hash = ? AND s.revocado = 0 AND s.expira_en > NOW()
       LIMIT 1`,
      [hash]
    )
    if (!row || !row.activo) {
      throw Object.assign(new Error('Sesión expirada. Inicie sesión nuevamente.'), { status: 401 })
    }
    const { user, jwtPayload } = AuthService.buildUserPayload(row)
    const accessToken = jwt.sign(jwtPayload, env.jwt.secret, { expiresIn: env.jwt.expiresIn })
    return { user, accessToken, expiresIn: env.jwt.expiresIn }
  }

  static verifyToken(token) {
    return jwt.verify(token, env.jwt.secret)
  }
}
