import { query, queryOne } from '../../infrastructure/database/pool.js'
import { RoleHelper } from '../../shared/RoleHelper.js'

const CLIENT_TEMP_PASSWORD = 'mbappe29'

export class ChatbotDataService {
  static scope(user) {
    const isAdmin = RoleHelper.isAdmin(user)
    const userId = RoleHelper.scopeUserId(user)
    return { isAdmin, userId, loteFilter: userId ? ' AND l.user_id = ? ' : '', params: userId ? [userId] : [] }
  }

  static async counts(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    if (isAdmin) {
      const [clientes, productores, lotes, kgGlobal, pred, conTraza, sinTraza, conIa, sinIa, sinCal, reportes, auditoria] =
        await Promise.all([
          queryOne(`SELECT COUNT(*) AS c FROM usuarios u JOIN roles r ON u.rol_id=r.id WHERE r.codigo='cliente' AND u.deleted_at IS NULL`),
          queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL`),
          queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`),
          queryOne(`SELECT COALESCE(SUM(cantidad_kg),0) AS kg FROM lotes WHERE deleted_at IS NULL`),
          queryOne(`SELECT COUNT(*) AS c FROM predicciones_ia WHERE origen='usuario'`),
          queryOne(
            `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l INNER JOIN trazabilidad t ON t.lote_id=l.id WHERE l.deleted_at IS NULL`
          ),
          queryOne(
            `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id=l.id)`
          ),
          queryOne(
            `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l INNER JOIN predicciones_ia p ON p.lote_id=l.id AND p.origen='usuario' WHERE l.deleted_at IS NULL`
          ),
          queryOne(
            `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id=l.id AND p.origen='usuario')`
          ),
          queryOne(
            `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM control_calidad c WHERE c.lote_id=l.id)`
          ),
          queryOne(`SELECT COUNT(*) AS c FROM reportes`).catch(() => ({ c: 0 })),
          queryOne(`SELECT COUNT(*) AS c FROM auditoria_logs`).catch(() => ({ c: 0 })),
        ])
      return {
        clientes: Number(clientes?.c || 0),
        productores: Number(productores?.c || 0),
        lotes: Number(lotes?.c || 0),
        produccionKg: Number(kgGlobal?.kg || 0),
        predicciones: Number(pred?.c || 0),
        conTrazabilidad: Number(conTraza?.c || 0),
        sinTrazabilidad: Number(sinTraza?.c || 0),
        conIA: Number(conIa?.c || 0),
        sinIA: Number(sinIa?.c || 0),
        sinCalidad: Number(sinCal?.c || 0),
        reportes: Number(reportes?.c || 0),
        auditoria: Number(auditoria?.c || 0),
      }
    }
    const [productores, lotes, kg, conTraza, sinTraza, conIa, sinIa, sinCal, reportes, calidadProm] = await Promise.all([
      queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL AND user_id=?`, [userId]),
      queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL AND user_id=?`, [userId]),
      queryOne(`SELECT COALESCE(SUM(cantidad_kg),0) AS kg FROM lotes WHERE deleted_at IS NULL AND user_id=?`, [userId]),
      queryOne(
        `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l INNER JOIN trazabilidad t ON t.lote_id=l.id WHERE l.deleted_at IS NULL AND l.user_id=?`,
        [userId]
      ),
      queryOne(
        `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND l.user_id=? AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id=l.id)`,
        [userId]
      ),
      queryOne(
        `SELECT COUNT(DISTINCT l.id) AS c FROM lotes l INNER JOIN predicciones_ia p ON p.lote_id=l.id AND p.origen='usuario' WHERE l.deleted_at IS NULL AND l.user_id=?`,
        [userId]
      ),
      queryOne(
        `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND l.user_id=? AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id=l.id AND p.origen='usuario')`,
        [userId]
      ),
      queryOne(
        `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND l.user_id=? AND NOT EXISTS (SELECT 1 FROM control_calidad c WHERE c.lote_id=l.id)`,
        [userId]
      ),
      queryOne(`SELECT COUNT(*) AS c FROM reportes WHERE user_id=?`, [userId]).catch(() => ({ c: 0 })),
      queryOne(
        `SELECT ROUND(AVG(cc.puntaje_taza),1) AS prom FROM control_calidad cc INNER JOIN lotes l ON l.id=cc.lote_id WHERE l.deleted_at IS NULL AND l.user_id=?`,
        [userId]
      ),
    ])
    return {
      productores: Number(productores?.c || 0),
      lotes: Number(lotes?.c || 0),
      produccionKg: Number(kg?.kg || 0),
      conTrazabilidad: Number(conTraza?.c || 0),
      sinTrazabilidad: Number(sinTraza?.c || 0),
      conIA: Number(conIa?.c || 0),
      sinIA: Number(sinIa?.c || 0),
      sinCalidad: Number(sinCal?.c || 0),
      reportes: Number(reportes?.c || 0),
      promedioCalidad: Number(calidadProm?.prom || 0),
    }
  }

  static async clienteConMasLotes() {
    return queryOne(
      `SELECT CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre, COUNT(l.id) AS lotes
       FROM usuarios u
       JOIN roles r ON u.rol_id=r.id AND r.codigo='cliente'
       LEFT JOIN lotes l ON l.user_id=u.id AND l.deleted_at IS NULL
       WHERE u.deleted_at IS NULL
       GROUP BY u.id ORDER BY lotes DESC LIMIT 1`
    )
  }

  static async clienteMayorProduccion() {
    return queryOne(
      `SELECT CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre, COALESCE(SUM(l.cantidad_kg),0) AS kg
       FROM usuarios u
       JOIN roles r ON u.rol_id=r.id AND r.codigo='cliente'
       LEFT JOIN lotes l ON l.user_id=u.id AND l.deleted_at IS NULL
       WHERE u.deleted_at IS NULL
       GROUP BY u.id ORDER BY kg DESC LIMIT 1`
    )
  }

  static async productorMayorProduccion(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return queryOne(
      `SELECT CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS nombre, COALESCE(SUM(l.cantidad_kg),0) AS kg
       FROM productores p
       LEFT JOIN lotes l ON l.productor_id=p.id AND l.deleted_at IS NULL
       WHERE p.deleted_at IS NULL ${isAdmin ? '' : ' AND p.user_id=? '}
       GROUP BY p.id ORDER BY kg DESC LIMIT 1`,
      isAdmin ? [] : [userId]
    )
  }

  static async productorMejorCalidad(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return queryOne(
      `SELECT CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS nombre, ROUND(AVG(cc.puntaje_taza),1) AS puntaje
       FROM productores p
       INNER JOIN lotes l ON l.productor_id=p.id AND l.deleted_at IS NULL
       INNER JOIN control_calidad cc ON cc.lote_id=l.id
       WHERE p.deleted_at IS NULL ${isAdmin ? '' : ' AND p.user_id=? '}
       GROUP BY p.id ORDER BY puntaje DESC LIMIT 1`,
      isAdmin ? [] : [userId]
    )
  }

  static async mejorLote(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return queryOne(
      `SELECT l.codigo_lote, ROUND(cc.puntaje_taza,1) AS puntaje,
              CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS productor
       FROM control_calidad cc
       INNER JOIN lotes l ON l.id=cc.lote_id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id=l.productor_id
       WHERE 1=1 ${isAdmin ? '' : ' AND l.user_id=? '}
       ORDER BY cc.puntaje_taza DESC LIMIT 1`,
      isAdmin ? [] : [userId]
    )
  }

  static async peorLote(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return queryOne(
      `SELECT l.codigo_lote, ROUND(cc.puntaje_taza,1) AS puntaje,
              CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS productor
       FROM control_calidad cc
       INNER JOIN lotes l ON l.id=cc.lote_id AND l.deleted_at IS NULL
       LEFT JOIN productores p ON p.id=l.productor_id
       WHERE 1=1 ${isAdmin ? '' : ' AND l.user_id=? '}
       ORDER BY cc.puntaje_taza ASC LIMIT 1`,
      isAdmin ? [] : [userId]
    )
  }

  static async promedioCalidadGlobal(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    const row = await queryOne(
      `SELECT ROUND(AVG(cc.puntaje_taza),1) AS prom FROM control_calidad cc
       INNER JOIN lotes l ON l.id=cc.lote_id AND l.deleted_at IS NULL
       ${isAdmin ? '' : ' WHERE l.user_id=? '}`,
      isAdmin ? [] : [userId]
    )
    return Number(row?.prom || 0)
  }

  static async produccionMes(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    const row = await queryOne(
      `SELECT COALESCE(SUM(l.cantidad_kg),0) AS kg FROM lotes l
       WHERE l.deleted_at IS NULL AND MONTH(l.fecha_cosecha)=MONTH(CURDATE()) AND YEAR(l.fecha_cosecha)=YEAR(CURDATE())
       ${isAdmin ? '' : ' AND l.user_id=? '}`,
      isAdmin ? [] : [userId]
    )
    return Number(row?.kg || 0)
  }

  static async lotesPorEtapa(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return query(
      `SELECT l.estado, COUNT(*) AS c FROM lotes l
       WHERE l.deleted_at IS NULL ${isAdmin ? '' : ' AND l.user_id=? '}
       GROUP BY l.estado ORDER BY c DESC`,
      isAdmin ? [] : [userId]
    )
  }

  static async trazabilidadPorEtapa(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return query(
      `SELECT t.etapa, COUNT(*) AS c FROM trazabilidad t
       INNER JOIN lotes l ON l.id=t.lote_id AND l.deleted_at IS NULL
       ${isAdmin ? '' : ' WHERE l.user_id=? '}
       GROUP BY t.etapa ORDER BY c DESC`,
      isAdmin ? [] : [userId]
    )
  }

  static async usuarioMasActivo() {
    return queryOne(
      `SELECT COALESCE(CONCAT(u.nombres,' ',u.apellidos), u.email) AS nombre, COUNT(a.id) AS acciones
       FROM auditoria_logs a
       LEFT JOIN usuarios u ON u.id=a.usuario_id
       GROUP BY a.usuario_id ORDER BY acciones DESC LIMIT 1`
    )
  }

  static async resumenPorCliente() {
    return query(
      `SELECT u.codigo_usuario, CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre,
              (SELECT COUNT(*) FROM productores p WHERE p.user_id=u.id AND p.deleted_at IS NULL) AS productores,
              (SELECT COUNT(*) FROM lotes l WHERE l.user_id=u.id AND l.deleted_at IS NULL) AS lotes,
              COALESCE((SELECT SUM(l2.cantidad_kg) FROM lotes l2 WHERE l2.user_id=u.id AND l2.deleted_at IS NULL),0) AS kg,
              COALESCE((SELECT ROUND(AVG(cc.puntaje_taza),1) FROM control_calidad cc INNER JOIN lotes lx ON lx.id=cc.lote_id WHERE lx.user_id=u.id AND lx.deleted_at IS NULL),0) AS calidad
       FROM usuarios u JOIN roles r ON u.rol_id=r.id AND r.codigo='cliente'
       WHERE u.deleted_at IS NULL ORDER BY u.codigo_usuario`
    )
  }

  static async alertasCount(user) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    const row = await queryOne(
      `SELECT COUNT(*) AS c FROM alertas_ia a
       INNER JOIN lotes l ON l.id=a.lote_id AND l.deleted_at IS NULL
       ${isAdmin ? '' : ' WHERE l.user_id=? '}`,
      isAdmin ? [] : [userId]
    ).catch(() => ({ c: 0 }))
    return Number(row?.c || 0)
  }

  static async lotesRiesgoAlto(user, limit = 5) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return query(
      `SELECT l.codigo_lote, p.porcentaje_riesgo, p.calidad_predicha
       FROM predicciones_ia p
       INNER JOIN lotes l ON l.id=p.lote_id AND l.deleted_at IS NULL
       WHERE p.origen='usuario' AND p.porcentaje_riesgo >= 50
       ${isAdmin ? '' : ' AND l.user_id=? '}
       ORDER BY p.porcentaje_riesgo DESC LIMIT ?`,
      isAdmin ? [limit] : [userId, limit]
    )
  }

  static async usuariosActivos() {
    return query(
      `SELECT CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre, u.email, u.codigo_usuario
       FROM usuarios u JOIN roles r ON u.rol_id=r.id
       WHERE r.codigo IN ('admin','cliente') AND u.activo=1 AND u.deleted_at IS NULL
       ORDER BY u.nombres LIMIT 10`
    )
  }

  static async accionesRecientesClientes() {
    return query(
      `SELECT a.created_at, COALESCE(CONCAT(u.nombres,' ',u.apellidos), u.email) AS usuario, a.accion,
              COALESCE(JSON_UNQUOTE(JSON_EXTRACT(a.detalle,'$.descripcion')), a.accion) AS descripcion
       FROM auditoria_logs a
       LEFT JOIN usuarios u ON u.id=a.usuario_id
       LEFT JOIN roles r ON r.id=u.rol_id
       WHERE r.codigo='cliente'
       ORDER BY a.created_at DESC LIMIT 5`
    )
  }

  static async listLotesSinTrazabilidad(user, limit = 5) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return query(
      `SELECT l.codigo_lote, CONCAT(p.nombres,' ',COALESCE(p.apellidos,'')) AS productor
       FROM lotes l
       LEFT JOIN productores p ON p.id=l.productor_id
       WHERE l.deleted_at IS NULL ${isAdmin ? '' : ' AND l.user_id=? '}
       AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id=l.id)
       ORDER BY l.id DESC LIMIT ?`,
      isAdmin ? [limit] : [userId, limit]
    )
  }

  static async listLotesSinIA(user, limit = 5) {
    const { isAdmin, userId } = ChatbotDataService.scope(user)
    return query(
      `SELECT l.codigo_lote FROM lotes l
       WHERE l.deleted_at IS NULL ${isAdmin ? '' : ' AND l.user_id=? '}
       AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id=l.id AND p.origen='usuario')
       ORDER BY l.id DESC LIMIT ?`,
      isAdmin ? [limit] : [userId, limit]
    )
  }

  static formatLoteFriendly(codigo, productor) {
    const num = String(codigo || '').replace(/^L/i, '').padStart(3, '0')
    if (/^L\d+$/i.test(String(codigo))) {
      return productor ? `Lote N° ${num} - Productor ${productor}` : `Lote N° ${num}`
    }
    return codigo
  }

  static clientPasswordHint() {
    return `La contraseña demo configurada para clientes es ${CLIENT_TEMP_PASSWORD}. Se recomienda cambiarla después del primer ingreso desde el módulo Usuarios (ADMIN).`
  }
}
