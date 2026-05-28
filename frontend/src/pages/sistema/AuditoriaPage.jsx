import { useEffect, useMemo, useState } from 'react'
import { ClipboardList, RefreshCw, Search } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { getAuditoria } from '../../services/api/index.js'

const LIMIT = 20

export default function AuditoriaPage() {
  const [rows, setRows] = useState([])
  const [resumen, setResumen] = useState({ totalAcciones: 0, accionesHoy: 0, usuariosActivos: 0, erroresRegistrados: 0 })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ search: '', usuario: '', modulo: '', accion: '', fechaInicio: '', fechaFin: '' })

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / LIMIT)), [total])

  const load = async (customPage = page) => {
    setLoading(true)
    try {
      const data = await getAuditoria({ page: customPage, limit: LIMIT, ...filters })
      setRows(Array.isArray(data?.rows) ? data.rows : [])
      setResumen(data?.resumen || { totalAcciones: 0, accionesHoy: 0, usuariosActivos: 0, erroresRegistrados: 0 })
      setTotal(Number(data?.total || 0))
      setPage(Number(data?.page || 1))
    } catch {
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(1) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const cards = [
    { label: 'Total acciones', value: resumen.totalAcciones },
    { label: 'Acciones de hoy', value: resumen.accionesHoy },
    { label: 'Usuarios activos', value: resumen.usuariosActivos },
    { label: 'Errores registrados', value: resumen.erroresRegistrados },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader title="Auditoría / Historial" subtitle="Seguimiento de acciones del sistema" icon={ClipboardList} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
            <p className="text-sm text-cafe-500">{c.label}</p>
            <p className="text-2xl font-bold text-cafe-900">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-8 gap-3">
          <div className="xl:col-span-2">
            <label className="text-xs text-cafe-600">Búsqueda</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cafe-400" />
              <input className="w-full pl-9 pr-3 py-2 rounded-lg border border-cafe-200" value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="text-xs text-cafe-600">Usuario</label>
            <input className="w-full px-3 py-2 rounded-lg border border-cafe-200" value={filters.usuario} onChange={(e) => setFilters((f) => ({ ...f, usuario: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-cafe-600">Módulo</label>
            <input className="w-full px-3 py-2 rounded-lg border border-cafe-200" value={filters.modulo} onChange={(e) => setFilters((f) => ({ ...f, modulo: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-cafe-600">Acción</label>
            <input className="w-full px-3 py-2 rounded-lg border border-cafe-200" value={filters.accion} onChange={(e) => setFilters((f) => ({ ...f, accion: e.target.value }))} />
          </div>
          <div className="flex items-end gap-2">
            <button onClick={() => load(1)} className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-cafe-100 text-cafe-700 hover:bg-cafe-200 transition">
              <RefreshCw className="w-4 h-4" /> Filtrar
            </button>
          </div>
          <div>
            <label className="text-xs text-cafe-600">Desde</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-cafe-200" value={filters.fechaInicio} onChange={(e) => setFilters((f) => ({ ...f, fechaInicio: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-cafe-600">Hasta</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-cafe-200" value={filters.fechaFin} onChange={(e) => setFilters((f) => ({ ...f, fechaFin: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-cafe-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700">Acción</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700">Módulo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700">Descripción</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700">Entidad</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-cafe-700">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cafe-100">
              {loading ? (
                <tr><td colSpan="7" className="px-4 py-10 text-center text-cafe-500">Cargando auditoría...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan="7" className="px-4 py-10 text-center text-cafe-500">No hay registros para los filtros aplicados.</td></tr>
              ) : rows.map((r) => (
                <tr key={r.id} className="hover:bg-cafe-50">
                  <td className="px-4 py-3 text-sm text-cafe-700">{r.fecha_creacion}</td>
                  <td className="px-4 py-3 text-sm text-cafe-900">{r.usuario}</td>
                  <td className="px-4 py-3 text-sm font-mono text-cafe-700">{r.accion}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{r.modulo}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{r.descripcion || '-'}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{r.entidad || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${r.resultado === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {r.resultado === 'error' ? 'error' : 'éxito'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-cafe-100 bg-cafe-50">
          <p className="text-sm text-cafe-600">Página {page} de {totalPages} · Total: {total}</p>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1} onClick={() => load(page - 1)} className="px-3 py-1.5 rounded-lg bg-white border border-cafe-200 disabled:opacity-50">Anterior</button>
            <button disabled={page >= totalPages} onClick={() => load(page + 1)} className="px-3 py-1.5 rounded-lg bg-white border border-cafe-200 disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  )
}
