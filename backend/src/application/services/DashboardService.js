import { query, queryOne } from '../../infrastructure/database/pool.js'

export class DashboardService {
  static async getMetrics() {
    const lotes = await queryOne(
      `SELECT COUNT(*) AS total, COALESCE(SUM(cantidad_kg),0) AS kg,
              SUM(CASE WHEN estado NOT IN ('Comercializacion','Vendido') THEN 1 ELSE 0 END) AS activos
       FROM lotes WHERE deleted_at IS NULL`
    )
    const calidad = await queryOne(
      `SELECT COUNT(*) AS total, COALESCE(AVG(puntaje_taza),0) AS promedio FROM control_calidad`
    )
    const pred = await queryOne(
      `SELECT COUNT(*) AS total FROM predicciones_ia WHERE origen='usuario'`
    )
    const trazActiva = await queryOne(
      `SELECT COUNT(DISTINCT lote_id) AS c FROM trazabilidad WHERE estado IN ('En proceso','Completado','Pendiente')`
    )

    const estadosLotes = await query(
      `SELECT estado, COUNT(*) AS cantidad FROM lotes WHERE deleted_at IS NULL GROUP BY estado`
    )
    const distribucionCalidad = await query(
      `SELECT calidad_final, COUNT(*) AS cantidad FROM control_calidad GROUP BY calidad_final`
    )
    const produccionMensual = await query(
      `SELECT DATE_FORMAT(fecha_cosecha, '%Y-%m') AS mes, SUM(cantidad_kg) AS kg
       FROM lotes WHERE deleted_at IS NULL AND fecha_cosecha IS NOT NULL
       GROUP BY DATE_FORMAT(fecha_cosecha, '%Y-%m') ORDER BY mes DESC LIMIT 6`
    )
    const alertasIA = await query(
      `SELECT a.*, l.codigo_lote FROM alertas_ia a LEFT JOIN lotes l ON a.lote_id=l.id ORDER BY a.id DESC LIMIT 10`
    )
    const prediccionesIA = await query(
      `SELECT p.id, p.calidad_predicha, p.confianza, p.porcentaje_riesgo, p.fecha_prediccion, l.codigo_lote
       FROM predicciones_ia p JOIN lotes l ON p.lote_id=l.id WHERE p.origen='usuario' ORDER BY p.id DESC LIMIT 5`
    )

    return {
      kpis: {
        totalLotes: Number(lotes?.total) || 0,
        totalKg: Number(lotes?.kg) || 0,
        lotesActivos: Number(lotes?.activos) || 0,
        promedioPuntaje: Number(calidad?.promedio) || 0,
        prediccionesTotal: Number(pred?.total) || 0,
        trazabilidadActiva: Number(trazActiva?.c) || 0,
      },
      estadosLotes,
      distribucionCalidad,
      produccionMensual: produccionMensual.reverse(),
      alertasIA,
      prediccionesIA,
    }
  }
}
