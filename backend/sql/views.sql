-- Vistas PMV2 — dashboard y reportes
USE cafe_sostenible;

CREATE OR REPLACE VIEW v_lotes_resumen AS
SELECT
  l.id,
  l.codigo_lote,
  l.estado,
  l.variedad_cafe,
  l.cantidad_kg,
  l.humedad,
  l.temperatura,
  l.fecha_cosecha,
  CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
  p.parcela
FROM lotes l
LEFT JOIN productores p ON l.productor_id = p.id
WHERE l.deleted_at IS NULL;

CREATE OR REPLACE VIEW v_dashboard_kpis AS
SELECT
  (SELECT COUNT(*) FROM lotes WHERE deleted_at IS NULL) AS total_lotes,
  (SELECT COALESCE(SUM(cantidad_kg), 0) FROM lotes WHERE deleted_at IS NULL) AS total_kg,
  (SELECT COUNT(*) FROM predicciones_ia WHERE origen = 'usuario') AS predicciones_total,
  (SELECT COALESCE(AVG(puntaje_taza), 0) FROM control_calidad) AS promedio_calidad;
