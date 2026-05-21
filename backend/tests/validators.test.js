import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { validateCreateLote } from '../src/application/validators/lote.validator.js'
import { validateCreateCalidad } from '../src/application/validators/calidad.validator.js'
import { validateProductorBody } from '../src/application/validators/productor.validator.js'
import { validateCreateTrazabilidad } from '../src/application/validators/trazabilidad.validator.js'

describe('Validators', () => {
  test('lote: rechaza body vacío', () => {
    const errors = validateCreateLote({})
    assert.ok(errors.length >= 5)
  })

  test('lote: acepta body válido', () => {
    const errors = validateCreateLote({
      productor_id: 1,
      variedad_cafe: 'Arabica',
      fecha_cosecha: '2025-01-01',
      cantidad_kg: 100,
      humedad: 11,
      temperatura: 22,
      altitud: 1500,
      tipo_secado: 'Honey',
    })
    assert.equal(errors.length, 0)
  })

  test('calidad: valida rango 1-10', () => {
    const errors = validateCreateCalidad({
      lote_id: 1,
      aroma: 0,
      sabor: 11,
      cuerpo: 5,
      acidez: 5,
      dulzor: 5,
      balance: 5,
    })
    assert.ok(errors.some((e) => e.includes('aroma')))
    assert.ok(errors.some((e) => e.includes('sabor')))
  })

  test('productor: exige nombres y correo', () => {
    const errors = validateProductorBody({ dni: '123' })
    assert.ok(errors.length >= 2)
  })

  test('trazabilidad: exige lote_id y etapa', () => {
    assert.ok(validateCreateTrazabilidad({}).length >= 2)
    assert.equal(validateCreateTrazabilidad({ lote_id: 1, etapa: 'Secado' }).length, 0)
  })
})
