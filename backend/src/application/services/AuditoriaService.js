import { AuditoriaRepository } from '../../infrastructure/repositories/AuditoriaRepository.js'
import { ActionLogService } from './ActionLogService.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { AppError } from '../../shared/AppError.js'

function norm(v) {
  return typeof v === 'string' ? v.trim() : v
}

export class AuditoriaService {
  static async list(params = {}, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!RoleHelper.isAdmin(meta.user)) {
      throw new AppError('Solo administradores pueden ver la auditoría global', 403)
    }
    return AuditoriaRepository.list({
      page: params.page,
      limit: params.limit,
      usuario: norm(params.usuario),
      modulo: norm(params.modulo),
      accion: norm(params.accion),
      fechaInicio: norm(params.fechaInicio),
      fechaFin: norm(params.fechaFin),
      search: norm(params.search),
    })
  }

  static async summary(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!RoleHelper.isAdmin(meta.user)) throw new AppError('No autorizado', 403)
    return AuditoriaRepository.summaryToday()
  }

  static async create(body = {}, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!RoleHelper.isAdmin(meta.user)) throw new AppError('No autorizado', 403)
    await ActionLogService.log({
      usuarioId: meta.user?.sub || null,
      accion: body.accion || 'EVENTO',
      modulo: body.modulo || 'sistema',
      descripcion: body.descripcion || '',
      entidad: body.entidad || 'general',
      entidadId: body.entidad_id ? Number(body.entidad_id) : null,
      resultado: body.resultado || 'exito',
      ip: meta.ip || null,
      userAgent: meta.userAgent || null,
      detalle: body.detalle || {},
    })
    return { ok: true }
  }
}
