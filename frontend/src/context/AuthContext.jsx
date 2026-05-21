import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { STORAGE_KEYS } from '../constants/storage.js'
import { loginApi, logoutApi, setToken, clearAuth } from '../services/api/index.js'
import { authenticateWithCredentials } from '../services/auth.service.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSION)
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    if (saved && token) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        clearAuth()
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await authenticateWithCredentials(email, password)
    if (!result) return false
    const { id, email: em, nombres, apellidos, rol, rolNombre } = result
    setUser({ id, email: em, nombres, apellidos, rol, rolNombre })
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ id, email: em, nombres, apellidos, rol, rolNombre }))
    return true
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutApi()
    } catch { /* ignore */ }
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
