/**
 * CLI: npm run seed:final
 * Railway/local: SEED_FINAL_FORCE=1 npm run seed:final
 */
import { closePool } from '../src/infrastructure/database/pool.js'
import { runSeedFinal } from '../src/infrastructure/database/seed-final.js'

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  RESET + SEED FINAL — Café Sostenible AI')
  console.log('═══════════════════════════════════════════════════')

  const result = await runSeedFinal({ force: process.env.SEED_FINAL_FORCE === '1', initDb: true })

  if (result.skipped) {
    console.log(`\n⚠️  ${result.message} (${result.lotesExistentes} lotes)`)
    await closePool()
    process.exit(0)
  }

  const r = result.resumen
  console.log('\n═══════════════════════════════════════════════════')
  console.log('  VALIDACIÓN FINAL')
  console.log('═══════════════════════════════════════════════════')
  console.log(`  Clientes:           ${r.clientes} (esperado: 5)`)
  console.log(`  Productores:        ${r.productores} (esperado: 25)`)
  console.log(`  Lotes:              ${r.lotes} (esperado: 150)`)
  console.log(`  Con trazabilidad:   ${r.conTraza} (esperado: 120)`)
  console.log(`  Sin trazabilidad:   ${r.sinTraza} (esperado: 30)`)
  console.log(`  Con IA:             ${r.conIa} (esperado: 110)`)
  console.log(`  Sin IA:             ${r.sinIa} (esperado: 40)`)
  console.log(`  Producción total:   ${r.kg.toFixed(1)} kg`)
  console.log('═══════════════════════════════════════════════════\n')

  await closePool()
  process.exit(0)
}

main().catch(async (e) => {
  console.error('Error seed final:', e)
  await closePool()
  process.exit(1)
})
