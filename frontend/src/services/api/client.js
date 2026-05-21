const DEFAULT_BASE_URLS = [
  import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : 'http://localhost:3029/api',
]
const TIMEOUT = 8000
import { STORAGE_KEYS } from '../../constants/storage.js'

const TOKEN_KEY = STORAGE_KEYS.TOKEN
const SESSION_KEY = STORAGE_KEYS.SESSION

class ApiError extends Error {
  constructor(message, status = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(SESSION_KEY)
}

const request = async (path, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const errorMessages = []
  for (const baseUrl of DEFAULT_BASE_URLS) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers,
        signal: controller.signal,
        ...options
      })
      clearTimeout(timeoutId)
      const bodyText = await response.text()
      const data = bodyText ? JSON.parse(bodyText) : null
      if (response.status === 401 && path !== '/auth/login') {
        clearAuth()
      }
      if (!response.ok) {
        throw new ApiError(data?.message || `Error del servidor: ${response.status}`, response.status)
      }
      return data
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof ApiError) throw error
      errorMessages.push(error.name === 'AbortError' ? `Timeout ${baseUrl}` : `Sin conexión ${baseUrl}`)
    }
  }
  throw new ApiError(`No se pudo conectar al backend. ${errorMessages.join(' / ')}`, 'NETWORK')
}

const safeGetArray = async (path) => {
  try {
    const data = await request(path)
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error(`API GET ${path}:`, err)
    return []
  }
}

const safeAction = async (path, options) => request(path, options)

// Auth
export const loginApi = async (email, password) => {
  const data = await request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  if (data.accessToken) setToken(data.accessToken)
  if (data.user) localStorage.setItem(SESSION_KEY, JSON.stringify(data.user))
  return data
}

export const logoutApi = async (refreshToken) => {
  try {
    await request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken }) })
  } finally {
    clearAuth()
  }
}

export const registerApi = (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) })

// Dashboard
export const getDashboardMetrics = () => request('/dashboard/metrics')

// CRUD
export const getProductores = () => safeGetArray('/productores')
export const createProductor = (data) => safeAction('/productores', { method: 'POST', body: JSON.stringify(data) })
export const updateProductor = (id, data) => safeAction(`/productores/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteProductor = (id) => safeAction(`/productores/${id}`, { method: 'DELETE' })
export const getLotes = () => safeGetArray('/lotes')
export const getLoteNextCode = () => safeAction('/lotes/next-code')
export const getLoteById = (id) => safeAction(`/lotes/${id}`)
export const createLote = (data) => safeAction('/lotes', { method: 'POST', body: JSON.stringify(data) })
export const getProduccion = () => safeGetArray('/produccion')
export const createProduccion = (data) => safeAction('/produccion', { method: 'POST', body: JSON.stringify(data) })
export const getTrazabilidad = (loteId) => safeAction(`/trazabilidad${loteId ? `?lote_id=${loteId}` : ''}`)
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

export const downloadReporte = async (tipo, formato = 'pdf') => {
  const token = getToken()
  const base = DEFAULT_BASE_URLS[0].replace('/api', '')
  const url = `${base}/api/reportes/export/${tipo}/${formato}`
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  if (!res.ok) throw new ApiError('Error al exportar reporte', res.status)
  const blob = await res.blob()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `reporte-${tipo}.${formato === 'excel' ? 'xlsx' : 'pdf'}`
  a.click()
  URL.revokeObjectURL(a.href)
}

export const createEvaluacion = createControlCalidad
export const predictIA = ejecutarPrediccionIA
