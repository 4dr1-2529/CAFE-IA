/**
 * Consultas SQL estáticas para reportes (pares GLOBAL / SCOPED).
 * Sin interpolación de entrada de usuario en el texto SQL.
 */

const LOTE_USER = ' AND l.user_id = ? AND l.deleted_at IS NULL '
const PROD_USER = ' AND p.user_id = ? AND p.deleted_at IS NULL '

// --- Producción ---
export const PRODUCCION_RESUMEN_GLOBAL = `SELECT COUNT(*) AS total_lotes, COALESCE(SUM(l.cantidad_kg),0) AS total_kg,
       COALESCE(AVG(l.humedad),0) AS humedad_promedio, COALESCE(AVG(l.temperatura),0) AS temp_promedio
       FROM lotes l WHERE l.deleted_at IS NULL`

export const PRODUCCION_RESUMEN_SCOPED = `SELECT COUNT(*) AS total_lotes, COALESCE(SUM(l.cantidad_kg),0) AS total_kg,
       COALESCE(AVG(l.humedad),0) AS humedad_promedio, COALESCE(AVG(l.temperatura),0) AS temp_promedio
       FROM lotes l WHERE l.deleted_at IS NULL${LOTE_USER}`

export const PRODUCCION_PREDICCIONES_GLOBAL = `SELECT COUNT(*) AS total
       FROM predicciones_ia pr
       JOIN lotes l ON pr.lote_id = l.id AND l.deleted_at IS NULL
       WHERE pr.origen = 'usuario'`

export const PRODUCCION_PREDICCIONES_SCOPED = `SELECT COUNT(*) AS total
       FROM predicciones_ia pr
       JOIN lotes l ON pr.lote_id = l.id AND l.deleted_at IS NULL
       WHERE pr.origen = 'usuario'${LOTE_USER}`

export const PRODUCCION_VARIEDAD_GLOBAL = `SELECT l.variedad_cafe, COUNT(*) AS lotes, COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l WHERE l.deleted_at IS NULL
         GROUP BY l.variedad_cafe ORDER BY kg DESC`

export const PRODUCCION_VARIEDAD_SCOPED = `SELECT l.variedad_cafe, COUNT(*) AS lotes, COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l WHERE l.deleted_at IS NULL${LOTE_USER}
         GROUP BY l.variedad_cafe ORDER BY kg DESC`

export const PRODUCCION_MES_GLOBAL = `SELECT DATE_FORMAT(COALESCE(l.fecha_cosecha, l.created_at), '%Y-%m') AS mes,
                COUNT(*) AS lotes,
                COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l
         WHERE l.deleted_at IS NULL
           AND COALESCE(l.fecha_cosecha, l.created_at) IS NOT NULL
         GROUP BY DATE_FORMAT(COALESCE(l.fecha_cosecha, l.created_at), '%Y-%m')
         ORDER BY mes ASC`

export const PRODUCCION_MES_SCOPED = `SELECT DATE_FORMAT(COALESCE(l.fecha_cosecha, l.created_at), '%Y-%m') AS mes,
                COUNT(*) AS lotes,
                COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l
         WHERE l.deleted_at IS NULL
           AND COALESCE(l.fecha_cosecha, l.created_at) IS NOT NULL${LOTE_USER}
         GROUP BY DATE_FORMAT(COALESCE(l.fecha_cosecha, l.created_at), '%Y-%m')
         ORDER BY mes ASC`

export const PRODUCCION_PRODUCTOR_GLOBAL = `SELECT CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
                p.codigo_productor,
                COUNT(l.id) AS lotes,
                COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l
         INNER JOIN productores p ON p.id = l.productor_id AND p.deleted_at IS NULL
         WHERE l.deleted_at IS NULL
         GROUP BY l.productor_id, p.nombres, p.apellidos, p.codigo_productor
         ORDER BY kg DESC`

export const PRODUCCION_PRODUCTOR_SCOPED = `SELECT CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
                p.codigo_productor,
                COUNT(l.id) AS lotes,
                COALESCE(SUM(l.cantidad_kg), 0) AS kg
         FROM lotes l
         INNER JOIN productores p ON p.id = l.productor_id AND p.deleted_at IS NULL
         WHERE l.deleted_at IS NULL${LOTE_USER}
         GROUP BY l.productor_id, p.nombres, p.apellidos, p.codigo_productor
         ORDER BY kg DESC`

export const PRODUCCION_TOP5_GLOBAL = `SELECT l.codigo_lote, l.cantidad_kg, l.fecha_cosecha, l.variedad_cafe, l.estado,
                CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
         FROM lotes l
         LEFT JOIN productores p ON p.id = l.productor_id
         WHERE l.deleted_at IS NULL
         ORDER BY l.cantidad_kg DESC LIMIT 5`

export const PRODUCCION_TOP5_SCOPED = `SELECT l.codigo_lote, l.cantidad_kg, l.fecha_cosecha, l.variedad_cafe, l.estado,
                CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
         FROM lotes l
         LEFT JOIN productores p ON p.id = l.productor_id
         WHERE l.deleted_at IS NULL${LOTE_USER}
         ORDER BY l.cantidad_kg DESC LIMIT 5`

export const PRODUCCION_REGISTROS_GLOBAL = `SELECT pr.*, l.codigo_lote FROM produccion pr
         JOIN lotes l ON pr.lote_id = l.id AND l.deleted_at IS NULL
         WHERE 1=1
         ORDER BY pr.fecha_registro DESC LIMIT 100`

export const PRODUCCION_REGISTROS_SCOPED = `SELECT pr.*, l.codigo_lote FROM produccion pr
         JOIN lotes l ON pr.lote_id = l.id AND l.deleted_at IS NULL
         WHERE 1=1${LOTE_USER}
         ORDER BY pr.fecha_registro DESC LIMIT 100`

export const PRODUCCION_LOTES_TRAZ_GLOBAL = `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
       INNER JOIN trazabilidad t ON t.lote_id = l.id
       WHERE l.deleted_at IS NULL`

export const PRODUCCION_LOTES_TRAZ_SCOPED = `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
       INNER JOIN trazabilidad t ON t.lote_id = l.id
       WHERE l.deleted_at IS NULL${LOTE_USER}`

export const PRODUCCION_LOTES_SIN_TRAZ_GLOBAL = `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL
       AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)`

export const PRODUCCION_LOTES_SIN_TRAZ_SCOPED = `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL${LOTE_USER}
       AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)`

export const PRODUCCION_LOTES_IA_GLOBAL = `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
       INNER JOIN predicciones_ia p ON p.lote_id = l.id AND p.origen = 'usuario'
       WHERE l.deleted_at IS NULL`

export const PRODUCCION_LOTES_IA_SCOPED = `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l
       INNER JOIN predicciones_ia p ON p.lote_id = l.id AND p.origen = 'usuario'
       WHERE l.deleted_at IS NULL${LOTE_USER}`

export const PRODUCCION_LOTES_SIN_IA_GLOBAL = `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL
       AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`

export const PRODUCCION_LOTES_SIN_IA_SCOPED = `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL${LOTE_USER}
       AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`

export const PRODUCCION_COUNT_PRODUCTORES_SCOPED = `SELECT COUNT(*) AS c FROM productores p WHERE p.deleted_at IS NULL${PROD_USER}`

export const PRODUCCION_LOTES_RECIENTES_SCOPED = `SELECT l.codigo_lote, l.cantidad_kg, l.estado,
                  CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
           FROM lotes l
           LEFT JOIN productores p ON p.id = l.productor_id
           WHERE l.deleted_at IS NULL${LOTE_USER}
           ORDER BY l.created_at DESC LIMIT 10`

export const PRODUCCION_SIN_TRAZ_LIST_SCOPED = `SELECT l.codigo_lote, CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor
           FROM lotes l
           LEFT JOIN productores p ON p.id = l.productor_id
           WHERE l.deleted_at IS NULL${LOTE_USER}
           AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id = l.id)
           ORDER BY l.id DESC LIMIT 8`

export const PRODUCCION_SIN_IA_LIST_SCOPED = `SELECT l.codigo_lote FROM lotes l
           WHERE l.deleted_at IS NULL${LOTE_USER}
           AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')
           ORDER BY l.id DESC LIMIT 8`

export const PRODUCCION_MIS_PRODUCTORES_SCOPED = `SELECT p.id, p.codigo_productor, p.nombres, p.apellidos, p.parcela,
                  COUNT(l.id) AS lotes
           FROM productores p
           LEFT JOIN lotes l ON l.productor_id = p.id AND l.deleted_at IS NULL
           WHERE p.deleted_at IS NULL${PROD_USER}
           GROUP BY p.id ORDER BY p.nombres LIMIT 20`

// --- Calidad ---
export const CALIDAD_RESUMEN_GLOBAL = `SELECT COUNT(*) AS total, COALESCE(AVG(c.puntaje_taza), 0) AS promedio
       FROM control_calidad c
       JOIN lotes l ON c.lote_id = l.id AND l.deleted_at IS NULL
       WHERE 1=1`

export const CALIDAD_RESUMEN_SCOPED = `SELECT COUNT(*) AS total, COALESCE(AVG(c.puntaje_taza), 0) AS promedio
       FROM control_calidad c
       JOIN lotes l ON c.lote_id = l.id AND l.deleted_at IS NULL
       WHERE 1=1${LOTE_USER}`

export const CALIDAD_EVALUACIONES_GLOBAL = `SELECT c.*, l.codigo_lote,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              l.variedad_cafe
       FROM control_calidad c
       JOIN lotes l ON c.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE 1=1
       ORDER BY c.id DESC LIMIT 100`

export const CALIDAD_EVALUACIONES_SCOPED = `SELECT c.*, l.codigo_lote,
              CONCAT(p.nombres, ' ', COALESCE(p.apellidos, '')) AS productor,
              l.variedad_cafe
       FROM control_calidad c
       JOIN lotes l ON c.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id = l.productor_id
       WHERE 1=1${LOTE_USER}
       ORDER BY c.id DESC LIMIT 100`

// --- Predicciones IA ---
export const IA_RESUMEN_GLOBAL = `SELECT COUNT(*) AS total,
              COALESCE(AVG(p.confianza), 0) AS confianza_promedio,
              COALESCE(AVG(p.porcentaje_riesgo), 0) AS riesgo_promedio
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       WHERE p.origen = 'usuario'`

export const IA_RESUMEN_SCOPED = `SELECT COUNT(*) AS total,
              COALESCE(AVG(p.confianza), 0) AS confianza_promedio,
              COALESCE(AVG(p.porcentaje_riesgo), 0) AS riesgo_promedio
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       WHERE p.origen = 'usuario'${LOTE_USER}`

export const IA_POR_CALIDAD_GLOBAL = `SELECT p.calidad_predicha, COUNT(*) AS cantidad
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       WHERE p.origen = 'usuario'
       GROUP BY p.calidad_predicha`

export const IA_POR_CALIDAD_SCOPED = `SELECT p.calidad_predicha, COUNT(*) AS cantidad
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       WHERE p.origen = 'usuario'${LOTE_USER}
       GROUP BY p.calidad_predicha`

export const IA_LISTA_GLOBAL = `SELECT p.*, l.codigo_lote,
              CONCAT(pr.nombres, ' ', COALESCE(pr.apellidos, '')) AS productor,
              l.variedad_cafe
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores pr ON pr.id = l.productor_id
       WHERE p.origen = 'usuario'
       ORDER BY p.id DESC LIMIT 100`

export const IA_LISTA_SCOPED = `SELECT p.*, l.codigo_lote,
              CONCAT(pr.nombres, ' ', COALESCE(pr.apellidos, '')) AS productor,
              l.variedad_cafe
       FROM predicciones_ia p
       JOIN lotes l ON p.lote_id = l.id AND l.deleted_at IS NULL
       LEFT JOIN productores pr ON pr.id = l.productor_id
       WHERE p.origen = 'usuario'${LOTE_USER}
       ORDER BY p.id DESC LIMIT 100`

export const IA_LOTES_PENDIENTES_GLOBAL = `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL
       AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`

export const IA_LOTES_PENDIENTES_SCOPED = `SELECT COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL${LOTE_USER}
       AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id = l.id AND p.origen = 'usuario')`

// --- Export PDF/Excel ---
export const EXPORT_PROD_RESUMEN_GLOBAL = `SELECT COUNT(*) AS total_lotes, COALESCE(SUM(cantidad_kg),0) AS total_kg
         FROM lotes l WHERE l.deleted_at IS NULL`

export const EXPORT_PROD_RESUMEN_SCOPED = `SELECT COUNT(*) AS total_lotes, COALESCE(SUM(cantidad_kg),0) AS total_kg
         FROM lotes l WHERE l.user_id = ? AND l.deleted_at IS NULL`

export const EXPORT_PROD_ROWS_GLOBAL = `SELECT codigo_lote, variedad_cafe, cantidad_kg, fecha_cosecha, estado
         FROM lotes l WHERE l.deleted_at IS NULL
         ORDER BY id DESC LIMIT 50`

export const EXPORT_PROD_ROWS_SCOPED = `SELECT codigo_lote, variedad_cafe, cantidad_kg, fecha_cosecha, estado
         FROM lotes l WHERE l.user_id = ? AND l.deleted_at IS NULL
         ORDER BY id DESC LIMIT 50`

export const EXPORT_CALIDAD_GLOBAL = `SELECT l.codigo_lote, c.puntaje_taza, c.calidad_final, c.fecha_evaluacion
         FROM control_calidad c JOIN lotes l ON c.lote_id=l.id AND l.deleted_at IS NULL
         WHERE l.deleted_at IS NULL
         ORDER BY c.id DESC LIMIT 50`

export const EXPORT_CALIDAD_SCOPED = `SELECT l.codigo_lote, c.puntaje_taza, c.calidad_final, c.fecha_evaluacion
         FROM control_calidad c JOIN lotes l ON c.lote_id=l.id AND l.deleted_at IS NULL
         WHERE l.user_id = ? AND l.deleted_at IS NULL
         ORDER BY c.id DESC LIMIT 50`

export const EXPORT_IA_GLOBAL = `SELECT l.codigo_lote, p.calidad_predicha, p.confianza, p.porcentaje_riesgo, p.fecha_prediccion
         FROM predicciones_ia p JOIN lotes l ON p.lote_id=l.id AND l.deleted_at IS NULL
         WHERE p.origen='usuario' AND l.deleted_at IS NULL
         ORDER BY p.id DESC LIMIT 50`

export const EXPORT_IA_SCOPED = `SELECT l.codigo_lote, p.calidad_predicha, p.confianza, p.porcentaje_riesgo, p.fecha_prediccion
         FROM predicciones_ia p JOIN lotes l ON p.lote_id=l.id AND l.deleted_at IS NULL
         WHERE p.origen='usuario' AND l.user_id = ? AND l.deleted_at IS NULL
         ORDER BY p.id DESC LIMIT 50`
