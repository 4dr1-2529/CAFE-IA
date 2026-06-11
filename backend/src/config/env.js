import { loadEnv, getMysqlConfig } from './database.js'

loadEnv()

const db = getMysqlConfig()
const MIN_JWT_SECRET_LEN = 32

function resolveJwtSecret() {
  const secret = process.env.JWT_SECRET?.trim()
  if (!secret) {
    throw new Error('JWT_SECRET es obligatorio. Copie backend/.env.example a backend/.env y defina un secreto.')
  }
  if (secret.length < MIN_JWT_SECRET_LEN) {
    throw new Error(`JWT_SECRET debe tener al menos ${MIN_JWT_SECRET_LEN} caracteres.`)
  }
  return secret
}

function parseCorsOrigins() {
  const raw = process.env.CORS_ORIGINS?.trim()
  if (raw) {
    return raw.split(',').map((s) => s.trim()).filter(Boolean)
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CORS_ORIGINS es obligatorio en producción.')
  }
  return ['http://localhost:5174', 'http://127.0.0.1:5174']
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
  corsOrigins: parseCorsOrigins(),
  requireAuth: process.env.REQUIRE_AUTH === 'true',
  allowPublicRegister: process.env.ALLOW_PUBLIC_REGISTER === 'true',
}
