/**
 * Respuestas JSON normalizadas (compatible con clientes que esperan payload directo).
 */
export function sendOk(res, data, status = 200) {
  return res.status(status).json({ ok: true, data })
}

export function sendError(res, status, message) {
  return res.status(status).json({ ok: false, message: message || 'Error en la solicitud' })
}

export function userFacingMessage(err, nodeEnv = 'development') {
  if (err?.status && err.status < 500) return err.message || 'Solicitud no válida'
  if (nodeEnv === 'production') return 'Error interno del servidor'
  return err?.message || 'Error interno del servidor'
}
