import express from 'express'
import cors from 'cors'
import { initDatabase, db } from './database.js'
import productoresRouter from './routes/productores.js'
import lotesRouter from './routes/lotes.js'
import produccionRouter from './routes/produccion.js'
import trazabilidadRouter from './routes/trazabilidad.js'
import evaluacionesRouter from './routes/evaluaciones.js'
import calidadRouter from './routes/calidad.js'
import prediccionesRouter from './routes/predicciones.js'
import reportesRouter from './routes/reportes.js'

const app = express()
const PORT = 3001
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('CORS policy: origin not allowed'))
    },
    optionsSuccessStatus: 200
  })
)
app.use(express.json())

// Para comprobar que corres el backend nuevo: GET http://localhost:3001/api/health
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    revision: 'produccion-20260429-insert-only',
    port: PORT,
    pid: process.pid
  })
})

app.use('/api/productores', productoresRouter)
app.use('/api/lotes', lotesRouter)
app.use('/api/produccion', produccionRouter)
app.use('/api/trazabilidad', trazabilidadRouter)
app.use('/api/evaluaciones', evaluacionesRouter)
app.use('/api/control-calidad', calidadRouter)
app.use('/api/predicciones', prediccionesRouter)
app.use('/api/reportes', reportesRouter)

app.post('/api/prediccion-ia', (req, res) => {
  // Aceptar `lote_id` (snake_case) como contrato principal.
  // También tolerar `loteId` por compatibilidad si algún cliente lo envía así.
  const { lote_id, loteId } = req.body || {}
  const loteIdNum = Number(lote_id ?? loteId)

  if (!loteIdNum) {
    return res.status(400).json({ message: 'Selecciona un lote pendiente para ejecutar la predicción' })
  }

  // 1) Validar que el lote exista (y obtener sus variables reales)
  db.get(
    `SELECT l.id AS lote_id, l.codigo_lote, l.variedad_cafe, l.humedad, l.temperatura, l.altitud, l.tipo_secado,
            prod.nombres || ' ' || COALESCE(prod.apellidos, '') AS productor
     FROM lotes l
     LEFT JOIN productores prod ON l.productor_id = prod.id
     WHERE l.id = ?
     LIMIT 1`,
    [loteIdNum],
    (loteErr, loteRow) => {
      if (loteErr) {
        return res.status(500).json({ message: 'Error buscando lote en SQLite', error: loteErr.message })
      }
      if (!loteRow?.lote_id) {
        return res.status(404).json({ message: 'El lote seleccionado no existe' })
      }

      // 2) Validar que no tenga predicción previa (predicción real de usuario)
      db.get(
        `SELECT id
         FROM predicciones_ia
         WHERE lote_id = ?
           AND COALESCE(origen, '') = 'usuario'
         LIMIT 1`,
        [loteIdNum],
        (existingError, existingRow) => {
          if (existingError) {
            return res.status(500).json({ message: 'Error validando predicción existente', error: existingError.message })
          }
          if (existingRow) {
            return res.status(409).json({ message: 'Este lote ya tiene predicción IA registrada' })
          }

          // 3) Tomar puntaje de calidad si existe (última evaluación por lote)
          db.get(
            `SELECT puntaje_taza
             FROM control_calidad
             WHERE lote_id = ?
             ORDER BY id DESC
             LIMIT 1`,
            [loteIdNum],
            (puntajeErr, puntajeRow) => {
              if (puntajeErr) {
                return res.status(500).json({ message: 'Error obteniendo puntaje de calidad', error: puntajeErr.message })
              }

              const humedad = loteRow.humedad
              const temperatura = loteRow.temperatura
              const altitud = loteRow.altitud
              const tipo_secado = loteRow.tipo_secado
              const variedad_cafe = loteRow.variedad_cafe
              const puntaje_taza = puntajeRow?.puntaje_taza ?? null

              if (humedad == null || temperatura == null || altitud == null || !tipo_secado || !variedad_cafe) {
                return res.status(400).json({ message: 'El lote no tiene variables completas para ejecutar la predicción (humedad/temperatura/altitud/tipo de secado/variedad)' })
              }

              // 4) Calcular predicción (reglas ML)
              const factores = []
              let score = 45

              if (humedad >= 10 && humedad <= 12) {
                score += 18
                factores.push({ factor: 'Humedad', impacto: 'Positivo', descripcion: 'Humedad ideal para secado y calidad' })
              } else if (humedad > 12 && humedad <= 15) {
                score += 5
                factores.push({ factor: 'Humedad', impacto: 'Neutral', descripcion: 'Humedad aceptable' })
              } else {
                score -= 8
                factores.push({ factor: 'Humedad', impacto: 'Negativo', descripcion: 'Humedad fuera del rango recomendado' })
              }

              if (temperatura >= 18 && temperatura <= 22) {
                score += 15
                factores.push({ factor: 'Temperatura', impacto: 'Positivo', descripcion: 'Temperatura estable para el proceso' })
              } else if (temperatura > 22 && temperatura <= 26) {
                score += 3
                factores.push({ factor: 'Temperatura', impacto: 'Neutral', descripcion: 'Temperatura alta, vigilar control' })
              } else {
                score -= 7
                factores.push({ factor: 'Temperatura', impacto: 'Negativo', descripcion: 'Temperatura crítica' })
              }

              if (altitud >= 1500 && altitud <= 2000) {
                score += 12
                factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud óptima para café especial' })
              } else if (altitud > 2000) {
                score += 7
                factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud muy alta, café gourmet' })
              } else {
                score -= 5
                factores.push({ factor: 'Altitud', impacto: 'Negativo', descripcion: 'Altitud por debajo del rango premium' })
              }

              if (['Arabica', 'Typica', 'Bourbon', 'Caturra', 'Catimor'].includes(variedad_cafe)) {
                score += 10
                factores.push({ factor: 'Variedad de café', impacto: 'Positivo', descripcion: 'Variedad de alta calidad reconocida' })
              } else {
                score += 4
                factores.push({ factor: 'Variedad de café', impacto: 'Neutral', descripcion: 'Variedad resistente y adaptable' })
              }

              if (puntaje_taza != null) {
                score = (score + Number(puntaje_taza)) / 2
                factores.push({ factor: 'Puntaje de calidad', impacto: 'Positivo', descripcion: 'Evaluación sensorial complementa la predicción' })
              }

              const confianza = Math.min(99, Math.max(55, Math.round(score)))
              let calidad_predicha = 'Media'
              let recomendacion = 'Controlar procesos y validar con prueba sensorial.'

              if (score >= 80) {
                calidad_predicha = 'Alta'
                recomendacion = 'Lote con alto potencial. Continuar con secado cuidadoso y preparación para mercados premium.'
              } else if (score >= 65) {
                calidad_predicha = 'Media'
                recomendacion = 'Optimizar secado y mantener calidad en los próximos procesos.'
              } else {
                calidad_predicha = 'Baja'
                recomendacion = 'Revisar lotes y considerar mejora en secado y almacenamiento.'
              }

              // 5) Guardar en SQLite
              const fecha_prediccion = new Date().toISOString().split('T')[0]
              const factores_influyentes = JSON.stringify(factores)
              const modelo_usado = 'Modelo predictivo basado en reglas de Machine Learning'
              const origen = 'usuario'

              db.run(
                `INSERT INTO predicciones_ia (lote_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_predicha, confianza, recomendacion, factores_influyentes, fecha_prediccion, modelo, origen)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [loteIdNum, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_predicha, confianza, recomendacion, factores_influyentes, fecha_prediccion, modelo_usado, origen],
                function (error) {
                  if (error) {
                    if (String(error.message || '').toLowerCase().includes('unique')) {
                      return res.status(409).json({ message: 'Este lote ya tiene predicción IA registrada' })
                    }
                    return res.status(500).json({ message: 'Error guardando la predicción IA', error: error.message })
                  }

                  // 6) Respuesta completa
                  const response = {
                    id: this.lastID,
                    lote_id: loteRow.lote_id,
                    codigo_lote: loteRow.codigo_lote,
                    productor: loteRow.productor,
                    variedad_cafe,
                    humedad,
                    temperatura,
                    altitud,
                    tipo_secado,
                    calidad_predicha,
                    confianza,
                    factores_influyentes: factores,
                    recomendacion,
                    modelo_usado,
                    fecha_prediccion
                  }
                  res.status(201).json({ ...response, factores })
                }
              )
            }
          )
        }
      )
    }
  )
})

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Café Sostenible AI backend activo' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err)
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  })
})

initDatabase((dbError) => {
  if (dbError) {
    console.error('Error inicializando la base de datos:', dbError)
    process.exit(1)
  }

  const server = app.listen(PORT, () => {
    console.log(`Backend iniciado en http://localhost:${PORT}`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Puerto ${PORT} ya está en uso. Detenga la otra instancia y reinicie el backend.`)
      process.exit(1)
    } else {
      console.error('Error iniciando servidor:', err)
      process.exit(1)
    }
  })
})
