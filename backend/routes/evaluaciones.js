import express from 'express'
import { db } from '../database.js'

const router = express.Router()

function calcularCalidad(puntaje) {
  if (puntaje >= 85) return 'Alta'
  if (puntaje >= 70) return 'Media'
  return 'Baja'
}

router.get('/', (req, res) => {
  db.all(
    `SELECT c.id, c.lote_id, l.codigo_lote AS lote_codigo, p.codigo_productor AS productor_codigo,
            p.nombres || ' ' || p.apellidos AS productor, c.aroma, c.acidez, c.cuerpo, c.sabor,
            c.balance, c.puntaje_taza, c.defectos, c.calidad_final, c.observaciones, c.fecha
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
  const { lote_id, aroma, acidez, cuerpo, sabor, balance, puntaje_taza, defectos, observaciones } = req.body || {}
  if (!lote_id || aroma == null || acidez == null || cuerpo == null || sabor == null || balance == null || puntaje_taza == null || defectos == null) {
    return res.status(400).json({ message: 'Faltan campos obligatorios para registrar la evaluación' })
  }

  if (puntaje_taza < 1 || puntaje_taza > 100) {
    return res.status(400).json({ message: 'El puntaje de calidad debe estar entre 1 y 100' })
  }

  const calidad_final = calcularCalidad(puntaje_taza)
  const fecha = new Date().toISOString().split('T')[0]

  db.run(
    `INSERT INTO control_calidad (lote_id, aroma, acidez, cuerpo, sabor, balance, puntaje_taza, defectos, calidad_final, observaciones, fecha)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [lote_id, aroma, acidez, cuerpo, sabor, balance, puntaje_taza, defectos, calidad_final, observaciones || '', fecha],
    function (error) {
      if (error) {
        return res.status(500).json({ message: 'Error al guardar la evaluación', error: error.message })
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
        `SELECT c.id, c.lote_id, l.codigo_lote AS lote_codigo, p.codigo_productor AS productor_codigo,
                p.nombres || ' ' || p.apellidos AS productor, c.aroma, c.acidez, c.cuerpo, c.sabor,
                c.balance, c.puntaje_taza, c.defectos, c.calidad_final, c.observaciones, c.fecha
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
