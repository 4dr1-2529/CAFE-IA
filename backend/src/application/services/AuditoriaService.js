import { AuditoriaRepository } from '../../infrastructure/repositories/AuditoriaRepository.js'
import { ActionLogService } from './ActionLogService.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { AppError } from '../../shared/AppError.js'

function norm(v) {
  return typeof v === 'string' ? v.trim() : v
}

function assertAdmin(user) {
  RoleHelper.requireAuth(user)
  if (!RoleHelper.isAdmin(user)) {
    throw new AppError('Solo administradores pueden ver la auditoría global', 403)
  }
}

export class AuditoriaService {
  static async list(params = {}, meta = {}) {
    assertAdmin(meta.user)
    return AuditoriaRepository.list({
      page: params.page,
      limit: params.limit,
      user_id: params.user_id,
      usuario: norm(params.usuario),
      rol: norm(params.rol),
      modulo: norm(params.modulo),
      accion: norm(params.accion),
      fechaInicio: norm(params.fechaInicio || params.fecha_inicio),
      fechaFin: norm(params.fechaFin || params.fecha_fin),
      search: norm(params.search),
    })
  }

  static async summary(meta = {}) {
    assertAdmin(meta.user)
    return AuditoriaRepository.summaryToday()
  }

  static async resumen(meta = {}) {
    assertAdmin(meta.user)
    return AuditoriaRepository.resumen()
  }

  static async create(body = {}, meta = {}) {
    assertAdmin(meta.user)
    await ActionLogService.fromMeta(meta, {
      accion: body.accion || 'EVENTO',
      modulo: body.modulo || 'sistema',
      descripcion: body.descripcion || '',
      entidad: body.entidad || 'general',
      entidadId: body.entidad_id ? Number(body.entidad_id) : null,
      resultado: body.resultado || 'exito',
      detalle: body.detalle || {},
    })
    return { ok: true }
  }
}
