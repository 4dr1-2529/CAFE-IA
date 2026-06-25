import { useState, useEffect, useCallback } from 'react'
import { Package, Save, AlertCircle, CheckCircle, Info } from 'lucide-react'
import {
  getProductores,
  getLoteNextCode,
  createLote,
  createProduccion,
  getUsuariosActivos,
} from '../../services/api/index.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { isAdminUser } from '../../utils/role.js'
import { parseLoteCodigo } from '../../utils/loteDisplay.js'
import { validateLoteApiForm } from '../../utils/validation.js'

export default function RegistroProduccion() {
  const { user } = useAuth()
  const isAdmin = isAdminUser(user)
  const [loadingProductores, setLoadingProductores] = useState(false)

  const [productores, setProductores] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [noProductores, setNoProductores] = useState(false)
  const [preview, setPreview] = useState(null)
  const [formData, setFormData] = useState({
    responsableUserId: '',
    productorId: '',
    parcela: '',
    fecha: new Date().toISOString().split('T')[0],
    cantidad: '',
    humedad: '',
    temperatura: '',
    altitud: '',
    tipoCafe: 'Arabica',
    tipoSecado: 'Natural',
  })

  const previewUserId = isAdmin && formData.responsableUserId
    ? formData.responsableUserId
    : user?.id

  const loadPreviewCode = useCallback(async (uid, productorId) => {
    if (!uid || !productorId) {
      setPreview(null)
      return
    }
    try {
      const data = await getLoteNextCode(uid, productorId)
      setPreview(data || null)
    } catch {
      setPreview(null)
    }
  }, [])

  const loadProductoresForUser = useCallback(async (userId) => {
    if (!userId) {
      setProductores([])
      setNoProductores(false)
      return
    }
    setLoadingProductores(true)
    try {
      const prod = await getProductores(userId)
      setProductores(prod || [])
      setNoProductores(!prod || prod.length === 0)
    } catch (err) {
      console.error('Error cargando productores', err)
      setProductores([])
      setNoProductores(true)
    } finally {
      setLoadingProductores(false)
    }
  }, [])

  useEffect(() => {
    const loadUsuarios = async () => {
      if (!isAdmin) return
      try {
        const list = await getUsuariosActivos()
        setUsuarios(list || [])
      } catch {
        setUsuarios([])
      }
    }
    loadUsuarios()
  }, [isAdmin])

  useEffect(() => {
    if (!user?.id) return
    if (isAdmin) {
      if (formData.responsableUserId) {
        loadProductoresForUser(formData.responsableUserId)
      } else {
        setProductores([])
        setNoProductores(false)
      }
    } else {
      loadProductoresForUser(user.id)
    }
  }, [isAdmin, user?.id, formData.responsableUserId, loadProductoresForUser])

  useEffect(() => {
    if (user?.id && formData.productorId) {
      loadPreviewCode(previewUserId || user.id, formData.productorId)
    } else {
      setPreview(null)
    }
  }, [user?.id, previewUserId, formData.productorId, loadPreviewCode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleResponsableChange = (e) => {
    const responsableUserId = e.target.value
    setFormData((prev) => ({
      ...prev,
      responsableUserId,
      productorId: '',
      parcela: '',
      altitud: '',
    }))
    setPreview(null)
  }

  const handleProductorChange = (e) => {
    const productorId = e.target.value ? Number.parseInt(e.target.value, 10) : ''
    const productor = productores.find(p => p.id === productorId)

    setFormData(prev => ({
      ...prev,
      productorId,
      parcela: productor?.parcela || '',
      altitud: productor?.altitud != null && productor.altitud !== '' ? String(productor.altitud) : '',
    }))

    const uid = (isAdmin && formData.responsableUserId) ? formData.responsableUserId : user?.id
    if (uid && productorId) loadPreviewCode(uid, productorId)
    else setPreview(null)
  }

  const productorSeleccionado = productores.find((p) => Number(p.id) === Number(formData.productorId))
  const clienteLabel = isAdmin && formData.responsableUserId
    ? (() => {
        const u = usuarios.find((x) => Number(x.id) === Number(formData.responsableUserId))
        return u ? `${u.nombres} ${u.apellidos || ''}`.trim() : 'Cliente seleccionado'
      })()
    : `${user?.nombre || user?.nombres || ''}`.trim() || user?.email || 'Mi cuenta'
  const previewParsed = preview?.nextCode ? parseLoteCodigo(preview.nextCode) : null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    const sameId = (a, b) => Number(a) === Number(b)
    if (isAdmin && !formData.responsableUserId) {
      setFeedback({ type: 'warn', message: 'Debe seleccionar el cliente responsable antes de registrar el lote.' })
      setLoading(false)
      return
    }

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

      const payload = {
        productor_id: formData.productorId,
        variedad_cafe: formData.tipoCafe,
        fecha_cosecha: formData.fecha,
        cantidad_kg: cantidadKg,
        estado: 'Produccion',
        humedad: hm,
        temperatura: temp,
        altitud: alt,
        tipo_secado: formData.tipoSecado,
      }
      if (isAdmin && formData.responsableUserId) {
        payload.responsable_user_id = Number(formData.responsableUserId)
      }

      const { valid, errors } = validateLoteApiForm(payload)
      if (!valid) {
        const msg = Object.values(errors)[0] || 'Revise los datos del lote.'
        setFeedback({ type: 'warn', message: msg })
        setLoading(false)
        return
      }

      const nuevoLote = await createLote(payload)
      const lotePk = Number(nuevoLote?.id ?? nuevoLote?.ID)
      if (!lotePk) {
        throw new Error('No se pudo registrar el lote')
      }

      let produccionOk = true
      try {
        await createProduccion({
          lote_id: lotePk,
          cantidad_kg: cantidadKg,
          humedad: hm,
          temperatura: temp,
          altitud: alt,
          tipo_secado: formData.tipoSecado,
          fecha_registro: formData.fecha,
        })
      } catch (prodErr) {
        produccionOk = false
        console.warn('createProduccion falló — el lote ya está guardado:', prodErr?.message || prodErr)
      }

      setFeedback({
        type: produccionOk ? 'ok' : 'warn',
        message: produccionOk
          ? 'Lote registrado exitosamente'
          : 'Lote guardado, pero falló el registro de producción. Revise en trazabilidad o contacte al administrador.',
        lote: nuevoLote.codigo_lote,
      })

      setPreview(null)

      setFormData(prev => ({
        ...prev,
        productorId: '',
        parcela: '',
        cantidad: '',
        humedad: '',
        temperatura: '',
        altitud: '',
        tipoCafe: 'Arabica',
        tipoSecado: 'Natural',
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

      {isAdmin && !formData.responsableUserId && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <p className="font-semibold text-blue-900">Seleccione un cliente</p>
          <p className="text-blue-800 text-sm">Elija el cliente responsable para ver sus productores y registrar el lote.</p>
        </div>
      )}

      {noProductores && (isAdmin ? formData.responsableUserId : true) && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
          <p className="font-semibold text-amber-800">Sin productores disponibles</p>
          <p className="text-amber-700 text-sm">
            {isAdmin
              ? 'Este cliente aún no tiene productores registrados. Regístrelos en la sección Productores.'
              : 'Debe registrar al menos un productor en la sección de Productores antes de registrar un lote.'}
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-600 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-700 dark:text-blue-300 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-950 dark:text-slate-100 space-y-1">
              <p className="font-medium">El sistema asignará automáticamente el número de lote al guardar.</p>
              <p><span className="text-blue-800 dark:text-slate-300">Cliente:</span> {clienteLabel}</p>
              {productorSeleccionado && (
                <p><span className="text-blue-800 dark:text-slate-300">Productor seleccionado:</span> {productorSeleccionado.nombres} {productorSeleccionado.apellidos || ''}</p>
              )}
              {previewParsed && (
                <>
                  <p><span className="text-blue-800 dark:text-slate-300">Próximo lote del cliente:</span> Lote N° {previewParsed.numero}</p>
                  <p><span className="text-blue-800 dark:text-slate-300">Código interno estimado:</span> <span className="font-mono text-xs">{preview.nextCode}</span></p>
                  <p className="text-xs text-blue-800/90 dark:text-slate-400 italic">El código final se confirmará al guardar.</p>
                </>
              )}
              {!formData.productorId && (
                <p className="text-xs text-blue-800 dark:text-slate-400">Seleccione un productor para ver la estimación del próximo lote.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isAdmin && (
              <div>
                <label className="label-field">Cliente responsable *</label>
                <select
                  name="responsableUserId"
                  value={formData.responsableUserId}
                  onChange={handleResponsableChange}
                  className="input-field"
                  required
                >
                  <option value="">Seleccione un cliente</option>
                  {usuarios.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.nombres} {u.apellidos} — {u.email}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className={isAdmin ? '' : 'md:col-span-2'}>
              <label className="label-field">Productor *</label>
              <select
                name="productorId"
                value={formData.productorId}
                onChange={handleProductorChange}
                className="input-field"
                required
                disabled={isAdmin && !formData.responsableUserId}
              >
                <option value="">
                  {isAdmin && !formData.responsableUserId
                    ? 'Seleccione un cliente para ver sus productores'
                    : loadingProductores
                      ? 'Cargando productores...'
                      : 'Seleccionar productor'}
                </option>
                {productores.map(p => (
                  <option key={p.id} value={p.id}>{p.nombres} {p.apellidos} - {p.parcela}</option>
                ))}
              </select>
            </div>
          </div>

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
              min="0.1"
              step="0.1"
            />
          </div>

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
                <option value="Lavado">Lavado</option>
                <option value="Honey">Honey</option>
              </select>
            </div>
          </div>

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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
