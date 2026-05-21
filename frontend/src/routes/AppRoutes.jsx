import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import { ROUTES } from '../constants/routes.js'

const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage.jsx'))
const ProductoresPage = lazy(() => import('../pages/productores/ProductoresPage.jsx'))
const RegistroProduccionPage = lazy(() => import('../pages/produccion/RegistroProduccionPage.jsx'))
const TrazabilidadPage = lazy(() => import('../pages/trazabilidad/TrazabilidadPage.jsx'))
const ControlCalidadPage = lazy(() => import('../pages/calidad/ControlCalidadPage.jsx'))
const ModuloIAPage = lazy(() => import('../pages/ia/ModuloIAPage.jsx'))
const BaseDatosPage = lazy(() => import('../pages/sistema/BaseDatosPage.jsx'))
const ReportesPage = lazy(() => import('../pages/reportes/ReportesPage.jsx'))
const EvidenciasPMVPage = lazy(() => import('../pages/sistema/EvidenciasPMVPage.jsx'))
const ArquitecturaPage = lazy(() => import('../pages/sistema/ArquitecturaPage.jsx'))
const HistoriasUsuarioPage = lazy(() => import('../pages/sistema/HistoriasUsuarioPage.jsx'))

function ProtectedShell() {
  const { isAuthenticated, user, logout, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cafe-50 dark:bg-slate-900">
        <div className="animate-spin h-12 w-12 border-b-2 border-amber-600 rounded-full" />
      </div>
    )
  }
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />
  return <MainLayout user={user} onLogout={logout} />
}

export default function AppRoutes() {
  const { isAuthenticated, login } = useAuth()

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <LoginPage onLogin={login} />}
      />
      <Route path="/" element={<ProtectedShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="registro" element={<RegistroProduccionPage />} />
        <Route path="productores" element={<ProductoresPage />} />
        <Route path="trazabilidad" element={<TrazabilidadPage />} />
        <Route path="calidad" element={<ControlCalidadPage />} />
        <Route path="ia" element={<ModuloIAPage />} />
        <Route path="basedatos" element={<BaseDatosPage />} />
        <Route path="reportes" element={<ReportesPage />} />
        <Route path="evidencias" element={<EvidenciasPMVPage />} />
        <Route path="arquitectura" element={<ArquitecturaPage />} />
        <Route path="historias" element={<HistoriasUsuarioPage />} />
      </Route>
    </Routes>
  )
}
