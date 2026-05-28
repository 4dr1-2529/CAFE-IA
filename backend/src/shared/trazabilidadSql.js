/** Cadena oficial de etapas (orden ascendente). */
export const ETAPAS_CADENA = [
  'Cosecha',
  'Secado',
  'Control de calidad',
  'Almacenamiento',
  'Comercialización',
]

/** Subconsulta: última etapa por lote (una sola fila por lote). */
export function sqlUltimaEtapaSubquery(loteAlias = 'l') {
  return `(
    SELECT t.etapa FROM trazabilidad t
    WHERE t.lote_id = ${loteAlias}.id
    ORDER BY t.fecha DESC, t.orden DESC, t.id DESC
    LIMIT 1
  )`
}

export function sqlEtapaNormExpr(loteAlias = 'l') {
  const ultima = sqlUltimaEtapaSubquery(loteAlias)
  return `CASE
    WHEN NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = ${loteAlias}.id) THEN 'Pendiente'
    ELSE COALESCE(${ultima}, 'Pendiente')
  END`
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

/** SQL para KPIs de etapas (un conteo por lote). */
export function sqlKpisEtapasLotes(loteWhereClause = '') {
  const etapaNorm = sqlEtapaNormExpr('l')
  return `
    SELECT COUNT(*) AS total_lotes,
      SUM(CASE WHEN etapa_norm = 'Pendiente' THEN 1 ELSE 0 END) AS lotes_pendientes,
      SUM(CASE WHEN etapa_norm IN ('Cosecha','Producción','Produccion','Selección','Seleccion') THEN 1 ELSE 0 END) AS lotes_en_produccion,
      SUM(CASE WHEN etapa_norm = 'Secado' THEN 1 ELSE 0 END) AS lotes_en_secado,
      SUM(CASE WHEN etapa_norm IN ('Control de calidad','Calidad','Control Calidad') THEN 1 ELSE 0 END) AS lotes_en_control_calidad,
      SUM(CASE WHEN etapa_norm = 'Almacenamiento' THEN 1 ELSE 0 END) AS lotes_almacenados,
      SUM(CASE WHEN etapa_norm IN ('Comercialización','Comercializacion') THEN 1 ELSE 0 END) AS lotes_comercializados
    FROM (
      SELECT l.id, ${etapaNorm} AS etapa_norm
      FROM lotes l
      WHERE l.deleted_at IS NULL ${loteWhereClause}
    ) scoped`
}
