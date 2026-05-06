import { useState, useEffect } from 'react'
import { FileText, Download, Package, Award, Route, Brain, Calendar, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getReporteProduccion, getReporteCalidad, getReportePredicciones, getReporteTrazabilidad } from '../services/api.js'

export default function Reportes() {
  const [stats, setStats] = useState(null)
  const [reporteProduccion, setReporteProduccion] = useState({})
  const [reporteCalidad, setReporteCalidad] = useState({})
  const [reportePredicciones, setReportePredicciones] = useState({})
  const [reporteTrazabilidad, setReporteTrazabilidad] = useState({})
  const [activeReport, setActiveReport] = useState('produccion')
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const [prod, calidad, pred, traz] = await Promise.all([
        getReporteProduccion(),
        getReporteCalidad(),
        getReportePredicciones(),
        getReporteTrazabilidad()
      ])
      setReporteProduccion(prod || {})
      setReporteCalidad(calidad || {})
      setReportePredicciones(pred || {})
      setReporteTrazabilidad(traz || {})
      const totalPrediccionesReales = Number(pred?.resumen?.total_predicciones_reales ?? (Array.isArray(pred?.predicciones) ? pred.predicciones.length : 0))
      setStats({
        totalLotes: Number(prod?.totalLotes || 0),
        produccionTotal: Number(prod?.totalKg || 0),
        porCalidad: calidad?.porCalidad || { alta: 0, media: 0, baja: 0 },
        calidadPromedio: Number(calidad?.puntajePromedio || 0),
        produccionMensual: Array.isArray(prod?.produccionMensual) ? prod.produccionMensual : [],
        totalPredicciones: totalPrediccionesReales,
        resumenPredicciones: pred?.resumen || {},
        resumenTrazabilidad: traz?.resumen || {}
      })
    } catch (err) {
      console.error('Error cargando reportes', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const reports = [
    { id: 'produccion', label: 'Producción', icon: Package },
    { id: 'calidad', label: 'Calidad', icon: Award },
    { id: 'trazabilidad', label: 'Trazabilidad', icon: Route },
    { id: 'ia', label: 'Inteligencia Artificial', icon: Brain }
  ]

  const generarReporte = (tipo) => {
    const now = new Date()
    const fecha = now.toLocaleDateString('es-PE')
    const hora = now.toLocaleTimeString('es-PE')
    
    alert(`Generando reporte de ${tipo}...\n\nFecha: ${fecha}\nHora: ${hora}\n\n(En una versión completa, esto generaría un PDF descargable)`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-cafe-600">Cargando reportes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Reportes</h1>
            <p className="text-cafe-600">Generación de informes del sistema</p>
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
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-cafe-900">
            Reporte de {reports.find(r => r.id === activeReport)?.label}
          </h2>
          <div className="flex gap-2">
            <button onClick={loadData} className="flex items-center gap-2 bg-cafe-100 text-cafe-700 font-semibold py-2 px-4 rounded-lg hover:bg-cafe-200 transition-all"><RefreshCw className="w-4 h-4" />Actualizar</button>
            <button onClick={() => generarReporte(activeReport)} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"><Download className="w-4 h-4" />Generar Reporte</button>
          </div>
        </div>

        {/* Reporte de Producción */}
        {activeReport === 'produccion' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.totalLotes}</p>
                <p className="text-sm text-cafe-600">Total Lotes</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.produccionTotal}</p>
                <p className="text-sm text-cafe-600">kg Producidos</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.totalPredicciones || 0}</p>
                <p className="text-sm text-cafe-600">Predicciones reales</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.produccionMensual || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#edd9c4" />
                  <XAxis dataKey="mes" stroke="#7c5739" />
                  <YAxis stroke="#7c5739" />
                  <Tooltip />
                  <Bar dataKey="produccion" fill="#b8895a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Reporte de Calidad */}
        {activeReport === 'calidad' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{stats?.porCalidad.alta}</p>
                <p className="text-sm text-green-700">Calidad Alta</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">{stats?.porCalidad.media}</p>
                <p className="text-sm text-yellow-700">Calidad Media</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{stats?.porCalidad.baja}</p>
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
                <p className="text-sm text-cafe-600">Datos reales en SQLite</p>
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
                        <td className="px-4 py-3 text-sm font-mono text-cafe-900">{e.lote_codigo || `Lote ${e.lote_id}`}</td>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.resumenTrazabilidad?.total_lotes || 0}</p>
                <p className="text-sm text-cafe-600">Total lotes</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.resumenTrazabilidad?.lotes_en_produccion || 0}</p>
                <p className="text-sm text-cafe-600">En producción</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.resumenTrazabilidad?.lotes_en_secado || 0}</p>
                <p className="text-sm text-cafe-600">En secado</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.resumenTrazabilidad?.lotes_en_control_calidad || 0}</p>
                <p className="text-sm text-cafe-600">En control calidad</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.resumenTrazabilidad?.lotes_almacenados || 0}</p>
                <p className="text-sm text-cafe-600">Almacenados</p>
              </div>
              <div className="bg-cafe-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cafe-900">{stats?.resumenTrazabilidad?.lotes_comercializados || 0}</p>
                <p className="text-sm text-cafe-600">Comercializados</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cafe-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Código</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Productor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Variedad</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Última fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Ubicación</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Etapa actual</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Detalle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cafe-100">
                  {(reporteTrazabilidad.registros || []).map(l => (
                    <tr key={l.lote_id} className="hover:bg-cafe-50">
                      <td className="px-4 py-3 text-sm font-mono font-bold text-cafe-900">{l.lote_codigo || l.codigo_lote}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.productor}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.variedad_cafe || '-'}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.ultima_fecha || 'Pendiente'}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.ubicacion || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                          {l.etapa_actual}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-cafe-700">{l.estado || '-'}</td>
                      <td className="px-4 py-3 text-sm text-cafe-700">
                        <details className="cursor-pointer">
                          <summary className="text-amber-700 font-medium">Ver</summary>
                          <div className="mt-2 text-xs text-cafe-600">
                            <div><span className="font-semibold">Lote ID:</span> {l.lote_id}</div>
                            <div><span className="font-semibold">Cantidad:</span> {l.cantidad_kg || 0} kg</div>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
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
                        <td className="px-4 py-3 text-sm font-mono text-cafe-900">{e.lote_codigo || e.codigo_lote}</td>
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