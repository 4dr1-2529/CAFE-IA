const DEFAULT_BASE_URLS = [
  import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : 'http://localhost:3001/api',
  'http://localhost:3002/api',
  'http://localhost:3003/api'
]
const TIMEOUT = 5000

class ApiError extends Error {
  constructor(message, status = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const request = async (path, options = {}) => {
  const headers = { 'Content-Type': 'application/json' }
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

      if (!response.ok) {
        throw new ApiError(data?.message || `Error del servidor: ${response.status}`, response.status)
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof ApiError) {
        throw error
      }
      const message = error.name === 'AbortError'
        ? `Tiempo de espera agotado conectando a ${baseUrl}`
        : `No se puede conectar a ${baseUrl}`
      errorMessages.push(message)
      if (error.name !== 'AbortError' && !(error instanceof TypeError)) {
        throw new ApiError(error.message || 'Error desconocido', error.status || null)
      }
    }
  }

  throw new ApiError(`No se pudo conectar al backend. Intentos: ${errorMessages.join(' / ')}`, 'NETWORK')
}

const safeGetArray = async (path) => {
  try {
    const data = await request(path)
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error(`API GET ${path} falló:`, err)
    return []
  }
}

const safeAction = async (path, options) => {
  return request(path, options)
}

export const getProductores = async () => safeGetArray('/productores')
export const createProductor = async (data) => safeAction('/productores', { method: 'POST', body: JSON.stringify(data) })
export const updateProductor = async (id, data) => safeAction(`/productores/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteProductor = async (id) => safeAction(`/productores/${id}`, { method: 'DELETE' })
export const getLotes = async () => safeGetArray('/lotes')
export const getLoteNextCode = async () => safeAction('/lotes/next-code')
export const createLote = async (data) => safeAction('/lotes', { method: 'POST', body: JSON.stringify(data) })
export const getProduccion = async () => safeGetArray('/produccion')
export const createProduccion = async (data) => safeAction('/produccion', { method: 'POST', body: JSON.stringify(data) })
export const getTrazabilidad = async (loteId) => safeAction(`/trazabilidad${loteId ? `?lote_id=${loteId}` : ''}`)
export const createTrazabilidad = async (data) => safeAction('/trazabilidad', { method: 'POST', body: JSON.stringify(data) })
export const getControlCalidad = async () => safeGetArray('/control-calidad')
export const createControlCalidad = async (data) => safeAction('/control-calidad', { method: 'POST', body: JSON.stringify(data) })
export const getPredicciones = async () => safeGetArray('/predicciones')
export const createPrediccion = async (data) => safeAction('/predicciones', { method: 'POST', body: JSON.stringify(data) })
export const ejecutarPrediccionIA = async (data) => safeAction('/prediccion-ia', { method: 'POST', body: JSON.stringify(data) })
export const getReporteProduccion = async () => safeAction('/reportes/produccion')
export const getReporteCalidad = async () => safeAction('/reportes/calidad')
export const getReportePredicciones = async () => safeAction('/reportes/predicciones')
export const getReporteTrazabilidad = async () => safeAction('/reportes/trazabilidad')

// Aliases para compatibilidad con componentes existentes
export const createEvaluacion = createControlCalidad
export const predictIA = ejecutarPrediccionIA
