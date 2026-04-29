import express from 'express'
import { db } from '../database.js'

const router = express.Router()

router.get('/', (req, res) => {
  const loteId = req.query.lote_id
  const baseQuery = `SELECT t.id, t.lote_id, l.codigo_lote AS lote_codigo,
                            p.nombres || ' ' || COALESCE(p.apellidos, '') AS productor,
                            t.etapa, t.descripcion, t.fecha, t.ubicacion, t.estado
                     FROM trazabilidad t
                     LEFT JOIN lotes l ON t.lote_id = l.id
                     LEFT JOIN productores p ON l.productor_id = p.id`
  const query = loteId
    ? `${baseQuery} WHERE t.lote_id = ? ORDER BY t.fecha DESC, t.id DESC`
    : `${baseQuery}
       ORDER BY CAST(SUBSTR(l.codigo_lote, 6) AS INTEGER) DESC, t.fecha DESC, t.id DESC`

  db.all(query, loteId ? [loteId] : [], (error, rows) => {
    if (error) {
      return res.status(500).json({ message: 'Error al obtener trazabilidad', error: error.message })
    }
    res.json(rows)
  })
})

router.post('/', (req, res) => {
  const { lote_id, etapa, descripcion, fecha, ubicacion, estado } = req.body || {}
  if (!lote_id || !etapa || !descripcion || !ubicacion) {
    return res.status(400).json({ message: 'Faltan campos obligatorios para crear trazabilidad' })
  }
  const resolvedFecha = fecha || null
  const resolvedEstado = estado || (resolvedFecha ? 'Completado' : 'Pendiente')

  db.run(
    `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [lote_id, etapa, descripcion, resolvedFecha, ubicacion, resolvedEstado],
    function (error) {
      if (error) {
        return res.status(500).json({ message: 'Error al guardar trazabilidad', error: error.message })
      }
      db.get('SELECT * FROM trazabilidad WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Error al recuperar trazabilidad', error: err.message })
        }
        res.status(201).json(row)
      })
    }
  )
})

export default router
