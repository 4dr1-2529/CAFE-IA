/** Cadena oficial de etapas (orden ascendente). */
export const ETAPAS_CADENA = [
  'Cosecha',
  'Secado',
  'Control de calidad',
  'Almacenamiento',
  'Comercialización',
]

const SQL_ULTIMA_ETAPA = `(
  SELECT t.etapa FROM trazabilidad t
  WHERE t.lote_id = l.id
  ORDER BY t.fecha DESC, t.orden DESC, t.id DESC
  LIMIT 1
)`

const SQL_ETAPA_NORM = `CASE
  WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
  ELSE COALESCE(${SQL_ULTIMA_ETAPA}, 'Pendiente')
END`

/** Subconsulta: última etapa por lote (alias fijo l). */
export function sqlUltimaEtapaSubquery() {
  return SQL_ULTIMA_ETAPA
}

export function sqlEtapaNormExpr() {
  return SQL_ETAPA_NORM
}

const SQL_RESUMEN_ETAPAS_GLOBAL = `SELECT etapa_norm AS etapa, COUNT(*) AS lotes
       FROM (
         SELECT l.id, ${SQL_ETAPA_NORM} AS etapa_norm
         FROM lotes l
         WHERE l.deleted_at IS NULL
       ) scoped
       GROUP BY etapa_norm
       ORDER BY etapa_norm`

const SQL_RESUMEN_ETAPAS_SCOPED = `SELECT etapa_norm AS etapa, COUNT(*) AS lotes
       FROM (
         SELECT l.id, ${SQL_ETAPA_NORM} AS etapa_norm
         FROM lotes l
         WHERE l.deleted_at IS NULL AND l.user_id = ?
       ) scoped
       GROUP BY etapa_norm
       ORDER BY etapa_norm`

const SQL_KPIS_ETAPAS_GLOBAL = `SELECT COUNT(*) AS total_lotes,
      SUM(CASE WHEN etapa_norm = 'Pendiente' THEN 1 ELSE 0 END) AS lotes_pendientes,
      SUM(CASE WHEN etapa_norm IN ('Cosecha','Producción','Produccion','Selección','Seleccion') THEN 1 ELSE 0 END) AS lotes_en_produccion,
      SUM(CASE WHEN etapa_norm = 'Secado' THEN 1 ELSE 0 END) AS lotes_en_secado,
      SUM(CASE WHEN etapa_norm IN ('Control de calidad','Calidad','Control Calidad') THEN 1 ELSE 0 END) AS lotes_en_control_calidad,
      SUM(CASE WHEN etapa_norm = 'Almacenamiento' THEN 1 ELSE 0 END) AS lotes_almacenados,
      SUM(CASE WHEN etapa_norm IN ('Comercialización','Comercializacion') THEN 1 ELSE 0 END) AS lotes_comercializados
    FROM (
      SELECT l.id, ${SQL_ETAPA_NORM} AS etapa_norm
      FROM lotes l
      WHERE l.deleted_at IS NULL
    ) scoped`

const SQL_KPIS_ETAPAS_SCOPED = `SELECT COUNT(*) AS total_lotes,
      SUM(CASE WHEN etapa_norm = 'Pendiente' THEN 1 ELSE 0 END) AS lotes_pendientes,
      SUM(CASE WHEN etapa_norm IN ('Cosecha','Producción','Produccion','Selección','Seleccion') THEN 1 ELSE 0 END) AS lotes_en_produccion,
      SUM(CASE WHEN etapa_norm = 'Secado' THEN 1 ELSE 0 END) AS lotes_en_secado,
      SUM(CASE WHEN etapa_norm IN ('Control de calidad','Calidad','Control Calidad') THEN 1 ELSE 0 END) AS lotes_en_control_calidad,
      SUM(CASE WHEN etapa_norm = 'Almacenamiento' THEN 1 ELSE 0 END) AS lotes_almacenados,
      SUM(CASE WHEN etapa_norm IN ('Comercialización','Comercializacion') THEN 1 ELSE 0 END) AS lotes_comercializados
    FROM (
      SELECT l.id, ${SQL_ETAPA_NORM} AS etapa_norm
      FROM lotes l
      WHERE l.deleted_at IS NULL AND l.user_id = ?
    ) scoped`

export const TRAZA_REGISTROS_GLOBAL = `SELECT t.*, l.codigo_lote, l.estado AS estado_lote, l.cantidad_kg,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
       FROM trazabilidad t
       JOIN lotes l ON t.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE 1=1
       ORDER BY t.lote_id, t.orden LIMIT 200`

export const TRAZA_REGISTROS_SCOPED = `SELECT t.*, l.codigo_lote, l.estado AS estado_lote, l.cantidad_kg,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
       FROM trazabilidad t
       JOIN lotes l ON t.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE 1=1 AND l.user_id = ? AND l.deleted_at IS NULL
       ORDER BY t.lote_id, t.orden LIMIT 200`

export const TRAZA_LOTES_GLOBAL = `SELECT l.id AS lote_id, l.codigo_lote, l.cantidad_kg, l.variedad_cafe,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              CONCAT(u.nombres, ' ', COALESCE(u.apellidos, '')) AS cliente,
              u.codigo_usuario AS codigo_cliente,
              l.user_id,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
                   ELSE COALESCE(${SQL_ULTIMA_ETAPA}, 'Pendiente')
              END AS etapa_actual,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN NULL
                   ELSE (SELECT MAX(t.fecha) FROM trazabilidad t WHERE t.lote_id = l.id)
              END AS ultima_fecha,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN '-'
                   ELSE COALESCE((SELECT t.ubicacion FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1), '-')
              END AS ubicacion,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Registrado'
                   ELSE 'En trazabilidad'
              END AS estado_display,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 1 ELSE 0 END AS sin_trazabilidad
       FROM lotes l
       LEFT JOIN productores p ON p.id = l.productor_id
       LEFT JOIN usuarios u ON u.id = l.user_id
       WHERE l.deleted_at IS NULL
       ORDER BY l.id DESC LIMIT 100`

export const TRAZA_LOTES_SCOPED = `SELECT l.id AS lote_id, l.codigo_lote, l.cantidad_kg, l.variedad_cafe,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Pendiente'
                   ELSE COALESCE(${SQL_ULTIMA_ETAPA}, 'Pendiente')
              END AS etapa_actual,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN NULL
                   ELSE (SELECT MAX(t.fecha) FROM trazabilidad t WHERE t.lote_id = l.id)
              END AS ultima_fecha,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN '-'
                   ELSE COALESCE((SELECT t.ubicacion FROM trazabilidad t WHERE t.lote_id = l.id ORDER BY t.fecha DESC, t.orden DESC, t.id DESC LIMIT 1), '-')
              END AS ubicacion,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 'Registrado'
                   ELSE 'En trazabilidad'
              END AS estado_display,
              CASE WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id) THEN 1 ELSE 0 END AS sin_trazabilidad
       FROM lotes l
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE l.deleted_at IS NULL AND l.user_id = ?
       ORDER BY l.id DESC LIMIT 100`

export function bucketEtapa(etapaNorm) {
  const e = String(etapaNorm || '').trim()
  if (e === 'Pendiente') return 'pendiente'
  if (['Cosecha', 'Producción', 'Produccion', 'Selección', 'Seleccion'].includes(e)) return 'produccion'
  if (e === 'Secado') return 'secado'
  if (['Control de calidad', 'Calidad', 'Control Calidad'].includes(e)) return 'calidad'
  if (e === 'Almacenamiento') return 'almacenamiento'
  if (['Comercialización', 'Comercializacion'].includes(e)) return 'comercializacion'
  return 'otro'
}

/** Resumen de etapas por lote (SQL estático + params). */
export function sqlResumenEtapas(userId) {
  if (userId == null || userId === '') {
    return { sql: SQL_RESUMEN_ETAPAS_GLOBAL, params: [] }
  }
  const id = Number(userId)
  if (!Number.isInteger(id) || id < 1) {
    throw Object.assign(new Error('userId inválido'), { status: 400 })
  }
  return { sql: SQL_RESUMEN_ETAPAS_SCOPED, params: [id] }
}

/** KPIs de etapas (SQL estático + params). */
export function sqlKpisEtapasLotes(userId) {
  if (userId == null || userId === '') {
    return { sql: SQL_KPIS_ETAPAS_GLOBAL, params: [] }
  }
  const id = Number(userId)
  if (!Number.isInteger(id) || id < 1) {
    throw Object.assign(new Error('userId inválido'), { status: 400 })
  }
  return { sql: SQL_KPIS_ETAPAS_SCOPED, params: [id] }
}
