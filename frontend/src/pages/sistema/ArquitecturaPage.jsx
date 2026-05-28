import {
  Network, ArrowRight, Database, Cpu, Globe, Shield, Layers,
  Server, Lock, FileOutput, Brain,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { PROJECT_STRUCTURE_TREE, STRUCTURE_LEGEND } from '../../constants/projectStructure.js'

const capas = [
  {
    nombre: 'INTERFACES (HTTP)',
    color: 'bg-amber-500',
    icon: Globe,
    descripcion: 'Adaptadores de entrada — Express, rutas, middleware',
    componentes: [
      'routes/*.routes.js',
      'controllers/*Controller.js',
      'middleware: auth, rbac, validateBody',
      'Helmet + rate-limit',
    ],
  },
  {
    nombre: 'APPLICATION',
    color: 'bg-blue-500',
    icon: Layers,
    descripcion: 'Casos de uso — orquestación y reglas de aplicación',
    componentes: [
      'ProductorService · LoteService · CalidadService',
      'TrazabilidadService · PrediccionService',
      'DashboardService · ReportesService · ProduccionService',
      'validators/ (DTO entrada)',
    ],
  },
  {
    nombre: 'DOMAIN',
    color: 'bg-emerald-500',
    icon: Shield,
    descripcion: 'Lógica de negocio pura — sin dependencias de framework',
    componentes: [
      'PredictionEngine v2.0-heuristic',
      'Cálculo puntaje sensorial (calidad)',
      'Reglas de riesgo, alertas y recomendaciones IA',
    ],
  },
  {
    nombre: 'INFRASTRUCTURE',
    color: 'bg-violet-500',
    icon: Cpu,
    descripcion: 'Adaptadores de salida — persistencia y configuración',
    componentes: [
      'repositories/*Repository.js',
      'database/pool.js · migrate · seed-pmv2',
      'MySQL 39 tablas · views.sql',
    ],
  },
]

const flujo = [
  { paso: 1, descripcion: 'Usuario en React (pages + layouts)', modulo: 'Frontend' },
  { paso: 2, descripcion: 'api/index.js + JWT Bearer', modulo: 'Cliente REST' },
  { paso: 3, descripcion: 'Route → Controller → Service', modulo: 'Interfaces + App' },
  { paso: 4, descripcion: 'PredictionEngine / reglas dominio', modulo: 'Domain' },
  { paso: 5, descripcion: 'Repository → MySQL pool', modulo: 'Infrastructure' },
  { paso: 6, descripcion: 'JSON → UI (toast, gráficos)', modulo: 'Frontend' },
]

const modulosApi = [
  { modulo: 'Auth', rutas: 'POST /login, /register, GET /me', guard: 'público + JWT' },
  { modulo: 'Productores', rutas: 'GET, POST, PUT, DELETE /productores', guard: 'read / write' },
  { modulo: 'Lotes', rutas: 'GET, POST /lotes, GET /:id', guard: 'read / write' },
  { modulo: 'Calidad', rutas: 'GET, POST /control-calidad', guard: 'read / write' },
  { modulo: 'Trazabilidad', rutas: 'GET, POST /trazabilidad', guard: 'read / write' },
  { modulo: 'Predicciones IA', rutas: 'GET /predicciones, POST /ejecutar', guard: 'read / write' },
  { modulo: 'Dashboard', rutas: 'GET /dashboard/metrics', guard: 'read' },
  { modulo: 'Reportes', rutas: 'GET /reportes/*, export PDF/Excel', guard: 'lectura' },
  { modulo: 'Producción', rutas: 'GET, POST /produccion', guard: 'read / write' },
]

export default function ArquitecturaPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="Arquitectura hexagonal"
        title="Arquitectura del Sistema"
        subtitle="React/Vite → API REST (JWT + RBAC) → Capas hexagonales → MySQL 39 tablas — Puerto API 3029"
      />

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-6">Capas del backend (hexagonal)</h2>
        <div className="space-y-4">
          {capas.map((capa, index) => {
            const Icon = capa.icon
            return (
              <div key={index} className="relative">
                {index < capas.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600 -translate-x-1/2 z-0" />
                )}
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`${capa.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-600">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-heading">{capa.nombre}</h3>
                      <span className={`${capa.color} text-white text-xs px-2 py-1 rounded-full`}>
                        Capa {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-3">{capa.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                      {capa.componentes.map((comp, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-xs text-body"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card-panel overflow-x-auto">
        <h2 className="text-heading text-lg mb-6">Flujo de datos (request → response)</h2>
        <div className="flex items-start min-w-[720px] pb-2">
          {flujo.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center min-w-[110px]">
                <div className="w-11 h-11 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                  {item.paso}
                </div>
                <p className="text-xs font-semibold text-heading mt-2 text-center">{item.modulo}</p>
                <p className="text-xs text-subtle text-center mt-1 px-1">{item.descripcion}</p>
              </div>
              {index < flujo.length - 1 && (
                <ArrowRight className="w-5 h-5 text-slate-400 mx-1 flex-shrink-0 mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Módulos API REST
        </h2>
        <div className="overflow-x-auto">
          <table className="table-shell">
            <thead>
              <tr>
                <th>Módulo</th>
                <th>Rutas principales</th>
                <th>Seguridad</th>
              </tr>
            </thead>
            <tbody>
              {modulosApi.map((m) => (
                <tr key={m.modulo}>
                  <td className="font-medium">{m.modulo}</td>
                  <td className="font-mono text-xs">{m.rutas}</td>
                  <td>{m.guard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-2">Estructura de carpetas (PMV2)</h2>
        <p className="text-sm text-muted mb-4">
          Árbol completo del monorepo. Fuente: <code className="text-xs bg-slate-200 dark:bg-slate-700 px-1 rounded">frontend/src/constants/projectStructure.js</code>
          {' '}· Documentación: <code className="text-xs bg-slate-200 dark:bg-slate-700 px-1 rounded">docs/ESTRUCTURA_PROYECTO.md</code>
        </p>
        <div className="rounded-xl bg-slate-900 p-4 overflow-x-auto border border-slate-700 max-h-[32rem] overflow-y-auto">
          <pre className="text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre leading-relaxed">
            {PROJECT_STRUCTURE_TREE}
          </pre>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STRUCTURE_LEGEND.map((item) => (
            <div
              key={item.capa}
              className="flex gap-2 text-xs rounded-lg bg-slate-100 dark:bg-slate-900/60 px-3 py-2 border border-slate-200 dark:border-slate-600"
            >
              <code className="font-mono text-amber-700 dark:text-amber-300 shrink-0">{item.capa}</code>
              <span className="text-body">{item.rol}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'Frontend (presentación)',
            text: 'SPA React con rutas lazy, contexto de autenticación y tema. Componentes reutilizables y cliente API centralizado en services/api/.',
            icon: Globe,
          },
          {
            title: 'Seguridad (RBAC)',
            text: 'readGuard exige JWT válido. writeGuard exige rol admin o supervisor para crear/editar lotes, calidad, IA y producción.',
            icon: Lock,
          },
          {
            title: 'Dominio IA',
            text: 'PredictionEngine v2: humedad, temperatura, altitud, secado, variedad, puntaje taza. Salida: calidad, confianza %, riesgo %, factores, alertas.',
            icon: Brain,
          },
          {
            title: 'Reportes',
            text: 'ReportesService agrega datos MySQL; exportación PDF/Excel vía GET /reportes/export/:tipo/:formato.',
            icon: FileOutput,
          },
        ].map((block) => {
          const Icon = block.icon
          return (
            <div key={block.title} className="card-panel">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-semibold text-heading">{block.title}</h3>
              </div>
              <p className="text-sm text-body">{block.text}</p>
            </div>
          )
        })}
      </div>

      <div className="card-panel border border-emerald-200 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40">
        <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-3 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Stack de despliegue
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: 'Frontend', d: 'Vite build → Vercel / estático', p: 'VITE_API_URL' },
            { t: 'Backend', d: 'Node Express → Render / Railway', p: 'Puerto 3029' },
            { t: 'MySQL', d: 'cafe_sostenible utf8mb4', p: '39 tablas + vistas SQL' },
          ].map((x) => (
            <div key={x.t} className="rounded-lg bg-white dark:bg-slate-800 p-4 border border-emerald-100 dark:border-slate-600">
              <p className="font-medium text-heading">{x.t}</p>
              <p className="text-xs text-muted mt-1">{x.d}</p>
              <p className="text-xs font-mono text-subtle mt-2">{x.p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          Motor de predicción IA (PMV2)
        </h2>
        <div className="rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 p-4 text-sm text-body space-y-2">
          <p><span className="font-semibold text-heading">Endpoint único:</span> POST /api/predicciones/ejecutar (antes duplicado en /prediccion-ia — eliminado).</p>
          <p><span className="font-semibold text-heading">Modelo:</span> heurística v2.0 en dominio; carpeta ml/ preparada para Scikit-learn.</p>
          <p><span className="font-semibold text-heading">Variables:</span> humedad, temperatura, altitud, proceso secado, variedad, puntaje taza, almacenamiento.</p>
          <p><span className="font-semibold text-heading">Persistencia:</span> predicciones_ia, alertas_ia, recomendaciones_ia, variables_prediccion.</p>
          <p><span className="font-semibold text-heading">Tests:</span> backend/tests/prediction.test.js</p>
        </div>
      </div>
    </div>
  )
}
