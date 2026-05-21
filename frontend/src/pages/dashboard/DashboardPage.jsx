import { useState, useEffect } from 'react'
import { Package, TrendingUp, Award, Activity, Brain, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getDashboardMetrics, getLotes, getControlCalidad, getPredicciones } from '../../services/api/index.js'
import { getInfoModelo } from '../../services/ml.service.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'
import { KpiSkeleton } from '../../components/ui/Skeleton.jsx'

const COLORS = {
  alta: '#22c55e',
  media: '#f59e0b',
  baja: '#ef4444'
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [prediccion, setPrediccion] = useState(null)
  const [modeloInfo, setModeloInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [backendError, setBackendError] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setBackendError(false)

      try {
        const modelo = getInfoModelo()
        let predicciones = []

        try {
          const metrics = await getDashboardMetrics()
          const k = metrics.kpis || {}
          const porEstado = {}
          ;(metrics.estadosLotes || []).forEach(e => { porEstado[e.estado] = e.cantidad })
          const porCalidad = { alta: 0, media: 0, baja: 0 }
          ;(metrics.distribucionCalidad || []).forEach(d => {
            const key = (d.calidad_final || '').toLowerCase()
            if (key.includes('excel') || key.includes('alta')) porCalidad.alta += d.cantidad
            else if (key.includes('acept') || key.includes('buen') || key.includes('medi')) porCalidad.media += d.cantidad
            else porCalidad.baja += d.cantidad
          })
          const produccionMensual = (metrics.produccionMensual || []).map(m => ({
            mes: m.mes,
            produccion: Number(m.kg) || 0
          }))
          setStats({
            totalLotes: k.totalLotes,
            produccionTotal: k.totalKg,
            lotesActivos: k.lotesActivos,
            calidadPromedio: Math.round(k.promedioPuntaje || 0),
            porCalidad,
            porEstado,
            produccionMensual,
            prediccionesCount: k.prediccionesTotal,
            trazabilidadActiva: k.trazabilidadActiva,
            alertasIA: metrics.alertasIA || [],
            prediccionesIA: metrics.prediccionesIA || []
          })
          predicciones = await getPredicciones()
        } catch (err) {
          console.warn('Dashboard API, fallback local:', err)
          const lotes = await getLotes().catch(() => { setBackendError(true); return [] })
          const evaluaciones = await getControlCalidad().catch(() => [])
          predicciones = await getPredicciones().catch(() => [])
          setStats({
            totalLotes: lotes.length,
            produccionTotal: lotes.reduce((s, l) => s + (l.cantidad_kg || 0), 0),
            lotesActivos: lotes.filter(l => l.estado !== 'Comercializacion').length,
            calidadPromedio: evaluaciones.length ? Math.round(evaluaciones.reduce((s, i) => s + (i.puntaje_taza || 0), 0) / evaluaciones.length) : 0,
            porCalidad: { alta: 0, media: 0, baja: 0 },
            porEstado: {},
            produccionMensual: [],
            prediccionesCount: predicciones.length
          })
        }
        setPrediccion(predicciones[0] || null)
        setModeloInfo(modelo)
      } catch (err) {
        console.error('Error cargando dashboard', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

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
          <h2 className="text-xl font-semibold text-red-700 mb-3">⚠️ Backend no disponible</h2>
          <p className="text-red-600 mb-4">Verifica que el servidor esté activo en <strong>http://localhost:3029</strong>. La aplicación intentó cargar datos desde el backend y no pudo establecer conexión.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reintentar conexión
          </button>
        </div>
      </div>
    )
  }

  const porCalidad = stats?.porCalidad || { alta: 0, media: 0, baja: 0 }
  const calidadData = stats ? [
    { name: 'Alta', value: porCalidad.alta || 0, color: COLORS.alta },
    { name: 'Media', value: porCalidad.media || 0, color: COLORS.media },
    { name: 'Baja', value: porCalidad.baja || 0, color: COLORS.baja }
  ] : []

  const estadosChart = Object.entries(stats?.porEstado || {}).map(([estado, cantidad]) => ({ estado, cantidad }))

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV2 · Dashboard analítico"
        title="Panel de control"
        subtitle={`Trazabilidad, calidad e IA — ${new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total de lotes" value={stats?.totalLotes || 0} icon={Package} color="amber" trend={`${stats?.lotesActivos || 0} activos`} />
        <KpiCard label="Producción total" value={stats?.produccionTotal || 0} unit="kg" icon={Activity} color="green" />
        <KpiCard label="Calidad promedio" value={stats?.calidadPromedio || 0} unit="pts" icon={Award} color="green" />
        <KpiCard label="Predicciones IA" value={stats?.prediccionesCount || 0} icon={Brain} color="purple" trend={`Trazabilidad: ${stats?.trazabilidadActiva ?? 0} lotes`} />
      </div>

      {stats?.alertasIA?.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-900 mb-2">Alertas IA recientes</h3>
          <ul className="space-y-1 text-sm text-amber-800">
            {stats.alertasIA.slice(0, 5).map(a => (
              <li key={a.id}>• [{a.severidad}] {a.mensaje}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sección IA - Predicción Destacada */}
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
          {/* Predicción Principal */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <p className="text-cafe-200 text-sm mb-1">Calidad Estimada</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{prediccion?.calidad_predicha || 'N/A'}</span>
              <span className="text-2xl">({prediccion?.confianza || 0}%)</span>
            </div>
            <p className="text-cafe-200 text-xs mt-2">Basado en condiciones actuales</p>
          </div>

          {/* Modelo Info */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <p className="text-cafe-200 text-sm mb-1">Modelo ML</p>
            <p className="font-semibold">{modeloInfo?.tipo || 'N/A'}</p>
            <p className="text-cafe-200 text-xs mt-2">Precisión: {modeloInfo?.precision || 'N/A'}</p>
          </div>

          {/* Recomendación */}
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <p className="text-cafe-200 text-sm mb-1">Recomendación</p>
            <p className="font-semibold text-sm">{prediccion?.recomendacion || 'Sin datos'}</p>
          </div>
        </div>
      </div>

      {(stats?.alertasIA?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.alertasIA.slice(0, 4).map((a) => (
            <div key={a.id} className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-200">{a.tipo_alerta || 'Alerta IA'}</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">{a.mensaje}</p>
                  <p className="text-xs text-amber-600 mt-2">
                    {a.codigo_lote && `Lote: ${a.codigo_lote}`} · {a.severidad}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Producción Mensual */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            Producción mensual (kg)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.produccionMensual || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#edd9c4" />
                <XAxis dataKey="mes" stroke="#7c5739" />
                <YAxis stroke="#7c5739" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #edd9c4',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="produccion" fill="#b8895a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución de Calidad */}
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            Distribución por Calidad
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={calidadData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {calidadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {calidadData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-cafe-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {estadosChart.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 dark:text-white mb-4">Estados de lotes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={estadosChart}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-cafe-200 dark:stroke-slate-600" />
                <XAxis dataKey="estado" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#3d7d5c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  )
}