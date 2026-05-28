import { PredictionEngine } from '../../domain/PredictionEngine.js'
import { query, queryOne, execute } from '../../infrastructure/database/pool.js'

export class PredictionService {
  static async executeForLote(loteId, userId = null) {
    const lote = await queryOne(
      `SELECT l.id AS lote_id, l.user_id, l.codigo_lote, l.variedad_cafe, l.humedad, l.temperatura, l.altitud,
              l.tipo_secado, l.tiempo_almacenamiento_dias, l.calidad_grano, l.estado AS estado_lote,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
       FROM lotes l
       LEFT JOIN productores p ON l.productor_id = p.id
       WHERE l.id = ? AND l.deleted_at IS NULL LIMIT 1`,
      [loteId]
    )
    if (!lote) throw Object.assign(new Error('El lote seleccionado no existe'), { status: 404 })

    const existing = await queryOne(
      `SELECT id FROM predicciones_ia WHERE lote_id = ? AND origen = 'usuario' LIMIT 1`,
      [loteId]
    )
    if (existing) throw Object.assign(new Error('Este lote ya tiene predicción IA registrada'), { status: 409 })

    const calidad = await queryOne(
      `SELECT puntaje_taza FROM control_calidad WHERE lote_id = ? ORDER BY id DESC LIMIT 1`,
      [loteId]
    )

    const { humedad, temperatura, altitud, tipo_secado, variedad_cafe, tiempo_almacenamiento_dias, calidad_grano } = lote
    if (humedad == null || temperatura == null || altitud == null || !tipo_secado || !variedad_cafe) {
      throw Object.assign(new Error('El lote no tiene variables completas para la predicción'), { status: 400 })
    }

    const result = PredictionEngine.predict({
      humedad: Number(humedad),
      temperatura: Number(temperatura),
      altitud: Number(altitud),
      tipo_secado,
      variedad_cafe,
      puntaje_taza: calidad?.puntaje_taza ?? null,
      tiempo_almacenamiento_dias: Number(tiempo_almacenamiento_dias) || 0,
      calidad_grano: calidad_grano || 'Buena'
    })

    const fecha = new Date().toISOString().split('T')[0]
    const ins = await execute(
      `INSERT INTO predicciones_ia (lote_id, user_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe,
        tiempo_almacenamiento_dias, calidad_grano, calidad_predicha, confianza, porcentaje_riesgo,
        recomendacion, factores_influyentes, fecha_prediccion, modelo, origen, version_modelo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'usuario', ?)`,
      [
        loteId,
        userId ?? lote.user_id,
        humedad,
        temperatura,
        altitud,
        tipo_secado,
        variedad_cafe,
        tiempo_almacenamiento_dias || 0,
        calidad_grano || 'Buena',
        result.calidad_predicha,
        result.confianza,
        result.porcentaje_riesgo,
        result.recomendacion,
        JSON.stringify(result.factores),
        fecha,
        result.modelo,
        result.version_modelo,
      ]
    )
    const predId = ins.insertId

    for (const f of result.factores) {
      await execute(
        `INSERT INTO variables_prediccion (prediccion_id, nombre_variable, valor, peso, impacto) VALUES (?, ?, ?, ?, ?)`,
        [predId, f.factor, f.peso || 0, f.peso || 0, f.impacto]
      ).catch(() => {})
    }
    for (const rec of result.recomendaciones) {
      await execute(
        `INSERT INTO recomendaciones_ia (prediccion_id, categoria, prioridad, texto) VALUES (?, ?, ?, ?)`,
        [predId, rec.categoria, rec.prioridad, rec.texto]
      ).catch(() => {})
    }
    for (const al of result.alertas) {
      await execute(
        `INSERT INTO alertas_ia (lote_id, prediccion_id, tipo_alerta, severidad, mensaje) VALUES (?, ?, ?, ?, ?)`,
        [loteId, predId, al.tipo, al.severidad, al.mensaje]
      ).catch(() => {})
    }

    return {
      id: predId,
      lote_id: lote.lote_id,
      codigo_lote: lote.codigo_lote,
      productor: lote.productor,
      variedad_cafe,
      humedad,
      temperatura,
      altitud,
      tipo_secado,
      calidad_predicha: result.calidad_predicha,
      confianza: result.confianza,
      porcentaje_riesgo: result.porcentaje_riesgo,
      nivel_riesgo: result.nivel_riesgo,
      factores_influyentes: result.factores,
      factores: result.factores,
      recomendacion: result.recomendacion,
      recomendaciones: result.recomendaciones,
      alertas: result.alertas,
      modelo_usado: result.modelo,
      fecha_prediccion: fecha
    }
  }
}
