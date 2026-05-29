import {
  Network, ArrowRight, Database, Cpu, Globe, Shield, Layers,
  Server, Lock, FileOutput, Brain, Cloud, GitBranch,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { PROJECT_STRUCTURE_TREE, STRUCTURE_LEGEND } from '../../constants/projectStructure.js'

const RAILWAY_API = 'https://cafe-sostenible-api-production-03ad.up.railway.app'
const API_REVISION = 'mysql-hexagonal-v2.6.1-usuarios-limit'

const capas = [
  {
    nombre: 'INTERFACES (HTTP)',
    color: 'bg-amber-500',
    icon: Globe,
    descripcion: 'Adaptadores de entrada — Express 4, rutas REST, middleware JWT/RBAC',
    componentes: [
      '12 controllers (*Controller.js)',
      '13 route files (auth, usuarios, dashboard, productores, lotes…)',
      'middleware: auth.js, rbac.js, validate.js',
      'Helmet + express-rate-limit (500 req/15 min)',
    ],
  },
  {
    nombre: 'APPLICATION',
    color: 'bg-blue-500',
    icon: Layers,
    descripcion: 'Casos de uso — 17 servicios que orquestan reglas y persistencia',
    componentes: [
      'AuthService · UsuarioService · ProductorService · LoteService',
      'CalidadService · TrazabilidadService · ProduccionService',
      'PrediccionService · DashboardService · ReportesService',
      'ChatbotService · AuditoriaService · BaseDatosService · ActionLogService',
      'validators/ (DTO por entidad)',
    ],
  },
  {
    nombre: 'DOMAIN',
    color: 'bg-emerald-500',
    icon: Shield,
    descripcion: 'Lógica pura sin dependencias de framework ni base de datos',
    componentes: [
      'PredictionEngine.js — heurística v2.0',
      'RoleHelper.js — admin / cliente + legacy normalize',
      'CodeGenerator.js — códigos P001, LOTE, USR',
      'AppError · apiResponse · reportesSql · trazabilidadSql',
    ],
  },
  {
    nombre: 'INFRASTRUCTURE',
    color: 'bg-violet-500',
    icon: Cpu,
    descripcion: 'Persistencia MySQL, migraciones automáticas y seeds PMV2',
    componentes: [
      '11 repositories (*Repository.js)',
      'pool.js · migrate.js · apply-migrations.js · schemaHelpers.js',
      'seed-pmv2.js · seedMultiusuarioPMV2.js',
      'schema.sql (39 tablas) · seeds.sql · views.sql',
    ],
  },
]

const flujo = [
  { paso: 1, descripcion: 'React 18 + Vite (pages, layouts, contexts)', modulo: 'Frontend Vercel' },
  { paso: 2, descripcion: 'services/api/client.js + JWT Bearer', modulo: 'Cliente REST' },
  { paso: 3, descripcion: 'Route → Controller → Service', modulo: 'Interfaces + Application' },
  { paso: 4, descripcion: 'PredictionEngine / RoleHelper', modulo: 'Domain' },
  { paso: 5, descripcion: 'Repository → mysql2 pool', modulo: 'Infrastructure' },
  { paso: 6, descripcion: 'JSON → Recharts, toasts, tablas', modulo: 'Frontend UI' },
]

const modulosApi = [
  { modulo: 'Auth', rutas: 'POST /login, /logout · GET /me', guard: 'público + JWT' },
  { modulo: 'Usuarios', rutas: 'GET/POST/PUT /usuarios · PATCH /estado · /rol', guard: 'adminGuard' },
  { modulo: 'Dashboard', rutas: 'GET /dashboard · GET /dashboard/metrics', guard: 'readGuard' },
  { modulo: 'Productores', rutas: 'GET, POST, PUT, DELETE /productores', guard: 'read / writeGuard' },
  { modulo: 'Lotes', rutas: 'GET, POST /lotes · GET /next-code · /:id', guard: 'read / writeGuard' },
  { modulo: 'Producción', rutas: 'GET, POST /produccion', guard: 'read / writeGuard' },
  { modulo: 'Trazabilidad', rutas: 'GET, POST /trazabilidad', guard: 'read / writeGuard' },
  { modulo: 'Calidad', rutas: 'GET, POST /control-calidad', guard: 'read / writeGuard' },
  { modulo: 'Predicciones IA', rutas: 'GET /predicciones · POST /ejecutar', guard: 'read / writeGuard' },
  { modulo: 'Reportes', rutas: 'GET /reportes/* · /export/:tipo/:formato', guard: 'readGuard' },
  { modulo: 'Chatbot', rutas: 'POST /chatbot', guard: 'readGuard' },
  { modulo: 'Auditoría', rutas: 'GET, POST /auditoria', guard: 'adminGuard' },
  { modulo: 'Base de datos', rutas: 'GET /base-datos · /:tabla', guard: 'readGuard' },
]

const deployDiagram = `[ Usuario navegador ]
        │
        ▼
┌─────────────────────┐
│  Vercel (Frontend)  │  React 18 + Vite · SPA
│  *.vercel.app       │  VITE_API_URL → Railway
└──────────┬──────────┘
           │ HTTPS + JWT Bearer
           ▼
┌─────────────────────┐
│ Railway (Backend)   │  Node.js · Express 4
│ cafe-sostenible-api │  Puerto 8080 (prod)
│ -production-03ad    │  CORS: *.vercel.app
└──────────┬──────────┘
           │ mysql2 pool + SSL
           ▼
┌─────────────────────┐
│ Railway (MySQL)     │  39 tablas utf8mb4
│ mysql.railway.internal │ migrate.js al arrancar
└─────────────────────┘`

const hexDiagram = `┌──────────────────────────────────────────────────────────┐
│                    INTERFACES (HTTP)                      │
│  routes/*.js → controllers/*.js → middleware auth/rbac   │
└─────────────────────────┬────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────┐
│                    APPLICATION                            │
│  17 services · validators · ActionLogService              │
└─────────────────────────┬────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────┐
│                      DOMAIN                             │
│  PredictionEngine · RoleHelper · CodeGenerator          │
└─────────────────────────▲────────────────────────────────┘
                          │
┌─────────────────────────┴────────────────────────────────┐
│                   INFRASTRUCTURE                        │
│  11 repositories · pool.js · migrate · schema.sql       │
└──────────────────────────────────────────────────────────┘`

export default function ArquitecturaPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="Arquitectura hexagonal · CAFE-IA"
        title="Arquitectura del Sistema"
        subtitle={`Frontend Vercel → API Railway (${API_REVISION}) → MySQL 39 tablas · JWT + roles admin/cliente`}
      />

      <div className="card-panel border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/30">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-sky-600" />
          Despliegue en producción
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            {
              t: 'Frontend — Vercel',
              d: 'Build Vite → dist/ · SPA rewrites',
              p: 'frontend/vercel.json · VITE_API_URL',
              url: 'Deploy *.vercel.app',
            },
            {
              t: 'Backend — Railway',
              d: 'Node Express · auto-deploy desde GitHub',
              p: 'GET /api/health',
              url: RAILWAY_API,
            },
            {
              t: 'MySQL — Railway',
              d: 'Variables MYSQLHOST, MYSQLPORT, MYSQLUSER…',
              p: '39 tablas · migrate.js',
              url: 'mysql.railway.internal',
            },
          ].map((x) => (
            <div key={x.t} className="rounded-lg bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-600">
              <p className="font-semibold text-heading">{x.t}</p>
              <p className="text-xs text-muted mt-1">{x.d}</p>
              <p className="text-xs font-mono text-subtle mt-2">{x.p}</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 break-all">{x.url}</p>
            </div>
          ))}
        </div>
        <pre className="rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs p-4 overflow-x-auto border border-slate-700">
          {deployDiagram}
        </pre>
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-violet-600" />
          Arquitectura hexagonal (implementación real)
        </h2>
        <pre className="rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs p-4 overflow-x-auto border border-slate-700 mb-4">
          {hexDiagram}
        </pre>
        <div className="space-y-4">
          {capas.map((capa, index) => {
            const Icon = capa.icon
            return (
              <div key={index} className="flex items-start gap-4">
                <div className={`${capa.color} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-600">
                  <h3 className="font-bold text-heading">{capa.nombre}</h3>
                  <p className="text-sm text-muted mb-3">{capa.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {capa.componentes.map((comp, i) => (
                      <span key={i} className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-xs text-body">
                        {comp}
                      </span>
                    ))}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-panel">
          <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            JWT y roles (RBAC)
          </h2>
          <ul className="space-y-2 text-sm text-body">
            <li><strong className="text-heading">JWT:</strong> AuthService.login → token en Authorization Bearer (8h default)</li>
            <li><strong className="text-heading">Roles activos:</strong> <code className="text-xs">admin</code> y <code className="text-xs">cliente</code> (RoleHelper.js)</li>
            <li><strong className="text-heading">Legacy → cliente:</strong> supervisor, productor, usuario</li>
            <li><strong className="text-heading">readGuard:</strong> cualquier usuario autenticado</li>
            <li><strong className="text-heading">writeGuard:</strong> admin + cliente (CRUD operativo)</li>
            <li><strong className="text-heading">adminGuard:</strong> solo admin (usuarios, auditoría)</li>
            <li><strong className="text-heading">Scope datos:</strong> CLIENTE filtrado por user_id en lotes, productores, reportes</li>
          </ul>
        </div>
        <div className="card-panel">
          <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            Frontend (React + Vite)
          </h2>
          <ul className="space-y-2 text-sm text-body">
            <li><strong className="text-heading">15 rutas:</strong> login + 14 módulos lazy-loaded (AppRoutes.jsx)</li>
            <li><strong className="text-heading">Contextos:</strong> AuthContext, ThemeContext (dark mode class)</li>
            <li><strong className="text-heading">API client:</strong> frontend/src/services/api/client.js</li>
            <li><strong className="text-heading">Prod URL:</strong> RAILWAY_API en config/api.js</li>
            <li><strong className="text-heading">Dev:</strong> proxy /api → localhost:3029 · puerto 5174</li>
            <li><strong className="text-heading">UI:</strong> Tailwind · Recharts · Lucide · PageHeader/KpiCard</li>
          </ul>
        </div>
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Módulos API REST (montaje real en routes/index.js)
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
        <h2 className="text-heading text-lg mb-2">Estructura de carpetas del monorepo</h2>
        <p className="text-sm text-muted mb-4">
          Fuente: <code className="text-xs bg-slate-200 dark:bg-slate-700 px-1 rounded">frontend/src/constants/projectStructure.js</code>
        </p>
        <div className="rounded-xl bg-slate-900 p-4 overflow-x-auto border border-slate-700 max-h-[28rem] overflow-y-auto">
          <pre className="text-emerald-400 font-mono text-xs whitespace-pre leading-relaxed">{PROJECT_STRUCTURE_TREE}</pre>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STRUCTURE_LEGEND.map((item) => (
            <div key={item.capa} className="flex gap-2 text-xs rounded-lg bg-slate-100 dark:bg-slate-900/60 px-3 py-2 border border-slate-200 dark:border-slate-600">
              <code className="font-mono text-amber-700 dark:text-amber-300 shrink-0">{item.capa}</code>
              <span className="text-body">{item.rol}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'Dominio IA',
            text: 'PredictionEngine v2 en backend/src/domain/. Variables: humedad, temperatura, altitud, secado, variedad, puntaje taza. Salida: calidad, confianza %, riesgo %, factores, alertas.',
            icon: Brain,
          },
          {
            title: 'Reportes y exportación',
            text: 'ReportesService + ReportExportService. PDF (pdfkit) y Excel (exceljs) vía GET /api/reportes/export/:tipo/:formato.',
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
          MySQL — 39 tablas (schema.sql)
        </h3>
        <p className="text-sm text-body">
          Módulos: geografía (regiones, provincias, distritos), seguridad (roles, usuarios, sesiones, auditoria_logs),
          productores, lotes, produccion, trazabilidad, control_calidad, predicciones_ia, alertas_ia, recomendaciones_ia,
          reportes, inventario, configuraciones. Migración automática en server.js → initDatabase() → applyMultiusuarioMigrations().
        </p>
      </div>
    </div>
  )
}
