/**
 * Limpia datos demo y genera dataset multiusuario PMV2:
 * 1 ADMIN + 5 CLIENTES × 5 productores × 5 lotes (+ trazabilidad, calidad, IA, producción, auditoría)
 *
 * Uso: npm run db:seed:multiusuario
 * Forzar: SEED_MULTIUSUARIO_FORCE=1 npm run db:seed:multiusuario
 */
import bcrypt from 'bcryptjs'
import { initDatabase } from '../src/infrastructure/database/migrate.js'
import { applyMultiusuarioMigrations } from '../src/infrastructure/database/apply-migrations.js'
import { query, queryOne, execute, closePool } from '../src/infrastructure/database/pool.js'
import { CodeGenerator } from '../src/shared/CodeGenerator.js'

const ADMIN_EMAIL = 'admin@cafeai.com'
const CLIENT_PASSWORD = 'mbappe29'
const FORCE = process.env.SEED_MULTIUSUARIO_FORCE === '1'

const CLIENTES = [
  { codigo: 'USU-001', nombres: 'Cliente Uno', apellidos: 'Café', email: 'cliente1@cafeai.com', telefono: '900100001' },
  { codigo: 'USU-002', nombres: 'Cliente Dos', apellidos: 'Café', email: 'cliente2@cafeai.com', telefono: '900100002' },
  { codigo: 'USU-003', nombres: 'Cliente Tres', apellidos: 'Café', email: 'cliente3@cafeai.com', telefono: '900100003' },
  { codigo: 'USU-004', nombres: 'Cliente Cuatro', apellidos: 'Café', email: 'cliente4@cafeai.com', telefono: '900100004' },
  { codigo: 'USU-005', nombres: 'Cliente Cinco', apellidos: 'Café', email: 'cliente5@cafeai.com', telefono: '900100005' },
]

const FINCA_BASE = [
  'Finca El Roble',
  'Parcela La Selva',
  'Alto Satipo',
  'Cooperativa Los Andes',
  'Finca Huayna Verde',
]

const VARIEDADES = ['Typica', 'Caturra', 'Bourbon', 'Catimor', 'Geisha']
const PROCESOS = ['Lavado', 'Natural', 'Honey']
const ESTADOS_LOTE = ['Registrado', 'En trazabilidad', 'Controlado', 'Finalizado', 'Registrado']
const ETAPAS_TRAZA = ['Cosecha', 'Selección', 'Secado', 'Almacenamiento', 'Control de calidad']

const stats = {
  clientes: 0,
  productores: 0,
  lotes: 0,
  trazabilidad: 0,
  calidad: 0,
  predicciones: 0,
  produccion: 0,
  auditoria: 0,
}

async function tableExists(name) {
  const row = await queryOne(
    `SELECT COUNT(*) AS c FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [name]
  )
  return Number(row?.c) > 0
}

async function safeDelete(sql) {
  try {
    await execute(sql)
  } catch (e) {
    if (!['ER_NO_SUCH_TABLE', '42S02'].includes(e.code)) console.warn('  aviso:', e.message?.slice(0, 80))
  }
}

async function limpiarDatos(adminId) {
  console.log('\n🧹 Limpiando datos operativos (conservando admin)...')

  const tables = [
    'DELETE FROM variables_prediccion',
    'DELETE FROM recomendaciones_ia',
    'DELETE FROM alertas_ia',
    'DELETE FROM evaluacion_defectos',
    'DELETE FROM evaluaciones_calidad',
    'DELETE FROM resultados_cata',
    'DELETE FROM movimientos_stock',
    'DELETE FROM historial_reportes',
    'DELETE FROM exportaciones',
    'DELETE FROM reportes',
    'DELETE FROM notificaciones',
    'DELETE FROM actividades_usuario',
    'DELETE FROM dashboard_metricas',
    'DELETE FROM trazabilidad',
    'DELETE FROM produccion_diaria',
    'DELETE FROM produccion',
    'DELETE FROM cosechas',
    'DELETE FROM inventario',
    'DELETE FROM control_calidad',
    'DELETE FROM predicciones_ia',
    'DELETE FROM fincas',
    'DELETE FROM lotes',
    'DELETE FROM productores',
    'DELETE FROM auditoria_logs',
    'DELETE FROM sesiones',
  ]
  for (const sql of tables) await safeDelete(sql)

  await execute(`UPDATE usuarios SET productor_id = NULL WHERE id = ?`, [adminId])
  await execute(
    `DELETE FROM usuarios WHERE email <> ? AND deleted_at IS NULL`,
    [ADMIN_EMAIL]
  )

  console.log('   ✓ Datos dependientes eliminados; usuarios CLIENTE removidos')
}

async function asegurarAdmin() {
  const adminRol = await queryOne(`SELECT id FROM roles WHERE codigo = 'admin' LIMIT 1`)
  const clienteRol = await queryOne(`SELECT id FROM roles WHERE codigo = 'cliente' LIMIT 1`)
  if (!adminRol?.id || !clienteRol?.id) throw new Error('Roles admin/cliente no encontrados. Ejecute migrate primero.')

  let admin = await queryOne(
    `SELECT id, email, codigo_usuario FROM usuarios WHERE email = ? AND deleted_at IS NULL LIMIT 1`,
    [ADMIN_EMAIL]
  )

  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10)
    const ins = await execute(
      `INSERT INTO usuarios (rol_id, codigo_usuario, email, password_hash, nombres, apellidos, telefono, activo)
       VALUES (?, 'ADM-001', ?, ?, 'Admin', 'Sistema', '900000000', 1)`,
      [adminRol.id, ADMIN_EMAIL, hash]
    )
    admin = { id: ins.insertId, email: ADMIN_EMAIL, codigo_usuario: 'ADM-001' }
    console.log('   ✓ Admin creado:', ADMIN_EMAIL)
  } else {
    await execute(
      `UPDATE usuarios SET codigo_usuario = COALESCE(codigo_usuario, 'ADM-001'), rol_id = ?, activo = 1, productor_id = NULL WHERE id = ?`,
      [adminRol.id, admin.id]
    )
    console.log('   ✓ Admin conservado:', ADMIN_EMAIL, `(id ${admin.id})`)
  }

  return { adminId: admin.id, adminRolId: adminRol.id, clienteRolId: clienteRol.id }
}

async function crearClientes(clienteRolId, passwordHash) {
  const ids = []
  for (const c of CLIENTES) {
    let row = await queryOne(`SELECT id FROM usuarios WHERE email = ? LIMIT 1`, [c.email])
    if (row?.id) {
      await execute(
        `UPDATE usuarios SET rol_id = ?, codigo_usuario = ?, nombres = ?, apellidos = ?, telefono = ?, password_hash = ?, activo = 1, deleted_at = NULL WHERE id = ?`,
        [clienteRolId, c.codigo, c.nombres, c.apellidos, c.telefono, passwordHash, row.id]
      )
      ids.push({ ...c, id: row.id })
    } else {
      const ins = await execute(
        `INSERT INTO usuarios (rol_id, codigo_usuario, email, password_hash, nombres, apellidos, telefono, activo)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [clienteRolId, c.codigo, c.email, passwordHash, c.nombres, c.apellidos, c.telefono]
      )
      ids.push({ ...c, id: ins.insertId })
    }
    stats.clientes++
    await logAuditoria(ids[ids.length - 1].id, `${c.nombres} ${c.apellidos}`, 'cliente', 'CREAR_CLIENTE', 'usuarios', ids[ids.length - 1].id, `Seed creó cliente ${c.codigo} (${c.email})`)
  }
  return ids
}

async function logAuditoria(userId, nombre, rol, accion, entidad, entidadId, descripcion) {
  const detalle = JSON.stringify({ modulo: entidad, descripcion, resultado: 'exito', usuario_nombre: nombre, rol })
  await execute(
    `INSERT INTO auditoria_logs (usuario_id, accion, entidad, entidad_id, detalle, ip_address)
     VALUES (?, ?, ?, ?, ?, '127.0.0.1')`,
    [userId, accion, entidad, entidadId, detalle]
  )
  stats.auditoria++
}

function pickCalidad(puntaje) {
  if (puntaje >= 88) return 'Excelente'
  if (puntaje >= 78) return 'Buena'
  if (puntaje >= 68) return 'Aceptable'
  return 'Regular'
}

function pickPrediccion(puntaje) {
  if (puntaje >= 85) return { calidad: 'Alta', riesgoPct: 15, nivel: 'bajo' }
  if (puntaje >= 72) return { calidad: 'Media', riesgoPct: 38, nivel: 'medio' }
  return { calidad: 'Baja', riesgoPct: 62, nivel: 'alto' }
}

async function seedCliente(cliente, clienteIndex, passwordHash) {
  const userId = cliente.id
  const codigoUsuario = cliente.codigo

  for (let p = 1; p <= 5; p++) {
    const codigoProd = CodeGenerator.productorCode(codigoUsuario, p)
    const prodShort = CodeGenerator.productorShort(p)
    const fincaNombre = `${FINCA_BASE[p - 1]} · ${cliente.nombres.split(' ')[1] || cliente.nombres}`
    const dni = `${String(clienteIndex + 1).padStart(2, '0')}${String(p).padStart(6, '0')}`

    const prodIns = await execute(
      `INSERT INTO productores (codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado, user_id)
       VALUES (?, ?, 'Productor', ?, ?, ?, ?, 'Junín, Perú', ?, 'Activo', ?)`,
      [
        codigoProd,
        fincaNombre,
        dni,
        `9${String(userId).padStart(2, '0')}${p}${String(clienteIndex).padStart(2, '0')}`,
        `prod.${codigoUsuario.toLowerCase()}.${p}@cafeai.com`,
        fincaNombre,
        1400 + p * 80 + clienteIndex * 10,
        userId,
      ]
    )
    const productorId = prodIns.insertId
    stats.productores++

    await logAuditoria(
      userId,
      `${cliente.nombres} ${cliente.apellidos}`,
      'cliente',
      'CREAR_PRODUCTOR',
      'productores',
      productorId,
      `${cliente.nombres} registró productor ${codigoProd}`
    )

    for (let l = 1; l <= 5; l++) {
      const codigoLote = CodeGenerator.loteCode(codigoUsuario, prodShort, l)
      const variedad = VARIEDADES[(p + l + clienteIndex) % VARIEDADES.length]
      const proceso = PROCESOS[(p + l) % PROCESOS.length]
      const estado = ESTADOS_LOTE[(p + l - 1) % ESTADOS_LOTE.length]
      const kg = 80 + ((userId * 17 + productorId * 11 + l * 23) % 420)
      const humedad = 10.5 + (l % 3) * 0.4
      const temp = 18 + (l % 4)
      const altitud = 1500 + p * 60 + l * 15
      const fechaCosecha = `2026-0${((p + l - 1) % 6) + 1}-${String(5 + l).padStart(2, '0')}`

      const loteIns = await execute(
        `INSERT INTO lotes (codigo_lote, productor_id, user_id, variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado, calidad_grano)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Buena')`,
        [codigoLote, productorId, userId, variedad, fechaCosecha, kg, estado, humedad, temp, altitud, proceso]
      )
      const loteId = loteIns.insertId
      stats.lotes++

      await execute(
        `INSERT INTO inventario (lote_id, cantidad_disponible_kg, fecha_actualizacion) VALUES (?, ?, CURDATE())`,
        [loteId, kg]
      ).catch(() => {})

      await execute(
        `INSERT INTO produccion (lote_id, user_id, fecha_registro, cantidad_kg, humedad, temperatura, tipo_proceso, observaciones)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [loteId, userId, fechaCosecha, kg, humedad, temp, proceso, `Producción seed ${codigoLote}`]
      )
      stats.produccion++

      let orden = 1
      for (const etapa of ETAPAS_TRAZA) {
        await execute(
          `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, orden, usuario_registro_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            loteId,
            etapa,
            `${etapa} del lote ${codigoLote}`,
            fechaCosecha,
            fincaNombre,
            orden < 5 ? 'Completado' : 'Pendiente',
            orden++,
            userId,
          ]
        )
        stats.trazabilidad++
      }

      const puntaje = 75 + ((loteId * 7) % 20)
      const calidadFinal = pickCalidad(puntaje)
      await execute(
        `INSERT INTO control_calidad (lote_id, user_id, evaluador_id, aroma, sabor, cuerpo, acidez, dulzor, balance, puntaje_taza, calidad_final, estado, observaciones, fecha_evaluacion)
         VALUES (?, ?, ?, 8, 8, 7.5, 7.8, 8.2, 8, ?, ?, 'Evaluado', ?, CURDATE())`,
        [loteId, userId, userId, puntaje, calidadFinal, `Control seed · humedad ${humedad}% · ${calidadFinal}`]
      )
      stats.calidad++

      const pred = pickPrediccion(puntaje)
      const confianza = 70 + ((loteId * 3) % 28)
      await execute(
        `INSERT INTO predicciones_ia (lote_id, user_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_grano, calidad_predicha, confianza, porcentaje_riesgo, recomendacion, factores_influyentes, fecha_prediccion, modelo, origen, version_modelo)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'Buena', ?, ?, ?, ?, ?, CURDATE(), ?, 'usuario', 'v2.0')`,
        [
          loteId,
          userId,
          humedad,
          temp,
          altitud,
          proceso,
          variedad,
          pred.calidad,
          confianza,
          pred.riesgoPct,
          `Riesgo ${pred.nivel}: monitorear humedad y secado. Modelo predictivo de Machine Learning v2.0.`,
          JSON.stringify([{ factor: 'Humedad', impacto: 'Neutral', nivel_riesgo: pred.nivel }]),
          'Modelo predictivo de Machine Learning v2.0',
        ]
      )
      stats.predicciones++

      await logAuditoria(
        userId,
        `${cliente.nombres} ${cliente.apellidos}`,
        'cliente',
        'CREAR_LOTE',
        'lotes',
        loteId,
        `${cliente.nombres} registró el lote ${codigoLote} del productor ${codigoProd}`
      )
    }
  }
}

async function verificarResumen(adminId) {
  const [clientes, productores, lotes, traza, calidad, pred, audit] = await Promise.all([
    queryOne(`SELECT COUNT(*) AS c FROM usuarios u JOIN roles r ON u.rol_id=r.id WHERE r.codigo='cliente' AND u.deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM trazabilidad`),
    queryOne(`SELECT COUNT(*) AS c FROM control_calidad`),
    queryOne(`SELECT COUNT(*) AS c FROM predicciones_ia WHERE origen='usuario'`),
    queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs`),
  ])

  const adminLotes = await queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE user_id = ? AND deleted_at IS NULL`, [adminId])

  return {
    clientes: Number(clientes?.c),
    productores: Number(productores?.c),
    lotes: Number(lotes?.c),
    trazabilidad: Number(traza?.c),
    calidad: Number(calidad?.c),
    predicciones: Number(pred?.c),
    auditoria: Number(audit?.c),
    adminLotes: Number(adminLotes?.c),
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Seed multiusuario PMV2 — Café Sostenible AI')
  console.log('═══════════════════════════════════════════════════')

  await initDatabase()
  await applyMultiusuarioMigrations()

  const existing = await queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`)
  if (Number(existing?.c) > 0 && !FORCE) {
    console.log('\n⚠️  Ya hay lotes en la BD. Use SEED_MULTIUSUARIO_FORCE=1 para limpiar y regenerar.')
    await closePool()
    process.exit(0)
  }

  const { adminId } = await asegurarAdmin()
  await limpiarDatos(adminId)

  const passwordHash = await bcrypt.hash(CLIENT_PASSWORD, 10)
  const clienteRol = await queryOne(`SELECT id FROM roles WHERE codigo = 'cliente' LIMIT 1`)
  const clientes = await crearClientes(clienteRol.id, passwordHash)

  console.log('\n📦 Generando productores, lotes, trazabilidad, calidad e IA...')
  for (let i = 0; i < clientes.length; i++) {
    await seedCliente(clientes[i], i, passwordHash)
    console.log(`   ✓ ${clientes[i].codigo} — ${clientes[i].email}`)
  }

  const resumen = await verificarResumen(adminId)

  console.log('\n═══════════════════════════════════════════════════')
  console.log('  RESUMEN FINAL')
  console.log('═══════════════════════════════════════════════════')
  console.log(`  Admin conservado:     ${ADMIN_EMAIL} (lotes propios: ${resumen.adminLotes})`)
  console.log(`  Clientes:             ${resumen.clientes} (esperado: 5)`)
  console.log(`  Productores:          ${resumen.productores} (esperado: 25)`)
  console.log(`  Lotes:                ${resumen.lotes} (esperado: 125)`)
  console.log(`  Trazabilidad:         ${resumen.trazabilidad} (esperado: 625)`)
  console.log(`  Control calidad:      ${resumen.calidad} (esperado: 125)`)
  console.log(`  Predicciones IA:      ${resumen.predicciones} (esperado: 125)`)
  console.log(`  Registros producción: ${stats.produccion}`)
  console.log(`  Auditoría (nuevos):   ${resumen.auditoria}`)
  console.log('\n  Credenciales CLIENTE (todas): contraseña → mbappe29')
  CLIENTES.forEach((c) => console.log(`    · ${c.email}  (${c.codigo})`))
  console.log('\n  Documentación: docs/DATOS_PRUEBA_PMV2.md')
  console.log('═══════════════════════════════════════════════════\n')

  await closePool()
  process.exit(0)
}

main().catch(async (e) => {
  console.error('Error en seed:', e)
  await closePool()
  process.exit(1)
})
