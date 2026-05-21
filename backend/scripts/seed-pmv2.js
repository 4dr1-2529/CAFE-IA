import { initDatabase } from '../src/infrastructure/database/migrate.js'
import { seedPMV2Data } from '../src/infrastructure/database/seed-pmv2.js'
import { closePool } from '../src/infrastructure/database/pool.js'

const force = process.env.SEED_PMV2_FORCE === '1'

initDatabase()
  .then(async () => {
    const result = await seedPMV2Data(force)
    console.log('Seed PMV2 completado:', result)
    await closePool()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)
    await closePool()
    process.exit(1)
  })
