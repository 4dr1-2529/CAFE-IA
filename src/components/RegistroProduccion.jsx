import { useState, useEffect } from 'react'
import { Package, Save, AlertCircle, CheckCircle } from 'lucide-react'
import { getProductores, getLoteNextCode, createLote, createProduccion } from '../services/api.js'

export default function RegistroProduccion() {
  const [productores, setProductores] = useState([])
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [noProductores, setNoProductores] = useState(false)
  const [formData, setFormData] = useState({
    codigo: '',
    productorId: '',
    parcela: '',
    fecha: new Date().toISOString().split('T')[0],
    cantidad: '',
    humedad: '',
    temperatura: '',
    altitud: '',
    tipoCafe: 'Arabica',
    tipoSecado: 'Natural'
  })

  useEffect(() => {
    const loadProductores = async () => {
      try {
        const prod = await getProductores()
        setProductores(prod)
        setNoProductores(!prod || prod.length === 0)
      } catch (err) {
        console.error('Error cargando productores', err)
        setProductores([])
        setNoProductores(true)
      }
    }

    const loadCodigo = async () => {
      try {
        const { nextCode } = await getLoteNextCode()
        setFormData(prev => ({ ...prev, codigo: nextCode }))
      } catch (err) {
        setFormData(prev => ({ ...prev, codigo: 'LOTE-0001' }))
      }
    }

    loadProductores()
    loadCodigo()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProductorChange = (e) => {
    const productorId = e.target.value ? parseInt(e.target.value, 10) : ''
    const productor = productores.find(p => p.id === productorId)

    setFormData(prev => ({
      ...prev,
      productorId,
      parcela: productor?.parcela || '',
      altitud: productor?.altitud != null && productor.altitud !== '' ? String(productor.altitud) : ''
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    const sameId = (a, b) => Number(a) === Number(b)
    if (!formData.productorId || !productores.find(p => sameId(p.id, formData.productorId))) {
      setFeedback({ type: 'warn', message: 'Debe seleccionar un productor existente antes de registrar la producción.' })
      setLoading(false)
      return
    }

    if (!formData.cantidad || !formData.humedad || !formData.temperatura || formData.altitud === '' || formData.altitud == null) {
      setFeedback({ type: 'warn', message: 'Complete todos los campos obligatorios del lote antes de enviar.' })
      setLoading(false)
      return
    }

    try {
      const cantidadKg = parseFloat(String(formData.cantidad).replace(',', '.'))
      const hm = parseFloat(String(formData.humedad).replace(',', '.'))
      const temp = parseFloat(String(formData.temperatura).replace(',', '.'))
      const alt = parseFloat(String(formData.altitud).replace(',', '.'))
      if (!Number.isFinite(cantidadKg) || cantidadKg <= 0 || !Number.isFinite(hm) || !Number.isFinite(temp) || !Number.isFinite(alt)) {
        throw new Error('Las cantidades y mediciones deben ser números válidos.')
      }

      // Crear lote con todos los datos necesarios
      const nuevoLote = await createLote({
        codigo_lote: (formData.codigo || '').trim() || undefined,
        productor_id: formData.productorId,
        variedad_cafe: formData.tipoCafe,
        fecha_cosecha: formData.fecha,
        cantidad_kg: cantidadKg,
        estado: 'Produccion',
        humedad: hm,
        temperatura: temp,
        altitud: alt,
        tipo_secado: formData.tipoSecado
      })
      const lotePk = Number(nuevoLote?.id ?? nuevoLote?.ID)
      if (!lotePk) {
        throw new Error('No se pudo registrar el lote')
      }

      // Registro en tabla producción (redundante con lotes; no debe invalidar el lote si el API está desactualizado)
      try {
        await createProduccion({
          lote_id: lotePk,
          humedad: hm,
          temperatura: temp,
          altitud: alt,
          tipo_secado: formData.tipoSecado,
          fecha_registro: formData.fecha
        })
      } catch (prodErr) {
        console.warn('createProduccion omitido o falló — el lote ya está guardado:', prodErr?.message || prodErr)
      }

      // NO crear predicción automáticamente - solo cuando el usuario lo pida desde Módulo IA

      setFeedback({
        type: 'ok',
        message: 'Lote registrado exitosamente',
        lote: nuevoLote.codigo_lote
      })

      // Recargar próximo código (si falla, no invalidar el éxito del lote)
      let nextCode = null
      try {
        const res = await getLoteNextCode()
        nextCode = res?.nextCode
      } catch (e) {
        console.warn('Siguiente código de lote no disponible:', e)
      }
      setFormData(prev => ({
        ...prev,
        codigo: nextCode != null && nextCode !== '' ? nextCode : prev.codigo,
        productorId: '',
        parcela: '',
        cantidad: '',
        humedad: '',
        temperatura: '',
        altitud: '',
        tipoCafe: 'Arabica',
        tipoSecado: 'Natural'
      }))
    } catch (err) {
      console.error('Error guardando producción:', err)
      const msg =
        typeof err?.message === 'string' && err.message.trim().length > 0
          ? err.message
          : 'Error al registrar el lote. Intente de nuevo.'
      setFeedback({ type: 'err', message: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Registro de Producción</h1>
            <p className="text-cafe-600">Registrar nuevos lotes de café en el sistema</p>
          </div>
        </div>
      </div>

      {noProductores && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
          <p className="font-semibold text-amber-800">Primero registre un productor</p>
          <p className="text-amber-700 text-sm">Debe registrar al menos un productor en la sección de Productores antes de registrar un lote.</p>
        </div>
      )}

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Código y Productor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Código de Lote *</label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Productor *</label>
              <select
                name="productorId"
                value={formData.productorId}
                onChange={handleProductorChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              >
                <option value="">Seleccionar productor</option>
                {productores.map(p => (
                  <option key={p.id} value={p.id}>{p.nombres} {p.apellidos} - {p.parcela}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Parcela y Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Parcela</label>
              <input
                type="text"
                name="parcela"
                value={formData.parcela}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-cafe-50"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Fecha de Producción *</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-cafe-700 mb-2">Cantidad (kg) *</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              placeholder="Cantidad en kilogramos"
              className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
              min="0"
              step="0.1"
            />
          </div>

          {/* Datos del proceso - Sección importante para IA */}
          <div className="bg-cafe-50 rounded-xl p-5 border border-cafe-200">
            <h3 className="font-semibold text-cafe-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Datos para Predicción IA
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-cafe-700 mb-2">Humedad (%) *</label>
                <input
                  type="number"
                  name="humedad"
                  value={formData.humedad}
                  onChange={handleChange}
                  placeholder="10-15%"
                  className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                  min="0"
                  max="100"
                  step="0.1"
                />
                <p className="text-xs text-cafe-500 mt-1">Óptimo: 10-13%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-cafe-700 mb-2">Temperatura (°C) *</label>
                <input
                  type="number"
                  name="temperatura"
                  value={formData.temperatura}
                  onChange={handleChange}
                  placeholder="15-25°C"
                  className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                  min="0"
                  max="50"
                  step="0.1"
                />
                <p className="text-xs text-cafe-500 mt-1">Óptimo: 15-22°C</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-cafe-700 mb-2">Altitud (msnm) *</label>
                <input
                  type="number"
                  name="altitud"
                  value={formData.altitud}
                  onChange={handleChange}
                  placeholder="1500-2000"
                  className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                  min="0"
                  max="5000"
                  step="1"
                />
                <p className="text-xs text-cafe-500 mt-1">Óptimo: 1500-2000msnm</p>
              </div>
            </div>
          </div>

          {/* Tipo de Café y Secado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Tipo de Café *</label>
              <select
                name="tipoCafe"
                value={formData.tipoCafe}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              >
                <option value="Arabica">Arabica</option>
                <option value="Typica">Typica</option>
                <option value="Catimor">Catimor</option>
                <option value="Bourbon">Bourbon</option>
                <option value="Caturra">Caturra</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Tipo de Secado *</label>
              <select
                name="tipoSecado"
                value={formData.tipoSecado}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              >
                <option value="Natural">Natural</option>
                <option value="Honey">Honey</option>
                <option value="Wash">Wash (Lavado)</option>
                <option value="Semi-Wash">Semi-Wash</option>
              </select>
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-cafe-900 font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cafe-900"></div>
                  Registrando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Registrar Lote
                </>
              )}
            </button>
          </div>
        </form>

        {feedback && (
          <div
            className={`mt-6 rounded-xl p-4 border ${
              feedback.type === 'ok'
                ? 'bg-green-50 border-green-200'
                : feedback.type === 'warn'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.type === 'ok' ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle
                  className={`w-6 h-6 flex-shrink-0 ${
                    feedback.type === 'warn' ? 'text-amber-600' : 'text-red-600'
                  }`}
                />
              )}
              <div>
                <h3
                  className={`font-semibold ${
                    feedback.type === 'ok'
                      ? 'text-green-800'
                      : feedback.type === 'warn'
                        ? 'text-amber-900'
                        : 'text-red-800'
                  }`}
                >
                  {feedback.message}
                </h3>
                {feedback.type === 'ok' && feedback.lote && (
                  <p className="text-sm text-green-700 mt-1">
                    Lote: <span className="font-mono font-bold">{feedback.lote}</span>
                  </p>
                )}
                {feedback.type === 'ok' && feedback.prediccion && (
                  <div className="mt-3 bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-semibold text-green-800">Predicción IA:</p>
                    <p className="text-sm text-green-700">
                      Calidad estimada:{' '}
                      <span className="font-bold">{feedback.prediccion.calidad_predicha}</span> (
                      {feedback.prediccion.confianza}%)
                    </p>
                    <p className="text-xs text-green-600 mt-1">{feedback.prediccion.recomendacion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}