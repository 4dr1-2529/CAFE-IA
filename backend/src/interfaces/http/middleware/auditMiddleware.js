import { ActionLogService } from '../../../application/services/ActionLogService.js'

const AUDIT_PREFIXES = [
  '/api/auth',
  '/api/usuarios',
  '/api/productores',
  '/api/produccion',
  '/api/lotes',
  '/api/control-calidad',
  '/api/evaluaciones',
  '/api/trazabilidad',
  '/api/reportes',
  '/api/chatbot',
  '/api/predicciones',
  '/api/auditoria',
  '/api/dashboard',
]

const SKIP_PATHS = new Set(['/api/health', '/'])

const GET_AUDIT_RULES = [
  { prefix: '/api/productores', accion: 'CONSULTAR_PRODUCTORES', modulo: 'productores', descripcion: 'Consultó listado de productores', entidad: 'productores' },
  { prefix: '/api/lotes', accion: 'CONSULTAR_LOTES', modulo: 'lotes', descripcion: 'Consultó listado de lotes', entidad: 'lotes' },
  { prefix: '/api/produccion', accion: 'CONSULTAR_PRODUCCION', modulo: 'produccion', descripcion: 'Consultó registros de producción', entidad: 'produccion' },
  { prefix: '/api/trazabilidad', accion: 'CONSULTAR_TRAZABILIDAD', modulo: 'trazabilidad', descripcion: 'Consultó trazabilidad de lotes', entidad: 'trazabilidad' },
  { prefix: '/api/predicciones', accion: 'CONSULTAR_PREDICCIONES', modulo: 'ia', descripcion: 'Consultó predicciones IA', entidad: 'predicciones_ia' },
  { prefix: '/api/reportes', accion: 'CONSULTAR_REPORTES', modulo: 'reportes', descripcion: 'Consultó módulo de reportes', entidad: 'reportes' },
  { prefix: '/api/auditoria', accion: 'CONSULTAR_AUDITORIA', modulo: 'auditoria', descripcion: 'Consultó historial de auditoría', entidad: 'auditoria_logs' },
  { prefix: '/api/usuarios', accion: 'CONSULTAR_USUARIOS', modulo: 'usuarios', descripcion: 'Consultó listado de usuarios', entidad: 'usuarios' },
]

function normalizePath(url = '') {
  return String(url).split('?')[0]
}

function resolveCalidadAudit(p) {
  if (!p.startsWith('/api/control-calidad') && !p.startsWith('/api/evaluaciones')) return null
  return { accion: 'CONSULTAR_CALIDAD', modulo: 'calidad', descripcion: 'Consultó control de calidad', entidad: 'control_calidad' }
}

function resolveGetAudit(path) {
  if (path.startsWith('/api/dashboard')) return null
  const calidad = resolveCalidadAudit(path)
  if (calidad) return calidad
  const rule = GET_AUDIT_RULES.find((r) => path.startsWith(r.prefix))
  return rule ? { accion: rule.accion, modulo: rule.modulo, descripcion: rule.descripcion, entidad: rule.entidad } : null
}

function resolvePostAudit(path) {
  if (path.startsWith('/api/chatbot')) return null
  if (path.startsWith('/api/reportes') && path.includes('export')) {
    return { accion: 'EXPORTAR_REPORTE', modulo: 'reportes', descripcion: 'Exportó un reporte', entidad: 'reportes' }
  }
  return null
}

function resolveAudit(path, method) {
  const m = method.toUpperCase()
  const p = normalizePath(path)

  if (p === '/api/auth/login' && m === 'POST') return null
  if (p === '/api/auth/logout' && m === 'POST') {
    return { accion: 'LOGOUT', modulo: 'auth', descripcion: 'Cierre de sesión', entidad: 'usuarios' }
  }

  if (m === 'GET') return resolveGetAudit(p)
  if (m === 'POST') return resolvePostAudit(p)
  return null
}

export function auditMiddleware(req, res, next) {
  const path = normalizePath(req.originalUrl || req.url || '')
  if (req.method === 'OPTIONS' || SKIP_PATHS.has(path)) return next()
  if (!AUDIT_PREFIXES.some((prefix) => path.startsWith(prefix))) return next()

  res.on('finish', () => {
    if (res.statusCode < 200 || res.statusCode >= 400) return
    if (req._auditLogged) return

    const meta = resolveAudit(path, req.method)
    if (!meta) return

    const user = req.user
    if (!user?.sub && path !== '/api/auth/login') return

    ActionLogService.log({
      usuarioId: user?.sub ?? null,
      usuarioNombre: user?.nombre ?? null,
      usuarioEmail: user?.email ?? null,
      rol: user?.rol ?? null,
      accion: meta.accion,
      modulo: meta.modulo,
      descripcion: meta.descripcion,
      entidad: meta.entidad,
      entidadId: meta.entidadId ?? null,
      metodo: req.method,
      ruta: path,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      resultado: 'exito',
    })
  })

  next()
}
