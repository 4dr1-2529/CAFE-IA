import { isAdminUser } from './role.js'

/** Normaliza métricas del dashboard (soporta cards, kpis y campos raíz). */
export function normalizeDashboardPayload(data, user) {
  if (!data || typeof data !== 'object') {
    return { isAdmin: isAdminUser(user), cards: {}, indicadores: {}, graficas: {}, tablas: {} }
  }

  const isAdmin =
    isAdminUser(user) || data.rol === 'ADMIN' || (data.rol !== 'CLIENTE' && isAdminUser({ rol: data.rol }))

  const cards = { ...(data.cards || {}) }

  if (isAdmin) {
    const totalClientes = Number(
      cards.totalClientes ??
        cards.totalUsuarios ??
        data.totalClientes ??
        data.kpis?.totalClientes ??
        0
    )
    cards.totalClientes = totalClientes
    cards.totalUsuarios = totalClientes
    cards.totalProductores = Number(cards.totalProductores ?? data.kpis?.totalProductores ?? 0)
    cards.totalLotes = Number(cards.totalLotes ?? data.kpis?.totalLotes ?? 0)
    cards.lotesConTrazabilidad = Number(cards.lotesConTrazabilidad ?? 0)
    cards.lotesSinTrazabilidad = Number(cards.lotesSinTrazabilidad ?? 0)
    cards.lotesConIA = Number(cards.lotesConIA ?? 0)
    cards.lotesSinIA = Number(cards.lotesSinIA ?? 0)
    cards.produccionTotalKg = Number(cards.produccionTotalKg ?? data.kpis?.totalKg ?? 0)
  } else {
    cards.misProductores = Number(cards.misProductores ?? 0)
    cards.misLotes = Number(cards.misLotes ?? data.kpis?.totalLotes ?? 0)
    cards.misLotesSinTrazabilidad = Number(cards.misLotesSinTrazabilidad ?? 0)
    cards.misLotesSinIA = Number(cards.misLotesSinIA ?? 0)
    cards.miProduccionKg = Number(cards.miProduccionKg ?? data.kpis?.totalKg ?? 0)
    cards.misPrediccionesIA = Number(cards.misPrediccionesIA ?? data.kpis?.prediccionesTotal ?? 0)
    cards.misPendientes = Number(cards.misPendientes ?? 0)
    cards.miPromedioCalidad = Number(cards.miPromedioCalidad ?? data.kpis?.promedioPuntaje ?? 0)
    cards.lotesActivos = Number(cards.lotesActivos ?? 0)
  }

  return {
    isAdmin,
    cards,
    indicadores: data.indicadores || {},
    graficas: data.graficas || {},
    tablas: data.tablas || {},
    alertasIA: data.alertasIA || [],
    ultimaPrediccionDestacada: data.ultimaPrediccionDestacada,
    trazabilidadActiva: data.trazabilidadActiva,
    lotesPendientes: data.lotesPendientes,
    rol: data.rol,
  }
}
