import { initDatabase } from '../src/infrastructure/database/migrate.js'
import { closePool } from '../src/infrastructure/database/pool.js'

initDatabase()
  .then(async () => {
    console.log('Seed / migración completado')
    await closePool()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)
    await closePool()
    process.exit(1)
  })
