import { createApp } from './src/app.js'
import { env } from './src/config/env.js'
import { logMysqlEnvForRailway } from './src/config/database.js'
import { initDatabase } from './src/infrastructure/database/migrate.js'
import { closePool } from './src/infrastructure/database/pool.js'

const app = createApp()
const host = '0.0.0.0'

async function start() {
  console.log('[Railway] Verificación variables MySQL:')
  logMysqlEnvForRailway()

  if (process.env.RAILWAY_ENVIRONMENT) {
    console.log('[Railway] Entorno:', process.env.RAILWAY_ENVIRONMENT)
  }

  try {
    await initDatabase()
  } catch (err) {
    console.error('[MySQL] Error inicializando:', err.message)
    console.error(
      'Configure únicamente: MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE. ' +
        'Elimine DB_HOST/DB_USER del panel Railway si existen.'
    )
    process.exit(1)
  }

  const server = app.listen(env.port, host, () => {
    console.log(`[HTTP] Backend activo en http://${host}:${env.port}`)
    console.log(`[HTTP] Puerto: ${env.port}`)
    console.log(`[MySQL] Conectado a ${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[HTTP] Puerto ${env.port} ya está en uso.`)
      process.exit(1)
    }
    console.error(err)
    process.exit(1)
  })

  process.on('SIGINT', async () => {
    await closePool()
    process.exit(0)
  })
}

start()
