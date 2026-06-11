import crypto from 'node:crypto'
import { loadEnv, getMysqlConfig } from './database.js'

loadEnv()

const db = getMysqlConfig()

let devJwtSecret

function resolveJwtSecret() {
  const secret = process.env.JWT_SECRET?.trim()
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET es obligatorio en producción. Defínalo en las variables de entorno.')
  }
  if (!devJwtSecret) {
    console.warn('[env] JWT_SECRET no definido; generando secreto efímero para desarrollo local.')
    devJwtSecret = crypto.randomBytes(32).toString('hex')
  }
  return devJwtSecret
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3029,
  db,
  jwt: {
    secret: resolveJwtSecret(),
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5174,http://127.0.0.1:5174,https://cafe-ia-inky.vercel.app')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  requireAuth: process.env.REQUIRE_AUTH === 'true',
  allowPublicRegister: process.env.ALLOW_PUBLIC_REGISTER === 'true',
}
