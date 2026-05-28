/**
 * Resolución de conexión MySQL: Railway (MYSQL*) → .env local (DB_*) → defaults dev.
 */
function pick(...values) {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== '') return v
  }
  return undefined
}

export function isRailwayRuntime() {
  return Boolean(
    process.env.RAILWAY_ENVIRONMENT ||
      process.env.RAILWAY_SERVICE_NAME ||
      process.env.RAILWAY_PROJECT_ID ||
      process.env.MYSQLHOST
  )
}

export function resolveDatabaseConfig() {
  const railway = isRailwayRuntime()

  const host = pick(process.env.MYSQLHOST, process.env.DB_HOST, '127.0.0.1')
  const port = Number(pick(process.env.MYSQLPORT, process.env.DB_PORT, '3306'))
  const user = pick(process.env.MYSQLUSER, process.env.DB_USER, 'root')
  const password = pick(process.env.MYSQLPASSWORD, process.env.DB_PASSWORD, '') ?? ''
  const database = pick(process.env.MYSQLDATABASE, process.env.DB_NAME, 'cafe_sostenible')

  const sslExplicit = process.env.MYSQL_SSL
  const useSsl =
    sslExplicit === 'true' ||
    (railway && sslExplicit !== 'false')

  return {
    host,
    port,
    user,
    password,
    database,
    poolMin: Number(process.env.DB_POOL_MIN) || 2,
    poolMax: Number(process.env.DB_POOL_MAX) || 10,
    railway,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  }
}

export function logDatabaseTarget(db) {
  const mode = db.railway ? 'Railway (producción)' : 'Local / desarrollo'
  console.log(`[MySQL] Modo: ${mode}`)
  console.log(`[MySQL] Host: ${db.host}:${db.port}`)
  console.log(`[MySQL] Base: ${db.database} | Usuario: ${db.user}`)
  if (db.ssl) console.log('[MySQL] SSL: activado')
}
