import { queryOne, execute } from './pool.js'
import { columnExists, ensureUsuarioCodigoColumn, ensureAuditoriaColumns } from './schemaHelpers.js'

async function runStatements(sql) {
  const parts = sql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 5 && !s.startsWith('--'))
  for (const stmt of parts) {
    try {
      await execute(stmt)
    } catch (err) {
      if (['ER_DUP_KEYNAME', 'ER_DUP_FIELDNAME', 'ER_CANT_CREATE_TABLE', 'ER_FK_DUP_NAME', 'ER_DUP_ENTRY'].includes(err.code)) continue
      console.warn('Migración (aviso):', err.message?.slice(0, 120))
    }
  }
}

async function addUserIdFromLote(table, afterColumn = 'lote_id') {
  if (await columnExists(table, 'user_id')) return
  await runStatements(`ALTER TABLE ${table} ADD COLUMN user_id INT UNSIGNED NULL AFTER ${afterColumn}`)
  await execute(
    `UPDATE ${table} t INNER JOIN lotes l ON l.id = t.lote_id SET t.user_id = l.user_id WHERE t.user_id IS NULL`
  ).catch(() => {})
  await runStatements(`CREATE INDEX idx_${table}_user ON ${table}(user_id)`)
  console.log(`Migración: ${table}.user_id aplicada`)
}

export async function applyMultiusuarioMigrations() {
  if (!(await columnExists('lotes', 'user_id'))) {
    await runStatements(`
      ALTER TABLE lotes ADD COLUMN user_id INT UNSIGNED NULL AFTER productor_id;
      UPDATE lotes SET user_id = 1 WHERE user_id IS NULL;
      ALTER TABLE lotes MODIFY user_id INT UNSIGNED NOT NULL;
    `)
    await runStatements(`
      ALTER TABLE lotes ADD CONSTRAINT fk_lotes_usuario FOREIGN KEY (user_id) REFERENCES usuarios(id);
      CREATE INDEX idx_lotes_user_id ON lotes(user_id);
      CREATE INDEX idx_lotes_created_at ON lotes(created_at);
    `)
    console.log('Migración: lotes.user_id aplicada')
  }

  if (!(await columnExists('productores', 'user_id'))) {
    await runStatements(`
      ALTER TABLE productores ADD COLUMN user_id INT UNSIGNED NULL AFTER id;
      UPDATE productores SET user_id = 1 WHERE user_id IS NULL;
    `)
    await runStatements(`
      ALTER TABLE productores ADD CONSTRAINT fk_productores_usuario FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE SET NULL;
      CREATE INDEX idx_productores_user ON productores(user_id);
    `)
    console.log('Migración: productores.user_id aplicada')
  }

  await execute(
    `INSERT IGNORE INTO roles (codigo, nombre, descripcion) VALUES
     ('admin', 'Administrador', 'Control total del sistema'),
     ('cliente', 'Cliente', 'Gestiona sus productores y lotes')`
  ).catch(() => {})

  await execute(
    `UPDATE usuarios u
     INNER JOIN roles r ON u.rol_id = r.id
     SET u.rol_id = (SELECT id FROM roles WHERE codigo = 'cliente' LIMIT 1)
     WHERE r.codigo IN ('supervisor', 'productor', 'usuario')`
  ).catch(() => {})

  await execute(
    `UPDATE usuarios u
     SET u.rol_id = (SELECT id FROM roles WHERE codigo = 'admin' LIMIT 1)
     WHERE u.email = 'admin@cafeai.com'`
  ).catch(() => {})

  console.log('Migración: roles ADMIN/CLIENTE aplicada')

  await addUserIdFromLote('produccion')
  await addUserIdFromLote('predicciones_ia')
  await addUserIdFromLote('control_calidad')

  await execute(
    `UPDATE trazabilidad t
     INNER JOIN lotes l ON l.id = t.lote_id
     SET t.usuario_registro_id = l.user_id
     WHERE t.usuario_registro_id IS NULL AND l.user_id IS NOT NULL`
  ).catch(() => {})

  await ensureUsuarioCodigoColumn()
  await ensureAuditoriaColumns()
}
