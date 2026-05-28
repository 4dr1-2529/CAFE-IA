import { useState, useEffect } from 'react'
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Coffee, Zap, Activity } from 'lucide-react'
import { getInfoModelo } from '../../services/ml.service.js'
import { getLotes, getPredicciones, ejecutarPrediccionIA } from '../../services/api/index.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { useToast } from '../../hooks/useToast.js'
import { tituloLote } from '../../utils/loteDisplay.js'

export default function ModuloIA() {
  const [lotes, setLotes] = useState([])
  const [predicciones, setPredicciones] = useState([])
  const [modeloInfo, setModeloInfo] = useState(null)
  const [prediccion, setPrediccion] = useState(null)
  const [loading, setLoading] = useState(false)
  // Mantener como string para evitar desajustes string/number en <select>
  const [selectedLoteId, setSelectedLoteId] = useState('')
  const [mensaje, setMensaje] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const toast = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [lotesData, prediccionesData] = await Promise.all([
          getLotes(),
          getPredicciones()
        ])
        setLotes(Array.isArray(lotesData) ? lotesData : [])
        setPredicciones(Array.isArray(prediccionesData) ? prediccionesData : [])
      } catch (err) {
        console.error('Error cargando datos', err)
        setLotes([])
        setPredicciones([])
      }

      setModeloInfo(getInfoModelo())
    }

    loadData()
  }, [])

  const handleLoteChange = (e) => setSelectedLoteId(e.target.value || '')

  const listaPredicciones = Array.isArray(predicciones) ? predicciones : []
  const listaLotes = Array.isArray(lotes) ? lotes : []
  const prediccionesValidas = listaPredicciones.filter((p) => p?.lote_id && p?.codigo_lote && p?.productor)
  const lotesPredichos = new Set(prediccionesValidas.map((p) => Number(p.lote_id)))
  const lotesPendientes = listaLotes.filter((l) => !lotesPredichos.has(Number(l.id)))
  const selectedLoteIdNum = selectedLoteId ? Number(selectedLoteId) : null
  const loteSeleccionado = selectedLoteIdNum != null
    ? lotesPendientes.find(l => Number(l.id) === selectedLoteIdNum)
    : null

  const handlePredict = async () => {
    setMensaje(null)
    setErrorMsg(null)
    if (!selectedLoteIdNum) {
      setErrorMsg('Selecciona un lote pendiente para ejecutar la predicción.')
      return
    }

    setLoading(true)
    setPrediccion(null)

    try {
      const lote = loteSeleccionado
      if (!lote) {
        throw new Error('El lote seleccionado no está disponible o ya tiene predicción.')
      }
      // Backend toma las variables reales desde MySQL.
      const resultado = await ejecutarPrediccionIA({ lote_id: Number(lote.id) })
      setPrediccion(resultado)
      setMensaje(`Predicción registrada para ${lote.codigo_lote}.`)
      toast.success('Predicción IA ejecutada correctamente.')
      // Reload predicciones
      const prediccionesData = await getPredicciones()
      setPredicciones(Array.isArray(prediccionesData) ? prediccionesData : [])
      setSelectedLoteId('')
    } catch (err) {
      console.error('Error ejecutando predicción', err)
      const msg = err?.message || 'No se pudo ejecutar la predicción. Intenta nuevamente.'
      setErrorMsg(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const getColorPorCalidad = (calidad) => {
    switch (calidad) {
      case 'Alta': return 'text-green-600 bg-green-50 border-green-200'
      case 'Media': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Baja': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV2 · Machine Learning"
        title="Modelo Predictivo de Machine Learning"
        subtitle="Analiza los datos del lote para estimar calidad, riesgo y recomendaciones del café."
      />

      {/* Info del Modelo */}
      {modeloInfo && (
        <div className="card-panel">
          <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cafeVerde-600" />
            Información del Modelo ML
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cafe-50 rounded-lg p-4">
              <p className="text-xs text-cafe-500">Nombre</p>
              <p className="font-semibold text-cafe-900">{modeloInfo.nombre}</p>
            </div>
            <div className="bg-cafe-50 rounded-lg p-4">
              <p className="text-xs text-cafe-500">Tipo de Modelo</p>
              <p className="font-semibold text-cafe-900">{modeloInfo.tipo}</p>
            </div>
            <div className="bg-cafe-50 rounded-lg p-4">
              <p className="text-xs text-cafe-500">Precisión</p>
              <p className="font-semibold text-cafe-900 text-green-600">{modeloInfo.precision}</p>
            </div>
          </div>
          <div className="mt-4 bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500 mb-2">Características de Entrada</p>
            <div className="flex flex-wrap gap-2">
              {(modeloInfo.caracteristicas ?? modeloInfo.variables ?? []).map((car) => (
                <span key={car} className="px-3 py-1 bg-white border border-cafe-200 rounded-full text-sm text-cafe-700">
                  {car}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 bg-cafeVerde-50 border border-cafeVerde-200 rounded-lg p-4 text-sm text-cafe-800">
            <p><strong>Modelo predictivo:</strong> Machine Learning que analiza variables del lote y estima calidad y riesgo.</p>
            <p><strong>Variables:</strong> humedad, altitud, cantidad, variedad, proceso de secado, puntaje de calidad y estado del lote.</p>
            <p><strong>Resultado:</strong> calidad estimada, nivel de riesgo (bajo / medio / alto), confianza estimada y recomendación.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entrada de Datos */}
        <div className="card-panel">
          <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2"><Coffee className="w-5 h-5 text-amber-600" />Seleccionar lote</h2>
          
          <div className="space-y-4">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
                {errorMsg}
              </div>
            )}
            {mensaje && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">
                {mensaje}
              </div>
            )}
            {/* Selector de Lote */}
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Lote pendiente de predicción *</label>
              <select
                name="loteId"
                value={selectedLoteId}
                onChange={handleLoteChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              >
                <option value="">Seleccionar lote</option>
                {lotesPendientes.map(lote => (
                  <option key={lote.id} value={lote.id}>
                    {tituloLote(lote.codigo_lote)} — {lote.productor} — {lote.variedad_cafe}
                  </option>
                ))}
              </select>
            </div>
            {lotesPendientes.length === 0 && (
              <div className="bg-amber-50 dark:bg-slate-700/50 border border-amber-200 dark:border-slate-600 rounded-lg p-4 text-amber-900 dark:text-slate-200">
                Selecciona un lote con datos de producción para ejecutar la predicción. Si todos tienen IA, registre un lote nuevo en Producción.
              </div>
            )}

            {/* Detalles del lote */}
            {loteSeleccionado && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Lote seleccionado — datos para la predicción</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-amber-700 dark:text-amber-300 font-medium">Lote</p>
                    <p className="text-amber-950 dark:text-slate-100 font-semibold">{tituloLote(loteSeleccionado.codigo_lote)}</p>
                  </div>
                  <div>
                    <p className="text-amber-700 dark:text-amber-300 font-medium">Productor</p>
                    <p className="text-amber-950 dark:text-slate-100">{loteSeleccionado.productor || '-'}</p>
                  </div>
                  <div>
                    <p className="text-amber-700 dark:text-amber-300 font-medium">Cantidad (kg)</p>
                    <p className="text-amber-950 dark:text-slate-100">{loteSeleccionado.cantidad_kg ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-amber-700 dark:text-amber-300 font-medium">Humedad</p>
                    <p className="text-amber-950 dark:text-slate-100">{loteSeleccionado.humedad}%</p>
                  </div>
                  <div>
                    <p className="text-amber-700 dark:text-amber-300 font-medium">Altitud</p>
                    <p className="text-amber-950 dark:text-slate-100">{loteSeleccionado.altitud} msnm</p>
                  </div>
                  <div>
                    <p className="text-amber-700 dark:text-amber-300 font-medium">Proceso secado</p>
                    <p className="text-amber-900">{loteSeleccionado.tipo_secado || '-'}</p>
                  </div>
                  <div>
                    <p className="text-amber-600 font-medium">Fecha de Cosecha</p>
                    <p className="text-amber-900">{loteSeleccionado.fecha_cosecha || '-'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Botón de predicción */}
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cafeVerde-500 to-cafeVerde-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-cafeVerde-600 hover:to-cafeVerde-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Procesando modelo...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Ejecutar Predicción
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resultado de Predicción */}
        <div className="card-panel">
          <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cafeVerde-600" />
            Resultado de Predicción
          </h2>
          
          {prediccion ? (
            <div className="space-y-4">
              {/* Calidad Principal */}
              <div className={`rounded-xl p-6 border-2 ${getColorPorCalidad(prediccion.calidad_predicha)}`}>
                <div className="text-center">
                  <p className="text-sm text-cafe-600 mb-1">Calidad Estimada</p>
                  <p className="text-5xl font-bold">{prediccion.calidad_predicha}</p>
                  <p className="text-2xl font-semibold mt-2">{prediccion.confianza}% confianza</p>
                  {prediccion.porcentaje_riesgo != null && (
                    <p className="text-lg font-medium text-red-600 mt-1">Riesgo: {prediccion.porcentaje_riesgo}%</p>
                  )}
                  <p className="text-xs text-cafe-500 mt-2">Probabilidad de acierto · Motor v2.0</p>
                </div>
              </div>

              {/* Factores Influyentes */}
              <div className="bg-cafe-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-cafe-900 mb-3">Factores Influyentes</p>
                <div className="space-y-2">
                  {(prediccion.factores_influyentes ?? prediccion.factores ?? []).map((factor, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        {factor.impacto === 'Positivo' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : factor.impacto === 'Negativo' ? (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : (
                          <Activity className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="font-medium text-cafe-900">{factor.factor ?? factor.nombre_variable ?? '-'}</span>
                      </div>
                      <span className={`text-sm ${
                        factor.impacto === 'Positivo' ? 'text-green-600' :
                        factor.impacto === 'Negativo' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {factor.impacto}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendación */}
              <div className="bg-gradient-to-r from-amber-50 to-cafe-50 rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-semibold text-cafe-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  Recomendación
                </p>
                <p className="text-sm text-cafe-700">{prediccion.recomendacion}</p>
              </div>

              {/* Modelo usado */}
              <div className="text-center text-xs text-cafe-400">Modelo: {prediccion.modelo_usado || prediccion.modelo || '-'}</div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-cafe-50 rounded-xl">
              <div className="text-center text-cafe-400">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Ingresa los datos y ejecuta la predicción</p>
                <p className="text-sm mt-2">El modelo analizará las condiciones para predecir la calidad</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Lotes pendientes de predicción</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cafe-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Lote</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Productor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Variedad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Humedad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Temp.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Altitud</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Secado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cafe-100">
              {lotesPendientes.length === 0 ? (
                <tr><td colSpan="7" className="px-4 py-8 text-center text-cafe-400">Todos los lotes ya tienen predicción IA</td></tr>
              ) : lotesPendientes.map((lote) => (
                <tr key={lote.id} className="hover:bg-cafe-50">
                  <td className="px-4 py-3 text-sm font-mono text-cafe-900">{lote.codigo_lote}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.productor}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.variedad_cafe || '-'}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.humedad}%</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.temperatura}°C</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.altitud} msnm</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.tipo_secado || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historial de Predicciones */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Historial de predicciones realizadas</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cafe-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Lote</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Productor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Variedad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Humedad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Temp.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Altitud</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Secado</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Calidad Predicha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Confianza</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Recomendación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cafe-100">
              {prediccionesValidas.length === 0 ? (
                <tr><td colSpan="11" className="px-4 py-8 text-center text-cafe-400">No hay predicciones registradas</td></tr>
              ) : prediccionesValidas.map(p => (
                <tr key={p.id} className="hover:bg-cafe-50">
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.fecha_prediccion}</td>
                  <td className="px-4 py-3 text-sm font-mono text-cafe-900">{p.codigo_lote}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.productor}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.variedad_cafe || '-'}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.humedad ?? '-'}{p.humedad != null ? '%' : ''}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.temperatura ?? '-'}{p.temperatura != null ? '°C' : ''}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.altitud ?? '-'}{p.altitud != null ? ' msnm' : ''}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.tipo_secado || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${p.calidad_predicha === 'Alta' ? 'bg-green-100 text-green-700' : p.calidad_predicha === 'Media' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {p.calidad_predicha}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-cafe-900">{p.confianza}%</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{p.recomendacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 overflow-hidden">
        <div className="p-4 border-b border-cafe-100">
          <h3 className="text-lg font-semibold text-cafe-900 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Evidencia IA/ML de entrada
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cafe-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Humedad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Temp.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Altitud</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Calidad Actual</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-cafe-900">Confianza</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cafe-100">
              {lotesPendientes.slice(0, 5).map((lote) => (
                <tr key={lote.id} className="hover:bg-cafe-50">
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.fecha_cosecha}</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.humedad}%</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.temperatura}°C</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.altitud}msnm</td>
                  <td className="px-4 py-3 text-sm text-cafe-700">{lote.variedad_cafe || lote.tipo_cafe || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      lote.calidad_final === 'Alta' ? 'bg-green-100 text-green-700' :
                      lote.calidad_final === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                      lote.calidad_final === 'Baja' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lote.calidad_final || 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-cafe-700">
                    -
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}