import { CalidadRepository } from '../../infrastructure/repositories/CalidadRepository.js'
import { AppError } from '../../shared/AppError.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { ActionLogService } from './ActionLogService.js'

const ATTRS = ['aroma', 'sabor', 'cuerpo', 'acidez', 'dulzor', 'balance']

export class CalidadService {
  static computeScores(body) {
    const attrs = ATTRS.map((k) => Number(body[k]))
    const puntaje_taza = Math.round((attrs.reduce((a, v) => a + v, 0) / 6) * 10)
    let calidad_final = 'Regular'
    if (puntaje_taza >= 85) calidad_final = 'Excelente'
    else if (puntaje_taza >= 75) calidad_final = 'Buena'
    else if (puntaje_taza >= 65) calidad_final = 'Aceptable'
    return { puntaje_taza, calidad_final }
  }

  static async list(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    return CalidadRepository.findAll(RoleHelper.scopeUserId(meta.user))
  }

  static async create(body, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const lote = await RoleHelper.assertLoteAccess(body.lote_id, meta.user)
    const exists = await CalidadRepository.existsForLote(body.lote_id)
    if (exists) throw new AppError('Este lote ya tiene evaluación de calidad', 409)

    const { puntaje_taza, calidad_final } = CalidadService.computeScores(body)
    const fecha = new Date().toISOString().split('T')[0]

    try {
      const row = await CalidadRepository.create({
        lote_id: body.lote_id,
        user_id: lote.user_id,
        evaluador_id: meta.user.sub,
        aroma: body.aroma,
        sabor: body.sabor,
        cuerpo: body.cuerpo,
        acidez: body.acidez,
        dulzor: body.dulzor,
        balance: body.balance,
        puntaje_taza,
        calidad_final,
        estado: 'Evaluado',
        observaciones: body.observaciones || '',
        fecha_evaluacion: fecha,
      })
      await CalidadRepository.markLoteCalidad(body.lote_id)
      await ActionLogService.fromMeta(meta, {
        accion: 'REGISTRAR_CONTROL_CALIDAD',
        modulo: 'calidad',
        descripcion: `${meta.user?.nombre || 'Usuario'} registró control de calidad del lote ${body.lote_id}`,
        entidad: 'control_calidad',
        entidadId: row?.id || null,
      })
      return row
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') throw new AppError('Este lote ya tiene evaluación', 409)
      throw e
    }
  }
}
