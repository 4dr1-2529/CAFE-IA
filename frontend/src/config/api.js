/**
 * URL base del backend (sin /api).
 * Producción Vercel: definir VITE_API_URL en el panel o en frontend/vercel.json.
 * Desarrollo: fallback localhost:3029 o proxy Vite /api.
 */
const fromEnv =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  ''

export const API_URL = (fromEnv || (import.meta.env.DEV ? 'http://localhost:3029' : '')).replace(
  /\/$/,
  ''
)

if (!import.meta.env.DEV && !API_URL) {
  console.error(
    '[API] VITE_API_URL no está definida. Configure en Vercel: https://cafe-sostenible-api-production-03ad.up.railway.app'
  )
}

/** Prefijo para fetch JSON (client.js). */
export function getApiRequestBases() {
  if (import.meta.env.DEV) return ['/api']
  if (!API_URL) return []
  return [`${API_URL}/api`]
}

/** Origen absoluto para descargas (PDF/Excel). */
export function getApiOrigin() {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return API_URL
}
