/** Normaliza rol JWT/sesión → 'admin' | 'cliente' */
export function normalizeRol(rol) {
  if (!rol) return null
  const r = String(rol).toLowerCase()
  if (r === 'admin' || r === 'administrador') return 'admin'
  if (['cliente', 'usuario', 'productor', 'supervisor'].includes(r)) return 'cliente'
  return r
}

export function isAdminUser(userOrRol) {
  if (typeof userOrRol === 'object' && userOrRol !== null) {
    return normalizeRol(userOrRol.rol) === 'admin'
  }
  return normalizeRol(userOrRol) === 'admin'
}

export function isClienteUser(userOrRol) {
  return normalizeRol(typeof userOrRol === 'object' ? userOrRol?.rol : userOrRol) === 'cliente'
}
