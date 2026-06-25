import { useState } from 'react'
import { NavLink, useLocation, Outlet } from 'react-router-dom'
import {
  Coffee, LayoutDashboard, Package, Route, Award, Brain, Database, FileText,
  Camera, Network, BookOpen, LogOut, Menu, Moon, Sun, Users, Sparkles, Bot, ClipboardList, UserCog, Layers,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { isAdminUser } from '../utils/role.js'

function displayName(user) {
  if (!user) return 'Usuario'
  if (user.nombres) return `${user.nombres} ${user.apellidos || ''}`.trim()
  return user.nombre || user.email || 'Usuario'
}

function buildNavGroups(isAdmin) {
  const gestion = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/productores', icon: Users, label: 'Productores' },
    { path: '/usuarios', icon: UserCog, label: 'Usuarios', adminOnly: true },
  ]

  const operaciones = [
    { path: '/registro', icon: Package, label: 'Registro Producción' },
    { path: '/trazabilidad', icon: Route, label: 'Trazabilidad' },
    { path: '/calidad', icon: Award, label: 'Control Calidad' },
    { path: '/basedatos', icon: Database, label: 'Base de Datos', adminOnly: true },
  ]

  const inteligencia = [
    { path: '/ia', icon: Brain, label: 'Módulo IA' },
    { path: '/chatbot-ia', icon: Bot, label: 'Chatbot IA' },
    { path: '/reportes', icon: FileText, label: 'Reportes' },
    { path: '/resumen-pmv3', icon: Layers, label: 'Resumen PMV3', highlight: true },
    { path: '/auditoria', icon: ClipboardList, label: 'Auditoría / Historial', adminOnly: true },
  ]

  const evidencias = [
    { path: '/evidencias', icon: Camera, label: 'Evidencias PMV', adminOnly: true },
  ]

  const sistema = [
    { path: '/arquitectura', icon: Network, label: 'Arquitectura', adminOnly: true },
    { path: '/historias', icon: BookOpen, label: 'Historias Usuario', adminOnly: true },
  ]

  const filterItems = (items) =>
    items.filter((item) => !item.adminOnly || isAdmin)

  const groups = [
    { label: 'Gestión', items: filterItems(gestion) },
    { label: 'Operaciones', items: filterItems(operaciones) },
    { label: 'Inteligencia', items: filterItems(inteligencia) },
  ]

  if (isAdmin) {
    groups.push({ label: 'Evidencias', items: evidencias })
    groups.push({ label: 'Sistema', items: filterItems(sistema) })
  }

  return groups
}

function isNavActive(pathname, itemPath) {
  if (itemPath === '/resumen-pmv3') return pathname === '/resumen-pmv3'
  if (itemPath === '/') return pathname === '/'
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
}

export default function Layout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { dark, toggle } = useTheme()
  const name = displayName(user)
  const initial = name.charAt(0).toUpperCase()
  const isAdmin = isAdminUser(user)
  const groups = buildNavGroups(isAdmin)

  return (
    <div className="min-h-screen bg-page flex transition-colors duration-300">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col
        bg-gradient-to-b from-cafe-900 via-cafe-800 to-cafe-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        border-r border-white/5 shadow-xl
        transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105">
              <Coffee className="w-6 h-6 text-cafe-900" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Café Sostenible AI</h1>
              <p className="text-amber-300 text-xs font-bold flex items-center gap-1 mt-0.5 tracking-wide">
                <Sparkles className="w-3 h-3" /> PMV3 · Integrado
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {groups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-cafe-300/90">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = isNavActive(location.pathname, item.path)
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                          ${
                            isActive
                              ? 'bg-amber-500 text-cafe-900 font-semibold shadow-md scale-[1.02]'
                              : item.highlight
                                ? 'text-amber-200 hover:bg-amber-500/20 hover:text-amber-100 border border-amber-500/30'
                                : 'text-cafe-100/90 hover:bg-white/10 hover:text-white hover:translate-x-0.5'
                          }`}
                      >
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        <span>{item.label}</span>
                        {item.highlight && !isActive && (
                          <span className="ml-auto text-[9px] font-bold uppercase bg-amber-500/30 px-1.5 py-0.5 rounded">PMV3</span>
                        )}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            type="button"
            onClick={toggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 text-cafe-100 hover:bg-white/15 text-sm transition-all duration-200"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cafeVerde-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{name}</p>
              <p className="text-cafe-300 text-xs truncate">{user?.email || ''}</p>
              <p className="text-amber-300/90 text-[10px] uppercase font-semibold tracking-wide">
                {isAdmin ? 'ADMIN' : 'CLIENTE'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/15 text-red-200 hover:bg-red-500/25 text-sm transition-colors duration-200"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="sticky top-0 z-30 bg-card/85 backdrop-blur-md border-b border-card px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:block">
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">PMV3 · Integrado</p>
              <p className="text-sm font-semibold text-primary">Gestión · Trazabilidad · Calidad · IA</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold badge-success">
              MySQL activo
            </span>
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
