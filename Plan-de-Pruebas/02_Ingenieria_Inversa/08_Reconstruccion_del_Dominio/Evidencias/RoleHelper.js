import { AppError } from './AppError.js'
import { queryOne } from '../infrastructure/database/pool.js'

export const ROLES = {
  ADMIN: 'admin',
  CLIENTE: 'cliente',
}

/** Códigos legacy que se tratan como CLIENTE */
const LEGACY_CLIENTE = new Set(['supervisor', 'productor', 'usuario'])

export class RoleHelper {
  static normalizeRol(rol) {
    if (!rol) return null
    const r = String(rol).toLowerCase()
    if (r === ROLES.ADMIN) return ROLES.ADMIN
    if (r === ROLES.CLIENTE || LEGACY_CLIENTE.has(r)) return ROLES.CLIENTE
    return r
  }

  static isAdmin(user) {
    return RoleHelper.normalizeRol(user?.rol) === ROLES.ADMIN
  }

  static isCliente(user) {
    return RoleHelper.normalizeRol(user?.rol) === ROLES.CLIENTE
  }

  static requireAuth(user) {
    if (!user?.sub) throw new AppError('Token de autenticación requerido', 401)
    const rol = RoleHelper.normalizeRol(user.rol)
    if (!rol || ![ROLES.ADMIN, ROLES.CLIENTE].includes(rol)) {
      throw new AppError('Rol de usuario no válido', 403)
    }
  }

  static scopeUserId(user) {
    if (RoleHelper.isAdmin(user)) return null
    const id = Number(user?.sub)
    if (!id || Number.isNaN(id)) {
      throw new AppError('Identificador de usuario inválido en el token', 401)
    }
    return id
  }

  static async assertLoteAccess(loteId, user) {
    if (!loteId) throw new AppError('Lote inválido', 400)
    const row = await queryOne(`SELECT id, user_id FROM lotes WHERE id = ? AND deleted_at IS NULL`, [loteId])
    if (!row) throw new AppError('Lote no encontrado', 404)
    if (!RoleHelper.isAdmin(user) && Number(row.user_id) !== Number(user.sub)) {
      throw new AppError('No tiene permiso sobre este lote', 403)
    }
    return row
  }

  static async assertProductorAccess(productorId, user) {
    if (!productorId) throw new AppError('Productor inválido', 400)
    const row = await queryOne(`SELECT id, user_id FROM productores WHERE id = ? AND deleted_at IS NULL`, [productorId])
    if (!row) throw new AppError('Productor no encontrado', 404)
    if (!RoleHelper.isAdmin(user) && Number(row.user_id) !== Number(user.sub)) {
      throw new AppError('No tiene permiso sobre este productor', 403)
    }
    return row
  }
}
