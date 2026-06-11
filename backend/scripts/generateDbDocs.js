/**
 * Regenera documentación de base de datos en docs/base-datos/
 * Uso: npm run db:docs   (desde backend/)
 */
import { closePool, query, queryOne } from '../src/infrastructure/database/pool.js'
import {
  readSchemaSql,
  parseSchema,
  fetchLiveMeta,
  writeAllDocs,
  exportMermaidImages,
  DOCS_DIR,
  ARQUITECTURA_DIR,
} from './lib/dbDocGenerator.js'

async function main() {
  const full = process.argv.includes('--full')
  const sql = readSchemaSql()
  const parsed = parseSchema(sql)

  console.log(`[db:docs] schema.sql → ${parsed.tables.length} tablas, ${parsed.fks.length} FK`)

  let live = await fetchLiveMeta(query, queryOne)
  if (live.ok) {
    console.log(`[db:docs] MySQL conectado: ${live.dbName} (${live.tables.length} tablas, ${live.fks.length} FK en vivo)`)
    if (live.tables.length !== parsed.tables.length) {
      console.warn(
        `[db:docs] AVISO: BD tiene ${live.tables.length} tablas, schema.sql declara ${parsed.tables.length}`
      )
    }
  } else {
    console.warn(`[db:docs] MySQL no disponible (${live.error}). Documentación desde DDL únicamente.`)
  }

  const result = writeAllDocs(parsed, live, { full })
  console.log(`[db:docs] Modo: ${full ? '--full (todos los .md)' : 'índice + verificación'}`)
  console.log(`[db:docs] Escritos en ${DOCS_DIR}:`)
  for (const f of result.files) console.log(`  - ${f}`)
  if (!full) {
    console.log('[db:docs] Para regenerar MODELO_*.md y DER.md use: npm run db:docs:full')
  }

  const images = await exportMermaidImages(parsed, live)
  console.log(`[db:docs] Imágenes en ${ARQUITECTURA_DIR}: ${images.length} PNG`)

  console.log('\n--- Resumen ---')
  console.log(`Tablas: ${parsed.tables.length}`)
  console.log(`Relaciones FK: ${parsed.fks.length}`)
  console.log('Tablas clave: lotes, productores, usuarios, predicciones_ia, control_calidad, trazabilidad')
}

main()
  .catch((err) => {
    console.error('[db:docs] Error:', err.message)
    process.exit(1)
  })
  .finally(() => closePool().catch(() => {}))
