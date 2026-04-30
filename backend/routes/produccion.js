import express from 'express'
import { db } from '../database.js'

const router = express.Router()

router.get('/', (req, res) => {
  db.all(
    `SELECT pr.id, pr.lote_id, l.codigo_lote AS lote_codigo,
            p.nombres || ' ' || COALESCE(p.apellidos, '') AS productor,
            pr.humedad, pr.temperatura, pr.altitud, pr.tipo_secado, pr.fecha_registro
     FROM produccion pr
     LEFT JOIN lotes l ON pr.lote_id = l.id
     LEFT JOIN productores p ON l.productor_id = p.id
     ORDER BY pr.id DESC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener producción', error: error.message })
      }
      res.json(rows)
    }
  )
})

router.post('/', (req, res) => {
  const { lote_id, humedad, temperatura, altitud, tipo_secado, fecha_registro } = req.body || {}
  if (!lote_id || humedad == null || temperatura == null || altitud == null || !tipo_secado || !fecha_registro) {
    return res.status(400).json({ message: 'Faltan campos obligatorios para registrar producción' })
  }

  if (humedad < 0 || humedad > 100 || altitud <= 0 || temperatura < -10 || temperatura > 60) {
    return res.status(400).json({ message: 'Valores de producción inválidos' })
  }

  db.run(
    `INSERT INTO produccion (lote_id, humedad, temperatura, altitud, tipo_secado, fecha_registro)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [lote_id, humedad, temperatura, altitud, tipo_secado, fecha_registro],
    function (error) {
      if (error) {
        return res.status(500).json({ message: 'Error al guardar la producción', error: error.message })
      }
      // Respuesta solo con INSERT + lastID: evita segundo query que puede fallar (bloqueos / mismo pool).
      res.status(201).json({
        id: this.lastID,
        lote_id: Number(lote_id),
        humedad,
        temperatura,
        altitud,
        tipo_secado,
        fecha_registro
      })
    }
  )
})

export default router
