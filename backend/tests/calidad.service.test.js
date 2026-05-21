import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { CalidadService } from '../src/application/services/CalidadService.js'

describe('CalidadService', () => {
  test('computeScores: excelente >= 85', () => {
    const r = CalidadService.computeScores({
      aroma: 9,
      sabor: 9,
      cuerpo: 9,
      acidez: 9,
      dulzor: 9,
      balance: 9,
    })
    assert.equal(r.calidad_final, 'Excelente')
    assert.ok(r.puntaje_taza >= 85)
  })

  test('computeScores: regular con notas bajas', () => {
    const r = CalidadService.computeScores({
      aroma: 5,
      sabor: 5,
      cuerpo: 5,
      acidez: 5,
      dulzor: 5,
      balance: 5,
    })
    assert.equal(r.calidad_final, 'Regular')
    assert.equal(r.puntaje_taza, 50)
  })

  test('computeScores: buena entre 75 y 84', () => {
    const r = CalidadService.computeScores({
      aroma: 8,
      sabor: 8,
      cuerpo: 7,
      acidez: 7,
      dulzor: 8,
      balance: 8,
    })
    assert.equal(r.calidad_final, 'Buena')
  })
})
