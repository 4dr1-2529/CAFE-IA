import { RoleHelper } from './RoleHelper.js'

/** Envuelve payload de reportes con metadatos de rol y alcance. */
export function wrapReportesResponse(user, data = {}) {
  const isAdmin = RoleHelper.isAdmin(user)
  const userId = isAdmin ? null : RoleHelper.scopeUserId(user)
  return {
    ok: true,
    rol: isAdmin ? 'ADMIN' : 'CLIENTE',
    scope: isAdmin ? 'global' : 'personal',
    userId,
    ...data,
    rol: isAdmin ? 'ADMIN' : 'CLIENTE',
    scope: isAdmin ? 'global' : 'personal',
    userId,
  }
}
