import { AuthService } from '../../../application/services/AuthService.js'

export function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticación requerido' })
  }
  try {
    const token = header.slice(7)
    req.user = AuthService.verifyToken(token)
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization
  if (header?.startsWith('Bearer ')) {
    try {
      req.user = AuthService.verifyToken(header.slice(7))
    } catch { /* ignore */ }
  }
  next()
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' })
    if (roles.length && !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: 'No tiene permisos para esta acción' })
    }
    next()
  }
}

/** En producción o REQUIRE_AUTH=true exige JWT; en desarrollo auth opcional */
export const devOrAuth = (req, res, next) => {
  const strict =
    process.env.NODE_ENV === 'production' || process.env.REQUIRE_AUTH === 'true'
  if (strict) return authenticate(req, res, next)
  return optionalAuth(req, res, next)
}
