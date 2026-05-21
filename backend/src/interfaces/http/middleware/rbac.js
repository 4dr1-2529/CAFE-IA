import { authenticate, authorize } from './auth.js'

/** Lectura: cualquier usuario autenticado */
export const readGuard = [authenticate]

/** Escritura: admin y supervisor */
export const writeGuard = [authenticate, authorize('admin', 'supervisor')]
