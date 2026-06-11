/** Valida nombres de base de datos MySQL antes de usarlos en DDL. */
export function assertValidDbName(name) {
  const value = String(name || '').trim()
  if (!/^[A-Za-z0-9_]+$/.test(value)) {
    throw new Error('MYSQLDATABASE contiene caracteres no permitidos')
  }
  return value
}
