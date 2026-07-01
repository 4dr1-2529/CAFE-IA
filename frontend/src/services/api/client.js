import { API_URL, getApiRequestBases, getApiOrigin } from '../../config/api.js'
import { STORAGE_KEYS } from '../../constants/storage.js'

const DEFAULT_BASE_URLS = getApiRequestBases()
const TIMEOUT = 30000
const TIMEOUT_RETRY = 45000

const TOKEN_KEY = STORAGE_KEYS.TOKEN
const SESSION_KEY = STORAGE_KEYS.SESSION
const REFRESH_KEY = STORAGE_KEYS.REFRESH

class ApiError extends Error {
  constructor(message, status = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

let unauthorizedHandler = null
let refreshInFlight = null

export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = typeof fn === 'function' ? fn : null
}

async function refreshAccessToken() {
  if (refreshInFlight) return refreshInFlight
  const refreshToken = localStorage.getItem(REFRESH_KEY)
  if (!refreshToken) {
    throw new ApiError('Sesión expirada. Inicie sesión nuevamente.', 401)
  }
  refreshInFlight = (async () => {
    const bases = DEFAULT_BASE_URLS.length ? DEFAULT_BASE_URLS : []
    let lastError = null
    for (const baseUrl of bases) {
      try {
        const response = await fetch(`${baseUrl}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        })
        const data = parseJsonSafe(await response.text())
        if (!response.ok) {
          throw new ApiError(data?.message || 'No se pudo renovar la sesión', response.status)
        }
        const payload = unwrapApiPayload(data)
        if (payload?.accessToken) setToken(payload.accessToken)
        if (payload?.user) localStorage.setItem(SESSION_KEY, JSON.stringify(payload.user))
        return payload.accessToken
      } catch (err) {
        lastError = err
      }
    }
    throw lastError || new ApiError('No se pudo renovar la sesión', 401)
  })()
  try {
    return await refreshInFlight
  } finally {
    refreshInFlight = null
  }
}

function clearSession() {
  clearAuth()
  unauthorizedHandler?.()
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

function parseJsonSafe(text) {
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

/** Soporta { ok, data } y payloads legacy (arrays/objetos directos). */
export function unwrapApiPayload(data) {
  if (!data || typeof data !== 'object') return data
  if (data.ok === false) {
    throw new ApiError(data.message || 'Error en la solicitud', data.status || null)
  }
  if (data.ok === true) {
    if (Object.prototype.hasOwnProperty.call(data, 'data')) return data.data
    const { ok: _ok, ...rest } = data
    return rest
  }
  return data
}

const request = async (path, options = {}) => {
  if (!DEFAULT_BASE_URLS.length) {
    throw new ApiError(
      'API no configurada. Defina VITE_API_URL en Vercel apuntando al backend Railway.',
      'CONFIG'
    )
  }

  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const timeoutMs = options._slowRetry ? TIMEOUT_RETRY : TIMEOUT
  const errorMessages = []
  for (const baseUrl of DEFAULT_BASE_URLS) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers,
        signal: controller.signal,
        ...options,
      })
      clearTimeout(timeoutId)
      const data = parseJsonSafe(await response.text())

      if (
        response.status === 401 &&
        path !== '/auth/login' &&
        path !== '/auth/refresh' &&
        !options._authRetry
      ) {
        try {
          await refreshAccessToken()
          return request(path, { ...options, _authRetry: true })
        } catch {
          clearSession()
        }
      }

      if (response.status === 401 && path !== '/auth/login') {
        clearSession()
      }

      if (!response.ok) {
        const msg = data?.message || data?.error || `Error del servidor: ${response.status}`
        throw new ApiError(msg, response.status)
      }

      return unwrapApiPayload(data)
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof ApiError) throw error
      const isTimeout = error.name === 'AbortError'
      errorMessages.push(
        isTimeout
          ? `Timeout (${Math.round(timeoutMs / 1000)}s) ${baseUrl}`
          : `Sin conexión ${baseUrl}`
      )
    }
  }
  if (!options._slowRetry && errorMessages.some((m) => m.startsWith('Timeout'))) {
    return request(path, { ...options, _slowRetry: true })
  }
  throw new ApiError(
    'No se pudo conectar al backend. Railway puede estar iniciando — espere unos segundos e intente de nuevo. ' +
      errorMessages.join(' / '),
    'NETWORK'
  )
}

const safeGetArray = async (path, { throwOnError = false } = {}) => {
  try {
    const data = await request(path)
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.rows)) return data.rows
    return []
  } catch (err) {
    console.error(`API GET ${path}:`, err)
    if (throwOnError) throw err
    return []
  }
}

const safeAction = async (path, options) => request(path, options)

/** Despierta Railway en frío antes del login (no bloquea la UI). */
export const warmBackend = () => {
  const bases = getApiRequestBases()
  const timeoutMs = TIMEOUT_RETRY
  bases.forEach((baseUrl) => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    fetch(`${baseUrl}/health`, { signal: controller.signal })
      .catch(() => {})
      .finally(() => clearTimeout(id))
  })
}

// Auth
export const loginApi = async (email, password) => {
  const data = await request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  if (data.accessToken) setToken(data.accessToken)
  if (data.refreshToken) localStorage.setItem(REFRESH_KEY, data.refreshToken)
  if (data.user) localStorage.setItem(SESSION_KEY, JSON.stringify(data.user))
  return data
}

export const getMeApi = async () => {
  const data = await request('/auth/me')
  return data?.user || data
}

export const logoutApi = async () => {
  const refreshToken = localStorage.getItem(REFRESH_KEY)
  try {
    await request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken: refreshToken || undefined }) })
  } finally {
    clearAuth()
  }
}

export const registerApi = (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) })
export const getUsuariosActivos = () => safeGetArray('/usuarios/activos')
export const getUsuarios = () => safeGetArray('/usuarios', { throwOnError: true })
export const getUsuarioById = (id) => safeAction(`/usuarios/${id}`)
export const createUsuario = (data) => safeAction('/usuarios', { method: 'POST', body: JSON.stringify(data) })
export const updateUsuario = (id, data) => safeAction(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const setUsuarioEstado = (id, activo) =>
  safeAction(`/usuarios/${id}/estado`, { method: 'PATCH', body: JSON.stringify({ activo }) })
export const setUsuarioRol = (id, rol) =>
  safeAction(`/usuarios/${id}/rol`, { method: 'PATCH', body: JSON.stringify({ rol }) })
export const resetUsuarioPassword = (id, password) =>
  safeAction(`/usuarios/${id}/reset-password`, { method: 'POST', body: JSON.stringify({ password }) })

// Dashboard
export const getDashboard = async () => {
  try {
    return await request('/dashboard')
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      return request('/dashboard/metrics')
    }
    throw e
  }
}
export const getDashboardMetrics = () => request('/dashboard/metrics')

// CRUD
export const getProductores = (userId) => {
  const qs =
    userId != null && userId !== ''
      ? `?user_id=${encodeURIComponent(String(userId))}`
      : ''
  return safeGetArray(`/productores${qs}`, { throwOnError: true })
}
export const createProductor = (data) => safeAction('/productores', { method: 'POST', body: JSON.stringify(data) })
export const updateProductor = (id, data) => safeAction(`/productores/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteProductor = (id) => safeAction(`/productores/${id}`, { method: 'DELETE' })
export const getLotes = () => safeGetArray('/lotes')
export const getLoteNextCode = (userId, productorId) => {
  const params = new URLSearchParams()
  if (userId != null && userId !== '') params.set('user_id', String(userId))
  if (productorId != null && productorId !== '') params.set('productor_id', String(productorId))
  const qs = params.toString() ? `?${params.toString()}` : ''
  return safeAction(`/lotes/next-code${qs}`)
}
export const getLoteById = (id) => safeAction(`/lotes/${id}`)
export const createLote = (data) => safeAction('/lotes', { method: 'POST', body: JSON.stringify(data) })
export const getProduccion = () => safeGetArray('/produccion')
export const createProduccion = (data) => safeAction('/produccion', { method: 'POST', body: JSON.stringify(data) })
export const getTrazabilidad = (loteId) => {
  const path = `/trazabilidad${loteId ? `?lote_id=${loteId}` : ''}`
  return loteId ? safeAction(path) : safeGetArray(path)
}
export const createTrazabilidad = (data) => safeAction('/trazabilidad', { method: 'POST', body: JSON.stringify(data) })
export const getControlCalidad = () => safeGetArray('/control-calidad')
export const createControlCalidad = (data) => safeAction('/control-calidad', { method: 'POST', body: JSON.stringify(data) })
export const getPredicciones = () => safeGetArray('/predicciones')
export const ejecutarPrediccionIA = (data) =>
  safeAction('/predicciones/ejecutar', { method: 'POST', body: JSON.stringify(data) })

// Reportes
export const getReporteProduccion = () => safeAction('/reportes/produccion')
export const getReporteCalidad = () => safeAction('/reportes/calidad')
export const getReportePredicciones = () => safeAction('/reportes/predicciones')
export const getReporteTrazabilidad = () => safeAction('/reportes/trazabilidad')

export const getBaseDatos = () => safeAction('/base-datos')
export const getBaseDatosTabla = (tabla) => safeAction(`/base-datos/${tabla}`)

export const downloadReporte = async (tipo, formato = 'pdf') => {
  const token = getToken()
  const base = getApiOrigin()
  const url = `${base}/api/reportes/export/${tipo}/${formato}`
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (res.status === 401) {
    try {
      await refreshAccessToken()
      return downloadReporte(tipo, formato)
    } catch {
      clearSession()
      throw new ApiError('Sesión expirada. Inicie sesión nuevamente.', 401)
    }
  }
  if (!res.ok) {
    const errBody = parseJsonSafe(await res.text())
    throw new ApiError(errBody?.message || 'Error al exportar reporte', res.status)
  }
  const blob = await res.blob()
  if (!blob.size) throw new ApiError('El reporte exportado está vacío', 400)
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `reporte-${tipo}.${formato === 'excel' ? 'xlsx' : 'pdf'}`
  a.click()
  URL.revokeObjectURL(a.href)
}

export const createEvaluacion = createControlCalidad
export const predictIA = ejecutarPrediccionIA
export const askChatbotIA = (message) => {
  const text = String(message || '').trim()
  if (!text) return Promise.reject(new ApiError('Escriba una consulta antes de enviar.', 400))
  return safeAction('/chatbot', { method: 'POST', body: JSON.stringify({ message: text }) })
}
export const getAuditoria = (params = {}) => {
  const qs = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== '') qs.set(k, String(v).trim())
  })
  return safeAction(`/auditoria${qs.toString() ? `?${qs.toString()}` : ''}`)
}
export const getAuditoriaResumen = () => safeAction('/auditoria/resumen')

export { ApiError, request, API_URL }
