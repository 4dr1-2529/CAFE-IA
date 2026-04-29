import express from 'express'
import { db } from '../database.js'

const router = express.Router()

function calcularCalidad(puntaje) {
  if (puntaje >= 85) return 'Alta'
  if (puntaje >= 70) return 'Media'
  return 'Baja'
}

function calcularEstado(calidad) {
  if (calidad === 'Alta') return 'Aprobado'
  if (calidad === 'Media') return 'Observado'
  return 'Rechazado'
}

router.get('/', (req, res) => {
  db.all(
    `SELECT c.id, c.lote_id, l.codigo_lote AS lote_codigo,
            p.nombres || ' ' || COALESCE(p.apellidos, '') AS productor,
            c.aroma, c.acidez, c.cuerpo, c.sabor, c.balance, c.puntaje_taza,
            c.defectos, c.calidad_final, c.estado, c.observaciones, c.fecha_evaluacion
     FROM control_calidad c
     LEFT JOIN lotes l ON c.lote_id = l.id
     LEFT JOIN productores p ON l.productor_id = p.id
     ORDER BY c.id DESC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener control de calidad', error: error.message })
      }
      res.json(rows)
    }
  )
})

router.post('/', (req, res) => {
  const { lote_id, aroma, acidez, cuerpo, sabor, balance, defectos, observaciones, puntaje } = req.body || {}

  if (!lote_id || aroma == null || acidez == null || cuerpo == null || sabor == null || balance == null) {
    return res.status(400).json({ message: 'Faltan campos obligatorios para control de calidad' })
  }

  // Validar parámetros en rango 1-10
  const valores = [aroma, acidez, cuerpo, sabor, balance]
  const valoresInvalidos = valores.some(valor => typeof valor !== 'number' || valor < 1 || valor > 10)

  if (valoresInvalidos) {
    return res.status(400).json({ message: 'Los parámetros de cata deben estar entre 1 y 10' })
  }

  // Calcular puntaje si no viene en la request
  let puntajeFinal = puntaje
  if (puntajeFinal == null) {
    const suma = aroma + acidez + cuerpo + sabor + balance
    puntajeFinal = (suma / 50) * 100 - (defectos || 0)
    puntajeFinal = Math.max(0, Math.min(100, puntajeFinal))
  }

  // Determinar calidad basado en puntaje 0-100
  let calidad_final = 'Baja'
  if (puntajeFinal >= 85) calidad_final = 'Alta'
  else if (puntajeFinal >= 70) calidad_final = 'Media'

  const estado = calcularEstado(calidad_final)
  const fechaEvaluacion = new Date().toISOString().split('T')[0]

  db.run(
    `INSERT INTO control_calidad (lote_id, aroma, acidez, cuerpo, sabor, balance, puntaje_taza, defectos, calidad_final, estado, observaciones, fecha_evaluacion)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [lote_id, aroma, acidez, cuerpo, sabor, balance, puntajeFinal, defectos || 0, calidad_final, estado, observaciones || '', fechaEvaluacion],
    function (error) {
      if (error) {
        return res.status(500).json({ message: 'Error al guardar evaluación de calidad', error: error.message })
      }

      db.run(
        'UPDATE lotes SET estado = ? WHERE id = ?',
        ['Calidad', lote_id],
        (updateError) => {
          if (updateError) {
            console.warn('No se actualizó el estado del lote:', updateError.message)
          }
        }
      )

      db.get(
        `SELECT c.id, c.lote_id, l.codigo_lote AS lote_codigo,
                p.nombres || ' ' || COALESCE(p.apellidos, '') AS productor,
                c.aroma, c.acidez, c.cuerpo, c.sabor, c.balance, c.puntaje_taza,
                c.defectos, c.calidad_final, c.estado, c.observaciones, c.fecha_evaluacion
         FROM control_calidad c
         LEFT JOIN lotes l ON c.lote_id = l.id
         LEFT JOIN productores p ON l.productor_id = p.id
         WHERE c.id = ?`,
        [this.lastID],
        (err, row) => {
          if (err) {
            return res.status(500).json({ message: 'Error al recuperar evaluación', error: err.message })
          }
          res.status(201).json(row)
        }
      )
    }
  )
})

export default router
