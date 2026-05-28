import { loadEnv, getMysqlConfig } from './database.js'

loadEnv()

const db = getMysqlConfig()

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3029,
  db,
  jwt: {
    secret: process.env.JWT_SECRET || 'cafe_sostenible_dev_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5174,http://127.0.0.1:5174')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  requireAuth: process.env.REQUIRE_AUTH === 'true',
  allowPublicRegister: process.env.ALLOW_PUBLIC_REGISTER === 'true',
}
