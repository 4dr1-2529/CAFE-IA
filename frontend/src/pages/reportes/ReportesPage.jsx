import { useState, useEffect, useCallback } from 'react'
import { FileText, Download, Package, Award, Route, Brain, Calendar, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useAuth } from '../../context/AuthContext.jsx'
import { tituloLote, parseLoteCodigo } from '../../utils/loteDisplay.js'
import { isAdminUser } from '../../utils/role.js'
import { normalizeReportePayload } from '../../utils/reportes.js'
import { getReporteProduccion, getReporteCalidad, getReportePredicciones, getReporteTrazabilidad, downloadReporte } from '../../services/api/index.js'
import ChartEmpty from '../../components/ui/ChartEmpty.jsx'
import PageLoader from '../../components/common/PageLoader.jsx'
import { chartAxisTick, chartGridStroke, chartTooltipStyle } from '../../utils/chartTheme.js'

const CHART_COLORS = ['#b8895a', '#5c8a6b', '#7c9eb2', '#c4a574', '#8b6914']

export default function Reportes() {
  const { user } = useAuth()
  const isAdmin = isAdminUser(user)
  const [reportScope, setReportScope] = useState('personal')
  const [stats, setStats] = useState(null)
  const [reporteProduccion, setReporteProduccion] = useState({})
  const [reporteCalidad, setReporteCalidad] = useState({})
  const [reportePredicciones, setReportePredicciones] = useState({})
  const [reporteTrazabilidad, setReporteTrazabilidad] = useState({})
  const [activeReport, setActiveReport] = useState('produccion')
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user?.id) return
    setLoading(true)
    try {
      const [prodRaw, calidadRaw, predRaw, trazRaw] = await Promise.all([
        getReporteProduccion(),
        getReporteCalidad(),
        getReportePredicciones(),
        getReporteTrazabilidad(),
      ])
      const prodWrap = normalizeReportePayload(prodRaw)
      const calidadWrap = normalizeReportePayload(calidadRaw)
      const predWrap = normalizeReportePayload(predRaw)
      const trazWrap = normalizeReportePayload(trazRaw)
      const prod = prodWrap.data
      const calidad = calidadWrap.data
      const pred = predWrap.data
      const traz = trazWrap.data

      setReportScope(prodWrap.scope)
      setReporteProduccion(prod || {})
      setReporteCalidad(calidad || {})
      setReportePredicciones(pred || {})
      setReporteTrazabilidad(traz || {})

      const totalPrediccionesReales = Number(
        pred?.resumen?.total_predicciones_reales ??
          pred?.resumen?.total ??
          (Array.isArray(pred?.predicciones) ? pred.predicciones.length : 0)
      )
      const porCalidadMap = { alta: 0, media: 0, baja: 0 }
      ;(calidad?.evaluaciones || []).forEach((e) => {
        const q = (e.calidad_final || '').toLowerCase()
        if (q.includes('excel') || q.includes('alta')) porCalidadMap.alta++
        else if (q.includes('buen') || q.includes('acept') || q.includes('medi')) porCalidadMap.media++
        else porCalidadMap.baja++
      })
      const porMesChart = (prod?.porMes || []).map((r) => ({
        mes: r.mes,
        kg: Number(r.kg) || 0,
        lotes: Number(r.lotes) || 0,
      }))
      const porProductorChart = (prod?.porProductor || []).map((r) => ({
        productor: (r.productor || 'Sin nombre').length > 22 ? `${r.productor.slice(0, 20)}…` : r.productor,
        kg: Number(r.kg) || 0,
      }))
      const porClienteChart = (prod?.porCliente || []).slice(0, 8).map((r) => ({
        cliente: (r.cliente || 'Cliente').length > 18 ? `${r.cliente.slice(0, 16)}…` : r.cliente,
        kg: Number(r.kg) || 0,
      }))
      const trazaPie = [
        { name: 'Con trazabilidad', value: Number(prod?.lotesConTrazabilidad) || 0, color: '#5c8a6b' },
        { name: 'Sin trazabilidad', value: Number(prod?.lotesSinTrazabilidad) || 0, color: '#c4a574' },
      ].filter((x) => x.value > 0)
      const iaPie = [
        { name: 'Con predicción IA', value: Number(prod?.lotesConIA) || 0, color: '#7c9eb2' },
        { name: 'Sin predicción IA', value: Number(prod?.lotesSinIA) || 0, color: '#b8895a' },
      ].filter((x) => x.value > 0)

      setStats({
        totalLotes: Number(prod?.resumen?.total_lotes || 0),
        produccionTotal: Number(prod?.resumen?.total_kg || 0),
        porCalidad: porCalidadMap,
        calidadPromedio: Math.round(Number(calidad?.resumen?.promedio || 0)),
        porMesChart,
        porProductorChart,
        porClienteChart,
        trazaPie,
        iaPie,
        top5Lotes: prod?.top5Lotes || [],
        totalPredicciones: Number(prod?.resumen?.total_predicciones ?? totalPrediccionesReales),
        totalClientes: Number(prod?.totalClientes) || 0,
        totalProductores: Number(prod?.totalProductores) || 0,
        topClientes: prod?.topClientes || [],
        lotesRecientes: prod?.lotesRecientes || [],
        lotesSinTrazabilidadLista: prod?.lotesSinTrazabilidadLista || [],
        lotesSinIALista: prod?.lotesSinIALista || [],
        misProductores: prod?.misProductores || [],
        resumenPredicciones: pred?.resumen || {},
        resumenTrazabilidad: {
          total_lotes: Number(traz?.resumenKpis?.total_lotes) || 0,
          lotes_pendientes: Number(traz?.resumenKpis?.lotes_pendientes) || 0,
          lotes_en_produccion: Number(traz?.resumenKpis?.lotes_en_produccion) || 0,
          lotes_en_secado: Number(traz?.resumenKpis?.lotes_en_secado) || 0,
          lotes_en_control_calidad: Number(traz?.resumenKpis?.lotes_en_control_calidad) || 0,
          lotes_almacenados: Number(traz?.resumenKpis?.lotes_almacenados) || 0,
          lotes_comercializados: Number(traz?.resumenKpis?.lotes_comercializados) || 0,
        },
      })
    } catch (err) {
      console.error('Error cargando reportes', err)
    } finally {
      setLoading(false)
    }
  }, [user?.id, user?.rol])

  useEffect(() => {
    loadData()
  }, [loadData])

  const reports = [
    { id: 'produccion', label: 'Producción', icon: Package },
    { id: 'calidad', label: 'Calidad', icon: Award },
    { id: 'trazabilidad', label: 'Trazabilidad', icon: Route },
    { id: 'ia', label: 'Inteligencia Artificial', icon: Brain }
  ]

  const [exporting, setExporting] = useState(false)

  const generarReporte = async (tipo, formato = 'pdf') => {
    setExporting(true)
    try {
      await downloadReporte(tipo, formato)
    } catch (e) {
      alert(`Error al exportar: ${e.message}`)
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return <PageLoader label="Cargando reportes..." />
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="card-panel !p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900 dark:text-slate-100">
              {isAdmin ? 'Reportes Generales del Sistema' : 'Mis Reportes'}
            </h1>
            <p className="text-cafe-600 dark:text-slate-400">
              {isAdmin
                ? 'Se muestran datos globales de todos los clientes.'
                : 'Solo se muestran tus productores, lotes y resultados.'}
            </p>
            {reportScope && (
              <p className="text-xs text-cafe-500 dark:text-slate-500 mt-1">
                Alcance: {reportScope === 'global' ? 'GLOBAL' : 'PERSONAL'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Selector de reporte */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reports.map(report => {
          const Icon = report.icon
          return (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`
                bg-white rounded-xl shadow-sm border-2 p-4 text-left transition-all
                ${activeReport === report.id 
                  ? 'border-amber-500 ring-2 ring-amber-200' 
                  : 'border-cafe-100 hover:border-amber-300'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeReport === report.id ? 'bg-amber-100' : 'bg-cafe-50'
                }`}>
                  <Icon className={`w-5 h-5 ${activeReport === report.id ? 'text-amber-600' : 'text-cafe-600'}`} />
                </div>
                <span className={`font-medium ${activeReport === report.id ? 'text-cafe-900' : 'text-cafe-700'}`}>
                  {report.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Contenido del reporte */}
      <div className="card-panel !p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-cafe-900">
            Reporte de {reports.find(r => r.id === activeReport)?.label}
          </h2>
          <div className="flex gap-2">
            <button onClick={loadData} className="flex items-center gap-2 bg-cafe-100 text-cafe-700 font-semibold py-2 px-4 rounded-lg hover:bg-cafe-200 transition-all"><RefreshCw className="w-4 h-4" />Actualizar</button>
            <button disabled={exporting} onClick={() => generarReporte(activeReport, 'pdf')} className="flex items-center gap-2 bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800 border border-green-800 shadow-sm transition-all disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-500"><Download className="w-4 h-4" />PDF</button>
            <button disabled={exporting} onClick={() => generarReporte(activeReport, 'excel')} className="flex items-center gap-2 bg-cafe-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cafe-900 border border-cafe-900 shadow-sm transition-all disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-500"><Download className="w-4 h-4" />Excel</button>
          </div>
        </div>

        {/* Reporte de Producción */}
        {activeReport === 'produccion' && (
          <div className="space-y-6">
            <div className={`grid grid-cols-2 gap-4 ${isAdmin ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-cafe-100 dark:border-slate-600">
                <p className="text-3xl font-bold text-cafe-900 dark:text-slate-100">{stats?.totalLotes}</p>
                <p className="text-sm text-cafe-700 dark:text-slate-300">{isAdmin ? 'Total lotes del sistema' : 'Mis lotes'}</p>
              </div>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-cafe-100 dark:border-slate-600">
                <p className="text-3xl font-bold text-cafe-900 dark:text-slate-100">{stats?.produccionTotal}</p>
                <p className="text-sm text-cafe-700 dark:text-slate-300">{isAdmin ? 'Kg producidos globales' : 'Mis kg producidos'}</p>
              </div>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-cafe-100 dark:border-slate-600">
                <p className="text-3xl font-bold text-cafe-900 dark:text-slate-100">{stats?.totalPredicciones || 0}</p>
                <p className="text-sm text-cafe-700 dark:text-slate-300">{isAdmin ? 'Predicciones IA globales' : 'Mis predicciones IA'}</p>
              </div>
              {isAdmin ? (
                <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-cafe-100 dark:border-slate-600">
                  <p className="text-3xl font-bold text-cafe-900 dark:text-slate-100">{stats?.totalClientes}</p>
                  <p className="text-sm text-cafe-700 dark:text-slate-300">Total clientes</p>
                </div>
              ) : null}
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-cafe-100 dark:border-slate-600">
                <p className="text-3xl font-bold text-cafe-900 dark:text-slate-100">{stats?.totalProductores}</p>
                <p className="text-sm text-cafe-700 dark:text-slate-300">{isAdmin ? 'Total productores' : 'Mis productores'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-900/30">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-1">Producción por mes (kg)</h3>
                <p className="text-xs text-cafe-600 dark:text-slate-400 mb-4">Eje X: mes · Eje Y: kilogramos cosechados</p>
                {(stats?.porMesChart || []).length === 0 ? (
                  <ChartEmpty message="No hay datos suficientes para generar esta gráfica. Registre lotes con fecha de cosecha." />
                ) : (
                  <div className="h-72 chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.porMesChart}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                        <XAxis dataKey="mes" tick={chartAxisTick} />
                        <YAxis tick={chartAxisTick} unit=" kg" />
                        <Tooltip formatter={(v) => [`${v} kg`, 'Producción']} {...chartTooltipStyle()} />
                        <Legend />
                        <Bar name="Kg producidos" dataKey="kg" fill="#b8895a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-900/30">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-1">Producción por productor (kg)</h3>
                <p className="text-xs text-cafe-600 dark:text-slate-400 mb-4">Comparación de volumen por finca/productor</p>
                {(stats?.porProductorChart || []).length === 0 ? (
                  <ChartEmpty message="No hay datos suficientes para generar esta gráfica por productor." />
                ) : (
                  <div className="h-72 chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.porProductorChart} layout="vertical" margin={{ left: 8, right: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                        <XAxis type="number" tick={chartAxisTick} />
                        <YAxis type="category" dataKey="productor" width={100} tick={chartAxisTick} />
                        <Tooltip formatter={(v) => [`${v} kg`, 'Producción']} {...chartTooltipStyle()} />
                        <Bar dataKey="kg" fill="#5c8a6b" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-900/30">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">
                  {isAdmin ? 'Lotes con / sin trazabilidad' : 'Mis lotes con / sin trazabilidad'}
                </h3>
                {(stats?.trazaPie || []).length === 0 ? (
                  <ChartEmpty message="No hay datos suficientes para comparar trazabilidad." />
                ) : (
                  <div className="h-64 chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={stats.trazaPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {stats.trazaPie.map((e, i) => (
                            <Cell key={e.name} fill={e.color || CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-900/30">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">
                  {isAdmin ? 'Lotes con / sin IA' : 'Mis lotes con / sin IA'}
                </h3>
                {(stats?.iaPie || []).length === 0 ? (
                  <ChartEmpty message="No hay datos suficientes para comparar predicciones IA." />
                ) : (
                  <div className="h-64 chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={stats.iaPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {stats.iaPie.map((e, i) => (
                            <Cell key={e.name} fill={e.color || CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            {isAdmin && (stats?.porClienteChart || []).length > 0 && (
              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-900/30">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-1">Producción por cliente (kg)</h3>
                <div className="h-72 chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.porClienteChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                      <XAxis dataKey="cliente" tick={chartAxisTick} />
                      <YAxis tick={chartAxisTick} unit=" kg" />
                      <Tooltip formatter={(v) => [`${v} kg`, 'Producción']} {...chartTooltipStyle()} />
                      <Bar dataKey="kg" fill="#7c9eb2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4">
              <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">
                {isAdmin ? 'Top 5 lotes por cantidad (kg)' : 'Mis mejores lotes por cantidad (kg)'}
              </h3>
              {(stats?.top5Lotes || []).length === 0 ? (
                <p className="text-cafe-500 dark:text-slate-400 text-center py-6">No hay lotes registrados.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cafe-50 dark:bg-slate-700">
                        <th className="px-3 py-2 text-left font-semibold text-cafe-900 dark:text-slate-100">Lote</th>
                        <th className="px-3 py-2 text-left font-semibold text-cafe-900 dark:text-slate-100">Productor</th>
                        <th className="px-3 py-2 text-left font-semibold text-cafe-900 dark:text-slate-100">Variedad</th>
                        <th className="px-3 py-2 text-right font-semibold text-cafe-900 dark:text-slate-100">Kg</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cafe-100 dark:divide-slate-600">
                      {stats.top5Lotes.map((row) => (
                        <tr key={row.codigo_lote}>
                          <td className="px-3 py-2 font-medium text-cafe-900 dark:text-slate-100">{tituloLote(row.codigo_lote)}</td>
                          <td className="px-3 py-2 text-cafe-700 dark:text-slate-300">{row.productor}</td>
                          <td className="px-3 py-2 text-cafe-700 dark:text-slate-300">{row.variedad_cafe}</td>
                          <td className="px-3 py-2 text-right font-bold text-cafe-900 dark:text-slate-100">{row.cantidad_kg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 overflow-x-auto">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">
                  {isAdmin ? 'Lotes recientes del sistema' : 'Mis lotes recientes'}
                </h3>
                {(stats?.lotesRecientes || []).length === 0 ? (
                  <p className="text-cafe-500 text-center py-6">No hay lotes recientes.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cafe-50 dark:bg-slate-700">
                        <th className="px-2 py-2 text-left">Lote</th>
                        <th className="px-2 py-2 text-left">Productor</th>
                        {isAdmin && <th className="px-2 py-2 text-left">Cliente</th>}
                        <th className="px-2 py-2 text-right">Kg</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cafe-100 dark:divide-slate-600">
                      {stats.lotesRecientes.map((row) => (
                        <tr key={row.codigo_lote}>
                          <td className="px-2 py-2 font-medium">{tituloLote(row.codigo_lote)}</td>
                          <td className="px-2 py-2">{row.productor || '—'}</td>
                          {isAdmin && <td className="px-2 py-2">{row.cliente || '—'}</td>}
                          <td className="px-2 py-2 text-right">{row.cantidad_kg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {isAdmin ? (
                <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 overflow-x-auto">
                  <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">Top clientes por producción</h3>
                  {(stats?.topClientes || []).length === 0 ? (
                    <p className="text-cafe-500 text-center py-6">Sin datos de clientes.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-cafe-50 dark:bg-slate-700">
                          <th className="px-2 py-2 text-left">Cliente</th>
                          <th className="px-2 py-2 text-right">Kg</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cafe-100 dark:divide-slate-600">
                        {stats.topClientes.map((row, i) => (
                          <tr key={i}>
                            <td className="px-2 py-2">{row.cliente}</td>
                            <td className="px-2 py-2 text-right font-bold">{row.kg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ) : (
                <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 overflow-x-auto">
                  <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">Mis productores</h3>
                  {(stats?.misProductores || []).length === 0 ? (
                    <p className="text-cafe-500 text-center py-6">Sin productores registrados.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-cafe-50 dark:bg-slate-700">
                          <th className="px-2 py-2 text-left">Código</th>
                          <th className="px-2 py-2 text-left">Nombre</th>
                          <th className="px-2 py-2 text-right">Lotes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cafe-100 dark:divide-slate-600">
                        {stats.misProductores.map((row) => (
                          <tr key={row.id}>
                            <td className="px-2 py-2 font-mono text-xs">{row.codigo_productor}</td>
                            <td className="px-2 py-2">{row.nombres} {row.apellidos || ''}</td>
                            <td className="px-2 py-2 text-right">{row.lotes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 overflow-x-auto">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">
                  {isAdmin ? 'Lotes sin trazabilidad' : 'Mis lotes pendientes de trazabilidad'}
                </h3>
                {(stats?.lotesSinTrazabilidadLista || []).length === 0 ? (
                  <p className="text-green-700 dark:text-green-400 text-center py-6">Todos los lotes tienen trazabilidad.</p>
                ) : (
                  <ul className="text-sm space-y-2">
                    {stats.lotesSinTrazabilidadLista.map((row) => (
                      <li key={row.codigo_lote} className="flex justify-between border-b border-cafe-100 dark:border-slate-600 pb-1">
                        <span>{tituloLote(row.codigo_lote)}</span>
                        <span className="text-cafe-600">{row.productor || '—'}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 overflow-x-auto">
                <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">
                  {isAdmin ? 'Lotes sin IA' : 'Mis lotes pendientes de IA'}
                </h3>
                {(stats?.lotesSinIALista || []).length === 0 ? (
                  <p className="text-green-700 dark:text-green-400 text-center py-6">Todos los lotes tienen predicción IA.</p>
                ) : (
                  <ul className="text-sm space-y-2">
                    {stats.lotesSinIALista.map((row) => (
                      <li key={row.codigo_lote}>{tituloLote(row.codigo_lote)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reporte de Calidad */}
        {activeReport === 'calidad' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{stats?.porCalidad?.alta ?? 0}</p>
                <p className="text-sm text-green-700">Calidad Alta</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">{stats?.porCalidad?.media ?? 0}</p>
                <p className="text-sm text-yellow-700">Calidad Media</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{stats?.porCalidad?.baja ?? 0}</p>
                <p className="text-sm text-red-700">Calidad Baja</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.calidadPromedio}</p>
                <p className="text-sm text-cafe-600">Puntaje Promedio</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{reporteCalidad?.totalEvaluacionesUnicas || (reporteCalidad?.evaluaciones || []).length}</p>
                <p className="text-sm text-cafe-600">Total evaluaciones únicas</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.calidadPromedio || 0}</p>
                <p className="text-sm text-cafe-600">Promedio de puntaje</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{(reporteCalidad?.evaluaciones || []).length ? '✓' : '-'}</p>
                <p className="text-sm text-cafe-600">Datos reales en MySQL</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Alta', value: stats?.porCalidad.alta, color: '#22c55e' },
                      { name: 'Media', value: stats?.porCalidad.media, color: '#f59e0b' },
                      { name: 'Baja', value: stats?.porCalidad.baja, color: '#ef4444' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {[
                      { name: 'Alta', value: stats?.porCalidad.alta, color: '#22c55e' },
                      { name: 'Media', value: stats?.porCalidad.media, color: '#f59e0b' },
                      { name: 'Baja', value: stats?.porCalidad.baja, color: '#ef4444' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cafe-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Lote</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Productor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Variedad</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Puntaje</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Calidad</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cafe-100">
                  {(reporteCalidad?.evaluaciones || []).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-cafe-400">No hay evaluaciones registradas</td>
                    </tr>
                  ) : (
                    (reporteCalidad?.evaluaciones || []).map((e) => (
                      <tr key={e.id} className="hover:bg-cafe-50">
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.fecha_evaluacion || e.fecha || '-'}</td>
                        <td className="px-4 py-3 text-sm font-mono text-cafe-900">{tituloLote(e.codigo_lote || e.lote_codigo) || `Lote ${e.lote_id}`}</td>
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.productor || '-'}</td>
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.variedad_cafe || '-'}</td>
                        <td className="px-4 py-3 text-sm font-bold text-cafe-900">{e.puntaje_taza ?? '-'}</td>
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.calidad_final || '-'}</td>
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.estado || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reporte de Trazabilidad */}
        {activeReport === 'trazabilidad' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-card">
                <p className="text-3xl font-bold text-primary">{stats?.resumenTrazabilidad?.total_lotes || 0}</p>
                <p className="text-sm text-muted">{isAdmin ? 'Total lotes' : 'Mis lotes'}</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-center border border-card">
                <p className="text-3xl font-bold text-primary">{stats?.resumenTrazabilidad?.lotes_pendientes || 0}</p>
                <p className="text-sm text-muted">Pendientes traza</p>
              </div>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-card">
                <p className="text-3xl font-bold text-primary">{stats?.resumenTrazabilidad?.lotes_en_produccion || 0}</p>
                <p className="text-sm text-muted">En producción / cosecha</p>
              </div>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-card">
                <p className="text-3xl font-bold text-primary">{stats?.resumenTrazabilidad?.lotes_en_secado || 0}</p>
                <p className="text-sm text-muted">En secado</p>
              </div>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-card">
                <p className="text-3xl font-bold text-primary">{stats?.resumenTrazabilidad?.lotes_en_control_calidad || 0}</p>
                <p className="text-sm text-muted">Control calidad</p>
              </div>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-card">
                <p className="text-3xl font-bold text-primary">{stats?.resumenTrazabilidad?.lotes_almacenados || 0}</p>
                <p className="text-sm text-muted">Almacenados</p>
              </div>
              <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-4 text-center border border-card">
                <p className="text-3xl font-bold text-primary">{stats?.resumenTrazabilidad?.lotes_comercializados || 0}</p>
                <p className="text-sm text-muted">Comercializados</p>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-card">
              <table className="table-shell">
                <thead>
                  <tr>
                    <th className="px-4 py-3">N° lote</th>
                    <th className="px-4 py-3">Código interno</th>
                    {isAdmin && <th className="px-4 py-3">Cliente</th>}
                    <th className="px-4 py-3">Productor</th>
                    <th className="px-4 py-3">Variedad</th>
                    <th className="px-4 py-3">Última fecha</th>
                    <th className="px-4 py-3">Ubicación</th>
                    <th className="px-4 py-3">Etapa actual</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {(reporteTrazabilidad.lotesResumen || []).length === 0 && (
                    <tr>
                      <td colSpan={isAdmin ? 10 : 9} className="px-4 py-8 text-center text-muted">
                        No hay lotes registrados para mostrar en este reporte.
                      </td>
                    </tr>
                  )}
                  {(reporteTrazabilidad.lotesResumen || []).map((l) => {
                    const parsed = parseLoteCodigo(l.codigo_lote)
                    return (
                      <tr key={l.lote_id} className="hover:bg-cafe-50 dark:hover:bg-slate-700/40">
                        <td className="px-4 py-3 text-sm font-semibold text-primary">{tituloLote(l.codigo_lote)}</td>
                        <td className="px-4 py-3 text-xs font-mono text-muted">{parsed.codigoInterno}</td>
                        {isAdmin && (
                          <td className="px-4 py-3 text-sm text-secondary">
                            {l.cliente || '—'}
                            {l.codigo_cliente && (
                              <span className="block text-[10px] text-muted">{l.codigo_cliente}</span>
                            )}
                          </td>
                        )}
                        <td className="px-4 py-3 text-sm text-secondary">{l.productor || '—'}</td>
                        <td className="px-4 py-3 text-sm text-secondary">{l.variedad_cafe || '-'}</td>
                        <td className="px-4 py-3 text-sm text-secondary">{l.ultima_fecha || 'Pendiente'}</td>
                        <td className="px-4 py-3 text-sm text-secondary">{l.ubicacion || '-'}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${l.etapa_actual === 'Pendiente' ? 'badge-warning' : 'badge-info'}`}>
                            {l.etapa_actual || 'Pendiente'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-secondary">{l.estado || l.estado_display || 'Registrado'}</td>
                        <td className="px-4 py-3 text-sm text-secondary">
                          <details className="cursor-pointer">
                            <summary className="text-accent font-medium">Ver</summary>
                            <div className="mt-2 text-xs text-muted space-y-1">
                              <div><span className="font-semibold">Cantidad:</span> {l.cantidad_kg || 0} kg</div>
                              {isAdmin && l.user_id != null && (
                                <div><span className="font-semibold">Ref. cliente:</span> user_id {l.user_id}</div>
                              )}
                            </div>
                          </details>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reporte de IA */}
        {activeReport === 'ia' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-cafeVerde-50 rounded-lg p-4 text-center">
                <p className="text-lg font-bold text-cafeVerde-600">Modelo predictivo basado en reglas de Machine Learning</p>
                <p className="text-sm text-cafeVerde-700">Modelo usado</p>
              </div>
              <div className="bg-cafeVerde-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafeVerde-600">{stats?.resumenPredicciones?.promedio_confianza || 0}%</p>
                <p className="text-sm text-cafeVerde-700">Promedio confianza</p>
              </div>
              <div className="bg-cafeVerde-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafeVerde-600">{stats?.resumenPredicciones?.lotes_pendientes_prediccion || 0}</p>
                <p className="text-sm text-cafeVerde-700">Lotes pendientes</p>
              </div>
            </div>
            <div className="bg-cafe-50 rounded-xl p-6">
              <h3 className="font-semibold text-cafe-900 mb-4">Resumen de Predicciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Total predicciones reales</p>
                  <p className="text-2xl font-bold text-cafe-900">{stats?.resumenPredicciones?.total_predicciones_reales || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Predicciones Alta</p>
                  <p className="text-2xl font-bold text-green-600">{stats?.resumenPredicciones?.alta || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Predicciones Media</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats?.resumenPredicciones?.media || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-cafe-600">Predicciones Baja</p>
                  <p className="text-2xl font-bold text-red-600">{stats?.resumenPredicciones?.baja || 0}</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cafe-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Lote</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Productor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Tipo Café</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Calidad</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Confianza</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Recomendación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cafe-100">
                  {(reportePredicciones.predicciones || []).length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-cafe-400">No hay predicciones registradas</td>
                    </tr>
                  )}
                  {(reportePredicciones.predicciones || []).map(e => {
                    return (
                      <tr key={e.id} className="hover:bg-cafe-50">
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.fecha_prediccion || e.fecha}</td>
                        <td className="px-4 py-3 text-sm font-mono text-cafe-900">{tituloLote(e.codigo_lote || e.lote_codigo)}</td>
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.productor || '-'}</td>
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.variedad_cafe || '-'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${e.calidad_predicha === 'Alta' ? 'bg-green-100 text-green-700' : e.calidad_predicha === 'Media' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {e.calidad_predicha}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-cafe-900">{e.confianza || 0}%</td>
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.recomendacion || '-'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Fecha de generación */}
      <div className="bg-cafe-50 rounded-xl p-4 text-center">
        <p className="text-sm text-cafe-600 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          Reporte generado el {new Date().toLocaleDateString('es-PE')} a las {new Date().toLocaleTimeString('es-PE')}
        </p>
      </div>
    </div>
  )
}