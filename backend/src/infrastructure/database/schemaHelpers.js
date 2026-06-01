import { query, queryOne, execute } from './pool.js'

export async function tableExists(table) {
  try {
    const row = await queryOne(
      `SELECT COUNT(*) AS c FROM information_schema.tables
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
      [table]
    )
    return Number(row?.c) > 0
  } catch {
    try {
      const rows = await query(`SHOW TABLES LIKE ?`, [table])
      return rows.length > 0
    } catch {
      return false
    }
  }
}

export async function columnExists(table, column) {
  try {
    const row = await queryOne(
      `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
      [table, column]
    )
    return Number(row?.c) > 0
  } catch {
    try {
      const rows = await query(`SHOW COLUMNS FROM \`${table}\` LIKE ?`, [column])
      return rows.length > 0
    } catch {
      return false
    }
  }
}

export async function ensureUsuarioCodigoColumn() {
  if (await columnExists('usuarios', 'codigo_usuario')) return true

  try {
    await execute(`ALTER TABLE usuarios ADD COLUMN codigo_usuario VARCHAR(20) NULL UNIQUE AFTER id`)
    console.log('[MySQL] Columna usuarios.codigo_usuario creada')
    return true
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') return true
    console.warn('[MySQL] codigo_usuario (UNIQUE):', err.message?.slice(0, 120))
  }

  try {
    await execute(`ALTER TABLE usuarios ADD COLUMN codigo_usuario VARCHAR(20) NULL`)
    console.log('[MySQL] Columna usuarios.codigo_usuario creada (sin UNIQUE)')
    return true
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') return true
    console.error('[MySQL] No se pudo crear usuarios.codigo_usuario:', err.message)
    return false
  }
}

const AUDITORIA_COLUMNS = [
  { name: 'usuario_nombre', ddl: 'VARCHAR(120) NULL AFTER usuario_id' },
  { name: 'usuario_email', ddl: 'VARCHAR(150) NULL AFTER usuario_nombre' },
  { name: 'rol', ddl: 'VARCHAR(30) NULL AFTER usuario_email' },
  { name: 'modulo', ddl: 'VARCHAR(60) NULL AFTER accion' },
  { name: 'descripcion', ddl: 'TEXT NULL AFTER modulo' },
  { name: 'metodo', ddl: 'VARCHAR(10) NULL AFTER descripcion' },
  { name: 'ruta', ddl: 'VARCHAR(255) NULL AFTER metodo' },
  { name: 'user_agent', ddl: 'VARCHAR(500) NULL AFTER ip_address' },
]

export async function ensureAuditoriaColumns() {
  for (const col of AUDITORIA_COLUMNS) {
    if (await columnExists('auditoria_logs', col.name)) continue
    try {
      await execute(`ALTER TABLE auditoria_logs ADD COLUMN ${col.name} ${col.ddl}`)
      console.log(`[MySQL] Columna auditoria_logs.${col.name} creada`)
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') continue
      console.warn(`[MySQL] auditoria_logs.${col.name}:`, err.message?.slice(0, 120))
    }
  }

  await execute(
    `UPDATE auditoria_logs SET modulo = COALESCE(modulo, JSON_UNQUOTE(JSON_EXTRACT(detalle, '$.modulo')))
     WHERE modulo IS NULL AND detalle IS NOT NULL`
  ).catch(() => {})
  await execute(
    `UPDATE auditoria_logs SET descripcion = COALESCE(descripcion, JSON_UNQUOTE(JSON_EXTRACT(detalle, '$.descripcion')))
     WHERE descripcion IS NULL AND detalle IS NOT NULL`
  ).catch(() => {})
  await execute(
    `UPDATE auditoria_logs SET user_agent = COALESCE(user_agent, JSON_UNQUOTE(JSON_EXTRACT(detalle, '$.user_agent')))
     WHERE user_agent IS NULL AND detalle IS NOT NULL`
  ).catch(() => {})
  await execute(
    `UPDATE auditoria_logs a
     INNER JOIN usuarios u ON u.id = a.usuario_id
     SET a.usuario_nombre = COALESCE(a.usuario_nombre, TRIM(CONCAT(COALESCE(u.nombres,''), ' ', COALESCE(u.apellidos,'')))),
         a.usuario_email = COALESCE(a.usuario_email, u.email),
         a.rol = COALESCE(a.rol, (SELECT r.codigo FROM roles r WHERE r.id = u.rol_id LIMIT 1))
     WHERE a.usuario_id IS NOT NULL`
  ).catch(() => {})

  for (const idx of [
    'CREATE INDEX idx_auditoria_modulo ON auditoria_logs(modulo)',
    'CREATE INDEX idx_auditoria_rol ON auditoria_logs(rol)',
    'CREATE INDEX idx_auditoria_accion ON auditoria_logs(accion)',
  ]) {
    try {
      await execute(idx)
    } catch (err) {
      if (!['ER_DUP_KEYNAME'].includes(err.code)) {
        // ignore if index exists
      }
    }
  }
}

/** Tablas del módulo IA que pueden faltar en BD Railway creadas antes del schema completo. */
export async function ensureIaModuleTables() {
  if (!(await tableExists('alertas_ia'))) {
    await execute(
      `CREATE TABLE IF NOT EXISTS alertas_ia (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        lote_id INT UNSIGNED NOT NULL,
        prediccion_id INT UNSIGNED NULL,
        tipo_alerta VARCHAR(60) NOT NULL,
        severidad ENUM('Baja','Media','Alta','Crítica') DEFAULT 'Media',
        mensaje TEXT NOT NULL,
        leida TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_alertas_lote (lote_id),
        INDEX idx_alertas_leida (leida)
      ) ENGINE=InnoDB`
    ).catch((err) => console.warn('[MySQL] alertas_ia:', err.message?.slice(0, 120)))
    console.log('[MySQL] Tabla alertas_ia verificada/creada')
  }

  if (!(await tableExists('recomendaciones_ia'))) {
    await execute(
      `CREATE TABLE IF NOT EXISTS recomendaciones_ia (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        prediccion_id INT UNSIGNED NOT NULL,
        categoria VARCHAR(60),
        prioridad ENUM('Baja','Media','Alta') DEFAULT 'Media',
        texto TEXT NOT NULL,
        aplicada TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB`
    ).catch((err) => console.warn('[MySQL] recomendaciones_ia:', err.message?.slice(0, 120)))
  }

  if (await tableExists('predicciones_ia') && !(await columnExists('predicciones_ia', 'origen'))) {
    await execute(
      `ALTER TABLE predicciones_ia ADD COLUMN origen ENUM('usuario','demo','sistema') DEFAULT 'usuario'`
    ).catch((err) => {
      if (err.code !== 'ER_DUP_FIELDNAME') console.warn('[MySQL] predicciones_ia.origen:', err.message?.slice(0, 120))
    })
  }
}
