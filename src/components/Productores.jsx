import { useState, useEffect } from 'react'
import { UserPlus, Edit, Trash2, Save, RefreshCw } from 'lucide-react'
import { getProductores, createProductor, updateProductor, deleteProductor } from '../services/api.js'

const initialForm = {
  nombres: '',
  apellidos: '',
  dni: '',
  telefono: '',
  correo: '',
  parcela: '',
  ubicacion: '',
  altitud: '',
  estado: 'Activo'
}

export default function Productores() {
  const [productores, setProductores] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

  const loadProductores = async () => {
    try {
      setLoading(true)
      setProductores(await getProductores())
    } catch (err) {
      console.error('Error cargando productores', err)
      setMessage({ type: 'error', text: 'No se pudo cargar la lista de productores.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProductores()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData(initialForm)
    setEditingId(null)
    setMessage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!formData.nombres || !formData.apellidos || !formData.dni || !formData.correo) {
      setMessage({ type: 'error', text: 'Complete los campos obligatorios.' })
      return
    }

    try {
      if (editingId) {
        await updateProductor(editingId, formData)
        setMessage({ type: 'success', text: 'Productor actualizado correctamente.' })
      } else {
        await createProductor(formData)
        setMessage({ type: 'success', text: 'Productor registrado correctamente.' })
      }
      resetForm()
      await loadProductores()
    } catch (err) {
      console.error('Error guardando productor', err)
      setMessage({ type: 'error', text: err.message || 'No se pudo guardar el productor.' })
    }
  }

  const handleEdit = (productor) => {
    setEditingId(productor.id)
    setFormData({
      nombres: productor.nombres || '',
      apellidos: productor.apellidos || '',
      dni: productor.dni || '',
      telefono: productor.telefono || '',
      correo: productor.correo || '',
      parcela: productor.parcela || '',
      ubicacion: productor.ubicacion || '',
      altitud: productor.altitud || '',
      estado: productor.estado || 'Activo'
    })
    setMessage(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este productor? Esta acción no puede deshacerse.')) return
    try {
      await deleteProductor(id)
      setMessage({ type: 'success', text: 'Productor eliminado correctamente.' })
      await loadProductores()
    } catch (err) {
      console.error('Error eliminando productor', err)
      setMessage({ type: 'error', text: err.message || 'No se pudo eliminar el productor.' })
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cafeVerde-100 rounded-full flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-cafe-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Productores</h1>
            <p className="text-cafe-600">Gestión de productores con CRUD y almacenamiento en SQLite</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h2 className="text-lg font-semibold text-cafe-900 mb-4">Registrar / Editar productor</h2>
          {message && (
            <div className={`mb-4 rounded-lg px-4 py-3 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-cafe-700">Nombres *</label>
                <input name="nombres" value={formData.nombres} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" required />
              </div>
              <div>
                <label className="text-sm font-medium text-cafe-700">Apellidos *</label>
                <input name="apellidos" value={formData.apellidos} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-cafe-700">DNI *</label>
                <input name="dni" value={formData.dni} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" required />
              </div>
              <div>
                <label className="text-sm font-medium text-cafe-700">Teléfono</label>
                <input name="telefono" value={formData.telefono} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-cafe-700">Correo *</label>
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-cafe-700">Parcela</label>
                <input name="parcela" value={formData.parcela} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-cafe-700">Ubicación</label>
                <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-cafe-700">Altitud (msnm)</label>
                <input type="number" name="altitud" value={formData.altitud} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg" min="1" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-cafe-700">Estado</label>
              <select name="estado" value={formData.estado} onChange={handleChange} className="w-full mt-2 px-4 py-3 border border-cafe-200 rounded-lg">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button type="submit" className="inline-flex items-center gap-2 bg-cafeVerde-600 text-white px-5 py-3 rounded-xl hover:bg-cafeVerde-700 transition">
                <Save className="w-4 h-4" />
                {editingId ? 'Actualizar' : 'Registrar'} productor
              </button>
              <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 bg-cafe-50 text-cafe-700 px-5 py-3 rounded-xl hover:bg-cafe-100 transition">
                <RefreshCw className="w-4 h-4" />
                Limpiar formulario
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-cafe-900">Lista de Productores</h2>
              <p className="text-cafe-500 text-sm">Selecciona un productor para editar o eliminar.</p>
            </div>
            <button onClick={loadProductores} className="inline-flex items-center gap-2 bg-cafe-50 text-cafe-700 px-4 py-2 rounded-lg hover:bg-cafe-100 transition">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-cafe-500">Cargando productores...</div>
          ) : productores.length === 0 ? (
            <div className="text-center py-12 text-cafe-500">No hay productores registrados.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-cafe-700">
                <thead className="bg-cafe-50 text-cafe-900">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Teléfono</th>
                    <th className="px-4 py-3">Parcela</th>
                    <th className="px-4 py-3">Altitud</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cafe-100">
                  {productores.map((prod) => (
                    <tr key={prod.id} className="hover:bg-cafe-50">
                      <td className="px-4 py-3 font-mono text-cafe-900">{prod.id}</td>
                      <td className="px-4 py-3 text-cafe-700">{prod.nombres} {prod.apellidos}</td>
                      <td className="px-4 py-3 text-cafe-700">{prod.correo}</td>
                      <td className="px-4 py-3 text-cafe-700">{prod.telefono}</td>
                      <td className="px-4 py-3">{prod.parcela}</td>
                      <td className="px-4 py-3">{prod.altitud || '-'} msnm</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${prod.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {prod.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => handleEdit(prod)} className="inline-flex items-center gap-2 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition">
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button onClick={() => handleDelete(prod.id)} className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
