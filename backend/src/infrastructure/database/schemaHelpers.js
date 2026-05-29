import { query, queryOne, execute } from './pool.js'

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
