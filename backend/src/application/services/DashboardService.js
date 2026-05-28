import { DashboardRepository } from '../../infrastructure/repositories/DashboardRepository.js'
import { queryOne } from '../../infrastructure/database/pool.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { sqlKpisEtapasLotes } from '../../shared/trazabilidadSql.js'
import { ActionLogService } from './ActionLogService.js'

const SQL_COUNT_CLIENTES = `
  SELECT COUNT(*) AS c FROM usuarios u
  INNER JOIN roles r ON u.rol_id = r.id
  WHERE r.codigo = 'cliente' AND u.deleted_at IS NULL
`

export class DashboardService {
  static async getDashboard(user, meta = {}) {
    RoleHelper.requireAuth(user)
    const isAdmin = RoleHelper.isAdmin(user)

    const payload = isAdmin
      ? await DashboardRepository.getAdminDashboard()
      : await DashboardRepository.getUserDashboard(user.sub)

    if (isAdmin) {
      const clientesRow = await queryOne(SQL_COUNT_CLIENTES)
      const n = Number(clientesRow?.c ?? 0)
      payload.cards = payload.cards || {}
      payload.cards.totalClientes = n
      payload.cards.totalUsuarios = n
      payload.totalClientes = n
    }

    const traz = await queryOne(
      isAdmin
        ? `SELECT COUNT(DISTINCT lote_id) AS c FROM trazabilidad WHERE estado IN ('En proceso','Completado','Pendiente')`
        : `SELECT COUNT(DISTINCT t.lote_id) AS c
           FROM trazabilidad t
           INNER JOIN lotes l ON l.id = t.lote_id AND l.user_id = ? AND l.deleted_at IS NULL
           WHERE t.estado IN ('En proceso','Completado','Pendiente')`,
      isAdmin ? [] : [user.sub]
    )
    payload.trazabilidadActiva = Number(traz?.c) || 0

    const kpisEtapas = sqlKpisEtapasLotes(isAdmin ? null : user.sub)
    const etapasRow = await queryOne(kpisEtapas.sql, kpisEtapas.params)
    payload.etapasTrazabilidad = {
      total_lotes: Number(etapasRow?.total_lotes) || 0,
      pendientes: Number(etapasRow?.lotes_pendientes) || 0,
      cosecha: Number(etapasRow?.lotes_en_produccion) || 0,
      secado: Number(etapasRow?.lotes_en_secado) || 0,
      control_calidad: Number(etapasRow?.lotes_en_control_calidad) || 0,
      almacenamiento: Number(etapasRow?.lotes_almacenados) || 0,
      comercializacion: Number(etapasRow?.lotes_comercializados) || 0,
    }

    const actor = await queryOne(
      `SELECT nombres, apellidos FROM usuarios WHERE id = ? AND deleted_at IS NULL`,
      [user.sub]
    )
    const nombre = `${actor?.nombres || ''} ${actor?.apellidos || ''}`.trim() || 'Usuario'

    ActionLogService.log({
      usuarioId: user.sub,
      accion: isAdmin ? 'CONSULTAR_DASHBOARD_ADMIN' : 'CONSULTAR_DASHBOARD_CLIENTE',
      modulo: 'dashboard',
      descripcion: isAdmin
        ? 'Administrador consultó dashboard general'
        : `${nombre} consultó su dashboard personal`,
      entidad: 'dashboard',
      entidadId: null,
      ip: meta.ip,
      userAgent: meta.userAgent,
      resultado: 'exito',
    }).catch(() => {})

    const rol = isAdmin ? 'ADMIN' : 'CLIENTE'
    const legacy = DashboardService.toLegacyKpis(payload, isAdmin)

    return {
      rol,
      ...payload,
      totalClientes: isAdmin ? payload.cards?.totalClientes ?? payload.totalClientes ?? 0 : undefined,
      kpis: {
        ...legacy.kpis,
        ...(isAdmin
          ? {
              totalClientes: payload.cards?.totalClientes ?? 0,
              totalProductores: payload.cards?.totalProductores ?? 0,
              totalLotes: payload.cards?.totalLotes ?? 0,
            }
          : {}),
      },
      estadosLotes: legacy.estadosLotes,
      distribucionCalidad: legacy.distribucionCalidad,
      produccionMensual: legacy.produccionMensual,
      prediccionesIA: payload.tablas?.misPredicciones?.length
        ? payload.tablas.misPredicciones
        : payload.ultimaPrediccionDestacada
          ? [payload.ultimaPrediccionDestacada]
          : [],
    }
  }

  /** Compatibilidad GET /dashboard/metrics */
  static async getMetrics(user, meta = {}) {
    return DashboardService.getDashboard(user, meta)
  }

  static toLegacyKpis(payload, isAdmin) {
    const c = payload.cards || {}
    return {
      kpis: {
        totalLotes: isAdmin ? c.totalLotes : c.misLotes,
        totalKg: isAdmin ? c.produccionTotalKg : c.miProduccionKg,
        lotesActivos: c.lotesActivos || 0,
        promedioPuntaje: isAdmin ? c.promedioCalidad : c.miPromedioCalidad,
        prediccionesTotal: isAdmin ? c.prediccionesIA : c.misPrediccionesIA,
        trazabilidadActiva: payload.trazabilidadActiva || 0,
      },
      estadosLotes: payload.graficas?.lotesPorEstado || [],
      distribucionCalidad: payload.graficas?.distribucionCalidad || [],
      produccionMensual: (payload.graficas?.produccionPorMes || []).map((m) => ({
        mes: m.mes,
        kg: m.produccion,
      })),
    }
  }
}
