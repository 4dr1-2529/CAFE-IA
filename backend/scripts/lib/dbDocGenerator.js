import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const SCHEMA_PATH = path.join(__dirname, '../../sql/schema.sql')
export const DOCS_DIR = path.join(__dirname, '../../../docs/base-datos')
export const ARQUITECTURA_DIR = path.join(
  __dirname,
  '../../../docs/Arquitectura de la solución planteada'
)

const TABLE_META = {
  regiones: { modulo: 'Geografía', desc: 'Regiones del país (ej. Junín)' },
  provincias: { modulo: 'Geografía', desc: 'Provincias por región' },
  distritos: { modulo: 'Geografía', desc: 'Distritos por provincia' },
  roles: { modulo: 'Seguridad', desc: 'Roles del sistema (admin, cliente)' },
  permisos: { modulo: 'Seguridad', desc: 'Permisos por módulo y acción' },
  rol_permisos: { modulo: 'Seguridad', desc: 'Asignación rol–permiso (N:M)' },
  usuarios: { modulo: 'Seguridad', desc: 'Cuentas de acceso al sistema' },
  sesiones: { modulo: 'Seguridad', desc: 'Refresh tokens y sesiones activas' },
  auditoria_logs: { modulo: 'Seguridad', desc: 'Registro de acciones API/sistema' },
  productores: { modulo: 'Productores', desc: 'Productores de café' },
  fincas: { modulo: 'Productores', desc: 'Fincas/parcelas por productor' },
  variedades_cafe: { modulo: 'Catálogo', desc: 'Variedades (Arabica, Typica, …)' },
  tipos_cultivo: { modulo: 'Catálogo', desc: 'Tipos de cultivo' },
  procesos_secado: { modulo: 'Catálogo', desc: 'Métodos de secado' },
  estados_lote: { modulo: 'Catálogo', desc: 'Estados del ciclo del lote' },
  lotes: { modulo: 'Café', desc: 'Lote — entidad central de trazabilidad' },
  cosechas: { modulo: 'Producción', desc: 'Registros de cosecha por lote' },
  produccion: { modulo: 'Producción', desc: 'Procesos de producción por lote' },
  produccion_diaria: { modulo: 'Producción', desc: 'Kg procesados por día y turno' },
  inventario: { modulo: 'Producción', desc: 'Stock disponible por lote' },
  movimientos_stock: { modulo: 'Producción', desc: 'Entradas/salidas/ajustes de inventario' },
  trazabilidad: { modulo: 'Trazabilidad', desc: 'Etapas del ciclo del lote' },
  criterios_calidad: { modulo: 'Calidad', desc: 'Criterios de evaluación sensorial' },
  control_calidad: { modulo: 'Calidad', desc: 'Evaluación sensorial por lote (1:1)' },
  evaluaciones_calidad: { modulo: 'Calidad', desc: 'Puntaje por criterio en un control' },
  defectos_grano: { modulo: 'Calidad', desc: 'Catálogo de defectos del grano' },
  evaluacion_defectos: { modulo: 'Calidad', desc: 'Defectos detectados en un control' },
  resultados_cata: { modulo: 'Calidad', desc: 'Resultados de cata profesional' },
  predicciones_ia: { modulo: 'IA', desc: 'Predicciones de calidad por lote' },
  variables_prediccion: { modulo: 'IA', desc: 'Variables y pesos de cada predicción' },
  alertas_ia: { modulo: 'IA', desc: 'Alertas del módulo IA' },
  recomendaciones_ia: { modulo: 'IA', desc: 'Recomendaciones asociadas a predicción' },
  reportes: { modulo: 'Reportes', desc: 'Solicitudes de reportes' },
  exportaciones: { modulo: 'Reportes', desc: 'Archivos exportados (PDF/Excel/CSV)' },
  historial_reportes: { modulo: 'Reportes', desc: 'Historial de acciones sobre reportes' },
  notificaciones: { modulo: 'Sistema', desc: 'Notificaciones in-app por usuario' },
  configuraciones: { modulo: 'Sistema', desc: 'Parámetros globales clave-valor' },
  actividades_usuario: { modulo: 'Sistema', desc: 'Actividad reciente por usuario' },
  dashboard_metricas: { modulo: 'Sistema', desc: 'Métricas agregadas para dashboard' },
}

const LOGICAL_NO_FK = [{ table: 'predicciones_ia', column: 'lote_id', ref: 'lotes(id)' }]

export function readSchemaSql() {
  return fs.readFileSync(SCHEMA_PATH, 'utf8')
}

export function parseSchema(sql) {
  const tables = [...sql.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)\s*\(([\s\S]*?)\)\s*ENGINE/gi)].map((m) => ({
    name: m[1],
    body: m[2],
  }))

  const fks = [
    ...sql.matchAll(
      /CONSTRAINT (\w+) FOREIGN KEY \(([^)]+)\) REFERENCES (\w+)\((\w+)\)([^,\n)]*)/gi
    ),
  ].map((m) => ({
    name: m[1],
    table: null,
    column: m[2].trim(),
    refTable: m[3],
    refColumn: m[4],
    onDelete: (m[5] || '').replace(/\s+/g, ' ').trim() || '—',
  }))

  const alterFks = [
    ...sql.matchAll(
      /ALTER TABLE (\w+) ADD CONSTRAINT (\w+)\s+FOREIGN KEY \(([^)]+)\) REFERENCES (\w+)\((\w+)\)([^;]*)/gi
    ),
  ].map((m) => ({
    name: m[2],
    table: m[1],
    column: m[3].trim(),
    refTable: m[4],
    refColumn: m[5],
    onDelete: (m[6] || '').replace(/\s+/g, ' ').trim() || '—',
  }))

  for (const t of tables) {
    const body = t.body
    for (const fk of fks) {
      if (fk.table) continue
      if (body.includes(`CONSTRAINT ${fk.name}`)) fk.table = t.name
    }
    t.pk =
      body.match(/(\w+)\s+INT\s+UNSIGNED\s+AUTO_INCREMENT\s+PRIMARY\s+KEY/i)?.[1] ||
      (t.name === 'rol_permisos' ? '(rol_id, permiso_id)' : 'id')
    t.indexes = [...body.matchAll(/(?:UNIQUE KEY|INDEX)\s+(\w+)/gi)].map((x) => x[1])
    t.hasDeletedAt = /deleted_at/i.test(body)
  }

  for (const fk of fks) {
    if (!fk.table) {
      const block = tables.find((t) => t.body.includes(fk.name))
      if (block) fk.table = block.name
    }
  }

  return { tables, fks: [...fks.filter((f) => f.table), ...alterFks] }
}

export async function fetchLiveMeta(query, queryOne) {
  try {
    const tables = await query(
      `SELECT TABLE_NAME AS name, TABLE_ROWS AS rows_est, TABLE_COMMENT AS comment
       FROM information_schema.tables
       WHERE table_schema = DATABASE() AND table_type = 'BASE TABLE'
       ORDER BY TABLE_NAME`
    )
    const fks = await query(
      `SELECT TABLE_NAME AS \`table\`, COLUMN_NAME AS \`column\`,
              CONSTRAINT_NAME AS name, REFERENCED_TABLE_NAME AS refTable,
              REFERENCED_COLUMN_NAME AS refColumn
       FROM information_schema.KEY_COLUMN_USAGE
       WHERE table_schema = DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL
       ORDER BY TABLE_NAME, ORDINAL_POSITION`
    )
    const indexes = await query(
      `SELECT TABLE_NAME AS \`table\`, INDEX_NAME AS name, NON_UNIQUE AS non_unique,
              GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS columns
       FROM information_schema.STATISTICS
       WHERE table_schema = DATABASE()
       GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
       ORDER BY TABLE_NAME, INDEX_NAME`
    )
    const views = await query(
      `SELECT TABLE_NAME AS name FROM information_schema.tables
       WHERE table_schema = DATABASE() AND table_type = 'VIEW'`
    )
    const dbName = (await queryOne('SELECT DATABASE() AS db'))?.db
    return { ok: true, dbName, tables, fks, indexes, views }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

function isoDate() {
  return new Date().toISOString().slice(0, 10)
}

function sourceLine(live) {
  if (live?.ok) {
    return `> **Fuente:** MySQL en vivo (\`${live.dbName}\`) + \`backend/sql/schema.sql\`  \n> **Generado:** ${isoDate()} (script \`npm run db:docs\`)`
  }
  return `> **Fuente:** \`backend/sql/schema.sql\` (MySQL no disponible: ${live?.error || 'sin conexión'})  \n> **Generado:** ${isoDate()} (script \`npm run db:docs\`)`
}

export function buildConceptual(parsed, live) {
  const { tables, fks } = parsed
  const modules = [...new Set(tables.map((t) => TABLE_META[t.name]?.modulo || 'Otro'))]

  let md = `# Modelo Conceptual — Café Sostenible AI (CAFE-IA)\n\n${sourceLine(live)}\n\n---\n\n`
  md += `## 1. Propósito\n\nSistema de gestión y trazabilidad de café sostenible con IA: geografía, multiusuario, lotes, calidad, predicciones y auditoría.\n\n`
  md += `## 2. Agregados (${modules.length} dominios, ${tables.length} tablas)\n\n`
  md += `| Agregado | Tablas |\n|----------|--------|\n`
  for (const mod of modules) {
    const names = tables.filter((t) => (TABLE_META[t.name]?.modulo || 'Otro') === mod).map((t) => `\`${t.name}\``)
    md += `| **${mod}** | ${names.join(', ')} |\n`
  }
  md += `\n## 3. Relaciones clave\n\n`
  md += `- **Geografía:** Región → Provincia → Distrito.\n`
  md += `- **Seguridad:** Rol ↔ Permiso (N:M); Usuario → Rol; Usuario ↔ Productor.\n`
  md += `- **Núcleo:** Productor y Usuario → muchos Lotes.\n`
  md += `- **Lote:** Producción, inventario, trazabilidad, calidad (1:1), IA y alertas.\n`
  md += `- **IA:** Predicción → variables y recomendaciones; alertas por lote.\n\n`
  md += `## 4. Métricas\n\n| Métrica | Valor |\n|---------|-------|\n`
  md += `| Tablas | **${tables.length}** |\n| FK | **${fks.length}** |\n| Sin FK (lógica) | **${LOGICAL_NO_FK.length}** |\n`
  return md
}

export function buildLogical(parsed, live) {
  const { tables, fks } = parsed
  let md = `# Modelo Lógico — Café Sostenible AI (CAFE-IA)\n\n${sourceLine(live)}\n\n---\n\n`
  md += `## Convenciones\n\nPK: \`id\` INT UNSIGNED (o compuesta en \`rol_permisos\`). Integridad: ${fks.length} FK.\n\n`
  for (const t of tables) {
    const meta = TABLE_META[t.name] || { modulo: '—', desc: t.name }
    const outFks = fks.filter((f) => f.table === t.name)
    const inFks = fks.filter((f) => f.refTable === t.name)
    md += `### ${t.name}\n\n**Módulo:** ${meta.modulo} · ${meta.desc}\n\n`
    md += `| PK | ${t.pk} |\n`
    if (outFks.length) {
      md += `| Referencias | ${outFks.map((f) => `${f.column}→${f.refTable}`).join('; ')} |\n`
    }
    if (inFks.length) {
      md += `| Referenciada por | ${[...new Set(inFks.map((f) => f.table))].join(', ')} |\n`
    }
    md += '\n'
  }
  md += `## Relación sin FK\n\n| Tabla | Columna | Referencia |\n|-------|---------|------------|\n`
  for (const r of LOGICAL_NO_FK) {
    md += `| \`${r.table}\` | \`${r.column}\` | \`${r.ref}\` |\n`
  }
  return md
}

export function buildPhysical(parsed, live) {
  const { tables, fks } = parsed
  let md = `# Modelo Físico — Café Sostenible AI (CAFE-IA)\n\n${sourceLine(live)}\n\n---\n\n`
  md += `## Inventario (${tables.length} tablas)\n\n`
  md += `| # | Tabla | Módulo | Descripción | PK |\n|---|-------|--------|-------------|----|\n`
  tables.forEach((t, i) => {
    const m = TABLE_META[t.name] || { modulo: '—', desc: '—' }
    md += `| ${i + 1} | \`${t.name}\` | ${m.modulo} | ${m.desc} | \`${t.pk}\` |\n`
  })
  md += `\n## Claves foráneas (${fks.length})\n\n`
  md += `| Tabla | Columna | Constraint | → Referencia | ON DELETE |\n|-------|---------|------------|--------------|----------|\n`
  for (const f of fks) {
    md += `| \`${f.table}\` | \`${f.column}\` | \`${f.name}\` | \`${f.refTable}(${f.refColumn})\` | ${f.onDelete} |\n`
  }
  md += `\n## Sin FK declarada\n\n`
  for (const r of LOGICAL_NO_FK) {
    md += `- \`${r.table}.${r.column}\` → \`${r.ref}\` (índice en DDL)\n`
  }
  if (live?.ok && live.views?.length) {
    md += `\n## Vistas en BD (${live.views.length})\n\n`
    for (const v of live.views) md += `- \`${v.name}\`\n`
  }
  md += `\n## Estadísticas\n\n| Métrica | Valor |\n|---------|-------|\n`
  md += `| Tablas | ${tables.length} |\n| FK | ${fks.length} |\n| Soft delete | ${tables.filter((t) => t.hasDeletedAt).length} |\n`
  return md
}

function mermaidEntity(name) {
  return name.replace(/`/g, '')
}

export function buildDer(parsed, live) {
  const { tables, fks } = parsed
  const rels = new Set()
  for (const f of fks) {
    const a = mermaidEntity(f.table)
    const b = mermaidEntity(f.refTable)
    rels.add(`    ${b} ||--o{ ${a} : "${f.column}"`)
  }
  for (const r of LOGICAL_NO_FK) {
    rels.add(`    ${mermaidEntity(r.ref.split('(')[0])} ||--o{ ${mermaidEntity(r.table)} : "${r.column}"`)
  }

  const mermaidBody = `erDiagram\n${[...rels].sort().join('\n')}`
  let md = `# Diagrama Entidad-Relación (DER) — Café Sostenible AI\n\n${sourceLine(live)}\n\n---\n\n`
  md += `## DER global\n\n\`\`\`mermaid\n${mermaidBody}\n\`\`\`\n\n## Entidades\n\n`
  md += tables.map((t) => `- \`${t.name}\``).join('\n')
  md += `\n\n## Imágenes exportadas\n\nVer carpeta [\`../Arquitectura de la solución planteada/\`](../Arquitectura%20de%20la%20solución%20planteada/).\n`
  return md
}

/** DER resumido por módulos (legible en informe / PNG). */
export function buildDerResumidoMermaid() {
  return `erDiagram
    regiones ||--o{ provincias : contiene
    provincias ||--o{ distritos : contiene
    distritos ||--o{ productores : ubica
    distritos ||--o{ fincas : ubica
    roles ||--o{ usuarios : asigna
    roles ||--o{ rol_permisos : ""
    permisos ||--o{ rol_permisos : ""
    productores ||--o{ fincas : posee
    productores ||--o{ lotes : produce
    usuarios ||--o{ lotes : registra
    usuarios ||--o| productores : gestiona
    lotes ||--o{ cosechas : ""
    lotes ||--o{ produccion : ""
    lotes ||--o{ inventario : ""
    inventario ||--o{ movimientos_stock : ""
    lotes ||--o{ trazabilidad : ""
    lotes ||--o| control_calidad : evalua
    control_calidad ||--o{ evaluaciones_calidad : ""
    criterios_calidad ||--o{ evaluaciones_calidad : ""
    lotes ||--o{ predicciones_ia : predice
    predicciones_ia ||--o{ variables_prediccion : ""
    predicciones_ia ||--o{ recomendaciones_ia : ""
    predicciones_ia ||--o{ alertas_ia : ""
    lotes ||--o{ alertas_ia : ""
    usuarios ||--o{ reportes : ""
    reportes ||--o{ exportaciones : ""
    usuarios ||--o{ notificaciones : ""
    usuarios ||--o{ auditoria_logs : ""`
}

/** Arquitectura en capas del sistema CAFE-IA. */
export function buildArquitecturaSolucionMermaid() {
  return `flowchart TB
    subgraph presentacion["Capa de presentación"]
        FE["Frontend React + Vite<br/>Dashboard, lotes, IA, reportes"]
    end
    subgraph aplicacion["Capa de aplicación - Hexagonal"]
        API["Backend Node.js + Express<br/>JWT, REST API, 11 repositorios"]
        IA["Módulo IA<br/>Predicciones, alertas, recomendaciones"]
    end
    subgraph datos["Capa de datos"]
        DB[("MySQL cafe_sostenible<br/>39 tablas · utf8mb4")]
        VIEWS["Vistas v_lotes_resumen<br/>v_dashboard_kpis"]
    end
    FE -->|"HTTPS / REST + JWT"| API
    API --> IA
    API --> DB
    IA --> DB
    DB --- VIEWS`
}

export function getDerGlobalMermaid(parsed) {
  const rels = new Set()
  for (const f of parsed.fks) {
    rels.add(`    ${mermaidEntity(f.refTable)} ||--o{ ${mermaidEntity(f.table)} : "${f.column}"`)
  }
  for (const r of LOGICAL_NO_FK) {
    rels.add(`    ${mermaidEntity(r.ref.split('(')[0])} ||--o{ ${mermaidEntity(r.table)} : "${r.column}"`)
  }
  return `erDiagram\n${[...rels].sort().join('\n')}`
}

async function renderPngViaKroki(body, pngPath) {
  const res = await fetch('https://kroki.io/mermaid/png', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body,
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Kroki ${res.status}: ${errText.slice(0, 120)}`)
  }
  fs.writeFileSync(pngPath, Buffer.from(await res.arrayBuffer()))
}

function defaultChromePath() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ]
  return candidates.find((p) => p && fs.existsSync(p))
}

function renderPngViaMmdc(mmdPath, pngPath, width) {
  const mmdcWin = path.join(__dirname, '../../node_modules/.bin/mmdc.cmd')
  const mmdcUnix = path.join(__dirname, '../../node_modules/.bin/mmdc')
  const mmdc = fs.existsSync(mmdcWin) ? mmdcWin : fs.existsSync(mmdcUnix) ? mmdcUnix : null
  const bin = mmdc ? `"${mmdc}"` : 'npx -y @mermaid-js/mermaid-cli@11.4.0'
  const env = { ...process.env, PUPPETEER_SKIP_DOWNLOAD: 'true' }
  const chrome = defaultChromePath()
  if (chrome) env.PUPPETEER_EXECUTABLE_PATH = chrome
  execSync(`${bin} -i "${mmdPath}" -o "${pngPath}" -w ${width} -b white`, {
    stdio: 'pipe',
    cwd: path.join(__dirname, '../..'),
    timeout: 120000,
    env,
  })
}

export async function exportMermaidImages(parsed, live) {
  fs.mkdirSync(ARQUITECTURA_DIR, { recursive: true })
  const date = isoDate()
  const specs = [
    {
      file: 'der-modulos-base-datos',
      title: 'DER por módulos — Base de datos CAFE-IA',
      body: buildDerResumidoMermaid(),
      width: 2000,
    },
    {
      file: 'der-relaciones-completas',
      title: 'DER completo — 39 tablas',
      body: getDerGlobalMermaid(parsed),
      width: 3200,
    },
    {
      file: 'arquitectura-solucion-cafe-ia',
      title: 'Arquitectura de la solución — Café Sostenible AI',
      body: buildArquitecturaSolucionMermaid(),
      width: 1600,
    },
  ]

  const exported = []
  for (const spec of specs) {
    const mmdPath = path.join(ARQUITECTURA_DIR, `${spec.file}.mmd`)
    const pngPath = path.join(ARQUITECTURA_DIR, `${spec.file}.png`)
    const mdPath = path.join(ARQUITECTURA_DIR, `${spec.file}.md`)
    fs.writeFileSync(mmdPath, spec.body, 'utf8')
    fs.writeFileSync(
      mdPath,
      `# ${spec.title}\n\n> Generado: ${date}${live?.ok ? ` · MySQL \`${live.dbName}\` validado` : ''}\n\n\`\`\`mermaid\n${spec.body}\n\`\`\`\n\n![${spec.title}](./${spec.file}.png)\n`,
      'utf8'
    )
    try {
      try {
        renderPngViaMmdc(mmdPath, pngPath, spec.width)
      } catch {
        await renderPngViaKroki(spec.body, pngPath)
        console.log(`[db:docs] PNG (Kroki): ${pngPath}`)
      }
      if (fs.existsSync(pngPath)) {
        exported.push(pngPath)
        console.log(`[db:docs] PNG: ${pngPath}`)
      }
    } catch (err) {
      console.warn(`[db:docs] No se pudo exportar ${spec.file}.png:`, err.message?.slice(0, 200))
    }
  }

  const readme = `# Arquitectura de la solución planteada — CAFE-IA

> **Generado:** ${date}  
> **Base de datos:** ${live?.ok ? `\`${live.dbName}\` (${live.tables.length} tablas, ${live.fks.length} FK verificadas en MySQL)` : 'schema.sql'}

## Diagramas

| Imagen | Descripción |
|--------|-------------|
| ![DER módulos](./der-modulos-base-datos.png) | DER resumido por dominios (recomendado para tesis) |
| ![Arquitectura](./arquitectura-solucion-cafe-ia.png) | Capas: presentación, aplicación, datos |
| ![DER completo](./der-relaciones-completas.png) | Las 43 relaciones FK entre 39 tablas |

## Regenerar

\`\`\`bash
cd backend
npm run db:docs:full
\`\`\`

Incluye exportación PNG a esta carpeta.
`
  fs.writeFileSync(path.join(ARQUITECTURA_DIR, 'README.md'), readme, 'utf8')
  return exported
}

export function buildReadme(parsed, live) {
  const { tables, fks } = parsed
  const important = ['lotes', 'productores', 'usuarios', 'trazabilidad', 'control_calidad', 'predicciones_ia', 'alertas_ia', 'inventario', 'auditoria_logs']
  let md = `# Documentación de Base de Datos — CAFE-IA\n\n`
  md += `Documentación generada automáticamente del esquema MySQL del proyecto **Café Sostenible AI**.\n\n`
  md += `**Última generación:** ${isoDate()}  \n`
  md += `**Origen:** ${live?.ok ? `MySQL (\`${live.dbName}\`) + schema.sql` : 'solo schema.sql (ejecutar con MySQL activo para validación en vivo)'}\n\n`
  md += `## Archivos\n\n`
  md += `| Documento | Descripción |\n|-----------|-------------|\n`
  md += `| [MODELO_CONCEPTUAL.md](./MODELO_CONCEPTUAL.md) | Entidades de negocio y relaciones |\n`
  md += `| [MODELO_LOGICO.md](./MODELO_LOGICO.md) | Atributos, cardinalidades, FK por tabla |\n`
  md += `| [MODELO_FISICO.md](./MODELO_FISICO.md) | Inventario, PK, FK, índices |\n`
  md += `| [DER.md](./DER.md) | Diagramas Mermaid ER |\n`
  md += `| [VERIFICACION.md](./VERIFICACION.md) | Última comparación schema.sql vs MySQL |\n`
  md += `| [Arquitectura (PNG)](../Arquitectura%20de%20la%20solución%20planteada/) | DER y diagrama de capas |\n\n`
  md += `## Regenerar\n\n\`\`\`bash\ncd backend\nnpm run db:docs              # README + VERIFICACION\nnpm run db:docs -- --full     # además sobrescribe MODELO_*.md y DER.md\n\`\`\`\n\n`
  md += `Requisitos: variables \`MYSQL*\` en \`.env\` (ver \`.env.example\`). Con XAMPP/MySQL activo valida el esquema en vivo.\n\n`
  md += `## Resumen\n\n| Métrica | Valor |\n|---------|-------|\n`
  md += `| Tablas | **${tables.length}** |\n| Relaciones FK | **${fks.length}** |\n| Vistas | **${live?.ok ? live.views.length : '2 (views.sql)'}** |\n\n`
  md += `### Tablas clave\n\n`
  for (const n of important) {
    if (tables.some((t) => t.name === n)) md += `- \`${n}\` — ${TABLE_META[n]?.desc || ''}\n`
  }
  md += `\n### Fuentes del proyecto\n\n`
  md += `- \`backend/sql/schema.sql\` — DDL principal (39 tablas)\n`
  md += `- \`backend/src/infrastructure/database/migrate.js\` — migración al arranque\n`
  md += `- \`backend/sql/views.sql\` — vistas de dashboard\n`
  md += `- \`backend/sql/migrations/*.sql\` — cambios incrementales PMV2\n`
  return md
}

export function buildVerificacion(parsed, live) {
  let md = `# Verificación de esquema — ${isoDate()}\n\n`
  md += `| Fuente | Tablas | FK |\n|--------|--------|----|\n`
  md += `| schema.sql | ${parsed.tables.length} | ${parsed.fks.length} |\n`
  if (live?.ok) {
    md += `| MySQL (\`${live.dbName}\`) | ${live.tables.length} | ${live.fks.length} |\n`
    const schemaSet = new Set(parsed.tables.map((t) => t.name))
    const dbOnly = live.tables.filter((t) => !schemaSet.has(t.name)).map((t) => t.name)
    const sqlOnly = parsed.tables.filter((t) => !live.tables.some((x) => x.name === t.name)).map((t) => t.name)
    if (dbOnly.length) md += `\n**Solo en BD:** ${dbOnly.map((n) => `\`${n}\``).join(', ')}\n`
    if (sqlOnly.length) md += `\n**Solo en schema.sql:** ${sqlOnly.map((n) => `\`${n}\``).join(', ')}\n`
  } else {
    md += `| MySQL | — | — (${live?.error || 'sin conexión'}) |\n`
  }
  return md
}

export function writeAllDocs(parsed, live, opts = {}) {
  const { full = false } = opts
  fs.mkdirSync(DOCS_DIR, { recursive: true })
  const files = {
    'README.md': buildReadme(parsed, live),
    'VERIFICACION.md': buildVerificacion(parsed, live),
  }
  if (full) {
    Object.assign(files, {
      'MODELO_CONCEPTUAL.md': buildConceptual(parsed, live),
      'MODELO_LOGICO.md': buildLogical(parsed, live),
      'MODELO_FISICO.md': buildPhysical(parsed, live),
      'DER.md': buildDer(parsed, live),
    })
  }
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(DOCS_DIR, name), content, 'utf8')
  }
  return { files: Object.keys(files), parsed, live }
}
