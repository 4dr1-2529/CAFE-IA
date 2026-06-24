import { useCallback, useEffect, useMemo, useState } from 'react'
import { ClipboardList, RefreshCw, Search, X } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Pmv3IntegrationBanner from '../../components/common/Pmv3IntegrationBanner.jsx'
import Pmv3ImprovementNotice from '../../components/common/Pmv3ImprovementNotice.jsx'
import { getAuditoria, getAuditoriaResumen } from '../../services/api/index.js'
import { useToast } from '../../hooks/useToast.js'

const LIMIT = 20
const EMPTY_FILTERS = { search: '', usuario: '', rol: '', modulo: '', accion: '', fechaInicio: '', fechaFin: '' }

function formatFecha(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })
}

export default function AuditoriaPage() {
  const toast = useToast()
  const [rows, setRows] = useState([])
  const [resumen, setResumen] = useState({
    totalAcciones: 0,
    accionesHoy: 0,
    usuarioMasActivo: '—',
    moduloMasUsado: '—',
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / LIMIT)), [total])

  const load = useCallback(async (customPage = 1, { silent = false, showToast = false } = {}) => {
    if (silent) setRefreshing(true)
    else setLoading(true)
    try {
      const [data, res] = await Promise.all([
        getAuditoria({ page: customPage, limit: LIMIT, ...filters }),
        getAuditoriaResumen(),
      ])
      setRows(Array.isArray(data?.rows) ? data.rows : [])
      setTotal(Number(data?.total || 0))
      setPage(Number(data?.page || customPage))
      const r = res?.data || res || {}
      setResumen({
        totalAcciones: r.totalAcciones ?? 0,
        accionesHoy: r.accionesHoy ?? 0,
        usuarioMasActivo: r.usuarioMasActivo ?? '—',
        moduloMasUsado: r.moduloMasUsado ?? '—',
      })
      if (showToast) toast.success('Historial actualizado correctamente')
    } catch (err) {
      setRows([])
      toast.error(err?.message || 'No se pudo cargar la auditoría')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [filters, toast])

  useEffect(() => {
    load(1)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const cards = [
    { label: 'Total acciones', value: resumen.totalAcciones },
    { label: 'Acciones hoy', value: resumen.accionesHoy },
    { label: 'Usuario más activo', value: resumen.usuarioMasActivo },
    { label: 'Módulo más usado', value: resumen.moduloMasUsado },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <PageHeader title="Auditoría / Historial" subtitle="PMV3 — Tabla de acciones: usuario, módulo, fecha y detalle" icon={ClipboardList} badge="PMV3 · Auditoría" />
        <Button
          type="button"
          onClick={() => load(page, { silent: true, showToast: true })}
          disabled={loading || refreshing}
          className="shrink-0 self-start"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Actualizar historial
        </Button>
      </div>

      <Pmv3IntegrationBanner compact />

      <Pmv3ImprovementNotice>
        historial visible para control y seguimiento — tabla con usuario, acción, módulo, fecha y detalle. Total auditado: <strong>{resumen.totalAcciones}</strong> acciones.
      </Pmv3ImprovementNotice>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-4">
            <p className="text-sm text-cafe-500 dark:text-slate-400">{c.label}</p>
            <p className="text-xl font-bold text-cafe-900 dark:text-slate-100 truncate" title={String(c.value)}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-8 gap-3">
          <div className="xl:col-span-2">
            <label className="text-xs text-cafe-600 dark:text-slate-400">Búsqueda</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cafe-400" />
              <input
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 dark:bg-slate-800"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                placeholder="Descripción, acción, módulo..."
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-cafe-600 dark:text-slate-400">Usuario</label>
            <input className="w-full px-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 dark:bg-slate-800" value={filters.usuario} onChange={(e) => setFilters((f) => ({ ...f, usuario: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-cafe-600 dark:text-slate-400">Rol</label>
            <select className="w-full px-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 dark:bg-slate-800" value={filters.rol} onChange={(e) => setFilters((f) => ({ ...f, rol: e.target.value }))}>
              <option value="">Todos</option>
              <option value="admin">admin</option>
              <option value="cliente">cliente</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-cafe-600 dark:text-slate-400">Módulo</label>
            <input className="w-full px-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 dark:bg-slate-800" value={filters.modulo} onChange={(e) => setFilters((f) => ({ ...f, modulo: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-cafe-600 dark:text-slate-400">Acción</label>
            <input className="w-full px-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 dark:bg-slate-800" value={filters.accion} onChange={(e) => setFilters((f) => ({ ...f, accion: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-cafe-600 dark:text-slate-400">Desde</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 dark:bg-slate-800" value={filters.fechaInicio} onChange={(e) => setFilters((f) => ({ ...f, fechaInicio: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-cafe-600 dark:text-slate-400">Hasta</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 dark:bg-slate-800" value={filters.fechaFin} onChange={(e) => setFilters((f) => ({ ...f, fechaFin: e.target.value }))} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button type="button" variant="secondary" onClick={() => load(1)}>
            Filtrar
          </Button>
          <button
            type="button"
            onClick={() => { setFilters(EMPTY_FILTERS); setTimeout(() => load(1), 0) }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 text-sm text-cafe-700 dark:text-slate-300 hover:bg-cafe-50 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" /> Limpiar filtros
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-cafe-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700 dark:text-slate-300">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700 dark:text-slate-300">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700 dark:text-slate-300">Acción</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700 dark:text-slate-300">Módulo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700 dark:text-slate-300">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cafe-100 dark:divide-slate-700">
              {loading ? (
                <tr><td colSpan="5" className="px-4 py-10 text-center text-cafe-500">Cargando auditoría...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-10 text-center text-cafe-500">No hay registros para los filtros aplicados.</td></tr>
              ) : rows.map((r) => (
                <tr key={r.id} className="hover:bg-cafe-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 text-sm text-cafe-700 dark:text-slate-300 whitespace-nowrap">{formatFecha(r.fecha_creacion)}</td>
                  <td className="px-4 py-3 text-sm text-cafe-900 dark:text-slate-100">
                    {r.usuario_nombre || r.usuario}
                    {r.rol && <span className="block text-xs text-cafe-500 capitalize">{r.rol}</span>}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-cafe-700 dark:text-slate-300">{r.accion}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700 dark:text-slate-300">{r.modulo}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700 dark:text-slate-300 max-w-md" title={r.descripcion || r.ruta}>
                    {r.descripcion || r.ruta || r.metodo || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-cafe-100 dark:border-slate-700 bg-cafe-50 dark:bg-slate-800">
          <p className="text-sm text-cafe-600 dark:text-slate-400">Página {page} de {totalPages} · Total: {total}</p>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1 || loading} onClick={() => load(page - 1)} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-cafe-200 dark:border-slate-600 disabled:opacity-50">Anterior</button>
            <button disabled={page >= totalPages || loading} onClick={() => load(page + 1)} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-cafe-200 dark:border-slate-600 disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  )
}
