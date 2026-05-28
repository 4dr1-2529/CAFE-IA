/**
 * Validación de distribución de etapas por lote (global y por cliente).
 * Uso: node scripts/validarTrazabilidadEtapas.js
 */
import '../src/config/env.js'
import { query } from '../src/infrastructure/database/pool.js'

async function main() {
  const global = await query(
    `SELECT etapa_norm AS etapa, COUNT(*) AS lotes FROM (
      SELECT l.id,
        CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
        ELSE COALESCE(
          (SELECT t.etapa FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1),
          'Pendiente'
        ) END AS etapa_norm
      FROM lotes l WHERE l.deleted_at IS NULL
    ) x GROUP BY etapa_norm ORDER BY etapa_norm`
  )

  const porCliente = await query(
    `SELECT user_id, etapa_norm AS etapa, COUNT(*) AS lotes FROM (
      SELECT l.id, l.user_id,
        CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
        ELSE COALESCE(
          (SELECT t.etapa FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1),
          'Pendiente'
        ) END AS etapa_norm
      FROM lotes l WHERE l.deleted_at IS NULL
    ) x GROUP BY user_id, etapa_norm ORDER BY user_id, etapa_norm`
  )

  console.log('=== Distribución global (un lote = una etapa) ===')
  console.table(global)
  console.log('=== Por cliente (user_id, etapa) ===')
  console.table(porCliente)
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
