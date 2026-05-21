import { query, queryOne } from '../database/pool.js'

export class ReportesRepository {
  static async produccion() {
    const resumen = await queryOne(`
      SELECT COUNT(*) AS total_lotes, COALESCE(SUM(cantidad_kg),0) AS total_kg,
             COALESCE(AVG(humedad),0) AS humedad_promedio, COALESCE(AVG(temperatura),0) AS temp_promedio
      FROM lotes WHERE deleted_at IS NULL`)
    const porVariedad = await query(
      `SELECT variedad_cafe, COUNT(*) AS lotes, SUM(cantidad_kg) AS kg FROM lotes WHERE deleted_at IS NULL GROUP BY variedad_cafe`
    )
    const registros = await query(`SELECT * FROM produccion ORDER BY fecha_registro DESC LIMIT 100`)
    return { resumen, porVariedad, registros }
  }

  static async calidad() {
    const resumen = await queryOne(`SELECT COUNT(*) AS total, AVG(puntaje_taza) AS promedio FROM control_calidad`)
    const evaluaciones = await query(
      `SELECT c.*, l.codigo_lote FROM control_calidad c JOIN lotes l ON c.lote_id=l.id ORDER BY c.id DESC`
    )
    return { resumen, evaluaciones }
  }

  static async predicciones() {
    const resumen = await queryOne(`
      SELECT COUNT(*) AS total, AVG(confianza) AS confianza_promedio, AVG(porcentaje_riesgo) AS riesgo_promedio
      FROM predicciones_ia WHERE origen='usuario'`)
    const porCalidad = await query(
      `SELECT calidad_predicha, COUNT(*) AS cantidad FROM predicciones_ia WHERE origen='usuario' GROUP BY calidad_predicha`
    )
    const predicciones = await query(
      `SELECT p.*, l.codigo_lote FROM predicciones_ia p JOIN lotes l ON p.lote_id=l.id WHERE origen='usuario' ORDER BY p.id DESC`
    )
    return { resumen, porCalidad, predicciones }
  }

  static async trazabilidad() {
    const resumen = await query(
      `SELECT etapa, COUNT(*) AS registros, SUM(CASE WHEN estado='Completado' THEN 1 ELSE 0 END) AS completados FROM trazabilidad GROUP BY etapa`
    )
    const registros = await query(
      `SELECT t.*, l.codigo_lote FROM trazabilidad t JOIN lotes l ON t.lote_id=l.id ORDER BY t.lote_id, t.orden`
    )
    return { resumen, registros }
  }
}
