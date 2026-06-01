/**
 * Motor predictivo heurístico v2.0 — dominio puro (sin dependencias de infraestructura)
 */

const PREMIUM_VARIETIES = new Set(['Arabica', 'Typica', 'Bourbon', 'Caturra', 'Geisha'])
const SECADO_SCORES = { Natural: 6, Lavado: 8, Honey: 10, Semilavado: 7 }
const GRANO_MAP = { Excelente: 8, Buena: 4, Regular: -2, Deficiente: -10 }

function riskLevel(porcentaje) {
  if (porcentaje < 30) return 'bajo'
  if (porcentaje < 50) return 'medio'
  return 'alto'
}

function applyHumedad(humedad, score, factores) {
  if (humedad >= 10 && humedad <= 12) {
    factores.push({ factor: 'Humedad', impacto: 'Positivo', descripcion: 'Humedad ideal para secado y calidad', peso: 0.18 })
    return score + 18
  }
  if (humedad > 12 && humedad <= 15) {
    factores.push({ factor: 'Humedad', impacto: 'Neutral', descripcion: 'Humedad aceptable', peso: 0.05 })
    return score + 5
  }
  factores.push({ factor: 'Humedad', impacto: 'Negativo', descripcion: 'Humedad fuera del rango recomendado (10-12%)', peso: -0.10 })
  return score - 10
}

function applyTemperatura(temperatura, score, factores) {
  if (temperatura >= 18 && temperatura <= 22) {
    factores.push({ factor: 'Temperatura', impacto: 'Positivo', descripcion: 'Temperatura estable para el proceso', peso: 0.15 })
    return score + 15
  }
  if (temperatura > 22 && temperatura <= 26) {
    factores.push({ factor: 'Temperatura', impacto: 'Neutral', descripcion: 'Temperatura elevada, vigilar control', peso: 0.03 })
    return score + 3
  }
  factores.push({ factor: 'Temperatura', impacto: 'Negativo', descripcion: 'Temperatura crítica para conservación', peso: -0.08 })
  return score - 8
}

function applyAltitud(altitud, score, factores) {
  if (altitud >= 1500 && altitud <= 2000) {
    factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud óptima para café especial', peso: 0.12 })
    return score + 12
  }
  if (altitud > 2000) {
    factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud muy alta, perfil gourmet', peso: 0.08 })
    return score + 8
  }
  factores.push({ factor: 'Altitud', impacto: 'Negativo', descripcion: 'Altitud por debajo del rango premium', peso: -0.05 })
  return score - 5
}

function applyVariedad(variedad_cafe, score, factores) {
  if (PREMIUM_VARIETIES.has(variedad_cafe)) {
    factores.push({ factor: 'Variedad', impacto: 'Positivo', descripcion: 'Variedad de alta calidad reconocida', peso: 0.10 })
    return score + 10
  }
  factores.push({ factor: 'Variedad', impacto: 'Neutral', descripcion: 'Variedad adaptable', peso: 0.04 })
  return score + 4
}

function applySecado(tipo_secado, score, factores) {
  const secadoBonus = SECADO_SCORES[tipo_secado] || 5
  factores.push({
    factor: 'Tipo de secado',
    impacto: secadoBonus >= 8 ? 'Positivo' : 'Neutral',
    descripcion: `Proceso ${tipo_secado} aplicado al lote`,
    peso: secadoBonus / 100,
  })
  return score + secadoBonus
}

function applyPuntajeTaza(puntaje_taza, score, factores) {
  if (puntaje_taza == null) return score
  factores.push({ factor: 'Evaluación sensorial', impacto: 'Positivo', descripcion: 'Puntaje de taza integrado al modelo', peso: 0.20 })
  return score * 0.6 + Number(puntaje_taza) * 0.4
}

function applyCalidadGrano(calidad_grano, score, factores) {
  const bonus = GRANO_MAP[calidad_grano] ?? 0
  if (calidad_grano !== 'Buena') {
    factores.push({
      factor: 'Calidad de grano',
      impacto: bonus > 0 ? 'Positivo' : 'Negativo',
      descripcion: `Estado del grano: ${calidad_grano}`,
      peso: bonus / 100,
    })
  }
  return score + bonus
}

function applyAlmacenamiento(dias, score, factores) {
  if (dias > 90) {
    factores.push({ factor: 'Almacenamiento', impacto: 'Negativo', descripcion: 'Tiempo de almacenamiento prolongado (>90 días)', peso: -0.12 })
    return score - 12
  }
  if (dias > 60) {
    factores.push({ factor: 'Almacenamiento', impacto: 'Neutral', descripcion: 'Vigilar condiciones de almacenamiento', peso: -0.05 })
    return score - 5
  }
  return score
}

function buildQualityOutcome(score) {
  if (score >= 82) {
    return {
      calidad_predicha: 'Alta',
      recomendacion: 'Lote con alto potencial. Continuar secado cuidadoso y preparar para mercados premium.',
      recomendaciones: [{ categoria: 'Comercial', prioridad: 'Alta', texto: 'Considerar certificación de especialidad.' }],
    }
  }
  if (score >= 65) {
    return {
      calidad_predicha: 'Media',
      recomendacion: 'Optimizar secado y mantener calidad en los próximos procesos.',
      recomendaciones: [{ categoria: 'Proceso', prioridad: 'Media', texto: 'Monitorear humedad cada 48 horas.' }],
    }
  }
  return {
    calidad_predicha: 'Baja',
    recomendacion: 'Revisar condiciones de secado y almacenamiento. Considerar reproceso.',
    recomendaciones: [{ categoria: 'Calidad', prioridad: 'Alta', texto: 'Realizar cata de confirmación urgente.' }],
  }
}

function buildAlertas(humedad, temperatura, porcentaje_riesgo) {
  const alertas = []
  if (humedad > 14) alertas.push({ tipo: 'Humedad crítica', severidad: 'Alta', mensaje: `Humedad ${humedad}% supera umbral seguro` })
  if (temperatura > 26) alertas.push({ tipo: 'Temperatura', severidad: 'Media', mensaje: 'Temperatura fuera de rango óptimo' })
  if (porcentaje_riesgo >= 50) {
    alertas.push({ tipo: 'Riesgo calidad', severidad: 'Crítica', mensaje: `Riesgo de pérdida de calidad: ${porcentaje_riesgo}%` })
  }
  return alertas
}

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
      calidad_grano = 'Buena',
    } = input

    const factores = []
    let score = 45

    score = applyHumedad(humedad, score, factores)
    score = applyTemperatura(temperatura, score, factores)
    score = applyAltitud(altitud, score, factores)
    score = applyVariedad(variedad_cafe, score, factores)
    score = applySecado(tipo_secado, score, factores)
    score = applyPuntajeTaza(puntaje_taza, score, factores)
    score = applyCalidadGrano(calidad_grano, score, factores)
    score = applyAlmacenamiento(tiempo_almacenamiento_dias, score, factores)

    const confianza = Math.min(99, Math.max(52, Math.round(score)))
    const porcentaje_riesgo = Math.min(95, Math.max(5, Math.round(100 - confianza + (humedad > 14 ? 15 : 0))))
    const nivel_riesgo = riskLevel(porcentaje_riesgo)
    const outcome = buildQualityOutcome(score)

    if (porcentaje_riesgo >= 40) {
      outcome.recomendaciones.push({
        categoria: 'Riesgo',
        prioridad: 'Alta',
        texto: `Riesgo detectado: ${porcentaje_riesgo}%. Revisar variables críticas.`,
      })
    }

    return {
      calidad_predicha: outcome.calidad_predicha,
      confianza,
      porcentaje_riesgo,
      nivel_riesgo,
      recomendacion: outcome.recomendacion,
      recomendaciones: outcome.recomendaciones,
      factores,
      alertas: buildAlertas(humedad, temperatura, porcentaje_riesgo),
      modelo: PredictionEngine.MODEL_NAME,
      version_modelo: PredictionEngine.MODEL_VERSION,
      score_raw: Math.round(score * 100) / 100,
    }
  }
}
