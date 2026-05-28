import { useState } from 'react'
import { Coffee, Eye, EyeOff } from 'lucide-react'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'

const showDemoCreds = import.meta.env.VITE_SHOW_DEMO_CREDENTIALS === 'true'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const ok = await onLogin(email, password)
      if (!ok) {
        setError('Credenciales inválidas. Verifique su correo y contraseña.')
      }
    } catch {
      setError('No se pudo conectar al servidor. Verifique que MySQL y el backend estén activos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-900 via-cafe-800 to-cafeVerde-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative w-full max-w-md animate-fadeInUp">
        <div className="text-center mb-8 login-hero">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-2xl mb-4 shadow-xl transition-transform hover:scale-105">
            <Coffee className="w-10 h-10 text-cafe-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Café Sostenible AI</h1>
          <p className="text-stone-200 text-lg leading-relaxed">
            Sistema de trazabilidad inteligente y predicción de calidad del café sostenible
          </p>
          <p className="text-stone-300/90 text-sm mt-2">Región Junín - Perú</p>
        </div>

        <div className="login-card bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-slate-600">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-field" htmlFor="login-email">
                Correo electrónico
              </label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="label-field" htmlFor="login-password">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-12"
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors p-1"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded-xl text-sm font-medium"
                role="alert"
              >
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full !py-3">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spinSlow" />
                  Verificando...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>

          {showDemoCreds && (
            <p className="mt-4 text-center text-xs text-muted border-t border-card pt-4">
              Solo desarrollo: use las credenciales configuradas por el administrador del entorno.
            </p>
          )}
        </div>

        <p className="text-center text-stone-400 text-sm mt-8">© 2026 Café Sostenible AI - Proyecto Académico</p>
      </div>
    </div>
  )
}
