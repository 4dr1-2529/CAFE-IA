import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { STORAGE_KEYS } from '../constants/storage.js'
import { loginApi, logoutApi, getMeApi, clearAuth, setUnauthorizedHandler } from '../services/api/index.js'

const AuthContext = createContext(null)

function sessionUserFromMe(me, saved = {}) {
  const nombre = me?.nombre || `${me?.nombres || saved.nombres || ''} ${me?.apellidos || saved.apellidos || ''}`.trim()
  return {
    id: me?.sub ?? me?.id ?? saved.id,
    email: me?.email ?? saved.email,
    nombres: me?.nombres ?? saved.nombres,
    apellidos: me?.apellidos ?? saved.apellidos,
    rol: me?.rol ?? saved.rol,
    rolNombre: me?.rolNombre ?? saved.rolNombre ?? (me?.rol === 'admin' ? 'Administrador' : 'Cliente'),
    nombre: nombre || saved.nombre || me?.email,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null))
    return () => setUnauthorizedHandler(null)
  }, [])

  useEffect(() => {
    const boot = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
      if (!token) {
        setLoading(false)
        return
      }
      let saved = {}
      try {
        saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION) || '{}')
      } catch {
        clearAuth()
        setLoading(false)
        return
      }
      try {
        const me = await getMeApi()
        const merged = sessionUserFromMe(me, saved)
        setUser(merged)
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(merged))
      } catch {
        clearAuth()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    boot()
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const data = await loginApi(email, password)
      const u = data.user
      if (!u) return { ok: false, message: 'Respuesta de login incompleta.' }
      const merged = sessionUserFromMe(u, u)
      setUser(merged)
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(merged))
      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        message: err?.message || 'Credenciales inválidas. Verifique correo y contraseña.',
      }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutApi()
    } catch {
      /* ignore */
    }
    setUser(null)
    clearAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
