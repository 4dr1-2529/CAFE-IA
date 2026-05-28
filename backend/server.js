import { createApp } from './src/app.js'
import { env } from './src/config/env.js'
import { isRailwayRuntime } from './src/config/database.js'
import { initDatabase } from './src/infrastructure/database/migrate.js'
import { closePool } from './src/infrastructure/database/pool.js'

const app = createApp()
const host = '0.0.0.0'

async function start() {
  if (isRailwayRuntime()) {
    console.log('[Railway] Entorno detectado — usando variables MYSQL*')
  }

  try {
    await initDatabase()
  } catch (err) {
    console.error('[MySQL] Error inicializando:', err.message)
    if (env.db.railway) {
      console.error(
        'Verifique en Railway: MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE (servicio MySQL vinculado).'
      )
    } else {
      console.error('Local: copie backend/.env.example a .env y asegure que MySQL/XAMPP esté activo.')
    }
    process.exit(1)
  }

  const server = app.listen(env.port, host, () => {
    console.log(`[HTTP] Backend activo en http://${host}:${env.port}`)
    console.log(`[HTTP] Puerto Railway/PORT: ${env.port}`)
    console.log(`[MySQL] Base de datos: ${env.db.database}`)
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
