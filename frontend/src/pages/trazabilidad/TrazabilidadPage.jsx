import { useState, useEffect } from 'react'
import { Route, Package, Search, Eye, QrCode, Calendar, MapPin, User, Thermometer, Droplets, Mountain } from 'lucide-react'
import { getLotes, getTrazabilidad } from '../../services/api/index.js'
import LoteQrPanel from '../../components/features/LoteQrPanel.jsx'
import TrazabilidadTimeline from '../../components/features/TrazabilidadTimeline.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'

const estadoIconMap = {
  'Producción': '🌱',
  'Produccion': '🌱',
  'Secado': '☀️',
  'Control de calidad': '🔬',
  'Calidad': '🔬',
  'Almacenamiento': '📦',
  'Comercialización': '💰',
  'Venta': '💰'
}

const getIconoEstado = (estado) => {
  if (!estado) return '•'
  return estadoIconMap[estado] || estadoIconMap[estado.toLowerCase()] || '•'
}

export default function Trazabilidad() {
  const [lotes, setLotes] = useState([])
  const [trazabilidad, setTrazabilidad] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLote, setSelectedLote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [lotesData, trazData] = await Promise.all([
          getLotes(),
          getTrazabilidad()
        ])
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

  const filteredLotes = lotes
    .filter(lote =>
      (lote.codigo_lote || lote.codigo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lote.productor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lote.parcela || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aNum = Number((a.codigo_lote || '').replace('LOTE-', '')) || 0
      const bNum = Number((b.codigo_lote || '').replace('LOTE-', '')) || 0
      return bNum - aNum
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-cafe-600 dark:text-slate-400">Cargando trazabilidad...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV2 · Trazabilidad"
        title="Trazabilidad del café"
        subtitle="Línea de tiempo por lote, estados visuales, productor asociado y código QR."
      />

      {/* Buscador */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cafe-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por código, productor o parcela..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-cafe-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Lista de lotes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">Lotes Registrados ({filteredLotes.length})</h3>
          {filteredLotes.map(lote => (
            <div
              key={lote.id}
              onClick={() => setSelectedLote(lote)}
              className={`
                bg-white dark:bg-slate-800 rounded-xl shadow-sm border-2 p-4 cursor-pointer transition-all
                ${selectedLote?.id === lote.id ? 'border-amber-500 ring-2 ring-amber-200 dark:ring-amber-900' : 'border-cafe-100 dark:border-slate-600 hover:border-amber-300'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono font-bold text-cafe-900">{lote.codigo_lote || lote.codigo}</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-cafe-100 text-cafe-700">
                  {getIconoEstado(lote.estado)} {lote.estado}
                </span>
              </div>
              <p className="text-sm text-cafe-700">{lote.productor}</p>
              <p className="text-xs text-cafe-500 mt-1">{lote.parcela} • {lote.variedad_cafe || '-'} • {lote.cantidad_kg || lote.cantidad} kg • {lote.fecha_cosecha}</p>
              {lote.calidad_final && (
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    lote.calidad_final === 'Alta' ? 'bg-green-100 text-green-700' :
                    lote.calidad_final === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    ★ {lote.calidad_final} ({lote.puntaje_taza || lote.puntaje || 0} pts)
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detalle */}
        <div className="lg:col-span-2">
          {selectedLote ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-cafe-900 dark:text-slate-100">{selectedLote.codigo_lote || selectedLote.codigo}</h3>
                <p className="text-cafe-600 dark:text-slate-400">{selectedLote.productor} • {selectedLote.parcela}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 text-cafe-800 dark:text-slate-200 font-medium">
                  <QrCode size={18} /> Trazabilidad QR
                </div>
                <LoteQrPanel lote={selectedLote} />
              </div>

              {/* Información del lote */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-cafe-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Cantidad</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.cantidad_kg || selectedLote.cantidad} kg</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Humedad</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.humedad || 0}%</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Temperatura</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.temperatura || 0}°C</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-3">
                  <p className="text-xs text-cafe-500">Altitud</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.altitud || 0} msnm</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-cafe-900 dark:text-slate-100 mb-4">Línea de tiempo</h4>
                <TrazabilidadTimeline
                  etapas={trazabilidad.filter((t) => Number(t.lote_id) === Number(selectedLote.id))}
                  productor={selectedLote.productor}
                  codigoLote={selectedLote.codigo_lote || selectedLote.codigo}
                />
              </div>

              {/* Datos adicionales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cafe-50 rounded-lg p-4">
                  <p className="text-xs text-cafe-500 mb-1">Variedad de Café</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.variedad_cafe || selectedLote.tipo_cafe || '-'}</p>
                </div>
                <div className="bg-cafe-50 rounded-lg p-4">
                  <p className="text-xs text-cafe-500 mb-1">Tipo de Secado</p>
                  <p className="font-semibold text-cafe-900">{selectedLote.tipo_secado || '-'}</p>
                </div>
              </div>

              {(selectedLote.calidad_final || selectedLote.calidad) && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-green-800">Evaluación de Calidad: {selectedLote.calidad_final || selectedLote.calidad}</p>
                  <p className="text-sm text-green-700">Puntaje: {selectedLote.puntaje_taza || selectedLote.puntaje || 0} puntos</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cafe-100 dark:border-slate-700 p-6 flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-cafe-400 dark:text-slate-500">
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