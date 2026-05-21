import { CalidadRepository } from '../../infrastructure/repositories/CalidadRepository.js'
import { AppError } from '../../shared/AppError.js'

const ATTRS = ['aroma', 'sabor', 'cuerpo', 'acidez', 'dulzor', 'balance']

export class CalidadService {
  /** Puntaje 0–100 y etiqueta de calidad */
  static computeScores(body) {
    const attrs = ATTRS.map((k) => Number(body[k]))
    const puntaje_taza = Math.round((attrs.reduce((a, v) => a + v, 0) / 6) * 10)
    let calidad_final = 'Regular'
    if (puntaje_taza >= 85) calidad_final = 'Excelente'
    else if (puntaje_taza >= 75) calidad_final = 'Buena'
    else if (puntaje_taza >= 65) calidad_final = 'Aceptable'
    return { puntaje_taza, calidad_final }
  }

  static async list() {
    return CalidadRepository.findAll()
  }

  static async create(body) {
    const exists = await CalidadRepository.existsForLote(body.lote_id)
    if (exists) throw new AppError('Este lote ya tiene evaluación de calidad', 409)

    const { puntaje_taza, calidad_final } = CalidadService.computeScores(body)
    const fecha = new Date().toISOString().split('T')[0]

    try {
      const row = await CalidadRepository.create({
        lote_id: body.lote_id,
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
      return row
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') throw new AppError('Este lote ya tiene evaluación', 409)
      throw e
    }
  }
}
