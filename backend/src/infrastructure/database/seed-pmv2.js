import { PredictionEngine } from '../../domain/PredictionEngine.js'
import { queryOne, execute, query } from './pool.js'

const ETAPAS = [
  ['Producción', 'Registro y cosecha del lote en finca certificada.', 0, 'Completado'],
  ['Secado', 'Secado controlado según proceso seleccionado.', 7, 'Completado'],
  ['Control de calidad', 'Evaluación sensorial Q Grader.', 14, 'Completado'],
  ['Almacenamiento', 'Almacenamiento en silo con humedad controlada.', 21, 'En proceso'],
  ['Comercialización', 'Preparación para exportación y venta.', 28, 'Pendiente'],
]

const PRODUCTORES = [
  ['P001', 'Juan', 'Pérez', '40123456', '999111222', 'juan.perez@cafe.pe', 'Finca El Roble', 'Chanchamayo, Junín', 1650],
  ['P002', 'María', 'Gómez', '40234567', '999333444', 'maria.gomez@cafe.pe', 'Parcela La Selva', 'Perené, Junín', 1720],
  ['P003', 'Carlos', 'Quispe', '40345678', '999555666', 'carlos.quispe@cafe.pe', 'Alto Satipo', 'Satipo, Junín', 1580],
  ['P004', 'Rosa', 'Vilca', '40456789', '999777888', 'rosa.vilca@cafe.pe', 'Cooperativa Los Andes', 'Oxapampa, Pasco', 1850],
  ['P005', 'Pedro', 'Mamani', '40567890', '999999000', 'pedro.mamani@cafe.pe', 'Finca Huayna Verde', 'Villa Rica, Pasco', 1450],
]

const VARIEDADES = ['Arabica', 'Typica', 'Bourbon', 'Caturra', 'Catimor']
const SECADOS = ['Honey', 'Lavado', 'Natural']
const ESTADOS = ['Produccion', 'Secado', 'Calidad', 'Almacenamiento', 'Comercializacion']

async function ensureGeo() {
  let regionId = (await queryOne('SELECT id FROM regiones WHERE codigo=?', ['JUN']))?.id
  if (!regionId) {
    const r = await execute(`INSERT INTO regiones (codigo, nombre) VALUES ('JUN', 'Junín')`)
    regionId = r.insertId
  }
  let provId = (await queryOne('SELECT id FROM provincias WHERE codigo=? AND region_id=?', ['CHN', regionId]))?.id
  if (!provId) {
    const p = await execute(`INSERT INTO provincias (region_id, codigo, nombre) VALUES (?, 'CHN', 'Chanchamayo')`, [regionId])
    provId = p.insertId
  }
  let distId = (await queryOne('SELECT id FROM distritos WHERE codigo=? AND provincia_id=?', ['SRM', provId]))?.id
  if (!distId) {
    const d = await execute(`INSERT INTO distritos (provincia_id, codigo, nombre) VALUES (?, 'SRM', 'San Ramón')`, [provId])
    distId = d.insertId
  }
  return distId
}

async function clearDemoData() {
  console.log('PMV2 seed: limpiando datos demo anteriores...')
  await execute('SET FOREIGN_KEY_CHECKS = 0').catch(() => {})
  const tables = [
    'variables_prediccion',
    'recomendaciones_ia',
    'alertas_ia',
    'predicciones_ia',
    'control_calidad',
    'trazabilidad',
    'inventario',
    'produccion',
    'lotes',
    'productores',
  ]
  for (const t of tables) {
    await execute(`DELETE FROM ${t}`).catch((err) => {
      console.warn(`PMV2 seed: no se pudo limpiar ${t}:`, err.message?.slice(0, 80))
    })
    await execute(`ALTER TABLE ${t} AUTO_INCREMENT = 1`).catch(() => {})
  }
  await execute('SET FOREIGN_KEY_CHECKS = 1').catch(() => {})
  console.log('PMV2 seed: datos demo limpiados')
}

export async function seedPMV2Data(force = false) {
  const lotesCount = Number((await queryOne('SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL'))?.c) || 0
  if (!force && lotesCount >= 25) {
    console.log(`PMV2 seed: ya existen ${lotesCount} lotes (mínimo 25). Use SEED_PMV2_FORCE=1 para regenerar.`)
    return { skipped: true, lotes: lotesCount }
  }

  if (force || lotesCount > 0) await clearDemoData()

  const distritoId = await ensureGeo()
  const productorIds = []

  for (const p of PRODUCTORES) {
    await execute(
      `INSERT IGNORE INTO productores (distrito_id, codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo')`,
      [distritoId, ...p]
    ).catch(() => {})
    const row = await queryOne('SELECT id FROM productores WHERE codigo_productor = ?', [p[0]])
    if (row?.id) {
      productorIds.push(row.id)
    } else {
      console.warn(`PMV2 seed: no se pudo insertar/encontrar productor ${p[0]}`)
    }
  }

  let loteGlobal = 1
  const loteIds = []

  for (let pi = 0; pi < productorIds.length; pi++) {
    const productorId = productorIds[pi]
    const prod = PRODUCTORES[pi]
    const parcela = prod[6]
    const ubicacion = prod[7]
    const altBase = prod[9]

    for (let li = 0; li < 5; li++) {
      const codigo = `LOTE-${String(loteGlobal).padStart(4, '0')}`
      const variedad = VARIEDADES[li % VARIEDADES.length]
      const secado = SECADOS[li % SECADOS.length]
      const mes = 1 + ((pi + li) % 6)
      const fecha = `2025-${String(mes).padStart(2, '0')}-${String(10 + li).padStart(2, '0')}`
      const cantidad = 280 + pi * 40 + li * 35
      const humedad = 10.5 + li * 0.3 + pi * 0.1
      const temp = 18 + (li % 4)
      const altitud = altBase + li * 15
      const estado = ESTADOS[Math.min(li, ESTADOS.length - 1)]

      const ins = await execute(
        `INSERT INTO lotes (codigo_lote, productor_id, user_id, variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado, calidad_grano, tiempo_almacenamiento_dias, qr_codigo)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          codigo,
          productorId,
          1,
          variedad,
          fecha,
          cantidad,
          estado,
          humedad,
          temp,
          altitud,
          secado,
          li >= 3 ? 'Excelente' : li >= 1 ? 'Buena' : 'Regular',
          15 + li * 10,
          `CAFE-${loteGlobal}-PMV2`,
        ]
      )
      const loteId = ins.insertId
      loteIds.push({ id: loteId, codigo, humedad, temp, altitud, secado, variedad, fecha, parcela, ubicacion, li, pi })

      let orden = 1
      for (const [etapa, desc, dias, est] of ETAPAS) {
        const f = dias === 0 ? fecha : null
        const estadoEtapa = li >= 2 && etapa === 'Comercialización' ? 'Pendiente' : est
        await execute(
          `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, orden) VALUES (?,?,?,?,?,?,?)`,
          [loteId, etapa, desc, f, parcela, estadoEtapa, orden++]
        )
      }

      await execute(`INSERT INTO inventario (lote_id, cantidad_disponible_kg, fecha_actualizacion) VALUES (?,?,CURDATE())`, [
        loteId,
        cantidad,
      ])

      const aroma = 7 + (li % 3)
      const attrs = [aroma, 7 + li, 8, 7 + (pi % 2), 8, 7 + li]
      const puntaje = Math.round((attrs.reduce((a, v) => a + v, 0) / 6) * 10)
      let calidad_final = 'Regular'
      if (puntaje >= 85) calidad_final = 'Excelente'
      else if (puntaje >= 75) calidad_final = 'Buena'
      else if (puntaje >= 65) calidad_final = 'Aceptable'

      await execute(
        `INSERT INTO control_calidad (lote_id, aroma, sabor, cuerpo, acidez, dulzor, balance, puntaje_taza, calidad_final, estado, observaciones, fecha_evaluacion)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          loteId,
          ...attrs,
          puntaje,
          calidad_final,
          'Evaluado',
          `Evaluación PMV2 — lote ${codigo} con perfil ${calidad_final.toLowerCase()}.`,
          fecha,
        ]
      )

      loteGlobal++
    }
  }

  // Predicciones IA para ~15 lotes (3 por productor)
  let predCount = 0
  for (const l of loteIds) {
    if (predCount < 15 && (l.li % 2 !== 0 || l.pi < 3)) {
      const result = PredictionEngine.predict({
        humedad: Number(l.humedad),
        temperatura: Number(l.temp),
        altitud: Number(l.altitud),
        tipo_secado: l.secado,
        variedad_cafe: l.variedad,
        puntaje_taza: 70 + l.li * 3,
        tiempo_almacenamiento_dias: 20 + l.li * 5,
        calidad_grano: l.li >= 2 ? 'Excelente' : 'Buena',
      })
      const fecha = l.fecha
      const ins = await execute(
        `INSERT INTO predicciones_ia (lote_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_predicha, confianza, porcentaje_riesgo, recomendacion, factores_influyentes, fecha_prediccion, modelo, origen, version_modelo)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'usuario',?)`,
        [
          l.id,
          l.humedad,
          l.temp,
          l.altitud,
          l.secado,
          l.variedad,
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
      for (const al of result.alertas.slice(0, 2)) {
        await execute(
          `INSERT INTO alertas_ia (lote_id, prediccion_id, tipo_alerta, severidad, mensaje) VALUES (?,?,?,?,?)`,
          [l.id, ins.insertId, al.tipo, al.severidad, al.mensaje]
        ).catch(() => {})
      }
      predCount++
    }
  }

  console.log(`PMV2 seed: ${productorIds.length} productores, ${loteIds.length} lotes, ${predCount} predicciones IA`)
  return { productores: productorIds.length, lotes: loteIds.length, predicciones: predCount }
}
