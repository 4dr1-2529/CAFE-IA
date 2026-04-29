import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const databasePath = path.join(__dirname, 'database.sqlite')

export const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err)
  }
})

function ensureColumn(table, name, definition) {
  db.get(`PRAGMA table_info(${table})`, (error) => {
    // noop - we only use table_info in the callback below
  })
  db.all(`PRAGMA table_info(${table})`, (error, rows) => {
    if (error) {
      console.error(`Error verificando columnas de ${table}:`, error)
      return
    }
    const exists = rows.some(row => row.name === name)
    if (!exists) {
      db.run(`ALTER TABLE ${table} ADD COLUMN ${name} ${definition}`)
    }
  })
}

function formatCodigoProductor(index) {
  return `P${String(index).padStart(3, '0')}`
}

function formatCodigoLote(index) {
  return `LOTE-${String(index).padStart(4, '0')}`
}

function calculatePrediction({ humedad, temperatura, altitud, variedad_cafe, puntaje_taza }) {
  const factores = []
  let score = 45

  if (humedad >= 10 && humedad <= 12) {
    score += 18
    factores.push({ factor: 'Humedad', impacto: 'Positivo', descripcion: 'Humedad ideal para secado y calidad' })
  } else if (humedad > 12 && humedad <= 15) {
    score += 5
    factores.push({ factor: 'Humedad', impacto: 'Neutral', descripcion: 'Humedad aceptable' })
  } else {
    score -= 8
    factores.push({ factor: 'Humedad', impacto: 'Negativo', descripcion: 'Humedad fuera del rango recomendado' })
  }

  if (temperatura >= 18 && temperatura <= 22) {
    score += 15
    factores.push({ factor: 'Temperatura', impacto: 'Positivo', descripcion: 'Temperatura estable para el proceso' })
  } else if (temperatura > 22 && temperatura <= 26) {
    score += 3
    factores.push({ factor: 'Temperatura', impacto: 'Neutral', descripcion: 'Temperatura alta, vigilar control' })
  } else {
    score -= 7
    factores.push({ factor: 'Temperatura', impacto: 'Negativo', descripcion: 'Temperatura crítica' })
  }

  if (altitud >= 1500 && altitud <= 2000) {
    score += 12
    factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud óptima para café especial' })
  } else if (altitud > 2000) {
    score += 7
    factores.push({ factor: 'Altitud', impacto: 'Positivo', descripcion: 'Altitud muy alta, café gourmet' })
  } else {
    score -= 5
    factores.push({ factor: 'Altitud', impacto: 'Negativo', descripcion: 'Altitud por debajo del rango premium' })
  }

  if (['Arabica', 'Typica', 'Bourbon', 'Caturra', 'Catimor'].includes(variedad_cafe)) {
    score += 10
    factores.push({ factor: 'Variedad de café', impacto: 'Positivo', descripcion: 'Variedad de alta calidad reconocida' })
  } else {
    score += 4
    factores.push({ factor: 'Variedad de café', impacto: 'Neutral', descripcion: 'Variedad resistente y adaptable' })
  }

  if (puntaje_taza != null) {
    score = (score + puntaje_taza) / 2
    factores.push({ factor: 'Puntaje de taza', impacto: 'Positivo', descripcion: 'Evaluación sensorial complementa la predicción' })
  }

  const confianza = Math.min(99, Math.max(55, Math.round(score)))
  let calidad_predicha = 'Media'
  let recomendacion = 'Controlar procesos y validar con prueba sensorial.'

  if (score >= 80) {
    calidad_predicha = 'Alta'
    recomendacion = 'Lote con alto potencial. Continuar con secado cuidadoso y preparación para mercados premium.'
  } else if (score >= 65) {
    calidad_predicha = 'Media'
    recomendacion = 'Optimizar secado y mantener calidad en los próximos procesos.'
  } else {
    calidad_predicha = 'Baja'
    recomendacion = 'Revisar lotes y considerar mejora en secado y almacenamiento.'
  }

  return { calidad_predicha, confianza, recomendacion, factores }
}

function createTrazabilidadEtapas(loteId, fechaCosecha, ubicacion) {
  const fechaBase = new Date(fechaCosecha)
  const etapas = [
    { etapa: 'Producción', dias: 0, estado: 'Produccion', descripcion: 'Lote registrado y en proceso de cosecha.' },
    { etapa: 'Secado', dias: 7, estado: 'Secado', descripcion: 'Secado del café para estabilizar calidad.' },
    { etapa: 'Control de calidad', dias: 14, estado: 'Calidad', descripcion: 'Evaluación sensorial y control de calidad.' },
    { etapa: 'Almacenamiento', dias: 21, estado: 'Almacenamiento', descripcion: 'Almacenamiento para preservación y conservación.' },
    { etapa: 'Comercialización', dias: 28, estado: 'Comercialización', descripcion: 'Preparación para entrega y venta.' }
  ]

  etapas.forEach(({ etapa, dias, estado, descripcion }) => {
    const fecha = new Date(fechaBase)
    fecha.setDate(fecha.getDate() + dias)
    db.run(
      `INSERT INTO trazabilidad (lote_id, etapa, descripcion, fecha, ubicacion, estado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [loteId, etapa, descripcion, fecha.toISOString().split('T')[0], ubicacion, estado]
    )
  })
}

export function initDatabase(callback = () => {}) {
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON')

    db.run(`
      CREATE TABLE IF NOT EXISTS productores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_productor TEXT UNIQUE,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        dni TEXT,
        telefono TEXT,
        correo TEXT,
        parcela TEXT,
        ubicacion TEXT,
        altitud REAL,
        estado TEXT DEFAULT 'Activo'
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS lotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_lote TEXT UNIQUE,
        productor_id INTEGER,
        variedad_cafe TEXT,
        fecha_cosecha TEXT,
        cantidad_kg REAL,
        estado TEXT,
        humedad REAL,
        temperatura REAL,
        altitud REAL,
        tipo_secado TEXT,
        FOREIGN KEY(productor_id) REFERENCES productores(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS produccion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lote_id INTEGER,
        humedad REAL,
        temperatura REAL,
        altitud REAL,
        tipo_secado TEXT,
        fecha_registro TEXT,
        FOREIGN KEY(lote_id) REFERENCES lotes(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS trazabilidad (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lote_id INTEGER,
        etapa TEXT,
        descripcion TEXT,
        fecha TEXT,
        ubicacion TEXT,
        estado TEXT,
        FOREIGN KEY(lote_id) REFERENCES lotes(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS control_calidad (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lote_id INTEGER,
        aroma REAL,
        acidez REAL,
        cuerpo REAL,
        sabor REAL,
        balance REAL,
        puntaje_taza INTEGER,
        defectos INTEGER,
        calidad_final TEXT,
        estado TEXT,
        observaciones TEXT,
        fecha TEXT,
        fecha_evaluacion TEXT,
        FOREIGN KEY(lote_id) REFERENCES lotes(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS predicciones_ia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lote_id INTEGER,
        humedad REAL,
        temperatura REAL,
        altitud REAL,
        tipo_secado TEXT,
        variedad_cafe TEXT,
        calidad_predicha TEXT,
        confianza INTEGER,
        recomendacion TEXT,
        factores_influyentes TEXT,
        fecha_prediccion TEXT,
        modelo TEXT,
        origen TEXT,
        FOREIGN KEY(lote_id) REFERENCES lotes(id)
      )
    `)

    ensureColumn('productores', 'codigo_productor', 'TEXT UNIQUE')
    ensureColumn('productores', 'nombres', 'TEXT')
    ensureColumn('productores', 'apellidos', 'TEXT')
    ensureColumn('productores', 'dni', 'TEXT')
    ensureColumn('productores', 'correo', 'TEXT')
    ensureColumn('productores', 'ubicacion', 'TEXT')
    ensureColumn('productores', 'estado', 'TEXT DEFAULT \'Activo\'')
    ensureColumn('lotes', 'humedad', 'REAL')
    ensureColumn('lotes', 'temperatura', 'REAL')
    ensureColumn('lotes', 'altitud', 'REAL')
    ensureColumn('lotes', 'tipo_secado', 'TEXT')
    ensureColumn('control_calidad', 'sabor', 'INTEGER')
    ensureColumn('control_calidad', 'balance', 'INTEGER')
    ensureColumn('control_calidad', 'estado', 'TEXT')
    ensureColumn('control_calidad', 'fecha_evaluacion', 'TEXT')
    ensureColumn('predicciones_ia', 'modelo', 'TEXT')
    ensureColumn('predicciones_ia', 'tipo_secado', 'TEXT')
    ensureColumn('predicciones_ia', 'variedad_cafe', 'TEXT')
    ensureColumn('predicciones_ia', 'origen', 'TEXT')

    db.run(
      `DELETE FROM predicciones_ia
       WHERE lote_id IS NULL
          OR lote_id = ''
          OR lote_id = 0`,
      () => {
        // Marcar como demo los registros históricos sin origen.
        db.run(
          `UPDATE predicciones_ia
           SET origen = 'demo'
           WHERE origen IS NULL
              OR TRIM(origen) = ''`,
          () => {
            // Control de calidad: deduplicar por lote_id (mantener el último registro) e imponer unicidad.
            db.run(
              `DELETE FROM control_calidad
               WHERE id NOT IN (
                 SELECT MAX(id) FROM control_calidad GROUP BY lote_id
               )`,
              () => {
                db.run(
                  `CREATE UNIQUE INDEX IF NOT EXISTS idx_control_calidad_lote_unico
                   ON control_calidad (lote_id)`,
                  () => callback(null)
                )
              }
            )
          }
        )
      }
    )
  })
}

export default db
