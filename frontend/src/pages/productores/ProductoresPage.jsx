import { useState, useEffect } from 'react'
import { UserPlus, Edit, Trash2, Save, RefreshCw } from 'lucide-react'
import {
  getProductores,
  createProductor,
  updateProductor,
  deleteProductor,
  getUsuariosActivos,
} from '../../services/api/index.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'
import FormField from '../../components/ui/FormField.jsx'
import { TableSkeleton } from '../../components/ui/Skeleton.jsx'
import { validateProductorForm } from '../../utils/validation.js'
import { useToast } from '../../hooks/useToast.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { isAdminUser } from '../../utils/role.js'

const initialForm = {
  user_id: '',
  nombres: '',
  apellidos: '',
  dni: '',
  telefono: '',
  correo: '',
  parcela: '',
  ubicacion: '',
  altitud: '',
  estado: 'Activo',
}

export default function Productores() {
  const { user } = useAuth()
  const isAdmin = isAdminUser(user)
  const [productores, setProductores] = useState([])
  const [clientes, setClientes] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const toast = useToast()

  const loadProductores = async () => {
    try {
      setLoading(true)
      setProductores(await getProductores())
    } catch (err) {
      console.error('Error cargando productores', err)
      toast.error('No se pudo cargar la lista de productores.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProductores()
    if (isAdmin) {
      getUsuariosActivos()
        .then((list) => setClientes(list || []))
        .catch(() => setClientes([]))
    }
  }, [isAdmin])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData(initialForm)
    setEditingId(null)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { valid, errors: vErr } = validateProductorForm(formData)
    const nextErrors = { ...vErr }
    if (isAdmin && !formData.user_id) {
      nextErrors.user_id = 'Seleccione el cliente responsable'
    }
    setErrors(nextErrors)
    if (!valid || nextErrors.user_id) {
      toast.error('Revise los campos marcados.')
      return
    }

    const payload = { ...formData }
    if (!isAdmin) delete payload.user_id

    try {
      if (editingId) {
        await updateProductor(editingId, payload)
        toast.success('Productor actualizado correctamente.')
      } else {
        const created = await createProductor(payload)
        toast.success(`Productor registrado: ${created?.codigo || 'OK'}.`)
      }
      resetForm()
      await loadProductores()
    } catch (err) {
      toast.error(err.message || 'No se pudo guardar el productor.')
    }
  }

  const handleEdit = (productor) => {
    setEditingId(productor.id)
    setFormData({
      user_id: productor.user_id ? String(productor.user_id) : '',
      nombres: productor.nombres || '',
      apellidos: productor.apellidos || '',
      dni: productor.dni || '',
      telefono: productor.telefono || '',
      correo: productor.correo || '',
      parcela: productor.parcela || '',
      ubicacion: productor.ubicacion || '',
      altitud: productor.altitud || '',
      estado: productor.estado || 'Activo',
    })
    setErrors({})
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este productor? Esta acción no puede deshacerse.')) return
    try {
      await deleteProductor(id)
      toast.success('Productor eliminado correctamente.')
      await loadProductores()
    } catch (err) {
      toast.error(err.message || 'No se pudo eliminar el productor.')
    }
  }

  const clienteNombre = (userId) => {
    const c = clientes.find((x) => Number(x.id) === Number(userId))
    return c ? `${c.nombres} ${c.apellidos || ''}`.trim() : '—'
  }

  const inputCls = (field) => `input-field ${errors[field] ? 'input-field-error' : ''}`

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV2 · HU01"
        title="Productores"
        subtitle="Registro y gestión de productores. El código P001, P002… es el identificador de negocio; el ID numérico es solo interno en MySQL."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KpiCard label="Productores activos" value={productores.length} icon={UserPlus} color="green" />
        <KpiCard
          label="Con código visible"
          value={productores.filter((p) => p.codigo).length}
          unit="P00x"
          color="amber"
        />
        <KpiCard
          label="Estado demo PMV2"
          value={productores.length === 5 ? 'OK' : '—'}
          trend={productores.length === 5 ? '5 productores × 5 lotes' : 'Ejecute seed PMV2'}
          color="blue"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="card-panel">
          <h2 className="text-lg font-semibold mb-4">Registrar / Editar productor</h2>

          <form onSubmit={handleSubmit} className="space-y-1">
            {isAdmin && (
              <FormField label="Cliente responsable" name="user_id" error={errors.user_id} required>
                <select
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  className={inputCls('user_id')}
                  required
                >
                  <option value="">Seleccione un cliente activo</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombres} {c.apellidos} — {c.email}
                    </option>
                  ))}
                </select>
              </FormField>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField label="Nombres" name="nombres" error={errors.nombres} required>
                <input name="nombres" value={formData.nombres} onChange={handleChange} className={inputCls('nombres')} />
              </FormField>
              <FormField label="Apellidos" name="apellidos" error={errors.apellidos} required>
                <input name="apellidos" value={formData.apellidos} onChange={handleChange} className={inputCls('apellidos')} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <FormField label="DNI" name="dni" error={errors.dni} required>
                <input name="dni" value={formData.dni} onChange={handleChange} className={inputCls('dni')} />
              </FormField>
              <FormField label="Teléfono" name="telefono">
                <input name="telefono" value={formData.telefono} onChange={handleChange} className="input-field" />
              </FormField>
              <FormField label="Correo" name="correo" error={errors.correo} required>
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} className={inputCls('correo')} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Parcela" name="parcela">
                <input name="parcela" value={formData.parcela} onChange={handleChange} className="input-field" />
              </FormField>
              <FormField label="Ubicación" name="ubicacion">
                <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="input-field" />
              </FormField>
              <FormField label="Altitud (msnm)" name="altitud">
                <input type="number" name="altitud" value={formData.altitud} onChange={handleChange} className="input-field" min="1" />
              </FormField>
            </div>

            <div>
              <label className="label-field">Estado</label>
              <select name="estado" value={formData.estado} onChange={handleChange} className="input-field">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button type="submit" className="btn-primary">
                <Save className="w-4 h-4" />
                {editingId ? 'Actualizar' : 'Registrar'} productor
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                <RefreshCw className="w-4 h-4" />
                Limpiar
              </button>
            </div>
          </form>
        </div>

        <div className="card-panel">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-heading">Lista de productores</h2>
              <p className="text-subtle text-sm">Código P001–P005 (negocio). Si ve ID 9 con 5 filas, son registros borrados antes — use seed PMV2.</p>
            </div>
            <button onClick={loadProductores} className="btn-secondary">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
          </div>

          {loading ? (
            <TableSkeleton rows={4} cols={4} />
          ) : productores.length === 0 ? (
            <div className="text-center py-12 text-muted">No hay productores registrados.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-shell">
                <thead>
                  <tr>
                    <th className="px-4 py-3">Código</th>
                    {isAdmin && <th className="px-4 py-3">Cliente</th>}
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Teléfono</th>
                    <th className="px-4 py-3">Parcela</th>
                    <th className="px-4 py-3">Altitud</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productores.map((prod) => (
                    <tr key={prod.id}>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-amber-700 dark:text-amber-300">{prod.codigo || `P${String(prod.id).padStart(3, '0')}`}</span>
                        <span className="block text-[10px] text-subtle mt-0.5" title="ID interno MySQL">
                          ref. {prod.id}
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-3 text-sm">{clienteNombre(prod.user_id)}</td>
                      )}
                      <td className="px-4 py-3">{prod.nombres} {prod.apellidos}</td>
                      <td className="px-4 py-3">{prod.correo}</td>
                      <td className="px-4 py-3">{prod.telefono}</td>
                      <td className="px-4 py-3">{prod.parcela}</td>
                      <td className="px-4 py-3">{prod.altitud || '-'} msnm</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${prod.estado === 'Activo' ? 'badge-success' : 'badge-neutral'}`}>
                          {prod.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => handleEdit(prod)} className="btn-secondary !py-1.5 !px-3 text-sm">
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button onClick={() => handleDelete(prod.id)} className="btn-danger !py-1.5 !px-3 text-sm">
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
