import { ProductorRepository } from '../../infrastructure/repositories/ProductorRepository.js'
import { LoteRepository } from '../../infrastructure/repositories/LoteRepository.js'
import { ProduccionRepository } from '../../infrastructure/repositories/ProduccionRepository.js'
import { TrazabilidadRepository } from '../../infrastructure/repositories/TrazabilidadRepository.js'
import { CalidadRepository } from '../../infrastructure/repositories/CalidadRepository.js'
import { PrediccionRepository } from '../../infrastructure/repositories/PrediccionRepository.js'
import { UsuarioRepository } from '../../infrastructure/repositories/UsuarioRepository.js'
import { AppError } from '../../shared/AppError.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { ActionLogService } from './ActionLogService.js'

const TABLAS_CLIENTE = new Set([
  'productores',
  'lotes',
  'produccion',
  'trazabilidad',
  'control_calidad',
  'predicciones_ia',
])

const TABLAS_ADMIN = new Set([...TABLAS_CLIENTE, 'usuarios'])

export class BaseDatosService {
  static async resumen(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const isAdmin = RoleHelper.isAdmin(meta.user)
    const scope = RoleHelper.scopeUserId(meta.user)
    const tablas = isAdmin ? [...TABLAS_ADMIN] : [...TABLAS_CLIENTE]

    const counts = {}
    for (const t of tablas) {
      const rows = await BaseDatosService.fetchTabla(t, scope)
      counts[t] = Array.isArray(rows) ? rows.length : 0
    }

    await ActionLogService.log({
      usuarioId: meta.user.sub,
      accion: isAdmin ? 'CONSULTAR_BASE_DATOS_ADMIN' : 'CONSULTAR_BASE_DATOS_CLIENTE',
      modulo: 'base_datos',
      descripcion: isAdmin
        ? 'Administrador consultó base de datos global'
        : 'Cliente consultó su base de datos personal',
      entidad: 'base_datos',
      entidadId: null,
      ip: meta.ip,
      userAgent: meta.userAgent,
      resultado: 'exito',
    }).catch(() => {})

    return {
      alcance: isAdmin ? 'GLOBAL' : 'PERSONAL',
      titulo: isAdmin ? 'Base de Datos General' : 'Mi Base de Datos',
      subtitulo: isAdmin
        ? 'Visualización global de las tablas del sistema'
        : 'Visualización de tus productores, lotes y resultados registrados',
      tablas: tablas.map((id) => ({ id, count: counts[id] || 0 })),
    }
  }

  static async getTabla(tabla, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const isAdmin = RoleHelper.isAdmin(meta.user)
    const key = String(tabla || '').toLowerCase().replace(/-/g, '_')

    if (key === 'auditoria' || key === 'usuarios') {
      if (!isAdmin) throw new AppError('No autorizado para consultar esta tabla', 403)
    }
    if (!isAdmin && !TABLAS_CLIENTE.has(key)) {
      throw new AppError('Tabla no disponible para su rol', 403)
    }
    if (isAdmin && !TABLAS_ADMIN.has(key) && key !== 'auditoria') {
      throw new AppError('Tabla no reconocida', 404)
    }

    const scope = RoleHelper.scopeUserId(meta.user)
    const rows = await BaseDatosService.fetchTabla(key, scope)

    await ActionLogService.log({
      usuarioId: meta.user.sub,
      accion: 'CONSULTAR_TABLA_BASE_DATOS',
      modulo: 'base_datos',
      descripcion: `${isAdmin ? 'ADMIN' : 'CLIENTE'} consultó tabla ${key}`,
      entidad: key,
      entidadId: null,
      ip: meta.ip,
      userAgent: meta.userAgent,
      resultado: 'exito',
    }).catch(() => {})

    return {
      tabla: key,
      alcance: isAdmin ? 'GLOBAL' : 'PERSONAL',
      rows,
    }
  }

  static async fetchTabla(tabla, userId) {
    switch (tabla) {
      case 'productores':
        return userId ? ProductorRepository.findByUserId(userId) : ProductorRepository.findAll()
      case 'lotes':
        return userId ? LoteRepository.findAllByUser(userId) : LoteRepository.findAllAdmin()
      case 'produccion':
        return ProduccionRepository.findAll(userId)
      case 'trazabilidad':
        return TrazabilidadRepository.findAll(undefined, userId)
      case 'control_calidad':
        return CalidadRepository.findAll(userId)
      case 'predicciones_ia':
        return PrediccionRepository.findAllUsuario(userId)
      case 'usuarios': {
        const rows = await UsuarioRepository.listAll()
        return rows.map((r) => UsuarioRepository.toPublic(r))
      }
      default:
        throw new AppError('Tabla no reconocida', 404)
    }
  }
}
