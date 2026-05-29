import { TrazabilidadRepository } from '../../infrastructure/repositories/TrazabilidadRepository.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { AppError } from '../../shared/AppError.js'
import { ActionLogService } from './ActionLogService.js'

export class TrazabilidadService {
  static async list(loteId, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const id = loteId ? Number(loteId) : null
    if (id) await RoleHelper.assertLoteAccess(id, meta.user)
    return TrazabilidadRepository.findAll(id || undefined, RoleHelper.scopeUserId(meta.user))
  }

  static async create(body, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!body.lote_id) throw new AppError('lote_id es obligatorio', 400)
    await RoleHelper.assertLoteAccess(body.lote_id, meta.user)
    const row = await TrazabilidadRepository.insertManual({
      lote_id: body.lote_id,
      etapa: body.etapa,
      descripcion: body.descripcion || '',
      fecha: body.fecha || null,
      ubicacion: body.ubicacion || '',
      estado: body.estado || 'Pendiente',
      usuario_registro_id: meta.user.sub,
    })
    await ActionLogService.fromMeta(meta, {
      accion: 'ACTUALIZAR_TRAZABILIDAD',
      modulo: 'trazabilidad',
      descripcion: `${meta.user?.nombre || 'Usuario'} actualizó trazabilidad del lote ${body.lote_id} (${body.etapa || 'etapa'})`,
      entidad: 'trazabilidad',
      entidadId: row?.id || null,
    })
    return row
  }
}
