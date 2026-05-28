/**
 * Verificación rápida de conteos para dashboard / chatbot.
 * Uso: node scripts/verifyDashboardData.js
 */
import { initDatabase } from '../src/infrastructure/database/migrate.js'
import { query, queryOne, closePool } from '../src/infrastructure/database/pool.js'

async function main() {
  await initDatabase()

  const porRol = await query(
    `SELECT r.codigo AS rol, COUNT(*) AS total
     FROM usuarios u
     JOIN roles r ON r.id = u.rol_id
     WHERE u.deleted_at IS NULL
     GROUP BY r.codigo
     ORDER BY total DESC`
  )

  const [clientes, productores, lotes, traza, ia] = await Promise.all([
    queryOne(
      `SELECT COUNT(*) AS c FROM usuarios u
       JOIN roles r ON u.rol_id=r.id
       WHERE r.codigo='cliente' AND u.deleted_at IS NULL AND u.activo=1`
    ),
    queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`),
    queryOne(`SELECT COUNT(DISTINCT lote_id) AS c FROM trazabilidad`),
    queryOne(`SELECT COUNT(DISTINCT lote_id) AS c FROM predicciones_ia WHERE origen='usuario'`),
  ])

  console.log('\n=== Verificación datos dashboard ===\n')
  console.log('Usuarios por rol:', porRol)
  console.log('Clientes activos (rol=cliente):', clientes?.c)
  console.log('Productores:', productores?.c)
  console.log('Lotes:', lotes?.c)
  console.log('Lotes con trazabilidad (distinct):', traza?.c)
  console.log('Lotes con IA (distinct):', ia?.c)
  console.log('Lotes sin trazabilidad:', Number(lotes?.c || 0) - Number(traza?.c || 0))
  console.log('Lotes sin IA:', Number(lotes?.c || 0) - Number(ia?.c || 0))
  console.log('')

  await closePool()
}

main().catch(async (e) => {
  console.error(e)
  await closePool()
  process.exit(1)
})
