/**
 * URL base del backend (sin /api).
 * Producción: Railway (nunca localhost).
 * Desarrollo: proxy Vite /api o localhost:3029.
 */
export const RAILWAY_API_URL =
  'https://cafe-sostenible-api-production-03ad.up.railway.app'

/** Frontend producción (Vercel) */
export const VERCEL_FRONTEND_URL = 'https://cafe-ia-inky.vercel.app'

const fromEnv =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  ''

/** En build de producción sin env, usar Railway (evita localhost en Vercel). */
export const API_URL = (
  fromEnv ||
  (import.meta.env.DEV ? 'http://localhost:3029' : RAILWAY_API_URL)
).replace(/\/$/, '')

if (import.meta.env.PROD) {
  console.info('[API] Producción — backend:', API_URL)
}

/** Prefijo para fetch JSON (client.js). */
export function getApiRequestBases() {
  if (import.meta.env.DEV) return ['/api']
  return [`${API_URL}/api`]
}

/** Origen absoluto para descargas (PDF/Excel). */
export function getApiOrigin() {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return API_URL
}
