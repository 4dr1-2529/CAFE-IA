import express from 'express'
import { db } from '../database.js'

const router = express.Router()

router.get('/produccion', (req, res) => {
  db.get('SELECT COUNT(*) AS totalLotes, IFNULL(SUM(cantidad_kg), 0) AS totalKg FROM lotes', (error, row) => {
    if (error) {
      return res.status(500).json({ message: 'Error al obtener reporte de producción', error: error.message })
    }
    db.all(
      `SELECT strftime('%Y-%m', fecha_cosecha) AS mes, IFNULL(SUM(cantidad_kg), 0) AS produccion
       FROM lotes
       GROUP BY mes
       ORDER BY mes ASC`,
      (groupError, meses) => {
        if (groupError) {
          return res.status(500).json({ message: 'Error al obtener producción mensual', error: groupError.message })
        }
        db.all(
          `SELECT estado, COUNT(*) AS total
           FROM lotes
           GROUP BY estado`,
          (statusError, porEstado) => {
            if (statusError) {
              return res.status(500).json({ message: 'Error al obtener estados de lote', error: statusError.message })
            }
            res.json({
              totalLotes: row.totalLotes,
              totalKg: row.totalKg,
              porEstado,
              produccionMensual: meses
            })
          }
        )
      }
    )
  })
})

router.get('/calidad', (req, res) => {
  // Evaluaciones ÚNICAS por lote (última evaluación guardada por lote_id).
  db.all(
    `SELECT c.id, c.lote_id, l.codigo_lote AS lote_codigo,
            p.nombres || ' ' || COALESCE(p.apellidos, '') AS productor,
            l.variedad_cafe AS variedad_cafe,
            c.puntaje_taza, c.calidad_final, c.estado, c.fecha_evaluacion
     FROM control_calidad c
     INNER JOIN (
       SELECT lote_id, MAX(id) AS max_id
       FROM control_calidad
       GROUP BY lote_id
     ) u ON u.lote_id = c.lote_id AND u.max_id = c.id
     LEFT JOIN lotes l ON c.lote_id = l.id
     LEFT JOIN productores p ON l.productor_id = p.id
     ORDER BY c.id DESC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener reporte de calidad', error: error.message })
      }
      const porCalidad = {
        alta: rows.filter(item => item.calidad_final === 'Alta').length,
        media: rows.filter(item => item.calidad_final === 'Media').length,
        baja: rows.filter(item => item.calidad_final === 'Baja').length
      }
      const puntajePromedio = rows.length > 0 ? Math.round(rows.reduce((sum, item) => sum + (item.puntaje_taza || 0), 0) / rows.length) : 0
      res.json({ totalEvaluacionesUnicas: rows.length, porCalidad, puntajePromedio, evaluaciones: rows })
    }
  )
})

router.get('/predicciones', (req, res) => {
  db.all(
    `SELECT p.id, p.lote_id, l.codigo_lote AS lote_codigo,
            r.nombres || ' ' || COALESCE(r.apellidos, '') AS productor,
            p.humedad, p.temperatura, p.altitud, p.tipo_secado, p.variedad_cafe,
            p.calidad_predicha, p.confianza, p.recomendacion, p.factores_influyentes, p.fecha_prediccion, p.modelo
     FROM predicciones_ia p
     LEFT JOIN lotes l ON p.lote_id = l.id
     LEFT JOIN productores r ON l.productor_id = r.id
     WHERE p.lote_id IS NOT NULL
       AND l.codigo_lote IS NOT NULL
       AND r.nombres IS NOT NULL
       AND COALESCE(p.origen, '') = 'usuario'
     ORDER BY p.id DESC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener reporte de predicciones', error: error.message })
      }

      db.get('SELECT COUNT(*) AS total_lotes FROM lotes', (lotesError, lotesRow) => {
        if (lotesError) {
          return res.status(500).json({ message: 'Error al contar lotes', error: lotesError.message })
        }

        const data = rows.map(row => {
          let factores = []
          try {
            factores = JSON.parse(row.factores_influyentes || '[]')
          } catch (_) {
            factores = []
          }
          return { ...row, factores }
        })

        const totalPredicciones = data.length
        const totalLotes = Number(lotesRow?.total_lotes) || 0

        // Pendientes = lotes existentes sin predicción "usuario"
        db.get(
          `SELECT COUNT(*) AS pendientes
           FROM lotes l
           LEFT JOIN predicciones_ia p
             ON p.lote_id = l.id
            AND COALESCE(p.origen, '') = 'usuario'
           WHERE p.id IS NULL`,
          (pendErr, pendRow) => {
            if (pendErr) {
              return res.status(500).json({ message: 'Error al contar lotes pendientes', error: pendErr.message })
            }
            const pendientes = Number(pendRow?.pendientes) || Math.max(0, totalLotes - totalPredicciones)

            const resumen = {
              total_predicciones_reales: totalPredicciones,
              alta: data.filter(item => item.calidad_predicha === 'Alta').length,
              media: data.filter(item => item.calidad_predicha === 'Media').length,
              baja: data.filter(item => item.calidad_predicha === 'Baja').length,
              promedio_confianza: totalPredicciones > 0
                ? Number((data.reduce((acc, item) => acc + (Number(item.confianza) || 0), 0) / totalPredicciones).toFixed(2))
                : 0,
              lotes_pendientes_prediccion: pendientes
            }

            res.json({ resumen, predicciones: data })
          }
        )
      })
    }
  )
})

router.get('/trazabilidad', (req, res) => {
  db.all(
    `SELECT l.id AS lote_id, l.codigo_lote, l.variedad_cafe, l.estado AS estado_lote,
            l.cantidad_kg, l.fecha_cosecha,
            p.nombres || ' ' || COALESCE(p.apellidos, '') AS productor,
            p.parcela, p.ubicacion AS ubicacion_productor
     FROM lotes l
     LEFT JOIN productores p ON l.productor_id = p.id
     ORDER BY CAST(SUBSTR(l.codigo_lote, 6) AS INTEGER) DESC`,
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener reporte de trazabilidad', error: error.message })
      }

      db.all(
        `SELECT t.lote_id, t.etapa, t.fecha, t.ubicacion, t.estado
         FROM trazabilidad t
         ORDER BY (t.fecha IS NULL) ASC, t.fecha DESC, t.id DESC`,
        (etapasError, etapasRows) => {
          if (etapasError) {
            return res.status(500).json({ message: 'Error al obtener etapas de trazabilidad', error: etapasError.message })
          }

          const etapasByLote = new Map()
          etapasRows.forEach((row) => {
            if (!etapasByLote.has(row.lote_id)) etapasByLote.set(row.lote_id, [])
            etapasByLote.get(row.lote_id).push(row)
          })

          const registros = rows.map((lote) => {
            const etapas = etapasByLote.get(lote.lote_id) || []
            const ultimaEtapa = etapas[0] || null
            return {
              lote_id: lote.lote_id,
              lote_codigo: lote.codigo_lote,
              productor: lote.productor || '-',
              variedad_cafe: lote.variedad_cafe || '-',
              etapa_actual: ultimaEtapa?.etapa || 'Producción',
              ultima_fecha: ultimaEtapa?.fecha || lote.fecha_cosecha || null,
              ubicacion: ultimaEtapa?.ubicacion || lote.parcela || lote.ubicacion_productor || '-',
              estado: ultimaEtapa?.estado || lote.estado_lote || 'Pendiente',
              cantidad_kg: lote.cantidad_kg || 0
            }
          })

          const resumen = {
            total_lotes: registros.length,
            lotes_en_produccion: registros.filter(r => (r.etapa_actual || '').toLowerCase().includes('producción') || (r.etapa_actual || '').toLowerCase().includes('produccion')).length,
            lotes_en_secado: registros.filter(r => (r.etapa_actual || '').toLowerCase().includes('secado')).length,
            lotes_en_control_calidad: registros.filter(r => (r.etapa_actual || '').toLowerCase().includes('control de calidad') || (r.etapa_actual || '').toLowerCase().includes('calidad')).length,
            lotes_almacenados: registros.filter(r => (r.etapa_actual || '').toLowerCase().includes('almacenamiento')).length,
            lotes_comercializados: registros.filter(r => (r.etapa_actual || '').toLowerCase().includes('comercialización') || (r.etapa_actual || '').toLowerCase().includes('comercializacion')).length
          }

          res.json({ resumen, registros })
        }
      )
    }
  )
})

export default router
