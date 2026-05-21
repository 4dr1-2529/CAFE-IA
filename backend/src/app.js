import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import apiRouter from './interfaces/http/routes/index.js'

export function createApp() {
  const app = express()
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 500,
      standardHeaders: true,
      legacyHeaders: false,
    })
  )

  const extraOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5175', 'http://127.0.0.1:5175']
  const allowedOrigins = [...new Set([...env.corsOrigins, ...extraOrigins])]

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
        return callback(new Error('CORS policy: origin not allowed'))
      },
      optionsSuccessStatus: 200
    })
  )
  app.use(express.json({ limit: '2mb' }))

  app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Café Sostenible AI backend activo', db: 'MySQL', architecture: 'hexagonal' })
  })

  app.get('/api/health', (req, res) => {
    res.json({
      ok: true,
      revision: 'mysql-hexagonal-v2.0',
      port: env.port,
      pid: process.pid,
      database: env.db.database
    })
  })

  app.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    next()
  }, apiRouter)

  app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' })
  })

  app.use((err, req, res, _next) => {
    if (err.status && err.status < 500) {
      return res.status(err.status).json({ message: err.message })
    }
    console.error('Unhandled server error:', err)
    res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' })
  })

  return app
}
