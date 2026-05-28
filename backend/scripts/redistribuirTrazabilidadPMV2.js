/**
 * Redistribuye etapas de trazabilidad para que cada lote tenga una etapa actual distinta.
 * No borra lotes, productores ni usuarios. Solo reemplaza filas en trazabilidad de lotes que ya tenían traza.
 *
 * Uso: node scripts/redistribuirTrazabilidadPMV2.js
 * Forzar: REDISTRIBUIR_TRAZA=1 node scripts/redistribuirTrazabilidadPMV2.js
 */
import '../src/config/env.js'
import { query, execute } from '../src/infrastructure/database/pool.js'
import { ETAPAS_CADENA } from '../src/shared/trazabilidadSql.js'

const ETAPAS = ETAPAS_CADENA

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

async function queryOne(sql, params = []) {
  const rows = await query(sql, params)
  return rows[0]
}

async function main() {
  const force = process.env.REDISTRIBUIR_TRAZA === '1'

  const lotesConTraza = await query(
    `SELECT DISTINCT l.id, l.codigo_lote, l.user_id, l.fecha_cosecha,
            COALESCE(p.parcela, p.ubicacion, 'Finca') AS ubicacion
     FROM lotes l
     INNER JOIN trazabilidad t ON t.lote_id = l.id
     LEFT JOIN productores p ON p.id = l.productor_id
     WHERE l.deleted_at IS NULL
     ORDER BY l.id`
  )

  const sinTraza = await queryOne(
    `SELECT COUNT(*) AS c FROM lotes l
     WHERE l.deleted_at IS NULL
     AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)`
  )

  console.log(`Lotes con trazabilidad a redistribuir: ${lotesConTraza.length}`)
  console.log(`Lotes sin trazabilidad (se mantienen pendientes): ${Number(sinTraza?.c) || 0}`)

  if (!lotesConTraza.length) {
    console.log('Nada que redistribuir.')
    return
  }

  if (!force) {
    const check = await query(
      `SELECT etapa_norm, COUNT(*) AS c FROM (
        SELECT l.id,
          (SELECT t.etapa FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1) AS etapa_norm
        FROM lotes l WHERE l.deleted_at IS NULL
      ) x GROUP BY etapa_norm`
    )
    const controlOnly = check.find((r) => r.etapa_norm === 'Control de calidad')?.c || 0
    const total = check.reduce((s, r) => s + Number(r.c), 0)
    if (total > 0 && Number(controlOnly) / Number(total) < 0.5) {
      console.log('Distribución ya parece balanceada. Use REDISTRIBUIR_TRAZA=1 para forzar.')
      console.table(check)
      return
    }
    console.log('Distribución concentrada detectada; aplicando redistribución...')
  }

  const ids = lotesConTraza.map((l) => l.id)
  await execute(`DELETE FROM trazabilidad WHERE lote_id IN (${ids.map(() => '?').join(',')})`, ids)

  let inserted = 0
  for (let i = 0; i < lotesConTraza.length; i++) {
    const lote = lotesConTraza[i]
    const targetIdx = i % ETAPAS.length
    const etapasHasta = ETAPAS.slice(0, targetIdx + 1)
    const baseFecha = lote.fecha_cosecha || '2026-01-15'
    const ubicacion = lote.ubicacion || 'Junín, Perú'

    for (let o = 0; o < etapasHasta.length; o++) {
      const etapa = etapasHasta[o]
      const esUltima = o === etapasHasta.length - 1
      await execute(
        `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, orden, usuario_registro_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lote.id,
          etapa,
          `${etapa} del lote ${lote.codigo_lote}`,
          addDays(baseFecha, o * 7),
          ubicacion,
          esUltima ? 'En proceso' : 'Completado',
          o + 1,
          lote.user_id,
        ]
      )
      inserted++
    }
  }

  const verificacion = await query(
    `SELECT etapa_norm, COUNT(*) AS lotes FROM (
      SELECT l.id,
        (SELECT t.etapa FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1) AS etapa_norm
      FROM lotes l WHERE l.deleted_at IS NULL
    ) x GROUP BY etapa_norm ORDER BY etapa_norm`
  )

  console.log(`Registros de trazabilidad insertados: ${inserted}`)
  console.log('Distribución por etapa actual (todos los lotes):')
  console.table(verificacion)
  console.log('OK: redistribución completada')
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
