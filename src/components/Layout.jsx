import { useState } from 'react'
import { NavLink, useLocation, Outlet } from 'react-router-dom'
import { 
  Coffee, 
  LayoutDashboard, 
  Package, 
  Route, 
  Award, 
  Brain, 
  Database, 
  FileText, 
  Camera,
  Network,
  BookOpen,
  LogOut,
  Menu,
  X,
  Users
} from 'lucide-react'

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/productores', icon: Users, label: 'Productores' },
  { path: '/registro', icon: Package, label: 'Registro Producción' },
  { path: '/trazabilidad', icon: Route, label: 'Trazabilidad' },
  { path: '/calidad', icon: Award, label: 'Control Calidad' },
  { path: '/ia', icon: Brain, label: 'Módulo IA' },
  { path: '/basedatos', icon: Database, label: 'Base Datos' },
  { path: '/reportes', icon: FileText, label: 'Reportes' },
  { path: '/evidencias', icon: Camera, label: 'Evidencias PMV' },
  { path: '/arquitectura', icon: Network, label: 'Arquitectura' },
  { path: '/historias', icon: BookOpen, label: 'Historias Usuario' }
]

export default function Layout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-cafe-50 flex">
      {/* Sidebar móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-cafe-900 to-cafe-800 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <Coffee className="w-6 h-6 text-cafe-900" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Café Sostenible AI</h1>
                <p className="text-cafe-200 text-xs">Sistema de trazabilidad inteligente</p>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-amber-500 text-cafe-900 font-medium' 
                          : 'text-cafe-100 hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="text-sm">{item.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Usuario y logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-cafeVerde-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.nombre?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user?.nombre || 'Usuario'}</p>
                <p className="text-cafe-300 text-xs truncate">{user?.email || 'usuario@cafeai.com'}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header móvil */}
        <header className="lg:hidden bg-white shadow-sm border-b border-cafe-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-amber-600" />
            <span className="font-bold text-cafe-900">Café Sostenible AI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-cafe-600 hover:bg-cafe-50 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
