import { useState, useEffect } from 'react'
import { Route, Package, Search, Eye, QrCode, Calendar, MapPin, User, Thermometer, Droplets, Mountain } from 'lucide-react'
import { getLotes, getTrazabilidad } from '../services/api.js'

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
        setLotes(lotesData)
        setTrazabilidad(trazData)
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

  const etapasOrdenadas = ['Producción', 'Secado', 'Control de calidad', 'Almacenamiento', 'Comercialización']

  const getLineaTiempo = (lote) => {
    const loteTraz = trazabilidad.filter(t => t.lote_id === lote.id)
    const map = new Map()
    loteTraz.forEach((t) => {
      const nombre = t.etapa || t.estado
      if (nombre && !map.has(nombre)) {
        map.set(nombre, {
          estado: nombre,
          fecha: t.fecha || null,
          descripcion: t.descripcion || '',
          ubicacion: t.ubicacion || lote.parcela || '',
          completado: Boolean(t.fecha)
        })
      }
    })

    return etapasOrdenadas.map((etapa, index) => {
      const actual = map.get(etapa)
      if (actual) return actual
      return {
        estado: etapa,
        fecha: null,
        descripcion: index === 0 ? 'Lote registrado' : 'Pendiente',
        ubicacion: lote.parcela || '',
        completado: false
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-cafe-600">Cargando trazabilidad...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <Route className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Trazabilidad del Café</h1>
            <p className="text-cafe-600">Seguimiento completo del ciclo de producción</p>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cafe-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por código, productor o parcela..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Lista de lotes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-semibold text-cafe-900 mb-3">Lotes Registrados ({filteredLotes.length})</h3>
          {filteredLotes.map(lote => (
            <div
              key={lote.id}
              onClick={() => setSelectedLote(lote)}
              className={`
                bg-white rounded-xl shadow-sm border-2 p-4 cursor-pointer transition-all
                ${selectedLote?.id === lote.id ? 'border-amber-500 ring-2 ring-amber-200' : 'border-cafe-100 hover:border-amber-300'}
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
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-cafe-900">{selectedLote.codigo_lote || selectedLote.codigo}</h3>
                  <p className="text-cafe-600">{selectedLote.productor} • {selectedLote.parcela}</p>
                </div>
                <button className="flex items-center gap-2 bg-cafe-100 text-cafe-700 px-4 py-2 rounded-lg hover:bg-cafe-200 transition-colors">
                  <QrCode size={18} />
                  <span>Simular QR</span>
                </button>
              </div>

              {/* Información del lote */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-cafe-50 rounded-lg p-3">
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

              {/* Línea de tiempo */}
              <div className="mb-6">
                <h4 className="font-semibold text-cafe-900 mb-4">Línea de Tiempo</h4>
                <div className="flex items-center justify-between relative">
                  {/* Línea de fondo */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-cafe-200 -translate-y-1/2"></div>
                  
                  {getLineaTiempo(selectedLote).map((item) => (
                    <div key={item.estado || Math.random()} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                          item.completado ? 'bg-green-500 text-white' : 'bg-amber-500 text-cafe-900'
                        }`}
                        title={item.completado ? 'Completado' : 'Pendiente'}
                      >
                        {getIconoEstado(item.estado)}
                      </div>
                      <p className="text-xs mt-2 font-medium text-cafe-700">
                        {item.estado}
                      </p>
                      <p className="text-xs text-cafe-400">{item.fecha || 'Pendiente'}</p>
                      <p className={`text-[10px] ${item.completado ? 'text-green-600' : 'text-amber-600'}`}>{item.completado ? 'Completado' : 'Pendiente'}</p>
                      {item.descripcion && (
                        <p className="text-xs text-cafe-500 mt-1 max-w-24 text-center">{item.descripcion}</p>
                      )}
                      {item.ubicacion && (
                        <p className="text-xs text-cafe-400 mt-1">{item.ubicacion}</p>
                      )}
                    </div>
                  ))}
                </div>
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
            <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6 flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-cafe-400">
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