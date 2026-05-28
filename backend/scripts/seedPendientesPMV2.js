/**
 * Añade por cada CLIENTE: 1 productor (P006) + 3 lotes sin trazabilidad, calidad ni IA.
 * Actualiza contraseña de clientes a mbappe29 (bcrypt).
 * No borra datos existentes.
 *
 * Uso: npm run db:seed:pendientes
 */
import bcrypt from 'bcryptjs'
import { initDatabase } from '../src/infrastructure/database/migrate.js'
import { applyMultiusuarioMigrations } from '../src/infrastructure/database/apply-migrations.js'
import { query, queryOne, execute, closePool } from '../src/infrastructure/database/pool.js'
import { CodeGenerator } from '../src/shared/CodeGenerator.js'

const CLIENT_PASSWORD = 'mbappe29'
const PROD_INDEX = 6
const LOTES_POR_PROD = 3

const FINCA_EXTRA = [
  'Finca El Mirador',
  'Parcela Los Cipreses',
  'Alto Chanchamayo',
  'Cooperativa Valle Verde',
  'Finca Sol Naciente',
]

const VARIEDADES = ['Typica', 'Caturra', 'Bourbon', 'Catimor', 'Geisha']
const PROCESOS = ['Lavado', 'Natural', 'Honey']

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Seed pendientes PMV2 (sin traza / calidad / IA)')
  console.log('═══════════════════════════════════════════════════')

  await initDatabase()
  await applyMultiusuarioMigrations()

  const clienteRol = await queryOne(`SELECT id FROM roles WHERE codigo = 'cliente' LIMIT 1`)
  const passwordHash = await bcrypt.hash(CLIENT_PASSWORD, 10)

  const clientes = await query(
    `SELECT u.id, u.codigo_usuario, u.nombres, u.apellidos, u.email
     FROM usuarios u
     JOIN roles r ON u.rol_id = r.id
     WHERE r.codigo = 'cliente' AND u.deleted_at IS NULL
     ORDER BY u.codigo_usuario`
  )

  if (!clientes.length) {
    console.log('\n⚠️  No hay clientes. Ejecute primero: npm run db:seed:multiusuario')
    await closePool()
    process.exit(1)
  }

  let productoresNuevos = 0
  let lotesNuevos = 0

  for (let i = 0; i < clientes.length; i++) {
    const c = clientes[i]
    const codigoUsuario = c.codigo_usuario || `USU-${String(i + 1).padStart(3, '0')}`
    const codigoProd = CodeGenerator.productorCode(codigoUsuario, PROD_INDEX)
    const prodShort = CodeGenerator.productorShort(PROD_INDEX)

    const existeProd = await queryOne(
      `SELECT id FROM productores WHERE codigo_productor = ? AND deleted_at IS NULL LIMIT 1`,
      [codigoProd]
    )
    let productorId = existeProd?.id

    if (!productorId) {
      const fincaNombre = `${FINCA_EXTRA[i % FINCA_EXTRA.length]} · ${c.nombres}`
      const ins = await execute(
        `INSERT INTO productores (codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado, user_id)
         VALUES (?, ?, 'Productor', ?, ?, ?, ?, 'Junín, Perú', ?, 'Activo', ?)`,
        [
          codigoProd,
          fincaNombre,
          `99${String(c.id).padStart(4, '0')}${PROD_INDEX}`,
          `9${String(c.id).padStart(2, '0')}006`,
          `pendiente.${codigoUsuario.toLowerCase()}@cafeai.com`,
          fincaNombre,
          1550 + i * 25,
          c.id,
        ]
      )
      productorId = ins.insertId
      productoresNuevos++
      console.log(`   + Productor ${codigoProd} → ${c.email}`)
    }

    for (let l = 1; l <= LOTES_POR_PROD; l++) {
      const codigoLote = CodeGenerator.loteCode(codigoUsuario, prodShort, l)
      const existeLote = await queryOne(
        `SELECT id FROM lotes WHERE codigo_lote = ? AND deleted_at IS NULL LIMIT 1`,
        [codigoLote]
      )
      if (existeLote?.id) continue

      const variedad = VARIEDADES[(i + l) % VARIEDADES.length]
      const proceso = PROCESOS[l % PROCESOS.length]
      const kg = 120 + ((c.id * 13 + l * 31) % 280)
      const fechaCosecha = `2026-0${((i + l) % 5) + 4}-${String(10 + l).padStart(2, '0')}`

      const loteIns = await execute(
        `INSERT INTO lotes (codigo_lote, productor_id, user_id, variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado, calidad_grano)
         VALUES (?, ?, ?, ?, ?, ?, 'Registrado', ?, ?, ?, ?, 'Pendiente')`,
        [codigoLote, productorId, c.id, variedad, fechaCosecha, kg, 11.2 + l * 0.3, 19 + l, 1580 + l * 20, proceso]
      )
      const loteId = loteIns.insertId
      lotesNuevos++

      await execute(
        `INSERT INTO inventario (lote_id, cantidad_disponible_kg, fecha_actualizacion) VALUES (?, ?, CURDATE())`,
        [loteId, kg]
      ).catch(() => {})

      console.log(`      · Lote ${codigoLote} (${kg} kg) — pendiente traza/IA`)
    }

    await execute(
      `UPDATE usuarios SET password_hash = ?, activo = 1, deleted_at = NULL WHERE id = ?`,
      [passwordHash, c.id]
    )
  }

  const [prod, lotes, sinTraza, sinIa] = await Promise.all([
    queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`),
    queryOne(
      `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)`
    ),
    queryOne(
      `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`
    ),
  ])

  console.log('\n═══════════════════════════════════════════════════')
  console.log(`  Productores nuevos:     ${productoresNuevos}`)
  console.log(`  Lotes nuevos:           ${lotesNuevos}`)
  console.log(`  Total productores:    ${prod?.c}`)
  console.log(`  Total lotes:          ${lotes?.c}`)
  console.log(`  Lotes sin trazabilidad: ${sinTraza?.c}`)
  console.log(`  Lotes sin IA:         ${sinIa?.c}`)
  console.log(`  Contraseña CLIENTE:   ${CLIENT_PASSWORD}`)
  console.log('═══════════════════════════════════════════════════\n')

  await closePool()
  process.exit(0)
}

main().catch(async (e) => {
  console.error('Error seed pendientes:', e)
  await closePool()
  process.exit(1)
})
