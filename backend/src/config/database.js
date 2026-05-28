import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Carga .env local sin sobrescribir variables ya definidas (Railway, etc.). */
export function loadEnv() {
  dotenv.config({
    path: path.join(__dirname, '../../.env'),
    override: false,
  })
}

const REQUIRED_MYSQL_KEYS = [
  'MYSQLHOST',
  'MYSQLPORT',
  'MYSQLUSER',
  'MYSQLPASSWORD',
  'MYSQLDATABASE',
]

export function logMysqlEnvForRailway() {
  console.log('MYSQLHOST=', process.env.MYSQLHOST)
  console.log('MYSQLUSER=', process.env.MYSQLUSER)
  console.log('MYSQLPORT=', process.env.MYSQLPORT)
  console.log('MYSQLDATABASE=', process.env.MYSQLDATABASE)
}

export function assertMysqlEnv() {
  logMysqlEnvForRailway()
  const missing = REQUIRED_MYSQL_KEYS.filter((key) => {
    if (key === 'MYSQLPASSWORD') return process.env.MYSQLPASSWORD === undefined
    const val = process.env[key]
    return val === undefined || String(val).trim() === ''
  })
  if (missing.length > 0) {
    throw new Error(
      `Variables MySQL obligatorias ausentes: ${missing.join(', ')}. ` +
        'En Railway vincule el servicio MySQL (MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE). ' +
        'En local copie backend/.env.example a .env usando solo prefijo MYSQL*.'
    )
  }
}

/** Configuración MySQL: únicamente process.env.MYSQL* (sin localhost/root fallback). */
export function getMysqlConfig() {
  assertMysqlEnv()
  const ssl =
    process.env.MYSQL_SSL === 'true' || process.env.RAILWAY_ENVIRONMENT
      ? { rejectUnauthorized: false }
      : undefined

  return {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    poolMin: Number(process.env.DB_POOL_MIN) || 2,
    poolMax: Number(process.env.DB_POOL_MAX) || 10,
    ssl,
    railway: Boolean(
      process.env.RAILWAY_ENVIRONMENT ||
        process.env.RAILWAY_SERVICE_NAME ||
        process.env.RAILWAY_PROJECT_ID
    ),
  }
}

export function logDatabaseTarget(db) {
  console.log(`[MySQL] Host: ${db.host}:${db.port}`)
  console.log(`[MySQL] Base: ${db.database} | Usuario: ${db.user}`)
  if (db.ssl) console.log('[MySQL] SSL: activado')
  if (db.railway) console.log('[MySQL] Railway: sí')
}
