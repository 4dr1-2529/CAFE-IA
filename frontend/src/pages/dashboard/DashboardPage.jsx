import { useState, useEffect, useMemo } from 'react'
import {
  Package,
  TrendingUp,
  Award,
  Activity,
  Brain,
  AlertTriangle,
  Users,
  FileText,
  ClipboardList,
  BarChart3,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'
import { API_URL } from '../../config/api.js'
import { getDashboard } from '../../services/api/index.js'
import { getInfoModelo } from '../../services/ml.service.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { normalizeDashboardPayload } from '../../utils/dashboard.js'
import { chartAxisTick, chartGridStroke, chartTooltipStyle } from '../../utils/chartTheme.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'
import { KpiSkeleton } from '../../components/ui/Skeleton.jsx'

const COLORS = {
  alta: '#22c55e',
  media: '#f59e0b',
  baja: '#ef4444',
}

function mapPorCalidad(distribucion = []) {
  const porCalidad = { alta: 0, media: 0, baja: 0 }
  distribucion.forEach((d) => {
    const key = (d.calidad_final || '').toLowerCase()
    const n = Number(d.cantidad) || 0
    if (key.includes('excel') || key.includes('alta')) porCalidad.alta += n
    else if (key.includes('acept') || key.includes('buen') || key.includes('medi')) porCalidad.media += n
    else porCalidad.baja += n
  })
  return porCalidad
}

function EmptyState({ message }) {
  return (
    <div className="bg-cafe-50 border border-cafe-200 rounded-xl p-8 text-center">
      <Package className="w-10 h-10 text-cafe-400 mx-auto mb-3" />
      <p className="text-cafe-700 font-medium">{message}</p>
    </div>
  )
}

function DashTable({ columns, rows, emptyMsg }) {
  if (!rows?.length) {
    return <p className="text-sm text-cafe-500 py-4 text-center">{emptyMsg}</p>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-cafe-50">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 text-left font-semibold text-cafe-900">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-cafe-100">
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="hover:bg-cafe-50">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2 text-cafe-700">
                  {c.render ? c.render(row) : row[c.key] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [backendError, setBackendError] = useState(false)
  const modeloInfo = useMemo(() => getInfoModelo(), [])

  const dash = useMemo(() => normalizeDashboardPayload(data, user), [data, user])
  const isAdmin = dash.isAdmin

  const loadData = async () => {
    setLoading(true)
    setBackendError(false)
    try {
      const raw = await getDashboard()
      setData(raw)
    } catch (err) {
      console.error('Error cargando dashboard', err)
      setBackendError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user?.id, user?.rol])

  const porCalidad = useMemo(
    () => mapPorCalidad(dash.graficas?.distribucionCalidad),
    [dash.graficas]
  )

  const calidadData = [
    { name: 'Alta', value: porCalidad.alta || 0, color: COLORS.alta },
    { name: 'Media', value: porCalidad.media || 0, color: COLORS.media },
    { name: 'Baja', value: porCalidad.baja || 0, color: COLORS.baja },
  ]

  const estadosChart = (dash.graficas?.lotesPorEstado || []).map((e) => ({
    estado: e.estado,
    cantidad: Number(e.cantidad) || 0,
  }))

  const prediccion =
    dash.ultimaPrediccionDestacada ||
    dash.indicadores?.ultimaPrediccionIA ||
    dash.indicadores?.miUltimaPrediccionIA

  const hasData = isAdmin
    ? (dash.cards?.totalLotes || 0) > 0 || (dash.cards?.totalProductores || 0) > 0 || (dash.cards?.totalClientes || 0) > 0
    : (dash.cards?.misLotes || 0) > 0

  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="h-32 rounded-2xl bg-cafe-200 dark:bg-slate-800 animate-pulse" />
        <KpiSkeleton />
      </div>
    )
  }

  if (backendError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm w-full max-w-xl">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Backend no disponible</h2>
          <p className="text-red-600 mb-4">
            Verifica que el backend esté activo{API_URL ? <> en <strong>{API_URL}</strong></> : null}.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reintentar conexión
          </button>
        </div>
      </div>
    )
  }

  const c = dash.cards
  const ind = dash.indicadores
  const g = dash.graficas
  const t = dash.tablas

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV2 · Dashboard analítico"
        title={isAdmin ? 'Dashboard General del Sistema' : 'Mi Dashboard de Producción'}
        subtitle={`${isAdmin ? `Vista global · ${c.totalClientes ?? 0} clientes` : 'Mi producción'} — ${new Date().toLocaleDateString('es-PE', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}`}
      />

      {!hasData && (
        <EmptyState message="No hay registros disponibles todavía." />
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={loadData}
          className="text-sm font-semibold text-amber-800 dark:text-amber-200 hover:underline"
        >
          Actualizar datos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdmin ? (
          <>
            <KpiCard label="Total clientes" value={c.totalClientes || 0} icon={Users} color="blue" />
            <KpiCard label="Total productores" value={c.totalProductores || 0} icon={Users} color="amber" />
            <KpiCard label="Total lotes" value={c.totalLotes || 0} icon={Package} color="amber" trend={`${c.lotesActivos || 0} activos`} />
            <KpiCard label="Con trazabilidad" value={c.lotesConTrazabilidad || 0} icon={Activity} color="green" />
            <KpiCard label="Sin trazabilidad" value={c.lotesSinTrazabilidad || 0} icon={AlertTriangle} color="amber" />
            <KpiCard label="Con IA" value={c.lotesConIA || 0} icon={Brain} color="purple" />
            <KpiCard label="Sin IA" value={c.lotesSinIA || 0} icon={Brain} color="purple" />
            <KpiCard label="Producción total" value={c.produccionTotalKg || 0} unit="kg" icon={Activity} color="green" />
          </>
        ) : (
          <>
            <KpiCard label="Mis productores" value={c.misProductores || 0} icon={Users} color="amber" />
            <KpiCard label="Mis lotes" value={c.misLotes || 0} icon={Package} color="amber" trend={`${c.lotesActivos || 0} activos`} />
            <KpiCard label="Sin trazabilidad" value={c.misLotesSinTrazabilidad || 0} icon={AlertTriangle} color="amber" />
            <KpiCard label="Sin IA" value={c.misLotesSinIA || 0} icon={Brain} color="purple" />
            <KpiCard label="Mi producción total" value={c.miProduccionKg || 0} unit="kg" icon={Activity} color="green" />
            <KpiCard label="Mis predicciones IA" value={c.misPrediccionesIA || 0} icon={Brain} color="purple" />
            <KpiCard label="Pendientes" value={c.misPendientes || 0} icon={ClipboardList} color="blue" />
            <KpiCard label="Mi promedio calidad" value={c.miPromedioCalidad || 0} unit="pts" icon={Award} color="green" />
          </>
        )}
      </div>

      {dash?.etapasTrazabilidad && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <KpiCard
            label={isAdmin ? 'Total lotes' : 'Mis lotes'}
            value={dash.etapasTrazabilidad.total_lotes || 0}
            icon={Package}
            color="amber"
          />
          <KpiCard label="Pendientes" value={dash.etapasTrazabilidad.pendientes || 0} icon={AlertTriangle} color="amber" />
          <KpiCard label="Cosecha / producción" value={dash.etapasTrazabilidad.cosecha || 0} icon={Activity} color="green" />
          <KpiCard label="Secado" value={dash.etapasTrazabilidad.secado || 0} icon={Activity} color="green" />
          <KpiCard label="Control calidad" value={dash.etapasTrazabilidad.control_calidad || 0} icon={Award} color="blue" />
          <KpiCard label="Almacenamiento" value={dash.etapasTrazabilidad.almacenamiento || 0} icon={Package} color="purple" />
          <KpiCard label="Comercialización" value={dash.etapasTrazabilidad.comercializacion || 0} icon={TrendingUp} color="green" />
        </div>
      )}

      {(ind.productorMayorProduccion || ind.clienteMayorProduccion || ind.miMejorLote || ind.produccionMesActual != null || ind.miProduccionMes != null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isAdmin && ind.clienteMayorProduccion && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-600 p-4">
              <p className="text-xs font-semibold text-cafe-600 dark:text-slate-400 uppercase">Cliente con más producción</p>
              <p className="font-semibold text-cafe-900 dark:text-slate-100 mt-1">{ind.clienteMayorProduccion.nombre}</p>
              <p className="text-sm text-cafe-700 dark:text-slate-300">{Number(ind.clienteMayorProduccion.kg).toFixed(1)} kg</p>
            </div>
          )}
          {isAdmin && ind.productorMayorProduccion && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-600 p-4">
              <p className="text-xs font-semibold text-cafe-600 dark:text-slate-400 uppercase">Mejor productor (kg)</p>
              <p className="font-semibold text-cafe-900 dark:text-slate-100 mt-1">{ind.productorMayorProduccion.nombre}</p>
              <p className="text-sm text-cafe-700 dark:text-slate-300">{Number(ind.productorMayorProduccion.kg).toFixed(1)} kg</p>
            </div>
          )}
          {isAdmin && ind.productorMejorCalidad && (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
              <p className="text-xs font-semibold text-cafe-500 uppercase">Mejor calidad (productor)</p>
              <p className="font-semibold text-cafe-900 mt-1">{ind.productorMejorCalidad.nombre}</p>
              <p className="text-sm text-cafe-600">{ind.productorMejorCalidad.puntaje} pts</p>
            </div>
          )}
          {isAdmin && ind.mejorLote && (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
              <p className="text-xs font-semibold text-cafe-500 uppercase">Mejor lote</p>
              <p className="font-semibold text-cafe-900 mt-1 font-mono">{ind.mejorLote.codigo_lote}</p>
              <p className="text-sm text-cafe-600">{ind.mejorLote.puntaje} pts</p>
            </div>
          )}
          {!isAdmin && ind.miMejorLote && (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
              <p className="text-xs font-semibold text-cafe-500 uppercase">Mi mejor lote</p>
              <p className="font-semibold text-cafe-900 mt-1 font-mono">{ind.miMejorLote.codigo_lote}</p>
              <p className="text-sm text-cafe-600">{ind.miMejorLote.puntaje} pts</p>
            </div>
          )}
          {!isAdmin && ind.miLoteMenorCalidad && (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
              <p className="text-xs font-semibold text-cafe-500 uppercase">Menor calidad</p>
              <p className="font-semibold text-cafe-900 mt-1 font-mono">{ind.miLoteMenorCalidad.codigo_lote}</p>
              <p className="text-sm text-cafe-600">{ind.miLoteMenorCalidad.puntaje} pts</p>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
            <p className="text-xs font-semibold text-cafe-500 uppercase">
              {isAdmin ? 'Producción este mes' : 'Mi producción del mes'}
            </p>
            <p className="text-2xl font-bold text-cafe-900 mt-1">
              {Number(isAdmin ? ind.produccionMesActual : ind.miProduccionMes || 0).toFixed(1)} kg
            </p>
          </div>
          {isAdmin && ind.usuarioMasActivo && (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
              <p className="text-xs font-semibold text-cafe-500 uppercase">Usuario más activo</p>
              <p className="font-semibold text-cafe-900 mt-1">{ind.usuarioMasActivo.nombre}</p>
              <p className="text-sm text-cafe-600">{ind.usuarioMasActivo.acciones} acciones</p>
            </div>
          )}
          {isAdmin && ind.moduloMasUsado && (
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
              <p className="text-xs font-semibold text-cafe-500 uppercase">Módulo más usado</p>
              <p className="font-semibold text-cafe-900 mt-1">{ind.moduloMasUsado.modulo}</p>
              <p className="text-sm text-cafe-600">{ind.moduloMasUsado.cantidad} registros</p>
            </div>
          )}
        </div>
      )}

      {dash.alertasIA?.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-900 mb-2">Alertas IA recientes</h3>
          <ul className="space-y-1 text-sm text-amber-800">
            {dash.alertasIA.slice(0, 5).map((a) => (
              <li key={a.id}>• [{a.severidad}] {a.mensaje}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gradient-to-r from-cafeVerde-600 to-cafe-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Predicción Inteligente de Calidad</h2>
            <p className="text-cafe-100 text-sm">Motor predictivo basado en reglas (no entrenado con dataset real)</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <p className="text-cafe-200 text-sm mb-1">Calidad Estimada</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{prediccion?.calidad_predicha || 'N/A'}</span>
              <span className="text-2xl">({prediccion?.confianza || 0}%)</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <p className="text-cafe-200 text-sm mb-1">Modelo ML</p>
            <p className="font-semibold">{modeloInfo?.tipo || 'N/A'}</p>
            <p className="text-cafe-200 text-xs mt-2">Precisión: {modeloInfo?.precision || 'N/A'}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <p className="text-cafe-200 text-sm mb-1">Recomendación</p>
            <p className="font-semibold text-sm">{prediccion?.recomendacion || 'Sin datos'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-panel">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            {isAdmin ? 'Producción mensual (kg)' : 'Mi producción mensual (kg)'}
          </h3>
          <div className="h-64 chart-container">
            {(g.produccionPorMes || []).length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={g.produccionPorMes}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                  <XAxis dataKey="mes" tick={chartAxisTick} />
                  <YAxis tick={chartAxisTick} />
                  <Tooltip {...chartTooltipStyle()} />
                  <Bar dataKey="produccion" fill="#b8895a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="No hay registros disponibles todavía." />
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            {isAdmin ? 'Distribución por Calidad' : 'Mi distribución por calidad'}
          </h3>
          <div className="h-64 flex items-center justify-center">
            {calidadData.some((x) => x.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={calidadData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {calidadData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="No hay registros disponibles todavía." />
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {calidadData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-cafe-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {(g.calidadPorMes || []).length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            {isAdmin ? 'Calidad promedio por mes' : 'Mi calidad promedio por mes'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={g.calidadPorMes}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                  <XAxis dataKey="mes" tick={chartAxisTick} />
                  <YAxis tick={chartAxisTick} domain={[0, 100]} />
                  <Tooltip {...chartTooltipStyle()} />
                <Line type="monotone" dataKey="promedio" stroke="#3d7d5c" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {estadosChart.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 dark:text-white mb-4">
            {isAdmin ? 'Lotes por estado' : 'Mis lotes por estado'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={estadosChart}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis dataKey="estado" tick={chartAxisTick} />
                <YAxis allowDecimals={false} tick={chartAxisTick} />
                <Tooltip {...chartTooltipStyle()} />
                <Bar dataKey="cantidad" fill="#3d7d5c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {(g.prediccionesPorResultado || []).length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">
            {isAdmin ? 'Predicciones IA por resultado' : 'Mis predicciones IA por resultado'}
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={g.prediccionesPorResultado.map((r) => ({ resultado: r.resultado, cantidad: Number(r.cantidad) || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis dataKey="resultado" tick={chartAxisTick} />
                <YAxis allowDecimals={false} tick={chartAxisTick} />
                <Tooltip {...chartTooltipStyle()} />
                <Bar dataKey="cantidad" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {isAdmin && (g.produccionPorProductor || []).length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">Producción por productor</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={g.produccionPorProductor} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis type="number" tick={chartAxisTick} />
                <YAxis type="category" dataKey="productor" width={75} tick={chartAxisTick} />
                <Tooltip {...chartTooltipStyle()} />
                <Bar dataKey="kg" fill="#b8895a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {isAdmin && (g.actividadPorUsuario || []).length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">Actividad por usuario</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={g.actividadPorUsuario}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis dataKey="usuario" tick={chartAxisTick} />
                <YAxis allowDecimals={false} tick={chartAxisTick} />
                <Tooltip {...chartTooltipStyle()} />
                <Bar dataKey="acciones" fill="#3d7d5c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">
            {isAdmin ? 'Últimos lotes registrados' : 'Mis últimos lotes'}
          </h3>
          <DashTable
            columns={[
              { key: 'codigo_lote', label: 'Código' },
              { key: 'productor', label: 'Productor' },
              { key: 'cantidad_kg', label: 'Kg', render: (r) => `${r.cantidad_kg} kg` },
              { key: 'estado', label: 'Estado' },
            ]}
            rows={t.ultimosLotes}
            emptyMsg="No hay registros disponibles todavía."
          />
        </div>

        {isAdmin ? (
          <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
            <h3 className="text-lg font-semibold text-cafe-900 mb-4">Últimos productores</h3>
            <DashTable
              columns={[
                { key: 'codigo', label: 'Código' },
                { key: 'nombres', label: 'Nombre', render: (r) => `${r.nombres} ${r.apellidos || ''}` },
                { key: 'parcela', label: 'Parcela' },
              ]}
              rows={t.ultimosProductores}
              emptyMsg="No hay registros disponibles todavía."
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
            <h3 className="text-lg font-semibold text-cafe-900 mb-4">Mis controles de calidad recientes</h3>
            <DashTable
              columns={[
                { key: 'codigo_lote', label: 'Lote' },
                { key: 'puntaje_taza', label: 'Puntaje' },
                { key: 'calidad_final', label: 'Calidad' },
              ]}
              rows={t.misControlesCalidad}
              emptyMsg="No hay registros disponibles todavía."
            />
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">Últimas acciones de usuarios</h3>
          <DashTable
            columns={[
              { key: 'usuario', label: 'Usuario' },
              { key: 'modulo', label: 'Módulo' },
              { key: 'accion', label: 'Acción' },
              { key: 'created_at', label: 'Fecha', render: (r) => r.created_at?.slice?.(0, 16) || r.created_at },
            ]}
            rows={t.ultimasAcciones}
            emptyMsg="No hay registros disponibles todavía."
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">Lotes con baja calidad</h3>
          <DashTable
            columns={[
              { key: 'codigo_lote', label: 'Lote' },
              { key: 'puntaje_taza', label: 'Puntaje' },
              { key: 'calidad_final', label: 'Calidad' },
            ]}
            rows={t.lotesBajaCalidad}
            emptyMsg="No hay registros disponibles todavía."
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">Lotes con riesgo alto</h3>
          <DashTable
            columns={[
              { key: 'codigo_lote', label: 'Lote' },
              { key: 'porcentaje_riesgo', label: 'Riesgo %', render: (r) => `${r.porcentaje_riesgo}%` },
              { key: 'calidad_predicha', label: 'Predicción' },
            ]}
            rows={t.lotesRiesgoAlto}
            emptyMsg="No hay registros disponibles todavía."
          />
        </div>
      </div>

      {!isAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4">Mis predicciones IA recientes</h3>
          <DashTable
            columns={[
              { key: 'codigo_lote', label: 'Lote' },
              { key: 'calidad_predicha', label: 'Calidad' },
              { key: 'confianza', label: 'Confianza', render: (r) => `${r.confianza}%` },
            ]}
            rows={t.misPredicciones}
            emptyMsg="No hay registros disponibles todavía."
          />
        </div>
      )}
    </div>
  )
}
