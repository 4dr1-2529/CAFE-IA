import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import { ROUTES } from '../constants/routes.js'
import AdminRoute from '../components/auth/AdminRoute.jsx'
import DashboardPage from '../pages/dashboard/DashboardPage.jsx'
import ProductoresPage from '../pages/productores/ProductoresPage.jsx'
import RegistroProduccionPage from '../pages/produccion/RegistroProduccionPage.jsx'
import TrazabilidadPage from '../pages/trazabilidad/TrazabilidadPage.jsx'
import ControlCalidadPage from '../pages/calidad/ControlCalidadPage.jsx'
import ModuloIAPage from '../pages/ia/ModuloIAPage.jsx'
import ChatbotIAPage from '../pages/ia/ChatbotIAPage.jsx'
import BaseDatosPage from '../pages/sistema/BaseDatosPage.jsx'
import ReportesPage from '../pages/reportes/ReportesPage.jsx'
import ResumenPMV3Page from '../pages/reportes/ResumenPMV3Page.jsx'
import AuditoriaPage from '../pages/sistema/AuditoriaPage.jsx'
import EvidenciasPMVPage from '../pages/sistema/EvidenciasPMVPage.jsx'
import ArquitecturaPage from '../pages/sistema/ArquitecturaPage.jsx'
import HistoriasUsuarioPage from '../pages/sistema/HistoriasUsuarioPage.jsx'
import UsuariosPage from '../pages/sistema/UsuariosPage.jsx'

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

function LoginRoute() {
  const { isAuthenticated, login, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cafe-900">
        <div className="animate-spin h-12 w-12 border-b-2 border-amber-500 rounded-full" />
      </div>
    )
  }
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />
  return <LoginPage onLogin={login} />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginRoute />} />
      <Route path="/" element={<ProtectedShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="registro" element={<RegistroProduccionPage />} />
        <Route path="productores" element={<ProductoresPage />} />
        <Route path="trazabilidad" element={<TrazabilidadPage />} />
        <Route path="calidad" element={<ControlCalidadPage />} />
        <Route path="ia" element={<ModuloIAPage />} />
        <Route path="chatbot-ia" element={<ChatbotIAPage />} />
        <Route path="reportes" element={<ReportesPage />} />
        <Route path="resumen-pmv3" element={<ResumenPMV3Page />} />
        <Route path="basedatos" element={<BaseDatosPage />} />
        <Route
          path="auditoria"
          element={
            <AdminRoute>
              <AuditoriaPage />
            </AdminRoute>
          }
        />
        <Route
          path="usuarios"
          element={
            <AdminRoute>
              <UsuariosPage />
            </AdminRoute>
          }
        />
        <Route
          path="evidencias"
          element={
            <AdminRoute>
              <EvidenciasPMVPage />
            </AdminRoute>
          }
        />
        <Route
          path="arquitectura"
          element={
            <AdminRoute>
              <ArquitecturaPage />
            </AdminRoute>
          }
        />
        <Route
          path="historias"
          element={
            <AdminRoute>
              <HistoriasUsuarioPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
