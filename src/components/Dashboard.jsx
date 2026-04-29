import { useState, useEffect } from 'react'
import { Package, TrendingUp, Award, Activity, Brain, AlertTriangle, Lightbulb, Droplets, Thermometer, Mountain } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getLotes, getControlCalidad, getPredicciones } from '../services/api.js'
import { getInfoModelo } from '../infrastructure/mlService.js'

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
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      setBackendError(false)

      try {
        let lotes = []
        let evaluaciones = []
        let predicciones = []

        try {
          lotes = await getLotes()
        } catch (err) {
          console.error('Error cargando lotes:', err)
          setBackendError(true)
          lotes = []
        }

        try {
          evaluaciones = await getControlCalidad()
        } catch (err) {
          console.error('Error cargando evaluaciones:', err)
          evaluaciones = []
        }

        try {
          predicciones = await getPredicciones()
        } catch (err) {
          console.error('Error cargando predicciones:', err)
          predicciones = []
        }

        const modelo = getInfoModelo()

        const totalLotes = lotes.length
        const produccionTotal = lotes.reduce((sum, lote) => sum + (lote.cantidad_kg || 0), 0)
        const lotesActivos = lotes.filter(lote => lote.estado !== 'Venta').length
        const calidadPromedio = evaluaciones.length > 0
          ? Math.round(evaluaciones.reduce((sum, item) => sum + (item.puntaje_taza || 0), 0) / evaluaciones.length)
          : 0

        const porCalidad = {
          alta: evaluaciones.filter(item => item.calidad_final === 'Alta').length,
          media: evaluaciones.filter(item => item.calidad_final === 'Media').length,
          baja: evaluaciones.filter(item => item.calidad_final === 'Baja').length
        }
        const porEstado = {
          Produccion: lotes.filter(lote => lote.estado === 'Produccion').length,
          Secado: lotes.filter(lote => lote.estado === 'Secado').length,
          Calidad: lotes.filter(lote => lote.estado === 'Calidad').length,
          Venta: lotes.filter(lote => lote.estado === 'Venta').length
        }

        const produccionMensual = lotes.reduce((acc, lote) => {
          const mes = new Date(lote.fecha_cosecha).toLocaleString('es-PE', { month: 'short' })
          const existing = acc.find(item => item.mes === mes)
          if (existing) {
            existing.produccion += lote.cantidad_kg || 0
          } else {
            acc.push({ mes, produccion: lote.cantidad_kg || 0 })
          }
          return acc
        }, [])

        setStats({
          totalLotes,
          produccionTotal,
          lotesActivos,
          calidadPromedio,
          porCalidad,
          porEstado,
          produccionMensual,
          prediccionesCount: predicciones.length
        })
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
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-cafe-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (backendError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm w-full max-w-xl">
          <h2 className="text-xl font-semibold text-red-700 mb-3">⚠️ Backend no disponible</h2>
          <p className="text-red-600 mb-4">Verifica que el servidor esté activo en <strong>http://localhost:3001</strong>. La aplicación intentó cargar datos desde el backend y no pudo establecer conexión.</p>
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

  const calidadData = stats ? [
    { name: 'Alta', value: stats.porCalidad.alta, color: COLORS.alta },
    { name: 'Media', value: stats.porCalidad.media, color: COLORS.media },
    { name: 'Baja', value: stats.porCalidad.baja, color: COLORS.baja }
  ] : []

  const estadoData = stats ? [
    { name: 'Producción', value: stats.porEstado.Produccion },
    { name: 'Secado', value: stats.porEstado.Secado },
    { name: 'Calidad', value: stats.porEstado.Calidad },
    { name: 'Venta', value: stats.porEstado.Venta }
  ] : []

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-cafe-800 to-cafeVerde-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-cafe-100">Sistema de Trazabilidad Inteligente y Predictiva del Café - Región Junín</p>
        <p className="text-cafe-200 text-sm mt-2">📅 {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cafe-500 text-sm">Total de Lotes</p>
              <p className="text-3xl font-bold text-cafe-900">{stats?.totalLotes || 0}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <TrendingUp size={16} /> {stats?.lotesActivos || 0} activos
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cafe-500 text-sm">Producción Total</p>
              <p className="text-3xl font-bold text-cafe-900">{stats?.produccionTotal || 0} <span className="text-lg">kg</span></p>
            </div>
            <div className="w-12 h-12 bg-cafeVerde-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-cafeVerde-600" />
            </div>
          </div>
          <p className="text-cafe-500 text-sm mt-2">Kilogramos registrados</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cafe-500 text-sm">Calidad Promedio</p>
              <p className="text-3xl font-bold text-cafe-900">{stats?.calidadPromedio || 0} <span className="text-lg">pts</span></p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-cafe-500 text-sm mt-2">Puntaje Q Grader</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cafe-500 text-sm">Lotes Activos</p>
              <p className="text-3xl font-bold text-cafe-900">{stats?.lotesActivos || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-cafe-500 text-sm mt-2">En proceso</p>
        </div>
      </div>

      {/* Sección IA - Predicción Destacada */}
      <div className="bg-gradient-to-r from-cafeVerde-600 to-cafe-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Predicción Inteligente de Calidad</h2>
            <p className="text-cafe-100 text-sm">Modelo de Machine Learning activo</p>
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

      {/* Alertas Inteligentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alerta de Humedad */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Droplets className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-800">Riesgo por Humedad</h3>
              <p className="text-sm text-orange-700 mt-1">3 lotes con humedad &gt; 13%. Extender tiempo de secado recomendado.</p>
              <p className="text-xs text-orange-600 mt-2">Lotes: LOTE-002, LOTE-004, LOTE-007</p>
            </div>
          </div>
        </div>

        {/* Alerta de Temperatura */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Alerta Térmica</h3>
              <p className="text-sm text-red-700 mt-1">Temperatura elevada en zona de secado. Considerar sombra adicional.</p>
              <p className="text-xs text-red-600 mt-2">Zona: La Esperanza</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Producción Mensual */}
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            Producción Mensual (kg)
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

      {/* Estados de Lotes */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h3 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-600" />
          Estados de Lotes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats?.porEstado || {}).map(([estado, count]) => (
            <div key={estado} className="bg-cafe-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-cafe-900">{count}</p>
              <p className="text-sm text-cafe-600">{estado}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}