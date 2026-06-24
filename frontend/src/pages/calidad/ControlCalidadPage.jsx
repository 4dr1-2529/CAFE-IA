import { useState, useEffect } from 'react'
import { Award, Save, CheckCircle, AlertCircle, Eye } from 'lucide-react'
import { getLotes, getControlCalidad, createEvaluacion } from '../../services/api/index.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Pmv3IntegrationBanner from '../../components/common/Pmv3IntegrationBanner.jsx'
import Pmv3ImprovementNotice from '../../components/common/Pmv3ImprovementNotice.jsx'
import { useToast } from '../../hooks/useToast.js'

export default function ControlCalidad() {
  const toast = useToast()
  const [lotes, setLotes] = useState([])
  const [evaluaciones, setEvaluaciones] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showHistorial, setShowHistorial] = useState(false)
  const [formData, setFormData] = useState({
    loteId: '',
    loteCodigo: '',
    aroma: 5.0,
    acidez: 5.0,
    cuerpo: 5.0,
    sabor: 5.0,
    balance: 5.0,
    defectos: 0,
    observaciones: '',
    evaluador: 'Q Grader'
  })

  const loadData = async () => {
    try {
      const [lotesData, evalsData] = await Promise.all([getLotes(), getControlCalidad()])
      setLotes(Array.isArray(lotesData) ? lotesData.filter(l => l.estado !== 'Venta') : [])
      setEvaluaciones(Array.isArray(evalsData) ? evalsData : [])
    } catch (err) {
      console.error('Error cargando datos', err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    const numericFields = ['aroma', 'acidez', 'cuerpo', 'sabor', 'balance', 'defectos']
    setFormData(prev => ({ ...prev, [name]: numericFields.includes(name) ? Number(value) : value }))
  }

  const evaluadosSet = new Set((evaluaciones || []).map(e => Number(e?.lote_id)).filter(Boolean))
  const lotesPendientes = (lotes || []).filter(l => !evaluadosSet.has(Number(l.id)))

  const handleLoteChange = (e) => {
    const raw = e.target.value
    if (!raw) {
      setFormData((prev) => ({ ...prev, loteId: '', loteCodigo: '' }))
      return
    }
    const loteId = Number(raw)
    const lote = lotesPendientes.find((l) => Number(l.id) === loteId)
    setFormData((prev) => ({
      ...prev,
      loteId,
      loteCodigo: lote?.codigo_lote || '',
    }))
  }

  const calcularPuntaje = () => {
    const aroma = Number(formData.aroma) || 0
    const acidez = Number(formData.acidez) || 0
    const cuerpo = Number(formData.cuerpo) || 0
    const sabor = Number(formData.sabor) || 0
    const balance = Number(formData.balance) || 0
    const defectos = Number(formData.defectos) || 0
    
    const suma = aroma + acidez + cuerpo + sabor + balance
    let puntaje = (suma / 50) * 100 - defectos
    puntaje = Math.max(0, Math.min(100, puntaje))
    return Math.round(puntaje * 100) / 100
  }

  const getCalificacion = (puntaje) => {
    if (puntaje >= 85) return 'Alta'
    if (puntaje >= 70) return 'Media'
    return 'Baja'
  }

  const getEstado = (calificacion) => {
    switch (calificacion) {
      case 'Alta': return 'Aprobado'
      case 'Media': return 'Observado'
      case 'Baja': return 'Rechazado'
      default: return 'Pendiente'
    }
  }

  const getRecomendacion = (calificacion) => {
    switch (calificacion) {
      case 'Alta':
        return 'Lote de excelente calidad. Recomendado para mercados premium y exportación.'
      case 'Media':
        return 'Calidad aceptable. Recomendado para mercados locales con ajustes menores.'
      case 'Baja':
        return 'Calidad insuficiente. Se recomienda reprocesar o destinar a usos alternativos.'
      default:
        return 'Evaluación pendiente.'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setErrorMsg(null)

    const loteIdNum = Number(formData.loteId)
    if (!loteIdNum || Number.isNaN(loteIdNum)) {
      const msg = 'Seleccione un lote válido antes de guardar.'
      setErrorMsg(msg)
      toast.error(msg)
      setLoading(false)
      return
    }

    try {
      const aroma = Number(formData.aroma)
      const acidez = Number(formData.acidez)
      const cuerpo = Number(formData.cuerpo)
      const sabor = Number(formData.sabor)
      const balance = Number(formData.balance)

      // Validar que estén en rango 1-10
      if ([aroma, acidez, cuerpo, sabor, balance].some(v => v < 1 || v > 10)) {
        const msg = 'Los parámetros de cata deben estar entre 1 y 10.'
        setErrorMsg(msg)
        toast.error(msg)
        setLoading(false)
        return
      }

      const puntaje = calcularPuntaje()
      const calificacion = getCalificacion(puntaje)

      const evaluacionGuardada = await createEvaluacion({
        lote_id: loteIdNum,
        lote_codigo: formData.loteCodigo,
        aroma: aroma,
        acidez: acidez,
        cuerpo: cuerpo,
        sabor: sabor,
        balance: balance,
        defectos: Number(formData.defectos) || 0,
        observaciones: formData.observaciones,
        evaluador: formData.evaluador,
        puntaje: puntaje,
        calidad_final: calificacion,
        estado: getEstado(calificacion),
        fecha_evaluacion: new Date().toISOString().split('T')[0]
      })

      setSuccess({
        evaluacion: evaluacionGuardada,
        puntaje,
        calificacion,
        recomendacion: getRecomendacion(calificacion)
      })
      toast.success('Evaluación de calidad guardada correctamente.')

      await loadData()
      setShowHistorial(true)

      setFormData(prev => ({
        ...prev,
        loteId: '',
        loteCodigo: '',
        aroma: 5.0,
        acidez: 5.0,
        cuerpo: 5.0,
        sabor: 5.0,
        balance: 5.0,
        defectos: 0,
        observaciones: ''
      }))
    } catch (err) {
      console.error('Error guardando evaluación', err)
      const apiMessage = err?.message || err?.response?.data?.message || 'No se pudo guardar la evaluación. Intente de nuevo.'
      setErrorMsg(apiMessage)
      toast.error(apiMessage)
    } finally {
      setLoading(false)
    }
  }

  const puntaje = calcularPuntaje()
  const calificacion = getCalificacion(puntaje)
  const promedioHistorial = evaluaciones.length
    ? Math.round(evaluaciones.reduce((s, e) => s + (Number(e.puntaje_taza) || 0), 0) / evaluaciones.length * 100) / 100
    : 0

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV3 · Control de calidad"
        title="Control de Calidad"
        subtitle="Evaluación sensorial Q Grader con indicadores, recomendaciones y validación de formulario."
        icon={Award}
      />

      <Pmv3IntegrationBanner compact />

      <Pmv3ImprovementNotice>
        control de calidad con apoyo a la toma de decisiones — indicadores visuales, recomendación automática y validaciones claras.
      </Pmv3ImprovementNotice>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4 text-center">
          <p className="text-2xl font-bold text-cafe-900">{evaluaciones.length}</p>
          <p className="text-sm text-cafe-600">Evaluaciones realizadas</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{lotesPendientes.length}</p>
          <p className="text-sm text-cafe-600">Lotes pendientes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4 text-center">
          <p className={`text-2xl font-bold ${promedioHistorial >= 85 ? 'text-green-600' : promedioHistorial >= 70 ? 'text-yellow-600' : 'text-cafe-900'}`}>
            {promedioHistorial || '—'}
          </p>
          <p className="text-sm text-cafe-600">Promedio puntaje</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de lote */}
          <div>
            <label className="block text-sm font-medium text-cafe-700 mb-2">Lote a Evaluar *</label>
            <select
              name="loteId"
              value={formData.loteId}
              onChange={handleLoteChange}
              className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Seleccionar lote</option>
              {lotesPendientes.map(lote => (
                <option key={lote.id} value={lote.id}>
                  {lote.codigo_lote} - Productor: {lote.productor} - Variedad: {lote.variedad_cafe}
                </option>
              ))}
            </select>
          </div>
          {lotesPendientes.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">
              Todos los lotes ya tienen evaluación de calidad.
            </div>
          )}

          {/* Detalles del lote seleccionado */}
          {formData.loteId && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-3">Detalles del Lote Seleccionado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-blue-600 font-medium">ID del Lote</p>
                  <p className="text-blue-900">{formData.loteId}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Código de Lote</p>
                  <p className="text-blue-900">{formData.loteCodigo}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Productor</p>
                  <p className="text-blue-900">{lotes.find(l => l.id === formData.loteId)?.productor || '-'}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Variedad de Café</p>
                  <p className="text-blue-900">{lotes.find(l => l.id === formData.loteId)?.variedad_cafe || '-'}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Humedad</p>
                  <p className="text-blue-900">{lotes.find(l => l.id === formData.loteId)?.humedad}%</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Temperatura</p>
                  <p className="text-blue-900">{lotes.find(l => l.id === formData.loteId)?.temperatura}°C</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Altitud</p>
                  <p className="text-blue-900">{lotes.find(l => l.id === formData.loteId)?.altitud} msnm</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Tipo de Secado</p>
                  <p className="text-blue-900">{lotes.find(l => l.id === formData.loteId)?.tipo_secado}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium">Fecha de Cosecha</p>
                  <p className="text-blue-900">{lotes.find(l => l.id === formData.loteId)?.fecha_cosecha}</p>
                </div>
              </div>
            </div>
          )}

          {/* Parámetros de evaluación */}
          <div className="bg-cafe-50 rounded-xl p-5 border border-cafe-200">
            <h3 className="font-semibold text-cafe-900 mb-4">Parámetros de Cata (1-10, con decimales)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {['aroma', 'acidez', 'cuerpo', 'sabor', 'balance'].map(param => (
                <div key={param}>
                  <label className="block text-sm font-medium text-cafe-700 mb-2 capitalize">{param}</label>
                  <input
                    type="number"
                    name={param}
                    min="1"
                    max="10"
                    step="0.1"
                    value={formData[param]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <div className="text-center mt-1">
                    <span className="text-lg font-bold text-cafe-900">{Number(formData[param]).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Defectos */}
          <div>
            <label className="block text-sm font-medium text-cafe-700 mb-2">Número de Defectos</label>
            <input
              type="number"
              name="defectos"
              value={formData.defectos}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-cafe-700 mb-2">Observaciones</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows="3"
              placeholder="Notas sobre el perfil de taza, notas sensoriales, etc."
              className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Preview del resultado */}
          <div className="bg-gradient-to-r from-purple-50 to-cafe-50 rounded-xl p-5 border border-purple-200">
            <h3 className="font-semibold text-cafe-900 mb-3">Vista Previa · Indicadores PMV3</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-cafe-600">Puntaje</p>
                <p className="text-3xl font-bold text-cafe-900">{puntaje}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-cafe-600">Calidad</p>
                <p className={`text-3xl font-bold ${
                  calificacion === 'Alta' ? 'text-green-600' :
                  calificacion === 'Media' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {calificacion}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-cafe-600">Estado</p>
                <p className="text-lg font-semibold text-cafe-900">{formData.loteId ? getEstado(calificacion) : 'Sin lote'}</p>
              </div>
              <div className="text-center md:col-span-1 col-span-2">
                <p className="text-sm text-cafe-600">Recomendación</p>
                <p className="text-xs text-cafe-700 mt-1">{formData.loteId ? getRecomendacion(calificacion) : 'Seleccione un lote'}</p>
              </div>
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !formData.loteId}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Evaluando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Evaluación
                </>
              )}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Error al guardar</h3>
                <p className="text-sm text-red-700 mt-1">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        {/* Resultado */}
        {success && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800">Evaluación guardada exitosamente</h3>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
                    <p className="text-2xl font-bold text-cafe-900">{success.puntaje}</p>
                    <p className="text-xs text-cafe-600">Puntaje</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
                    <p className={`text-2xl font-bold ${
                      success.calificacion === 'Alta' ? 'text-green-600' :
                      success.calificacion === 'Media' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {success.calificacion}
                    </p>
                    <p className="text-xs text-cafe-600">Calidad</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
                    <p className="text-sm text-cafe-900">{success.evaluacion?.defectos || formData.defectos}</p>
                    <p className="text-xs text-cafe-600">Defectos</p>
                  </div>
                </div>
                <div className="mt-3 bg-white rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-semibold text-green-800">Recomendación Técnica:</p>
                  <p className="text-sm text-green-700 mt-1">{success.recomendacion}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pendientes / Historial */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 overflow-hidden">
        <div className="p-4 border-b border-cafe-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cafe-900">Evaluaciones de calidad</h2>
          <button
            onClick={() => setShowHistorial(v => !v)}
            className="inline-flex items-center gap-2 bg-cafe-100 text-cafe-700 px-4 py-2 rounded-lg hover:bg-cafe-200 transition"
          >
            <Eye className="w-4 h-4" />
            Ver evaluaciones realizadas
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-cafe-50 border border-cafe-200 rounded-lg p-4">
            <p className="font-semibold text-cafe-900">Lotes pendientes de evaluación</p>
            <p className="text-sm text-cafe-600 mt-1">
              Pendientes: <span className="font-semibold">{lotesPendientes.length}</span> / {lotes.length}
            </p>
          </div>

          {showHistorial && (
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
                  {(evaluaciones || []).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-cafe-400">No hay evaluaciones registradas</td>
                    </tr>
                  ) : (
                    evaluaciones.map((e) => (
                      <tr key={e.id} className="hover:bg-cafe-50">
                        <td className="px-4 py-3 text-sm text-cafe-700">{e.fecha_evaluacion || '-'}</td>
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
          )}
        </div>
      </div>
    </div>
  )
}