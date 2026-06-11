import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import { env } from '../../config/env.js'
import { logDatabaseTarget } from '../../config/database.js'
import { getPool, query, queryOne, execute } from './pool.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function readSql(filename) {
  return fs.readFileSync(path.join(__dirname, '../../../sql', filename), 'utf8')
}

function connectionBase(overrides = {}) {
  return {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    ...(env.db.ssl ? { ssl: env.db.ssl } : {}),
    ...overrides,
  }
}

function schemaConnectionBase(overrides = {}) {
  return connectionBase({ multipleStatements: true, ...overrides })
}

async function queryTableCount(conn) {
  try {
    const [rows] = await conn.query(
      `SELECT COUNT(*) AS c FROM information_schema.tables WHERE table_schema = ?`,
      [process.env.MYSQLDATABASE]
    )
    return Number(rows[0]?.c) || 0
  } catch {
    return 0
  }
}

async function applySchemaIfNeeded(conn) {
  const tables = await queryTableCount(conn)
  if (tables >= 5) return false

  const schema = readSql('schema.sql')
  const cleaned = schema
    .replaceAll(/CREATE DATABASE[^;]+;/gi, '')
    .replaceAll(/USE\s+[^;]+;/gi, '')
  await conn.query(`USE \`${process.env.MYSQLDATABASE}\``)
  await conn.query(cleaned)
  console.log('Esquema MySQL aplicado desde schema.sql')
  return true
}

export async function initDatabase() {
  logDatabaseTarget(env.db)

  let adminConn

  if (env.db.railway) {
    adminConn = await mysql.createConnection(
      schemaConnectionBase({ database: process.env.MYSQLDATABASE })
    )
    try {
      await applySchemaIfNeeded(adminConn)
    } finally {
      await adminConn.end()
    }
  } else {
    adminConn = await mysql.createConnection(schemaConnectionBase())
    try {
      await adminConn.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQLDATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      )
      await applySchemaIfNeeded(adminConn)
    } finally {
      await adminConn.end()
    }
  }

  await testConnection()
  const { applyMultiusuarioMigrations } = await import('./apply-migrations.js')
  await applyMultiusuarioMigrations()
  await seedCatalogsAndAdmin()
  const { seedPMV2Data } = await import('./seed-pmv2.js')
  const pmv2 = await seedPMV2Data(process.env.SEED_PMV2_FORCE === '1')
  if (pmv2.skipped) {
    await ensureDemoData()
    await ensureDemoLotes()
  }
  await execute(`UPDATE lotes SET qr_codigo = CONCAT('CAFE-', id) WHERE qr_codigo IS NULL OR qr_codigo = ''`).catch(
    () => {}
  )
  console.log('[MySQL] Conectado y inicializado correctamente')
}

async function testConnection() {
  const pool = getPool()
  const conn = await pool.getConnection()
  await conn.ping()
  conn.release()
}

async function seedCatalogsAndAdmin() {
  const seedPassword = process.env.ADMIN_SEED_PASSWORD?.trim()
  if (!seedPassword) {
    console.warn('[seed] ADMIN_SEED_PASSWORD no definido; se omite usuario admin inicial.')
  }

  await execute(
    `INSERT INTO roles (codigo, nombre, descripcion) VALUES
     ('admin','Administrador','Control total del sistema'),
     ('cliente','Cliente','Gestiona sus productores y lotes')
     ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion)`
  ).catch(() => {})

  const [roles] = await getPool().execute(`SELECT id, codigo FROM roles`)
  const adminRole = roles.find((r) => r.codigo === 'admin')
  if (adminRole && seedPassword) {
    const hash = await bcrypt.hash(seedPassword, 10)
    await execute(
      `INSERT INTO usuarios (rol_id, email, password_hash, nombres, apellidos, activo)
       VALUES (?, 'admin@cafeai.com', ?, 'Admin', 'Sistema', 1)
       ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash), activo=1`,
      [adminRole.id, hash]
    ).catch(() => {})
  } else if (!adminRole) {
    return
  }

  await execute(
    `INSERT IGNORE INTO variedades_cafe (codigo, nombre, puntaje_base) VALUES
     ('ARB','Arabica',85),('TYP','Typica',88),('BOU','Bourbon',86),('CAT','Caturra',82),('CTM','Catimor',78)`
  ).catch(() => {})

  await execute(
    `INSERT IGNORE INTO procesos_secado (codigo, nombre, dias_estimados) VALUES
     ('NAT','Natural',14),('LAV','Lavado',10),('HON','Honey',12)`
  ).catch(() => {})

  await execute(
    `INSERT IGNORE INTO estados_lote (codigo, nombre, orden, color) VALUES
     ('PROD','Produccion',1,'#3B82F6'),('SEC','Secado',2,'#F59E0B'),('CAL','Calidad',3,'#8B5CF6'),('ALM','Almacenamiento',4,'#6366F1'),('COM','Comercializacion',5,'#10B981')`
  ).catch(() => {})

  await execute(
    `INSERT IGNORE INTO criterios_calidad (codigo, nombre, peso) VALUES
     ('ARO','Aroma',1.2),('SAB','Sabor',1.5),('CUE','Cuerpo',1.0),('ACI','Acidez',1.0),('DUL','Dulzor',0.8),('BAL','Balance',1.0)`
  ).catch(() => {})

  await execute(
    `INSERT IGNORE INTO configuraciones (clave, valor, tipo) VALUES
     ('app.nombre','Café Sostenible AI','string'),('ia.modelo_version','v2.0-heuristic','string')`
  ).catch(() => {})
}

async function ensureDemoData() {
  const count = await queryOne('SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL')
  if (Number(count?.c) > 0) return

  let regionId = (await queryOne('SELECT id FROM regiones LIMIT 1'))?.id
  if (!regionId) {
    const r = await execute(`INSERT INTO regiones (codigo, nombre) VALUES ('JUN','Junín')`)
    regionId = r.insertId
  }
  let provId = (await queryOne('SELECT id FROM provincias WHERE region_id=? LIMIT 1', [regionId]))?.id
  if (!provId) {
    const p = await execute(`INSERT INTO provincias (region_id, codigo, nombre) VALUES (?, 'CHN', 'Chanchamayo')`, [
      regionId,
    ])
    provId = p.insertId
  }
  let distId = (await queryOne('SELECT id FROM distritos WHERE provincia_id=? LIMIT 1', [provId]))?.id
  if (!distId) {
    const d = await execute(`INSERT INTO distritos (provincia_id, codigo, nombre) VALUES (?, 'SVI', 'San Ramón')`, [
      provId,
    ])
    distId = d.insertId
  }

  const productores = [
    ['P001', 'Juan', 'Pérez', '12345678', '999111222', 'juan@cafe.pe', 'Finca El Roble', 'Chanchamayo', 1650],
    ['P002', 'María', 'Gómez', '87654321', '999333444', 'maria@cafe.pe', 'Parcela La Selva', 'Perené', 1720],
    ['P003', 'Carlos', 'Quispe', '11223344', '999555666', 'carlos@cafe.pe', 'Alto Satipo', 'Satipo', 1580],
  ]
  for (const p of productores) {
    await execute(
      `INSERT INTO productores (distrito_id, codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo')`,
      [distId, ...p]
    ).catch(() => {})
  }
}

async function ensureDemoLotes() {
  const count = await queryOne('SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL')
  if (Number(count?.c) > 0) return

  const productor = await queryOne('SELECT id, parcela, ubicacion FROM productores WHERE deleted_at IS NULL LIMIT 1')
  if (!productor?.id) return

  const lotes = [
    ['LOTE-0001', productor.id, 'Arabica', '2026-03-15', 450, 'Produccion', 11.5, 20, 1650, 'Honey'],
    ['LOTE-0002', productor.id, 'Typica', '2026-04-01', 320, 'Secado', 12.2, 19, 1720, 'Lavado'],
  ]
  for (const l of lotes) {
    const ins = await execute(
      `INSERT INTO lotes (codigo_lote, productor_id, user_id, variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado)
       VALUES (?,?,1,?,?,?,?,?,?,?,?)`,
      l
    ).catch(() => null)
    if (!ins?.insertId) continue
    const etapas = [
      ['Producción', 'Registro inicial', 0, 'Completado'],
      ['Secado', 'Secado del café', 7, 'Pendiente'],
      ['Control de calidad', 'Evaluación sensorial', 14, 'Pendiente'],
      ['Almacenamiento', 'Almacén', 21, 'Pendiente'],
      ['Comercialización', 'Venta', 28, 'Pendiente'],
    ]
    let orden = 1
    for (const [etapa, desc, dias, estado] of etapas) {
      const f = new Date(l[3])
      f.setDate(f.getDate() + dias)
      await execute(
        `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, orden) VALUES (?,?,?,?,?,?,?)`,
        [ins.insertId, etapa, desc, dias === 0 ? l[3] : null, productor.parcela || productor.ubicacion || '', estado, orden++]
      ).catch(() => {})
    }
    await execute(`INSERT INTO inventario (lote_id, cantidad_disponible_kg, fecha_actualizacion) VALUES (?,?,CURDATE())`, [
      ins.insertId,
      l[4],
    ]).catch(() => {})
  }
}
