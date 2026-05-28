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

const WHERE_LOTE_GLOBAL = 'WHERE l.deleted_at IS NULL'
const WHERE_LOTE_SCOPED = 'WHERE l.deleted_at IS NULL AND l.user_id = ?'

/** Subconsulta: última etapa por lote (alias fijo l). */
export function sqlUltimaEtapaSubquery() {
  return SQL_ULTIMA_ETAPA
}

export function sqlEtapaNormExpr() {
  return SQL_ETAPA_NORM
}

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

function scopedWhere(userId) {
  if (userId == null || userId === '') {
    return { where: WHERE_LOTE_GLOBAL, params: [] }
  }
  const id = Number(userId)
  if (!Number.isInteger(id) || id < 1) {
    throw Object.assign(new Error('userId inválido'), { status: 400 })
  }
  return { where: WHERE_LOTE_SCOPED, params: [id] }
}

/** Resumen de etapas por lote (SQL estático + params). */
export function sqlResumenEtapas(userId) {
  const { where, params } = scopedWhere(userId)
  return {
    sql: `SELECT etapa_norm AS etapa, COUNT(*) AS lotes
       FROM (
         SELECT l.id, ${SQL_ETAPA_NORM} AS etapa_norm
         FROM lotes l
         ${where}
       ) scoped
       GROUP BY etapa_norm
       ORDER BY etapa_norm`,
    params,
  }
}

/** KPIs de etapas (SQL estático + params). */
export function sqlKpisEtapasLotes(userId) {
  const { where, params } = scopedWhere(userId)
  return {
    sql: `SELECT COUNT(*) AS total_lotes,
      SUM(CASE WHEN etapa_norm = 'Pendiente' THEN 1 ELSE 0 END) AS lotes_pendientes,
      SUM(CASE WHEN etapa_norm IN ('Cosecha','Producción','Produccion','Selección','Seleccion') THEN 1 ELSE 0 END) AS lotes_en_produccion,
      SUM(CASE WHEN etapa_norm = 'Secado' THEN 1 ELSE 0 END) AS lotes_en_secado,
      SUM(CASE WHEN etapa_norm IN ('Control de calidad','Calidad','Control Calidad') THEN 1 ELSE 0 END) AS lotes_en_control_calidad,
      SUM(CASE WHEN etapa_norm = 'Almacenamiento' THEN 1 ELSE 0 END) AS lotes_almacenados,
      SUM(CASE WHEN etapa_norm IN ('Comercialización','Comercializacion') THEN 1 ELSE 0 END) AS lotes_comercializados
    FROM (
      SELECT l.id, ${SQL_ETAPA_NORM} AS etapa_norm
      FROM lotes l
      ${where}
    ) scoped`,
    params,
  }
}
