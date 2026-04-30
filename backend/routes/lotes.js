import express from 'express'
import { db } from '../database.js'

const router = express.Router()

function formatNextCodigoFromMaxId(nextId) {
  const n = Number(nextId)
  const safe = Number.isFinite(n) && n >= 1 ? n : 1
  return `LOTE-${String(safe).padStart(4, '0')}`
}

function fechaPrimeraEtapaISO(fechaCosecha) {
  if (!fechaCosecha || typeof fechaCosecha !== 'string') return null
  const trimmed = fechaCosecha.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed
  const d = new Date(trimmed)
  if (!Number.isFinite(d.getTime())) return trimmed.slice(0, 10)
  try {
    return d.toISOString().split('T')[0]
  } catch {
    return trimmed.slice(0, 10)
  }
}

function createTrazabilidades(loteId, fechaCosecha, ubicacion) {
  const etapas = [
    { etapa: 'Producción', descripcion: 'Registro inicial del lote.' },
    { etapa: 'Secado', descripcion: 'Secado del café tras la cosecha.' },
    { etapa: 'Control de calidad', descripcion: 'Inspección sensorial del lote.' },
    { etapa: 'Almacenamiento', descripcion: 'Guardado en sala de almacenamiento.' },
    { etapa: 'Comercialización', descripcion: 'Preparado para venta y entrega.' }
  ]

  etapas.forEach(({ etapa, descripcion }, index) => {
    const fecha = index === 0 ? fechaPrimeraEtapaISO(fechaCosecha) : null
    const estado = index === 0 ? 'Completado' : 'Pendiente'
    db.run(
      `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [loteId, etapa, descripcion, fecha, ubicacion, estado]
    )
  })
}

router.get('/', (req, res) => {
  db.all(
    `SELECT lotes.id, lotes.codigo_lote, lotes.productor_id, lotes.variedad_cafe, lotes.fecha_cosecha,
            lotes.cantidad_kg, lotes.estado, lotes.humedad, lotes.temperatura, lotes.altitud, lotes.tipo_secado,
            productores.codigo_productor AS productor_codigo,
            productores.nombres || ' ' || COALESCE(productores.apellidos, '') AS productor,
            productores.parcela AS parcela,
            productores.ubicacion AS ubicacion_productor
     FROM lotes
     LEFT JOIN productores ON lotes.productor_id = productores.id
     ORDER BY lotes.id DESC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener lotes', error: error.message })
      }
      res.json(rows)
    }
  )
})

router.get('/next-code', (req, res) => {
  db.get('SELECT COALESCE(MAX(id), 0) AS max_id FROM lotes', (error, row) => {
    if (error) {
      return res.status(500).json({ message: 'Error al obtener siguiente código de lote', error: error.message })
    }
    const maxId = Number(row?.max_id)
    const nextId = Number.isFinite(maxId) ? maxId + 1 : 1
    res.json({ nextCode: formatNextCodigoFromMaxId(nextId) })
  })
})

router.post('/', (req, res) => {
  const {
    codigo_lote,
    productor_id,
    variedad_cafe,
    fecha_cosecha,
    cantidad_kg,
    humedad,
    temperatura,
    altitud,
    tipo_secado,
    estado
  } = req.body || {}

  if (!productor_id || !variedad_cafe || !fecha_cosecha || cantidad_kg == null || humedad == null || temperatura == null || altitud == null || !tipo_secado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios para crear lote' })
  }

  if (cantidad_kg <= 0 || humedad < 0 || humedad > 100 || temperatura < -10 || temperatura > 60 || altitud <= 0) {
    return res.status(400).json({ message: 'Valores de lote inválidos' })
  }

  const insertLote = (code) => {
    db.run(
      `INSERT INTO lotes (codigo_lote, productor_id, variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, productor_id, variedad_cafe, fecha_cosecha, cantidad_kg, estado || 'Produccion', humedad, temperatura, altitud, tipo_secado],
      function (error) {
        if (error) {
          const dup =
            typeof error.message === 'string' &&
            (error.message.includes('UNIQUE constraint') || error.message.includes('unique constraint'))
          if (dup) {
            return res.status(409).json({ message: 'Ya existe un lote con ese código. Use otro código o borre el duplicado.' })
          }
          return res.status(500).json({ message: 'Error al registrar lote', error: error.message })
        }

        db.get('SELECT parcela, ubicacion FROM productores WHERE id = ?', [productor_id], (prodErr, productorRow) => {
          if (prodErr) {
            console.warn('No se encontró ubicación del productor:', prodErr.message)
          }
          const ubicacion = productorRow?.parcela || productorRow?.ubicacion || ''
          try {
            createTrazabilidades(this.lastID, fecha_cosecha, ubicacion)
          } catch (te) {
            console.error('createTrazabilidades:', te)
          }
          db.get('SELECT * FROM lotes WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
              return res.status(500).json({ message: 'Error al recuperar lote', error: err.message })
            }
            res.status(201).json(row)
          })
        })
      }
    )
  }

  const trimmedCodigo = typeof codigo_lote === 'string' ? codigo_lote.trim() : ''
  if (trimmedCodigo) {
    insertLote(trimmedCodigo)
  } else {
    db.get('SELECT COALESCE(MAX(id), 0) AS max_id FROM lotes', (error, row) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener siguiente código de lote', error: error.message })
      }
      const maxId = Number(row?.max_id)
      const nextId = Number.isFinite(maxId) ? maxId + 1 : 1
      insertLote(formatNextCodigoFromMaxId(nextId))
    })
  }
})

export default router
