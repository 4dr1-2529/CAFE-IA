import { PrediccionRepository } from '../../infrastructure/repositories/PrediccionRepository.js'
import { PredictionService } from './PredictionService.js'
import { AppError } from '../../shared/AppError.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { ActionLogService } from './ActionLogService.js'

export class PrediccionService {
  static async list(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    return PrediccionRepository.findAllUsuario(RoleHelper.scopeUserId(meta.user))
  }

  static async execute(loteId, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!loteId) throw new AppError('Selecciona un lote pendiente', 400)
    await RoleHelper.assertLoteAccess(loteId, meta.user)
    const row = await PredictionService.executeForLote(loteId, meta.user?.sub)
    await ActionLogService.fromMeta(meta, {
      accion: 'EJECUTAR_PREDICCION_IA',
      modulo: 'ia',
      descripcion: `${meta.user?.nombre || 'Usuario'} generó predicción IA para lote ${loteId}`,
      entidad: 'predicciones_ia',
      entidadId: row?.id || null,
    })
    return row
  }
}
