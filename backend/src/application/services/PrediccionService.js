import { PrediccionRepository } from '../../infrastructure/repositories/PrediccionRepository.js'
import { PredictionService } from './PredictionService.js'
import { AppError } from '../../shared/AppError.js'

export class PrediccionService {
  static async list() {
    return PrediccionRepository.findAllUsuario()
  }

  static async execute(loteId) {
    if (!loteId) throw new AppError('Selecciona un lote pendiente', 400)
    return PredictionService.executeForLote(loteId)
  }
}
