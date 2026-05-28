/** Extrae payload de reporte tras unwrapApiPayload (incluye rol/scope). */
export function normalizeReportePayload(raw) {
  if (!raw || typeof raw !== 'object') return { scope: 'personal', rol: 'CLIENTE', data: {} }
  if (raw.scope === 'global' || raw.scope === 'personal') {
    const scope = raw.scope
    const rol = raw.rol === 'ADMIN' ? 'ADMIN' : 'CLIENTE'
    const { scope: _s, rol: _r, userId, ok: _ok, ...data } = raw
    return { scope, rol, userId, data }
  }
  return { scope: 'personal', rol: 'CLIENTE', data: raw }
}
