import { authenticate, authorize } from './auth.js'
import { ROLES } from '../../../shared/RoleHelper.js'

/** Cualquier usuario autenticado (ADMIN o CLIENTE) */
export const readGuard = [authenticate]

/** Operaciones PMV1: ADMIN y CLIENTE */
export const writeGuard = [authenticate, authorize(ROLES.ADMIN, ROLES.CLIENTE)]

/** Solo ADMIN */
export const adminGuard = [authenticate, authorize(ROLES.ADMIN)]

/** Alias compatibilidad */
export const loteWriteGuard = writeGuard

/** Nombres alternativos solicitados en documentación */
export { authenticate as authenticateToken } from './auth.js'
export const requireAdmin = adminGuard
export const requireClienteOrAdmin = writeGuard
