/**
 * Motor predictivo heurístico v2.0 — dominio puro (sin dependencias de infraestructura)
 */
export class PredictionEngine {
  static MODEL_VERSION = 'v2.0-heuristic'
  static MODEL_NAME = 'Modelo predictivo heurístico avanzado - Café Sostenible AI'

  static predict(input) {
    const {
      humedad,
      temperatura,
      altitud,
      variedad_cafe,
      tipo_secado,
      puntaje_taza = null,
      tiempo_almacenamiento_dias = 0,
      calidad_grano = 'Buena'
    } = input

    const factores = []
    let score = 45

    // Humedad óptima 10-12%
    if (humedad >= 10 && humedad <= 12) {
      score += 18
      factores.push({ factor: 'Humedad', impacto: 'Positivo', descripcion: 'Humedad ideal para secado y calidad', peso: 0.18 })
    } else if (humedad > 12 && humedad <= 15) {
      score += 5
      factores.push({ factor: 'Humedad', impacto: 'Neutral', descripcion: 'Humedad aceptable', peso: 0.05 })
    } else {
      score -= 10
      factores.push({ factor: 'Humedad', impacto: 'Negativo', descripcion: 'Humedad fuera del rango recomendado (10-12%)', peso: -0.10 })
    }

    // Temperatura 18-22°C
    if (temperatura >= 18 && temperatura <= 22) {
      score += 15
      factores.push({ factor: 'Temperatura', impacto: 'Positivo', descripcion: 'Temperatura estable para el proceso', peso: 0.15 })
    } else if (temperatura > 22 && temperatura <= 26) {
      score += 3
      factores.push({ factor: 'Temperatura', impacto: 'Neutral', descripcion: 'Temperatura elevada, vigilar control', peso: 0.03 })
    } else {
      score -= 8
      factores.push({ factor: 'Temperatura', impacto: 'Negativo', descripcion: 'Temperatura crítica para conservación', peso: -0.08 })
    }

    // Altitud especial 1500-2000 msnm
    if (altitud >= 1500 && altitud <= 2000) {
      score += 12
      factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud óptima para café especial', peso: 0.12 })
    } else if (altitud > 2000) {
      score += 8
      factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud muy alta, perfil gourmet', peso: 0.08 })
    } else {
      score -= 5
      factores.push({ factor: 'Altitud', impacto: 'Negativo', descripcion: 'Altitud por debajo del rango premium', peso: -0.05 })
    }

    const premiumVarieties = ['Arabica', 'Typica', 'Bourbon', 'Caturra', 'Geisha']
    if (premiumVarieties.includes(variedad_cafe)) {
      score += 10
      factores.push({ factor: 'Variedad', impacto: 'Positivo', descripcion: 'Variedad de alta calidad reconocida', peso: 0.10 })
    } else {
      score += 4
      factores.push({ factor: 'Variedad', impacto: 'Neutral', descripcion: 'Variedad adaptable', peso: 0.04 })
    }

    const secadoScores = { Natural: 6, Lavado: 8, Honey: 10, Semilavado: 7 }
    const secadoBonus = secadoScores[tipo_secado] || 5
    score += secadoBonus
    factores.push({
      factor: 'Tipo de secado',
      impacto: secadoBonus >= 8 ? 'Positivo' : 'Neutral',
      descripcion: `Proceso ${tipo_secado} aplicado al lote`,
      peso: secadoBonus / 100
    })

    if (puntaje_taza != null) {
      score = (score * 0.6) + (Number(puntaje_taza) * 0.4)
      factores.push({ factor: 'Evaluación sensorial', impacto: 'Positivo', descripcion: 'Puntaje de taza integrado al modelo', peso: 0.20 })
    }

    const granoMap = { Excelente: 8, Buena: 4, Regular: -2, Deficiente: -10 }
    score += granoMap[calidad_grano] ?? 0
    if (calidad_grano !== 'Buena') {
      factores.push({ factor: 'Calidad de grano', impacto: granoMap[calidad_grano] > 0 ? 'Positivo' : 'Negativo', descripcion: `Estado del grano: ${calidad_grano}`, peso: (granoMap[calidad_grano] || 0) / 100 })
    }

    if (tiempo_almacenamiento_dias > 90) {
      score -= 12
      factores.push({ factor: 'Almacenamiento', impacto: 'Negativo', descripcion: 'Tiempo de almacenamiento prolongado (>90 días)', peso: -0.12 })
    } else if (tiempo_almacenamiento_dias > 60) {
      score -= 5
      factores.push({ factor: 'Almacenamiento', impacto: 'Neutral', descripcion: 'Vigilar condiciones de almacenamiento', peso: -0.05 })
    }

    const confianza = Math.min(99, Math.max(52, Math.round(score)))
    const porcentaje_riesgo = Math.min(95, Math.max(5, Math.round(100 - confianza + (humedad > 14 ? 15 : 0))))

    let calidad_predicha = 'Media'
    let recomendacion = 'Controlar procesos y validar con prueba sensorial.'
    const recomendaciones = []

    if (score >= 82) {
      calidad_predicha = 'Alta'
      recomendacion = 'Lote con alto potencial. Continuar secado cuidadoso y preparar para mercados premium.'
      recomendaciones.push({ categoria: 'Comercial', prioridad: 'Alta', texto: 'Considerar certificación de especialidad.' })
    } else if (score >= 65) {
      calidad_predicha = 'Media'
      recomendacion = 'Optimizar secado y mantener calidad en los próximos procesos.'
      recomendaciones.push({ categoria: 'Proceso', prioridad: 'Media', texto: 'Monitorear humedad cada 48 horas.' })
    } else {
      calidad_predicha = 'Baja'
      recomendacion = 'Revisar condiciones de secado y almacenamiento. Considerar reproceso.'
      recomendaciones.push({ categoria: 'Calidad', prioridad: 'Alta', texto: 'Realizar cata de confirmación urgente.' })
    }

    if (porcentaje_riesgo >= 40) {
      recomendaciones.push({ categoria: 'Riesgo', prioridad: 'Alta', texto: `Riesgo detectado: ${porcentaje_riesgo}%. Revisar variables críticas.` })
    }

    const alertas = []
    if (humedad > 14) alertas.push({ tipo: 'Humedad crítica', severidad: 'Alta', mensaje: `Humedad ${humedad}% supera umbral seguro` })
    if (temperatura > 26) alertas.push({ tipo: 'Temperatura', severidad: 'Media', mensaje: 'Temperatura fuera de rango óptimo' })
    if (porcentaje_riesgo >= 50) alertas.push({ tipo: 'Riesgo calidad', severidad: 'Crítica', mensaje: `Riesgo de pérdida de calidad: ${porcentaje_riesgo}%` })

    return {
      calidad_predicha,
      confianza,
      porcentaje_riesgo,
      recomendacion,
      recomendaciones,
      factores,
      alertas,
      modelo: PredictionEngine.MODEL_NAME,
      version_modelo: PredictionEngine.MODEL_VERSION,
      score_raw: Math.round(score * 100) / 100
    }
  }
}
