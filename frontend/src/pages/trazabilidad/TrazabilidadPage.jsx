import { useState, useEffect } from 'react'
import { Route, Search, QrCode } from 'lucide-react'
import { getLotes, getTrazabilidad } from '../../services/api/index.js'
import LoteQrPanel from '../../components/features/LoteQrPanel.jsx'
import TrazabilidadTimeline from '../../components/features/TrazabilidadTimeline.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { tituloLote, subtituloLote, parseLoteCodigo } from '../../utils/loteDisplay.js'

const estadoIconMap = {
  Producción: '🌱',
  Produccion: '🌱',
  Secado: '☀️',
  'Control de calidad': '🔬',
  Calidad: '🔬',
  Almacenamiento: '📦',
  Comercialización: '💰',
  Venta: '💰',
  Registrado: '📋',
}

const getIconoEstado = (estado) => estadoIconMap[estado] || estadoIconMap[estado?.toLowerCase?.()] || '•'

const estadoBadgeClass = (estado) => {
  const e = (estado || '').toLowerCase()
  if (e.includes('final') || e.includes('comercial')) return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
  if (e.includes('control') || e.includes('calidad')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
  if (e.includes('secado')) return 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100'
  return 'bg-cafe-100 text-cafe-800 dark:bg-slate-700 dark:text-slate-100'
}

export default function Trazabilidad() {
  const { user } = useAuth()
  const isAdmin = user?.rol === 'admin'
  const [lotes, setLotes] = useState([])
  const [trazabilidad, setTrazabilidad] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLote, setSelectedLote] = useState(null)
  const [showQr, setShowQr] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [lotesData, trazData] = await Promise.all([getLotes(), getTrazabilidad()])
        setLotes(Array.isArray(lotesData) ? lotesData : [])
        setTrazabilidad(Array.isArray(trazData) ? trazData : [])
      } catch (err) {
        console.error('Error cargando datos', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    setShowQr(false)
  }, [selectedLote?.id])

  const filteredLotes = lotes
    .filter((lote) => {
      const codigo = lote.codigo_lote || lote.codigo || ''
      const parsed = parseLoteCodigo(codigo)
      const term = searchTerm.toLowerCase()
      return (
        codigo.toLowerCase().includes(term) ||
        parsed.numero.includes(term) ||
        (lote.productor || '').toLowerCase().includes(term) ||
        (lote.parcela || '').toLowerCase().includes(term)
      )
    })
    .sort((a, b) => Number(b.id) - Number(a.id))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4" />
          <p className="text-cafe-600 dark:text-slate-300">Cargando trazabilidad...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV2 · Trazabilidad"
        title="Trazabilidad del café"
        subtitle="Consulta el historial por lote. El código interno se muestra solo como referencia técnica."
      />

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cafe-500 dark:text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por N° de lote, productor o parcela..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-cafe-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-amber-500 placeholder:text-cafe-500 dark:placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">
            Lotes registrados ({filteredLotes.length})
          </h3>
          {filteredLotes.length === 0 && (
            <p className="text-sm text-cafe-600 dark:text-slate-400 text-center py-6">No hay lotes que coincidan con la búsqueda.</p>
          )}
          {filteredLotes.map((lote) => {
            const codigo = lote.codigo_lote || lote.codigo
            const parsed = parseLoteCodigo(codigo)
            return (
              <button
                type="button"
                key={lote.id}
                onClick={() => setSelectedLote(lote)}
                className={`w-full text-left bg-white dark:bg-slate-800 rounded-xl shadow-sm border-2 p-4 transition-all ${
                  selectedLote?.id === lote.id
                    ? 'border-amber-500 ring-2 ring-amber-200 dark:ring-amber-900'
                    : 'border-cafe-100 dark:border-slate-600 hover:border-amber-300'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-bold text-cafe-900 dark:text-slate-100">{tituloLote(codigo)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${estadoBadgeClass(lote.estado)}`}>
                    {getIconoEstado(lote.estado)} {lote.estado}
                  </span>
                </div>
                <p className="text-sm text-cafe-700 dark:text-slate-300">{subtituloLote(lote)}</p>
                <p className="text-[11px] text-cafe-500 dark:text-slate-500 mt-1 font-mono">Código interno: {parsed.codigoInterno}</p>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-2">
          {selectedLote ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6">
              {(() => {
                const codigo = selectedLote.codigo_lote || selectedLote.codigo
                const parsed = parseLoteCodigo(codigo)
                return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-cafe-900 dark:text-slate-100">{tituloLote(codigo)}</h3>
                      <p className="text-cafe-700 dark:text-slate-300 mt-1">{subtituloLote(selectedLote)}</p>
                      <p className="text-xs text-cafe-500 dark:text-slate-500 mt-2 font-mono">Código interno: {parsed.codigoInterno}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
                      <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-cafe-600 dark:text-slate-400">Productor</p>
                        <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.productor}</p>
                      </div>
                      {!isAdmin ? (
                        <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                          <p className="text-xs text-cafe-600 dark:text-slate-400">Registrado por</p>
                          <p className="font-semibold text-cafe-900 dark:text-slate-100">{user?.nombre || user?.email}</p>
                        </div>
                      ) : (
                        <>
                          <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                            <p className="text-xs text-cafe-600 dark:text-slate-400">Cliente propietario</p>
                            <p className="font-semibold text-cafe-900 dark:text-slate-100">
                              {selectedLote.nombre_usuario || selectedLote.cliente || '—'}
                            </p>
                          </div>
                          <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                            <p className="text-xs text-cafe-600 dark:text-slate-400">ID usuario</p>
                            <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.user_id ?? '—'}</p>
                          </div>
                        </>
                      )}
                      <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-cafe-600 dark:text-slate-400">Fecha cosecha</p>
                        <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.fecha_cosecha || '—'}</p>
                      </div>
                      <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-cafe-600 dark:text-slate-400">Estado</p>
                        <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.estado}</p>
                      </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setShowQr((v) => !v)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cafe-200 dark:border-slate-600 text-cafe-800 dark:text-slate-200 hover:bg-cafe-50 dark:hover:bg-slate-700 text-sm font-medium"
                      >
                        <QrCode size={16} />
                        {showQr ? 'Ocultar QR' : 'Ver QR'}
                      </button>
                    </div>
                    {showQr && (
                      <div className="mb-6 p-4 border border-cafe-100 dark:border-slate-600 rounded-xl bg-cafe-50/50 dark:bg-slate-900/50">
                        <LoteQrPanel lote={selectedLote} />
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-cafe-600 dark:text-slate-400">Cantidad</p>
                        <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.cantidad_kg || selectedLote.cantidad} kg</p>
                      </div>
                      <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-cafe-600 dark:text-slate-400">Humedad</p>
                        <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.humedad || 0}%</p>
                      </div>
                      <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-cafe-600 dark:text-slate-400">Temperatura</p>
                        <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.temperatura || 0}°C</p>
                      </div>
                      <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-cafe-600 dark:text-slate-400">Altitud</p>
                        <p className="font-semibold text-cafe-900 dark:text-slate-100">{selectedLote.altitud || 0} msnm</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-cafe-900 dark:text-slate-100 mb-4">Línea de tiempo</h4>
                      <TrazabilidadTimeline
                        etapas={trazabilidad.filter((t) => Number(t.lote_id) === Number(selectedLote.id))}
                        productor={selectedLote.productor}
                        codigoLote={codigo}
                      />
                    </div>
                  </>
                )
              })()}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-cafe-500 dark:text-slate-400">
                <Route className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Selecciona un lote para ver su trazabilidad</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
