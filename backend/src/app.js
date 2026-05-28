import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import apiRouter from './interfaces/http/routes/index.js'
import { userFacingMessage } from './shared/apiResponse.js'
import { readGuard } from './interfaces/http/middleware/rbac.js'
import { asyncHandler } from './shared/asyncHandler.js'
import { BaseDatosController } from './interfaces/http/controllers/BaseDatosController.js'

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

  const devOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174', 'http://localhost:5175', 'http://127.0.0.1:5175']
  const allowedOrigins = [...new Set([...env.corsOrigins, ...(env.nodeEnv !== 'production' ? devOrigins : [])])]

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
        // Dev: permitir Vite en LAN (ej. http://192.168.x.x:5174)
        if (env.nodeEnv !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)) {
          return callback(null, true)
        }
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
      revision: 'mysql-hexagonal-v2.4-stable',
      port: env.port,
      pid: process.pid,
      database: env.db.database,
      routes: ['GET /api/dashboard', 'GET /api/usuarios', 'GET /api/auth/usuarios'],
    })
  })

  app.get('/api/base-datos', readGuard, asyncHandler(BaseDatosController.resumen))
  app.get('/api/base-datos/:tabla', readGuard, asyncHandler(BaseDatosController.tabla))

  app.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    next()
  }, apiRouter)

  app.use((req, res) => {
    res.status(404).json({ ok: false, message: 'Ruta no encontrada' })
  })

  app.use((err, req, res, _next) => {
    const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 500
    if (status >= 500) console.error('Unhandled server error:', err)
    res.status(status).json({ ok: false, message: userFacingMessage(err, env.nodeEnv) })
  })

  return app
}
