import { useState } from 'react'
import { Coffee, Eye, EyeOff } from 'lucide-react'
import { authenticateUser } from '../application/useCases.js'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@cafeai.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simular delay de red
    setTimeout(() => {
      const user = authenticateUser(email, password)
      if (user) {
        onLogin(user)
      } else {
        setError('Credenciales inválidas. Use: admin@cafeai.com / admin123')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-900 via-cafe-800 to-cafeVerde-900 flex items-center justify-center p-4">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full mb-4 shadow-lg">
            <Coffee className="w-10 h-10 text-cafe-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Café Sostenible AI</h1>
          <p className="text-cafe-200 text-lg">Sistema de trazabilidad inteligente y predicción de calidad del café sostenible</p>
          <p className="text-cafe-300 text-sm mt-2">Región Junín - Perú</p>
        </div>

        {/* Tarjeta de login */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-cafe-900 mb-6 text-center">Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cafe-700 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-cafe-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cafe-400 hover:text-cafe-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-cafe-900 font-semibold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cafe-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Credenciales de demo */}
          <div className="mt-6 pt-6 border-t border-cafe-200">
            <p className="text-xs text-cafe-500 text-center mb-2">Credenciales de demostración</p>
            <div className="bg-cafe-50 rounded-lg p-3 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-cafe-600">Usuario:</span>
                <span className="font-mono text-cafe-800">admin@cafeai.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cafe-600">Contraseña:</span>
                <span className="font-mono text-cafe-800">admin123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-cafe-300 text-sm mt-8">
          © 2026 Café Sostenible AI - Proyecto Académico
        </p>
      </div>
    </div>
  )
}