import { useState, useEffect } from 'react'
import { UserCog, Save, RefreshCw, KeyRound, UserX, UserCheck } from 'lucide-react'
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  setUsuarioEstado,
  setUsuarioRol,
  resetUsuarioPassword,
} from '../../services/api/index.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'
import FormField from '../../components/ui/FormField.jsx'
import { TableSkeleton } from '../../components/ui/Skeleton.jsx'
import { useToast } from '../../hooks/useToast.js'

const ROLES = [
  { value: 'admin', label: 'ADMIN — acceso global' },
  { value: 'cliente', label: 'CLIENTE — registra productores y gestiona sus propios datos' },
]

const initialForm = {
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  password: '',
  rol: 'cliente',
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [resetId, setResetId] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const load = async () => {
    try {
      setLoading(true)
      setUsuarios(await getUsuarios())
    } catch (err) {
      toast.error(err.message || 'No se pudo cargar usuarios.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData(initialForm)
    setEditingId(null)
    setResetId(null)
    setNewPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateUsuario(editingId, {
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
        })
        if (formData.rol) await setUsuarioRol(editingId, formData.rol)
        toast.success('Usuario actualizado.')
      } else {
        await createUsuario(formData)
        toast.success('Usuario creado.')
      }
      resetForm()
      await load()
    } catch (err) {
      toast.error(err.message || 'Error al guardar usuario.')
    }
  }

  const handleEdit = (u) => {
    setEditingId(u.id)
    setFormData({
      nombres: u.nombres || '',
      apellidos: u.apellidos || '',
      email: u.email || '',
      telefono: u.telefono || '',
      password: '',
      rol: u.rol === 'admin' ? 'admin' : 'cliente',
    })
  }

  const toggleActivo = async (u) => {
    try {
      await setUsuarioEstado(u.id, !u.activo)
      toast.success(u.activo ? 'Usuario desactivado.' : 'Usuario activado.')
      await load()
    } catch (err) {
      toast.error(err.message || 'No se pudo cambiar el estado.')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!resetId || !newPassword || newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    try {
      await resetUsuarioPassword(resetId, newPassword)
      toast.success('Contraseña restablecida.')
      setResetId(null)
      setNewPassword('')
    } catch (err) {
      toast.error(err.message || 'No se pudo restablecer la contraseña.')
    }
  }

  const activos = usuarios.filter((u) => u.activo).length
  const admins = usuarios.filter((u) => u.rol === 'admin').length

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="Sistema · Multiusuario"
        title="Gestión de usuarios"
        subtitle="Solo administradores. Crear cuentas CLIENTE, asignar rol ADMIN y controlar acceso al sistema."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KpiCard label="Total usuarios" value={usuarios.length} icon={UserCog} color="amber" />
        <KpiCard label="Activos" value={activos} color="green" />
        <KpiCard label="Administradores" value={admins} color="blue" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card-panel">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Editar usuario' : 'Nuevo usuario'}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField label="Nombres" name="nombres" required>
                <input name="nombres" value={formData.nombres} onChange={handleChange} className="input-field" required />
              </FormField>
              <FormField label="Apellidos" name="apellidos">
                <input name="apellidos" value={formData.apellidos} onChange={handleChange} className="input-field" />
              </FormField>
            </div>
            <FormField label="Correo" name="email" required>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required />
            </FormField>
            <FormField label="Teléfono" name="telefono">
              <input name="telefono" value={formData.telefono} onChange={handleChange} className="input-field" />
            </FormField>
            {!editingId && (
              <FormField label="Contraseña inicial" name="password" required>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" minLength={6} required />
              </FormField>
            )}
            <FormField label="Rol" name="rol">
              <select name="rol" value={formData.rol} onChange={handleChange} className="input-field">
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </FormField>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn-primary">
                <Save className="w-4 h-4" />
                {editingId ? 'Guardar cambios' : 'Crear usuario'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                <RefreshCw className="w-4 h-4" />
                Limpiar
              </button>
            </div>
          </form>

          {resetId && (
            <form onSubmit={handleResetPassword} className="mt-6 pt-6 border-t border-cafe-200 space-y-3">
              <h3 className="font-semibold text-cafe-900 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-600" />
                Restablecer contraseña
              </h3>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
                placeholder="Nueva contraseña (mín. 6)"
                minLength={6}
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">Confirmar</button>
                <button type="button" onClick={() => { setResetId(null); setNewPassword('') }} className="btn-secondary">Cancelar</button>
              </div>
            </form>
          )}
        </div>

        <div className="card-panel">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Usuarios del sistema</h2>
            <button type="button" onClick={load} className="btn-secondary">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
          </div>
          {loading ? (
            <TableSkeleton rows={5} cols={5} />
          ) : usuarios.length === 0 ? (
            <p className="text-center py-8 text-cafe-500">No hay usuarios registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-shell text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2">Nombre</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Rol</th>
                    <th className="px-3 py-2">Estado</th>
                    <th className="px-3 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td className="px-3 py-2">{u.nombres} {u.apellidos}</td>
                      <td className="px-3 py-2">{u.email}</td>
                      <td className="px-3 py-2">
                        <span className="font-mono text-xs uppercase">{u.rol}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${u.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {u.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          <button type="button" onClick={() => handleEdit(u)} className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800 hover:bg-amber-200">
                            Editar
                          </button>
                          <button type="button" onClick={() => { setResetId(u.id); setEditingId(null) }} className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200">
                            Clave
                          </button>
                          <button type="button" onClick={() => toggleActivo(u)} className="text-xs px-2 py-1 rounded bg-cafe-100 text-cafe-800 hover:bg-cafe-200 inline-flex items-center gap-1">
                            {u.activo ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                            {u.activo ? 'Off' : 'On'}
                          </button>
                        </div>
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
