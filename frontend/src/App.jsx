import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import RegistroProduccion from './components/RegistroProduccion'
import Trazabilidad from './components/Trazabilidad'
import ControlCalidad from './components/ControlCalidad'
import ModuloIA from './components/ModuloIA'
import BaseDatos from './components/BaseDatos'
import Reportes from './components/Reportes'
import EvidenciasPMV from './components/EvidenciasPMV'
import Arquitectura from './components/Arquitectura'
import HistoriasUsuario from './components/HistoriasUsuario'
import Productores from './components/Productores'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('cafe_trace_session')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
        setIsAuthenticated(true)
      } catch (e) {
        localStorage.removeItem('cafe_trace_session')
      }
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('cafe_trace_session', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('cafe_trace_session')
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Layout user={user} onLogout={handleLogout}>
                  <ErrorBoundary>
                    <Outlet />
                  </ErrorBoundary>
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            } 
          >
            <Route index element={<Dashboard />} />
            <Route path="registro" element={<RegistroProduccion />} />
            <Route path="productores" element={<Productores />} />
            <Route path="trazabilidad" element={<Trazabilidad />} />
            <Route path="calidad" element={<ControlCalidad />} />
            <Route path="ia" element={<ModuloIA />} />
            <Route path="basedatos" element={<BaseDatos />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="evidencias" element={<EvidenciasPMV />} />
            <Route path="arquitectura" element={<Arquitectura />} />
            <Route path="historias" element={<HistoriasUsuario />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
