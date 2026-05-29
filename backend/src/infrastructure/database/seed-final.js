/**
 * Seed demo final reutilizable (CLI + API admin en Railway).
 */
import bcrypt from 'bcryptjs'
import { initDatabase } from './migrate.js'
import { applyMultiusuarioMigrations } from './apply-migrations.js'
import { queryOne, execute } from './pool.js'

export const ADMIN_EMAIL = 'admin@cafeai.com'
export const CLIENT_PASSWORD = 'mbappe29'

const CLIENTES = [
  { codigo: 'USU-001', nombres: 'Cliente Uno', apellidos: 'Café Norte', email: 'cliente1@cafeai.com', telefono: '900200001' },
  { codigo: 'USU-002', nombres: 'Cliente Dos', apellidos: 'Café Centro', email: 'cliente2@cafeai.com', telefono: '900200002' },
  { codigo: 'USU-003', nombres: 'Cliente Tres', apellidos: 'Café Sur', email: 'cliente3@cafeai.com', telefono: '900200003' },
  { codigo: 'USU-004', nombres: 'Cliente Cuatro', apellidos: 'Café Este', email: 'cliente4@cafeai.com', telefono: '900200004' },
  { codigo: 'USU-005', nombres: 'Cliente Cinco', apellidos: 'Café Oeste', email: 'cliente5@cafeai.com', telefono: '900200005' },
]

const ETAPAS_LOTE = ['Producción', 'Cosecha', 'Secado', 'Control de calidad', 'Almacenado', 'Comercializado']
const ETAPAS_TRAZA = ['Producción', 'Cosecha', 'Secado', 'Control de calidad', 'Almacenamiento', 'Comercialización']
const VARIEDADES = ['Typica', 'Caturra', 'Bourbon', 'Catimor', 'Geisha', 'Pache']
const PROCESOS = ['Lavado', 'Natural', 'Honey']

const PRODUCTORES_POOL = [
  ['Juan', 'Pérez', 'Parcela El Roble', 'San Ramón'],
  ['María', 'Quispe', 'Finca La Selva', 'Chanchamayo'],
  ['Carlos', 'Mendoza', 'Alto Satipo', 'Satipo'],
  ['Rosa', 'Huamán', 'Cooperativa Los Andes', 'Perené'],
  ['Luis', 'Torres', 'Finca Huayna', 'Pichanaki'],
  ['Ana', 'Ríos', 'Loma Verde', 'La Merced'],
  ['Pedro', 'Castillo', 'El Mirador', 'San Ramón'],
  ['Lucía', 'Vargas', 'Valle Dorado', 'Chanchamayo'],
  ['Miguel', 'Sánchez', 'Cerro Azul', 'Satipo'],
  ['Elena', 'Flores', 'Buena Vista', 'Perené'],
  ['Jorge', 'Díaz', 'Santa Rosa', 'Pichanaki'],
  ['Carmen', 'López', 'El Paraíso', 'La Merced'],
  ['Ricardo', 'Gómez', 'Monte Alto', 'San Ramón'],
  ['Patricia', 'Rojas', 'La Esperanza', 'Chanchamayo'],
  ['Fernando', 'Silva', 'Nuevo Amanecer', 'Satipo'],
  ['Gabriela', 'Núñez', 'Flor de Café', 'Perené'],
  ['Héctor', 'Ramírez', 'Los Cedros', 'Pichanaki'],
  ['Silvia', 'Acosta', 'Mirador Andino', 'La Merced'],
  ['Oscar', 'Bravo', 'El Encanto', 'San Ramón'],
  ['Daniela', 'Cruz', 'Villa Rica', 'Chanchamayo'],
  ['Andrés', 'Paredes', 'San Pedro', 'Satipo'],
  ['Valeria', 'Ortiz', 'La Colina', 'Perené'],
  ['Raúl', 'Chávez', 'El Progreso', 'Pichanaki'],
  ['Mónica', 'Salazar', 'Bella Flor', 'La Merced'],
  ['Diego', 'Ibarra', 'Café Dorado', 'San Ramón'],
]

async function safeDelete(sql, params = []) {
  try {
    await execute(sql, params)
  } catch (e) {
    if (!['ER_NO_SUCH_TABLE', '42S02'].includes(e.code)) console.warn('[seed-final]', e.message?.slice(0, 100))
  }
}

async function limpiarDatos(adminId) {
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
  await execute(`DELETE FROM usuarios WHERE email <> ? AND deleted_at IS NULL`, [ADMIN_EMAIL])
}

async function asegurarAdmin() {
  const adminRol = await queryOne(`SELECT id FROM roles WHERE codigo = 'admin' LIMIT 1`)
  const clienteRol = await queryOne(`SELECT id FROM roles WHERE codigo = 'cliente' LIMIT 1`)
  if (!adminRol?.id || !clienteRol?.id) throw new Error('Roles admin/cliente no encontrados.')

  const admin = await queryOne(`SELECT id, email FROM usuarios WHERE email = ? AND deleted_at IS NULL`, [ADMIN_EMAIL])
  if (!admin) throw new Error(`Admin ${ADMIN_EMAIL} no encontrado.`)

  await execute(
    `UPDATE usuarios SET codigo_usuario = COALESCE(codigo_usuario, 'ADM-001'), rol_id = ?, activo = 1, productor_id = NULL WHERE id = ?`,
    [adminRol.id, admin.id]
  )
  return { adminId: admin.id, clienteRolId: clienteRol.id }
}

async function logAuditoria(stats, userId, nombre, accion, entidad, entidadId, descripcion) {
  await execute(
    `INSERT INTO auditoria_logs (usuario_id, accion, entidad, entidad_id, detalle, ip_address)
     VALUES (?, ?, ?, ?, ?, '127.0.0.1')`,
    [userId, accion, entidad, entidadId, JSON.stringify({ modulo: entidad, descripcion, resultado: 'exito', usuario_nombre: nombre })]
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
  if (puntaje >= 85) return { calidad: 'Alta', riesgoPct: 12, nivel: 'bajo' }
  if (puntaje >= 72) return { calidad: 'Media', riesgoPct: 35, nivel: 'medio' }
  return { calidad: 'Baja', riesgoPct: 58, nivel: 'alto' }
}

async function crearClientes(stats, clienteRolId, passwordHash) {
  const ids = []
  for (const c of CLIENTES) {
    const ins = await execute(
      `INSERT INTO usuarios (rol_id, codigo_usuario, email, password_hash, nombres, apellidos, telefono, activo)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [clienteRolId, c.codigo, c.email, passwordHash, c.nombres, c.apellidos, c.telefono]
    )
    ids.push({ ...c, id: ins.insertId })
    stats.clientes++
    await logAuditoria(stats, ins.insertId, `${c.nombres} ${c.apellidos}`, 'CREAR_CLIENTE', 'usuarios', ins.insertId, `Seed final: cliente ${c.codigo}`)
  }
  return ids
}

async function seedAll(stats, clientes, adminId) {
  let globalProd = 0
  let globalLote = 0

  for (const cliente of clientes) {
    const userId = cliente.id
    for (let p = 1; p <= 5; p++) {
      globalProd++
      const prodData = PRODUCTORES_POOL[globalProd - 1]
      const [nombres, apellidos, parcela, ubicacion] = prodData
      const codigoProd = `P${String(globalProd).padStart(3, '0')}`
      const dni = `${String(10000000 + globalProd).slice(0, 8)}`
      const telefono = `9${String(200000000 + globalProd).slice(0, 8)}`
      const correo = `prod.${codigoProd.toLowerCase()}@cafeai.com`
      const altitud = 1350 + (globalProd % 10) * 45

      const prodIns = await execute(
        `INSERT INTO productores (codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado, user_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo', ?)`,
        [codigoProd, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, userId]
      )
      const productorId = prodIns.insertId
      stats.productores++
      await logAuditoria(stats, userId, `${cliente.nombres} ${cliente.apellidos}`, 'CREAR_PRODUCTOR', 'productores', productorId, `${nombres} ${apellidos} (${codigoProd})`)

      for (let l = 1; l <= 6; l++) {
        globalLote++
        const codigoLote = `L${String(globalLote).padStart(3, '0')}`
        const estadoLote = ETAPAS_LOTE[(globalLote - 1) % 6]
        const variedad = VARIEDADES[(globalLote + p) % VARIEDADES.length]
        const proceso = PROCESOS[(globalLote + l) % PROCESOS.length]
        const kg = 90 + ((globalLote * 17 + productorId * 11) % 380)
        const humedad = 10.2 + (globalLote % 5) * 0.35
        const temp = 17 + (globalLote % 6)
        const fechaCosecha = `2026-${String(((globalLote - 1) % 12) + 1).padStart(2, '0')}-${String(((globalLote + l) % 25) + 1).padStart(2, '0')}`
        const conTrazabilidad = globalLote <= 120
        const conIA = globalLote <= 110
        const puntaje = 70 + ((globalLote * 13 + l * 7) % 26)

        const loteIns = await execute(
          `INSERT INTO lotes (codigo_lote, productor_id, user_id, variedad_cafe, fecha_cosecha, cantidad_kg, estado, humedad, temperatura, altitud, tipo_secado, calidad_grano, qr_codigo)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Buena', ?)`,
          [codigoLote, productorId, userId, variedad, fechaCosecha, kg, estadoLote, humedad, temp, altitud, proceso, `CAFE-${globalLote}`]
        )
        const loteId = loteIns.insertId
        stats.lotes++

        await execute(`INSERT INTO inventario (lote_id, cantidad_disponible_kg, fecha_actualizacion) VALUES (?, ?, CURDATE())`, [loteId, kg]).catch(() => {})
        await execute(
          `INSERT INTO produccion (lote_id, user_id, fecha_registro, cantidad_kg, humedad, temperatura, tipo_proceso, observaciones)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [loteId, userId, fechaCosecha, kg, humedad, temp, proceso, `Producción demo · ${codigoLote} · ${nombres} ${apellidos}`]
        )
        stats.produccion++

        if (conTrazabilidad) {
          let orden = 1
          for (const etapa of ETAPAS_TRAZA) {
            await execute(
              `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado, orden, usuario_registro_id)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [loteId, etapa, `${etapa} — ${codigoLote}`, fechaCosecha, parcela, orden <= 4 ? 'Completado' : 'En proceso', orden++, userId]
            )
            stats.trazabilidad++
          }
        }

        const calidadFinal = pickCalidad(puntaje)
        await execute(
          `INSERT INTO control_calidad (lote_id, user_id, evaluador_id, aroma, sabor, cuerpo, acidez, dulzor, balance, puntaje_taza, calidad_final, estado, observaciones, fecha_evaluacion)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Evaluado', ?, CURDATE())`,
          [loteId, userId, userId, 7 + (puntaje % 3), 7.5 + (puntaje % 2), 7 + (l % 3), 7.2 + (p % 2), 7.8, 7.5, puntaje, calidadFinal, `Evaluación demo · ${estadoLote} · humedad ${humedad}% · ${calidadFinal}`]
        )
        stats.calidad++

        if (conIA) {
          const pred = pickPrediccion(puntaje)
          const confianza = 72 + (globalLote % 25)
          const predIns = await execute(
            `INSERT INTO predicciones_ia (lote_id, user_id, humedad, temperatura, altitud, tipo_secado, variedad_cafe, calidad_grano, calidad_predicha, confianza, porcentaje_riesgo, recomendacion, factores_influyentes, fecha_prediccion, modelo, origen, version_modelo)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'Buena', ?, ?, ?, ?, ?, CURDATE(), ?, 'usuario', 'v2.0')`,
            [loteId, userId, humedad, temp, altitud, proceso, variedad, pred.calidad, confianza, pred.riesgoPct, `Riesgo ${pred.nivel}: monitorear secado y humedad en etapa ${estadoLote}.`, JSON.stringify([{ factor: 'Humedad', impacto: pred.nivel === 'bajo' ? 'Positivo' : 'Neutral', nivel_riesgo: pred.nivel }]), 'Modelo predictivo heurístico v2.0']
          )
          stats.predicciones++
          if (pred.riesgoPct >= 40) {
            await execute(
              `INSERT INTO alertas_ia (lote_id, prediccion_id, tipo_alerta, severidad, mensaje, fecha_alerta)
               VALUES (?, ?, 'RIESGO_CALIDAD', ?, ?, CURDATE())`,
              [loteId, predIns.insertId, pred.riesgoPct >= 50 ? 'alta' : 'media', `Alerta demo: riesgo ${pred.riesgoPct}% en ${codigoLote}`]
            ).catch(() => {})
            stats.alertas++
          }
        }
        await logAuditoria(stats, userId, `${cliente.nombres}`, 'CREAR_LOTE', 'lotes', loteId, `Lote ${codigoLote} — ${nombres} ${apellidos}`)
      }
    }
  }
  await logAuditoria(stats, adminId, 'Admin Sistema', 'SEED_FINAL', 'sistema', null, 'Seed demo final ejecutado: 5 clientes, 25 productores, 150 lotes')
}

async function verificarResumen(adminId) {
  const [clientes, productores, lotes, conTraza, sinTraza, conIa, sinIa, calidad, pred, kg] = await Promise.all([
    queryOne(`SELECT COUNT(*) AS c FROM usuarios u JOIN roles r ON u.rol_id=r.id WHERE r.codigo='cliente' AND u.deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`),
    queryOne(`SELECT COUNT(DISTINCT l.id) AS c FROM lotes l INNER JOIN trazabilidad t ON t.lote_id=l.id WHERE l.deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id=l.id)`),
    queryOne(`SELECT COUNT(DISTINCT l.id) AS c FROM lotes l INNER JOIN predicciones_ia p ON p.lote_id=l.id AND p.origen='usuario' WHERE l.deleted_at IS NULL`),
    queryOne(`SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id=l.id AND p.origen='usuario')`),
    queryOne(`SELECT COUNT(*) AS c FROM control_calidad`),
    queryOne(`SELECT COUNT(*) AS c FROM predicciones_ia WHERE origen='usuario'`),
    queryOne(`SELECT COALESCE(SUM(cantidad_kg),0) AS kg FROM lotes WHERE deleted_at IS NULL`),
  ])
  const adminLotes = await queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE user_id=? AND deleted_at IS NULL`, [adminId])
  return {
    clientes: Number(clientes?.c),
    productores: Number(productores?.c),
    lotes: Number(lotes?.c),
    conTraza: Number(conTraza?.c),
    sinTraza: Number(sinTraza?.c),
    conIa: Number(conIa?.c),
    sinIa: Number(sinIa?.c),
    calidad: Number(calidad?.c),
    predicciones: Number(pred?.c),
    kg: Number(kg?.kg),
    adminLotes: Number(adminLotes?.c),
  }
}

/**
 * @param {{ force?: boolean, initDb?: boolean }} options
 */
export async function runSeedFinal(options = {}) {
  const force = options.force === true || process.env.SEED_FINAL_FORCE === '1'
  const initDb = options.initDb !== false

  if (initDb) {
    await initDatabase()
  }
  await applyMultiusuarioMigrations()

  const existing = await queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`)
  if (Number(existing?.c) > 0 && !force) {
    return {
      skipped: true,
      message: 'Ya hay datos. Envíe force:true o SEED_FINAL_FORCE=1 para regenerar.',
      lotesExistentes: Number(existing?.c),
    }
  }

  const stats = { clientes: 0, productores: 0, lotes: 0, trazabilidad: 0, calidad: 0, predicciones: 0, produccion: 0, auditoria: 0, alertas: 0 }
  const { adminId, clienteRolId } = await asegurarAdmin()
  await limpiarDatos(adminId)
  const passwordHash = await bcrypt.hash(CLIENT_PASSWORD, 10)
  const clientes = await crearClientes(stats, clienteRolId, passwordHash)
  await seedAll(stats, clientes, adminId)
  const resumen = await verificarResumen(adminId)

  return {
    skipped: false,
    message: 'Seed demo final completado',
    stats,
    resumen,
    credenciales: {
      admin: ADMIN_EMAIL,
      clientes: CLIENTES.map((c) => ({ email: c.email, codigo: c.codigo, password: CLIENT_PASSWORD })),
    },
  }
}
