import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3029,
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cafe_sostenible',
    poolMin: Number(process.env.DB_POOL_MIN) || 2,
    poolMax: Number(process.env.DB_POOL_MAX) || 10
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'cafe_sostenible_dev_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5174,http://127.0.0.1:5174').split(',').map(s => s.trim()),
  requireAuth: process.env.REQUIRE_AUTH === 'true'
}
