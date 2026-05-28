import { ProduccionRepository } from '../../infrastructure/repositories/ProduccionRepository.js'
import { AppError } from '../../shared/AppError.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { ActionLogService } from './ActionLogService.js'

export class ProduccionService {
  static async list(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    return ProduccionRepository.findAll(RoleHelper.scopeUserId(meta.user))
  }

  static async create(body, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!body.lote_id) throw new AppError('lote_id es obligatorio', 400)
    if (Number(body.cantidad_kg) <= 0) throw new AppError('cantidad_kg debe ser mayor a 0', 400)

    const lote = await RoleHelper.assertLoteAccess(body.lote_id, meta.user)
    const fecha = body.fecha_registro || new Date().toISOString().split('T')[0]
    const row = await ProduccionRepository.create({
      lote_id: body.lote_id,
      user_id: lote.user_id,
      fecha_registro: fecha,
      cantidad_kg: body.cantidad_kg,
      humedad: body.humedad,
      temperatura: body.temperatura,
      tipo_proceso: body.tipo_proceso || body.tipo_secado,
      observaciones: body.observaciones,
    })
    await ActionLogService.log({
      usuarioId: meta.user.sub,
      accion: 'REGISTRAR_PRODUCCION',
      modulo: 'produccion',
      descripcion: `Registro de producción para lote ${body.lote_id}`,
      entidad: 'produccion',
      entidadId: row?.id || null,
      ip: meta.ip,
      userAgent: meta.userAgent,
    })
    return row
  }
}
