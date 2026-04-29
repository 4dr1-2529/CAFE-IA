import express from 'express'
import { db } from '../database.js'

const router = express.Router()

router.get('/', (req, res) => {
  db.all(
    `SELECT p.id, p.lote_id, l.codigo_lote AS codigo_lote,
            prod.nombres || ' ' || COALESCE(prod.apellidos, '') AS productor,
            p.humedad, p.temperatura, p.altitud, p.tipo_secado, p.variedad_cafe,
            p.calidad_predicha, p.confianza, p.recomendacion, p.factores_influyentes,
            p.fecha_prediccion, p.modelo AS modelo_usado
     FROM predicciones_ia p
     LEFT JOIN lotes l ON p.lote_id = l.id
     LEFT JOIN productores prod ON l.productor_id = prod.id
     WHERE p.lote_id IS NOT NULL
       AND l.codigo_lote IS NOT NULL
       AND prod.nombres IS NOT NULL
       AND COALESCE(p.origen, '') = 'usuario'
     ORDER BY p.id DESC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener predicciones', error: error.message })
      }
      const parsed = rows.map(row => {
        let factores = []
        try {
          factores = JSON.parse(row.factores_influyentes || '[]')
        } catch (_) {
          factores = []
        }
        return { ...row, factores }
      })
      res.json(parsed)
    }
  )
})

router.post('/', (req, res) => {
  const { lote_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_predicha, confianza, recomendacion, factores, modelo } = req.body || {}
  if (!lote_id || humedad == null || temperatura == null || altitud == null || !tipo_secado || !variedad_cafe || !calidad_predicha || confianza == null) {
    return res.status(400).json({ message: 'Faltan campos obligatorios para predicción' })
  }

  db.get('SELECT id FROM predicciones_ia WHERE lote_id = ? LIMIT 1', [lote_id], (existsError, existsRow) => {
    if (existsError) {
      return res.status(500).json({ message: 'Error validando predicción existente', error: existsError.message })
    }
    if (existsRow) {
      return res.status(409).json({ message: 'Este lote ya tiene una predicción IA registrada' })
    }

    const fecha_prediccion = new Date().toISOString().split('T')[0]
    const factores_influyentes = JSON.stringify(factores || [])
    const origen = 'usuario'

    db.run(
    `INSERT INTO predicciones_ia (lote_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_predicha, confianza, recomendacion, factores_influyentes, fecha_prediccion, modelo, origen)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [lote_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_predicha, confianza, recomendacion || '', factores_influyentes, fecha_prediccion, modelo || 'Modelo predictivo basado en reglas de Machine Learning', origen],
    function (error) {
      if (error) {
        return res.status(500).json({ message: 'Error al guardar predicción', error: error.message })
      }
      db.get(
        `SELECT p.id, p.lote_id, l.codigo_lote AS codigo_lote,
                prod.nombres || ' ' || COALESCE(prod.apellidos, '') AS productor,
                p.humedad, p.temperatura, p.altitud, p.tipo_secado, p.variedad_cafe,
                p.calidad_predicha, p.confianza, p.recomendacion, p.factores_influyentes,
                p.fecha_prediccion, p.modelo AS modelo_usado
         FROM predicciones_ia p
         LEFT JOIN lotes l ON p.lote_id = l.id
         LEFT JOIN productores prod ON l.productor_id = prod.id
         WHERE p.id = ?`,
        [this.lastID],
        (err, row) => {
          if (err) {
            return res.status(500).json({ message: 'Error al recuperar predicción', error: err.message })
          }
          res.status(201).json({ ...row, factores: JSON.parse(row.factores_influyentes || '[]') })
        }
      )
    }
  )
  })
})

export default router
