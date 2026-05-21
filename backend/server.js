import { createApp } from './src/app.js'
import { env } from './src/config/env.js'
import { initDatabase } from './src/infrastructure/database/migrate.js'
import { closePool } from './src/infrastructure/database/pool.js'

const app = createApp()

async function start() {
  try {
    await initDatabase()
  } catch (err) {
    console.error('Error inicializando MySQL:', err.message)
    console.error('Verifique .env y que MySQL esté ejecutándose. Copie .env.example a .env')
    process.exit(1)
  }

  const server = app.listen(env.port, () => {
    console.log(`Backend iniciado en http://localhost:${env.port}`)
    console.log(`Base de datos: MySQL (${env.db.database})`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Puerto ${env.port} ya está en uso.`)
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
