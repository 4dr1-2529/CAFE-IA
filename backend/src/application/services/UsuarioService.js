import bcrypt from 'bcryptjs'
import { queryOne } from '../../infrastructure/database/pool.js'
import { UsuarioRepository } from '../../infrastructure/repositories/UsuarioRepository.js'
import { AppError } from '../../shared/AppError.js'
import { RoleHelper, ROLES } from '../../shared/RoleHelper.js'
import {
  validateCreateUsuario,
  validateUpdateUsuario,
  validateResetPassword,
} from '../validators/usuario.validator.js'
import { ActionLogService } from './ActionLogService.js'

export class UsuarioService {
  static assertAdmin(user) {
    RoleHelper.requireAuth(user)
    if (!RoleHelper.isAdmin(user)) throw new AppError('Solo administradores pueden gestionar usuarios', 403)
  }

  static async countAdmins() {
    const row = await queryOne(
      `SELECT COUNT(*) AS c FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE r.codigo = 'admin' AND u.activo = 1 AND u.deleted_at IS NULL`
    )
    return Number(row?.c) || 0
  }

  static async assertNotLastAdmin(userId, becomingInactiveOrNonAdmin = false) {
    if (!becomingInactiveOrNonAdmin) return
    const target = await UsuarioRepository.findById(userId)
    if (target?.rol !== ROLES.ADMIN) return
    const admins = await UsuarioService.countAdmins()
    if (admins <= 1) throw new AppError('No se puede desactivar o cambiar el rol del último administrador', 400)
  }

  static async list(meta) {
    UsuarioService.assertAdmin(meta.user)
    const rows = await UsuarioRepository.listAll()
    return rows.map((r) => UsuarioRepository.toPublic(r))
  }

  static async listActive(meta) {
    UsuarioService.assertAdmin(meta.user)
    const rows = await UsuarioRepository.listActive()
    return rows.map((r) => UsuarioRepository.toPublic(r))
  }

  static async getById(id, meta) {
    UsuarioService.assertAdmin(meta.user)
    const row = await UsuarioRepository.findById(id)
    if (!row) throw new AppError('Usuario no encontrado', 404)
    return UsuarioRepository.toPublic(row)
  }

  static async create(body, meta) {
    UsuarioService.assertAdmin(meta.user)
    const errors = validateCreateUsuario(body)
    if (errors.length) throw new AppError(errors.join('; '), 400)

    const rolCodigo = body.rol === ROLES.ADMIN ? ROLES.ADMIN : ROLES.CLIENTE
    const rolRow = await UsuarioRepository.getRolId(rolCodigo)
    if (!rolRow) throw new AppError('Rol no encontrado', 400)

    const email = body.email.trim().toLowerCase()
    const exists = await UsuarioRepository.findByEmail(email)
    if (exists) throw new AppError('El correo ya está registrado', 409)

    const hash = await bcrypt.hash(body.password, 10)
    const row = await UsuarioRepository.create({
      rolId: rolRow.id,
      email,
      passwordHash: hash,
      nombres: body.nombres,
      apellidos: body.apellidos,
      telefono: body.telefono,
      activo: body.activo !== false,
    })

    await ActionLogService.fromMeta(meta, {
      accion: 'CREAR_USUARIO',
      modulo: 'usuarios',
      descripcion: `Admin creó usuario ${email} con rol ${rolCodigo}`,
      entidad: 'usuarios',
      entidadId: row.id,
    })

    return UsuarioRepository.toPublic(row)
  }

  static async update(id, body, meta) {
    UsuarioService.assertAdmin(meta.user)
    if (!id) throw new AppError('ID inválido', 400)
    const errors = validateUpdateUsuario(body)
    if (errors.length) throw new AppError(errors.join('; '), 400)

    const current = await UsuarioRepository.findById(id)
    if (!current) throw new AppError('Usuario no encontrado', 404)

    const email = (body.email || current.email).trim().toLowerCase()
    const dup = await UsuarioRepository.findByEmail(email)
    if (dup && dup.id !== Number(id)) throw new AppError('El correo ya está en uso', 409)

    const row = await UsuarioRepository.update(id, {
      nombres: body.nombres ?? current.nombres,
      apellidos: body.apellidos ?? current.apellidos,
      email,
      telefono: body.telefono ?? current.telefono,
    })

    await ActionLogService.fromMeta(meta, {
      accion: 'EDITAR_USUARIO',
      modulo: 'usuarios',
      descripcion: `Admin editó usuario ${email}`,
      entidad: 'usuarios',
      entidadId: id,
    })

    return UsuarioRepository.toPublic(row)
  }

  static async setEstado(id, body, meta) {
    UsuarioService.assertAdmin(meta.user)
    if (!id) throw new AppError('ID inválido', 400)
    if (Number(id) === Number(meta.user.sub)) throw new AppError('No puede desactivar su propia cuenta', 400)

    if (body.activo === undefined && body.estado === undefined) {
      throw new AppError('Debe indicar activo o estado', 400)
    }
    let activo = null
    if (body.activo === true || body.estado === 'activo' || body.estado === 'ACTIVO') activo = true
    else if (body.activo === false || body.estado === 'inactivo' || body.estado === 'INACTIVO') activo = false
    if (activo === null) throw new AppError('Valor de estado no válido', 400)
    await UsuarioService.assertNotLastAdmin(id, !activo)

    const row = await UsuarioRepository.setActivo(id, activo)
    if (!row) throw new AppError('Usuario no encontrado', 404)

    await ActionLogService.fromMeta(meta, {
      accion: activo ? 'ACTIVAR_USUARIO' : 'DESACTIVAR_USUARIO',
      modulo: 'usuarios',
      descripcion: `Admin ${activo ? 'activó' : 'desactivó'} usuario ${row.email}`,
      entidad: 'usuarios',
      entidadId: id,
    })

    return UsuarioRepository.toPublic(row)
  }

  static async changeRol(id, body, meta) {
    UsuarioService.assertAdmin(meta.user)
    if (!id) throw new AppError('ID inválido', 400)
    if (!body.rol || ![ROLES.ADMIN, ROLES.CLIENTE].includes(body.rol)) {
      throw new AppError('rol debe ser admin o cliente', 400)
    }
    const rolCodigo = body.rol === ROLES.ADMIN ? ROLES.ADMIN : ROLES.CLIENTE
    if (Number(id) === Number(meta.user.sub) && rolCodigo !== ROLES.ADMIN) {
      throw new AppError('No puede quitarse el rol de administrador a sí mismo', 400)
    }
    await UsuarioService.assertNotLastAdmin(id, rolCodigo !== ROLES.ADMIN)

    const rolRow = await UsuarioRepository.getRolId(rolCodigo)
    if (!rolRow) throw new AppError('Rol no encontrado', 400)

    const row = await UsuarioRepository.updateRol(id, rolRow.id)
    if (!row) throw new AppError('Usuario no encontrado', 404)

    await ActionLogService.fromMeta(meta, {
      accion: 'CAMBIAR_ROL_USUARIO',
      modulo: 'usuarios',
      descripcion: `Admin cambió rol de ${row.email} a ${rolCodigo}`,
      entidad: 'usuarios',
      entidadId: id,
    })

    return UsuarioRepository.toPublic(row)
  }

  static async resetPassword(id, body, meta) {
    UsuarioService.assertAdmin(meta.user)
    if (!id) throw new AppError('ID inválido', 400)
    const errors = validateResetPassword(body)
    if (errors.length) throw new AppError(errors.join('; '), 400)

    const current = await UsuarioRepository.findById(id)
    if (!current) throw new AppError('Usuario no encontrado', 404)

    const hash = await bcrypt.hash(body.password, 10)
    const row = await UsuarioRepository.updatePassword(id, hash)

    await ActionLogService.fromMeta(meta, {
      accion: 'RESET_PASSWORD_USUARIO',
      modulo: 'usuarios',
      descripcion: `Admin restableció contraseña de ${row.email}`,
      entidad: 'usuarios',
      entidadId: id,
    })

    return { message: 'Contraseña actualizada', usuario: UsuarioRepository.toPublic(row) }
  }
}
