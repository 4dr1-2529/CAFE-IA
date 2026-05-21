import { test, describe } from 'node:test'
import assert from 'node:assert'
import { PredictionEngine } from '../src/domain/PredictionEngine.js'

describe('PredictionEngine v2', () => {
  test('predice calidad alta con variables óptimas', () => {
    const r = PredictionEngine.predict({
      humedad: 11,
      temperatura: 20,
      altitud: 1700,
      variedad_cafe: 'Arabica',
      tipo_secado: 'Honey',
      puntaje_taza: 88,
      calidad_grano: 'Excelente',
      tiempo_almacenamiento_dias: 30
    })
    assert.ok(['Alta', 'Media'].includes(r.calidad_predicha))
    assert.ok(r.confianza >= 65)
    assert.ok(r.porcentaje_riesgo >= 0)
    assert.ok(Array.isArray(r.factores))
    assert.ok(r.alertas.length >= 0)
  })

  test('detecta riesgo con humedad crítica', () => {
    const r = PredictionEngine.predict({
      humedad: 16,
      temperatura: 28,
      altitud: 1200,
      variedad_cafe: 'Catimor',
      tipo_secado: 'Natural',
      tiempo_almacenamiento_dias: 100,
      calidad_grano: 'Deficiente'
    })
    assert.ok(r.porcentaje_riesgo >= 20)
    assert.ok(r.alertas.some(a => a.tipo.includes('Humedad') || a.tipo.includes('Riesgo')))
  })
})
