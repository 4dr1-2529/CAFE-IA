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
    const { isAdmin, userId, loteFilter, params } = ChatbotDataService.scope(user)
    if (isAdmin) {
      const [clientes, productores, lotes, kgGlobal, pred, sinTraza, sinIa, sinCal] = await Promise.all([
        queryOne(`SELECT COUNT(*) AS c FROM usuarios u JOIN roles r ON u.rol_id=r.id WHERE r.codigo='cliente' AND u.deleted_at IS NULL`),
        queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL`),
        queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL`),
        queryOne(`SELECT COALESCE(SUM(cantidad_kg),0) AS kg FROM lotes WHERE deleted_at IS NULL`),
        queryOne(`SELECT COUNT(*) AS c FROM predicciones_ia WHERE origen='usuario'`),
        queryOne(
          `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id=l.id)`
        ),
        queryOne(
          `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM predicciones_ia p WHERE p.lote_id=l.id AND p.origen='usuario')`
        ),
        queryOne(
          `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM control_calidad c WHERE c.lote_id=l.id)`
        ),
      ])
      return {
        clientes: Number(clientes?.c || 0),
        productores: Number(productores?.c || 0),
        lotes: Number(lotes?.c || 0),
        produccionKg: Number(kgGlobal?.kg || 0),
        predicciones: Number(pred?.c || 0),
        sinTrazabilidad: Number(sinTraza?.c || 0),
        sinIA: Number(sinIa?.c || 0),
        sinCalidad: Number(sinCal?.c || 0),
      }
    }
    const [productores, lotes, kg, sinTraza, sinIa, sinCal] = await Promise.all([
      queryOne(`SELECT COUNT(*) AS c FROM productores WHERE deleted_at IS NULL AND user_id=?`, [userId]),
      queryOne(`SELECT COUNT(*) AS c FROM lotes WHERE deleted_at IS NULL AND user_id=?`, [userId]),
      queryOne(`SELECT COALESCE(SUM(cantidad_kg),0) AS kg FROM lotes WHERE deleted_at IS NULL AND user_id=?`, [userId]),
      queryOne(
        `SELECT COUNT(*) AS c FROM lotes l WHERE l.deleted_at IS NULL AND l.user_id=? AND NOT EXISTS (SELECT 1 FROM trazabilidad t WHERE t.lote_id=l.id)`,
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
    ])
    return {
      productores: Number(productores?.c || 0),
      lotes: Number(lotes?.c || 0),
      produccionKg: Number(kg?.kg || 0),
      sinTrazabilidad: Number(sinTraza?.c || 0),
      sinIA: Number(sinIa?.c || 0),
      sinCalidad: Number(sinCal?.c || 0),
    }
  }

  static async clienteConMasLotes() {
    const row = await queryOne(
      `SELECT CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre, COUNT(l.id) AS lotes
       FROM usuarios u
       JOIN roles r ON u.rol_id=r.id AND r.codigo='cliente'
       LEFT JOIN lotes l ON l.user_id=u.id AND l.deleted_at IS NULL
       WHERE u.deleted_at IS NULL
       GROUP BY u.id ORDER BY lotes DESC LIMIT 1`
    )
    return row
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

  static async usuariosActivos() {
    const rows = await query(
      `SELECT CONCAT(u.nombres,' ',COALESCE(u.apellidos,'')) AS nombre, u.email, u.codigo_usuario
       FROM usuarios u JOIN roles r ON u.rol_id=r.id
       WHERE r.codigo IN ('admin','cliente') AND u.activo=1 AND u.deleted_at IS NULL
       ORDER BY u.nombres LIMIT 10`
    )
    return rows
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

  static clientPasswordHint() {
    return `La contraseña temporal configurada para clientes de prueba es ${CLIENT_TEMP_PASSWORD}. Se recomienda cambiarla después del primer ingreso desde el módulo Usuarios (ADMIN).`
  }
}
