import express from 'express'
import { db } from '../database.js'

const router = express.Router()

function nextCodigoProductor(lastCodigo) {
  if (!lastCodigo) return 'P001'
  const value = parseInt(lastCodigo.slice(1), 10)
  return `P${String(value + 1).padStart(3, '0')}`
}

router.get('/', (req, res) => {
  db.all(
    `SELECT id,
            codigo_productor AS codigo,
            nombres AS nombres,
            COALESCE(apellidos, '') AS apellidos,
            dni,
            telefono,
            correo,
            parcela,
            ubicacion,
            altitud,
            estado
     FROM productores
     ORDER BY id ASC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener productores', error: error.message })
      }
      res.json(rows)
    }
  )
})

router.post('/', (req, res) => {
  const body = req.body || {}
  const nombres = body.nombres || body.nombre || ''
  const apellidos = body.apellidos || body.apellido || ''
  const dni = body.dni || ''
  const telefono = body.telefono || ''
  const correo = body.correo || body.email || ''
  const parcela = body.parcela || ''
  const ubicacion = body.ubicacion || ''
  const altitud = body.altitud
  const estado = body.estado || 'Activo'
  if (!nombres || !apellidos || !dni || !correo) {
    return res.status(400).json({ message: 'Nombres, apellidos, DNI y correo son obligatorios' })
  }

  db.get(
    `SELECT MAX(CAST(SUBSTR(codigo_productor, 2) AS INTEGER)) AS max_codigo
     FROM productores
     WHERE codigo_productor LIKE 'P%'`,
    (error, row) => {
    if (error) {
      return res.status(500).json({ message: 'Error al generar código de productor', error: error.message })
    }

    const codigo = `P${String((Number(row?.max_codigo) || 0) + 1).padStart(3, '0')}`
    db.run(
      `INSERT INTO productores (codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [codigo, nombres.trim(), apellidos.trim(), String(dni).trim(), String(telefono).trim(), String(correo).trim(), String(parcela).trim(), String(ubicacion).trim(), Number(altitud) || 0, estado],
      function (insertError) {
        if (insertError) {
          return res.status(500).json({ message: 'Error al crear productor', error: insertError.message })
        }
        db.get('SELECT id, codigo_productor AS codigo, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado FROM productores WHERE id = ?', [this.lastID], (err, rowData) => {
          if (err) {
            return res.status(500).json({ message: 'Error al recuperar productor', error: err.message })
          }
          res.status(201).json(rowData)
        })
      }
    )
  })
})

router.put('/:id', (req, res) => {
  const { nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado } = req.body || {}
  const id = parseInt(req.params.id, 10)

  if (!id) {
    return res.status(400).json({ message: 'ID de productor inválido' })
  }

  if (!nombres || !apellidos || !dni || !correo) {
    return res.status(400).json({ message: 'Nombres, apellidos, DNI y correo son obligatorios' })
  }

  db.run(
    `UPDATE productores SET nombres = ?, apellidos = ?, dni = ?, telefono = ?, correo = ?, parcela = ?, ubicacion = ?, altitud = ?, estado = ? WHERE id = ?`,
    [nombres, apellidos, dni, telefono || '', correo, parcela || '', ubicacion || '', altitud || 0, estado || 'Activo', id],
    function (error) {
      if (error) {
        return res.status(500).json({ message: 'Error al actualizar productor', error: error.message })
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Productor no encontrado' })
      }
      db.get('SELECT id, codigo_productor AS codigo, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado FROM productores WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Error al recuperar productor actualizado', error: err.message })
        }
        res.json(row)
      })
    }
  )
})

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    return res.status(400).json({ message: 'ID de productor inválido' })
  }

  db.get('SELECT COUNT(*) AS count FROM lotes WHERE productor_id = ?', [id], (error, row) => {
    if (error) {
      return res.status(500).json({ message: 'Error verificando lotes del productor', error: error.message })
    }
    if (row.count > 0) {
      return res.status(400).json({ message: 'No se puede eliminar un productor con lotes registrados' })
    }

    db.run('DELETE FROM productores WHERE id = ?', [id], function (deleteError) {
      if (deleteError) {
        return res.status(500).json({ message: 'Error al eliminar productor', error: deleteError.message })
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Productor no encontrado' })
      }
      res.status(204).send()
    })
  })
})

export default router
