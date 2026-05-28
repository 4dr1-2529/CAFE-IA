/**
 * Corrige inconsistencias user_id entre lotes y productores (sin borrar datos).
 * Uso: node scripts/fixDataConsistency.js
 */
import '../src/config/env.js'
import { query, execute } from '../src/infrastructure/database/pool.js'

async function main() {
  const sinUser = await query(
    `SELECT id, codigo_productor, nombres FROM productores WHERE deleted_at IS NULL AND user_id IS NULL LIMIT 20`
  )
  const mismatch = await query(
    `SELECT l.id AS lote_id, l.codigo_lote, l.user_id AS lote_user, p.user_id AS productor_user
     FROM lotes l
     JOIN productores p ON p.id = l.productor_id
     WHERE l.deleted_at IS NULL AND l.user_id <> p.user_id
     LIMIT 50`
  )

  console.log('Productores sin user_id:', sinUser.length)
  console.log('Lotes con user_id distinto al productor:', mismatch.length)

  if (mismatch.length) {
    const result = await execute(
      `UPDATE lotes l
       INNER JOIN productores p ON p.id = l.productor_id
       SET l.user_id = p.user_id
       WHERE l.deleted_at IS NULL AND l.user_id <> p.user_id`
    )
    console.log('Lotes corregidos (user_id alineado con productor):', result.affectedRows)
  } else {
    console.log('No se requirieron correcciones en lotes.')
  }

  if (sinUser.length) {
    console.warn('Hay productores sin user_id — asignar manualmente desde el panel de administración.')
  }
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
