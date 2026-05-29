import {
  Network, Database, Shield, Layers, Server, Lock, Brain, Cloud,
  Globe, GitBranch, Cpu, ArrowDown, ArrowRight, Users, Github,
  TestTube, Zap, Box, Route, Code2, Container,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { RAILWAY_API_URL, VERCEL_FRONTEND_URL } from '../../config/api.js'

const RAILWAY_API = RAILWAY_API_URL
const API_REVISION = 'mysql-hexagonal-v2.6.1-usuarios-limit'
const GITHUB_REPO = 'https://github.com/4dr1-2529/CAFE-IA'

/* ─── Datos reales detectados en el repositorio ─── */
const METRICS = [
  { label: 'Tablas MySQL', value: '39', icon: Database, color: 'from-violet-600 to-purple-700' },
  { label: 'Servicios Application', value: '17', icon: Layers, color: 'from-blue-600 to-indigo-700' },
  { label: 'Repositories', value: '11', icon: Box, color: 'from-emerald-600 to-teal-700' },
  { label: 'Controllers HTTP', value: '12', icon: Server, color: 'from-amber-500 to-orange-600' },
  { label: 'Módulos API', value: '13', icon: Route, color: 'from-rose-600 to-red-700' },
  { label: 'Arquitectura', value: 'Hexagonal', icon: Network, color: 'from-slate-600 to-slate-800' },
  { label: 'Autenticación', value: 'JWT + RBAC', icon: Lock, color: 'from-indigo-600 to-indigo-900' },
  { label: 'Cloud', value: 'Railway + Vercel', icon: Cloud, color: 'from-sky-600 to-cyan-700' },
]

const STACK_FLOW = [
  {
    id: 'usuario',
    title: 'USUARIO',
    subtitle: 'Navegador web · Admin / Cliente',
    icon: Users,
    gradient: 'from-slate-700 via-slate-800 to-slate-900',
    glow: 'shadow-slate-500/20',
    items: ['Rol admin o cliente', 'JWT en localStorage', 'Modo claro / oscuro'],
  },
  {
    id: 'vercel',
    title: 'VERCEL · FRONTEND',
    subtitle: 'Deploy SPA React desde GitHub',
    icon: Cloud,
    gradient: 'from-black via-slate-900 to-slate-800',
    glow: 'shadow-black/30',
    items: ['vercel.json · build Vite', 'VITE_API_URL → Railway', VERCEL_FRONTEND_URL],
  },
  {
    id: 'react',
    title: 'REACT 18 + VITE',
    subtitle: 'Capa de presentación',
    icon: Globe,
    gradient: 'from-cyan-600 via-sky-600 to-blue-700',
    glow: 'shadow-cyan-500/25',
    items: [
      'React Router 6 · lazy routes (15 vistas)',
      'Context API: AuthContext, ThemeContext, ToastContext',
      'Tailwind CSS · Recharts · Lucide',
      'services/api/client.js → JWT Bearer',
    ],
  },
  {
    id: 'express',
    title: 'API EXPRESS · RAILWAY',
    subtitle: 'Node.js · REST · Puerto 8080 prod',
    icon: Server,
    gradient: 'from-violet-700 via-purple-700 to-fuchsia-800',
    glow: 'shadow-violet-500/25',
    items: [
      RAILWAY_API,
      `Revisión: ${API_REVISION}`,
      'Helmet · rate-limit 500/15min · CORS *.vercel.app',
    ],
  },
  {
    id: 'hexagonal',
    title: 'ARQUITECTURA HEXAGONAL',
    subtitle: 'Domain · Application · Infrastructure · Interfaces',
    icon: Network,
    gradient: 'from-amber-600 via-orange-600 to-amber-700',
    glow: 'shadow-amber-500/30',
    items: [
      '12 Controllers · 13 route files',
      '17 Application Services · validators/',
      '11 Repositories · pool.js · migrate.js',
      'domain/PredictionEngine.js v2.0-heuristic',
    ],
  },
  {
    id: 'mysql',
    title: 'MYSQL · RAILWAY',
    subtitle: 'Persistencia relacional utf8mb4',
    icon: Database,
    gradient: 'from-emerald-700 via-green-700 to-teal-800',
    glow: 'shadow-emerald-500/25',
    items: [
      '39 tablas · schema.sql · seeds.sql · views.sql',
      'mysql.railway.internal · SSL',
      'migrate.js · apply-migrations.js · seed-pmv2.js',
    ],
  },
]

const HEX_LAYERS = [
  {
    id: 'domain',
    name: 'DOMAIN',
    tagline: 'Lógica de negocio pura — sin Express ni MySQL',
    icon: Shield,
    border: 'border-emerald-500',
    header: 'bg-gradient-to-r from-emerald-600 to-teal-700',
    items: [
      { name: 'PredictionEngine.js', desc: 'Motor heurístico v2.0-heuristic' },
      { name: 'RoleHelper.js', desc: 'Roles admin / cliente + legacy' },
      { name: 'CodeGenerator.js', desc: 'Códigos P001, LOTE, USR' },
      { name: 'AppError · apiResponse', desc: 'Errores y respuestas tipadas' },
    ],
  },
  {
    id: 'application',
    name: 'APPLICATION',
    tagline: '17 servicios — casos de uso y orquestación',
    icon: Layers,
    border: 'border-blue-500',
    header: 'bg-gradient-to-r from-blue-600 to-indigo-700',
    items: [
      { name: 'ProductorService', desc: 'CRUD productores · scope user_id' },
      { name: 'LoteService', desc: 'Registro lotes · trazabilidad auto' },
      { name: 'CalidadService', desc: 'Evaluación sensorial 0–100' },
      { name: 'DashboardService', desc: 'KPIs y métricas por rol' },
      { name: 'ProduccionService', desc: 'Movimientos de producción' },
      { name: 'ReportesService', desc: 'Agregados + ReportExportService' },
      { name: 'PrediccionService', desc: 'Orquesta PredictionService → Engine' },
      { name: '+ AuthService · UsuarioService · TrazabilidadService · ChatbotService · AuditoriaService · BaseDatosService · ActionLogService', desc: '' },
    ],
  },
  {
    id: 'infrastructure',
    name: 'INFRASTRUCTURE',
    tagline: '11 repositories · persistencia MySQL',
    icon: Cpu,
    border: 'border-violet-500',
    header: 'bg-gradient-to-r from-violet-600 to-purple-700',
    items: [
      { name: 'Repositories (11)', desc: 'Productor · Lote · Calidad · Trazabilidad · Prediccion · Dashboard · Reportes · Produccion · Usuario · Auditoria · Catalog' },
      { name: 'Pool MySQL', desc: 'pool.js · mysql2 · SSL Railway' },
      { name: 'Migrations', desc: 'migrate.js · apply-migrations.js · schemaHelpers.js' },
      { name: 'Seeds', desc: 'seed-pmv2.js · seedMultiusuarioPMV2.js · seeds.sql' },
    ],
  },
  {
    id: 'interfaces',
    name: 'INTERFACES (HTTP)',
    tagline: 'Adaptadores REST — Express 4',
    icon: Globe,
    border: 'border-amber-500',
    header: 'bg-gradient-to-r from-amber-500 to-orange-600',
    items: [
      { name: 'Controllers (12)', desc: 'Auth vía routes · Productor · Lote · Calidad · Trazabilidad · Prediccion · Dashboard · Reportes · Produccion · Usuario · Chatbot · Auditoria · BaseDatos' },
      { name: 'Routes (13 + index)', desc: 'auth · usuarios · dashboard · productores · lotes · produccion · trazabilidad · calidad · predicciones · reportes · chatbot · auditoria · base-datos' },
      { name: 'Middleware', desc: 'auth.js · rbac.js · validate.js · asyncHandler' },
      { name: 'JWT + RBAC', desc: 'readGuard · writeGuard · adminGuard' },
    ],
  },
]

const REQUEST_FLOW = [
  { step: '01', label: 'Usuario', detail: 'Interacción UI', icon: Users },
  { step: '02', label: 'Frontend React', detail: 'pages/ + layouts/', icon: Globe },
  { step: '03', label: 'React Router', detail: 'AppRoutes.jsx lazy', icon: Route },
  { step: '04', label: 'API Client', detail: 'services/api/client.js', icon: Code2 },
  { step: '05', label: 'API REST', detail: 'HTTPS + JWT Bearer', icon: Zap },
  { step: '06', label: 'Controllers', detail: 'interfaces/http/controllers/', icon: Server },
  { step: '07', label: 'App Services', detail: 'application/services/', icon: Layers },
  { step: '08', label: 'Repositories', detail: 'infrastructure/repositories/', icon: Box },
  { step: '09', label: 'MySQL Railway', detail: '39 tablas utf8mb4', icon: Database },
]

const CATEGORY_CARDS = [
  {
    title: 'Frontend',
    icon: Globe,
    gradient: 'from-cyan-600 to-blue-700',
    points: [
      'React 18 + Vite 5 + Tailwind CSS',
      'Context API: Auth, Theme, Toast',
      'React Router 6 — 15 rutas lazy',
      'Recharts · Lucide · PageHeader/KpiCard',
      'frontend/src/services/api/',
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    gradient: 'from-violet-600 to-purple-800',
    points: [
      'Node.js + Express 4',
      'Arquitectura hexagonal (4 capas)',
      '12 controllers · 13 routes',
      '17 application services',
      'server.js → initDatabase()',
    ],
  },
  {
    title: 'Base de Datos',
    icon: Database,
    gradient: 'from-emerald-600 to-teal-800',
    points: [
      'MySQL 8 · Railway',
      '39 tablas — schema.sql',
      'seeds.sql · views.sql',
      'Migración automática al arrancar',
      'Multiusuario: user_id scope',
    ],
  },
  {
    title: 'IA',
    icon: Brain,
    gradient: 'from-fuchsia-600 to-pink-800',
    points: [
      'PredictionEngine.js (producción)',
      'PrediccionService → PredictionService',
      'POST /api/predicciones/ejecutar',
      'ml/train_model.py — Scikit-learn',
      'RandomForestClassifier · joblib',
    ],
  },
  {
    title: 'Seguridad',
    icon: Shield,
    gradient: 'from-indigo-600 to-indigo-900',
    points: [
      'JWT — AuthService · jsonwebtoken',
      'RBAC — admin / cliente',
      'Helmet · express-rate-limit',
      'CORS — *.vercel.app + origins',
      'bcrypt · sesiones refresh',
    ],
  },
  {
    title: 'Cloud',
    icon: Cloud,
    gradient: 'from-sky-600 to-slate-800',
    points: [
      'GitHub — 4dr1-2529/CAFE-IA',
      'Railway — API + MySQL',
      'Vercel — frontend SPA',
      VERCEL_FRONTEND_URL,
      'CI — .github/workflows/ci.yml',
      'Auto-deploy push main',
    ],
  },
  {
    title: 'Testing',
    icon: TestTube,
    gradient: 'from-rose-600 to-red-800',
    points: [
      'Backend: 6 test files (Node test)',
      'health · validators · prediction',
      'calidad · integration · api.errors',
      'Cypress E2E: 11 specs PF-01…PF-11',
      'testing/cypress/e2e/',
    ],
  },
]

function FlowConnector({ vertical = true }) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center py-2 animate-pulse">
        <div className="w-1 h-10 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
        <ArrowDown className="w-8 h-8 text-amber-500 -mt-1" strokeWidth={2.5} />
      </div>
    )
  }
  return (
    <div className="hidden lg:flex items-center px-2 animate-pulse">
      <div className="h-1 w-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
      <ArrowRight className="w-7 h-7 text-amber-500 -ml-1" strokeWidth={2.5} />
    </div>
  )
}

function StackNode({ node, index }) {
  const Icon = node.icon
  return (
    <div
      className={`w-full max-w-4xl mx-auto transition-all duration-500 hover:scale-[1.02] ${node.glow} shadow-2xl`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`rounded-2xl bg-gradient-to-br ${node.gradient} p-1`}>
        <div className="rounded-xl bg-slate-950/20 backdrop-blur-sm px-8 py-8 md:px-12 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/15 flex items-center justify-center ring-2 ring-white/25">
              <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{node.title}</h3>
              <p className="text-lg md:text-xl text-white/85 font-medium mt-1">{node.subtitle}</p>
              <ul className="mt-4 space-y-2">
                {node.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base md:text-lg text-white/90">
                    <span className="mt-2 w-2 h-2 rounded-full bg-amber-300 flex-shrink-0" />
                    <span className="break-all">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HexLayerPanel({ layer }) {
  const Icon = layer.icon
  return (
    <div
      className={`rounded-2xl border-2 ${layer.border} bg-card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[320px] flex flex-col`}
    >
      <div className={`${layer.header} px-6 py-5 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide">{layer.name}</h3>
          <p className="text-base md:text-lg text-white/90 mt-0.5">{layer.tagline}</p>
        </div>
      </div>
      <div className="p-6 flex-1 space-y-4">
        {layer.items.map((item) => (
          <div
            key={item.name}
            className="rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-600 px-5 py-4"
          >
            <p className="text-lg md:text-xl font-bold text-heading">{item.name}</p>
            {item.desc && <p className="text-base text-body mt-1">{item.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function DeployPipeline({ title, steps, gradient }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-1 shadow-xl`}>
      <div className="rounded-xl bg-slate-950/30 backdrop-blur px-6 py-8 md:px-10 md:py-10">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-8 text-center">{title}</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.label} className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex flex-col items-center text-center min-w-[140px]">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-3 ring-2 ring-white/20">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg font-bold text-white">{step.label}</p>
                  <p className="text-sm text-white/80 mt-1 max-w-[180px]">{step.detail}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowDown className="w-8 h-8 text-amber-300 md:hidden" />
                )}
                {i < steps.length - 1 && (
                  <ArrowRight className="w-10 h-10 text-amber-300 hidden md:block flex-shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ArquitecturaPage() {
  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      <PageHeader
        badge="Sustentación universitaria"
        title="Arquitectura del Sistema CAFE-IA"
        subtitle="Diagrama empresarial basado en la estructura real del monorepo — React/Vite · Express hexagonal · MySQL Railway · GitHub CI/CD"
      />

      {/* Métricas */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black text-heading mb-6 text-center">
          Métricas del sistema (código real)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {METRICS.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.label}
                className={`rounded-2xl bg-gradient-to-br ${m.color} p-1 shadow-lg transition-transform duration-300 hover:scale-105`}
              >
                <div className="rounded-xl bg-slate-950/25 px-5 py-6 text-center">
                  <Icon className="w-10 h-10 text-white mx-auto mb-3 opacity-90" />
                  <p className="text-3xl md:text-4xl font-black text-white">{m.value}</p>
                  <p className="text-sm md:text-base font-semibold text-white/85 mt-2">{m.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stack principal vertical */}
      <section className="card-panel !p-6 md:!p-10 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/80 dark:to-slate-950/50">
        <h2 className="text-2xl md:text-4xl font-black text-heading mb-2 text-center">
          Stack de despliegue completo
        </h2>
        <p className="text-lg text-muted text-center mb-10 max-w-3xl mx-auto">
          Flujo vertical desde el usuario hasta la persistencia en Railway
        </p>
        <div className="flex flex-col items-center">
          {STACK_FLOW.map((node, i) => (
            <div key={node.id} className="w-full flex flex-col items-center">
              <StackNode node={node} index={i} />
              {i < STACK_FLOW.length - 1 && <FlowConnector vertical />}
            </div>
          ))}
        </div>
      </section>

      {/* Arquitectura hexagonal GRANDE */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-heading flex items-center justify-center gap-3">
            <Network className="w-10 h-10 text-amber-600" />
            Arquitectura Hexagonal
          </h2>
          <p className="text-lg md:text-xl text-muted mt-3 max-w-4xl mx-auto">
            Cuatro capas implementadas en <code className="text-amber-700 dark:text-amber-300 font-mono">backend/src/</code>
            — separación Domain · Application · Infrastructure · Interfaces
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          {HEX_LAYERS.map((layer) => (
            <HexLayerPanel key={layer.id} layer={layer} />
          ))}
        </div>
      </section>

      {/* Flujo request completo horizontal */}
      <section className="card-panel overflow-hidden !p-0">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-5 md:px-10">
          <h2 className="text-2xl md:text-3xl font-black text-white">Flujo completo de una petición</h2>
          <p className="text-lg text-white/90 mt-1">Request → Response · trazabilidad end-to-end</p>
        </div>
        <div className="p-6 md:p-10 overflow-x-auto">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 min-w-[900px] lg:min-w-0">
            {REQUEST_FLOW.map((node, i) => {
              const Icon = node.icon
              return (
                <div key={node.step} className="flex flex-col lg:flex-row lg:items-center flex-1 min-w-[120px]">
                  <div className="flex-1 rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/30 p-5 transition-all duration-300 hover:shadow-lg hover:border-amber-400">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-black text-amber-700 dark:text-amber-300">{node.step}</p>
                    <p className="text-lg md:text-xl font-bold text-heading mt-1">{node.label}</p>
                    <p className="text-sm md:text-base text-body mt-2 font-mono">{node.detail}</p>
                  </div>
                  {i < REQUEST_FLOW.length - 1 && <FlowConnector vertical={false} />}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tarjetas por categoría */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black text-heading mb-8 text-center">
          Componentes del ecosistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CATEGORY_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className={`rounded-2xl bg-gradient-to-br ${card.gradient} p-1 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
              >
                <div className="rounded-xl bg-slate-950/25 backdrop-blur h-full px-6 py-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white">{card.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {card.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-base md:text-lg text-white/90">
                        <span className="mt-2.5 w-2 h-2 rounded-full bg-amber-300 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pipelines despliegue */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <DeployPipeline
          title="Pipeline Backend + MySQL"
          gradient="from-violet-700 to-purple-900"
          steps={[
            { label: 'GitHub', detail: 'Push main → CAFE-IA', icon: Github },
            { label: 'Railway', detail: 'Build Node · auto-deploy', icon: Container },
            { label: 'Backend + MySQL', detail: RAILWAY_API, icon: Server },
          ]}
        />
        <DeployPipeline
          title="Pipeline Frontend"
          gradient="from-slate-800 to-black"
          steps={[
            { label: 'GitHub', detail: 'Push main → CAFE-IA', icon: Github },
            { label: 'Vercel', detail: 'npm run build · dist/', icon: Cloud },
            { label: 'Frontend SPA', detail: VERCEL_FRONTEND_URL.replace('https://', ''), icon: Globe },
          ]}
        />
      </section>

      {/* Resumen técnico detectado */}
      <section className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-black text-emerald-900 dark:text-emerald-100 mb-6 flex items-center gap-3">
          <GitBranch className="w-9 h-9" />
          Resumen — arquitectura detectada en el repositorio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base md:text-lg">
          <div className="space-y-3">
            <p className="font-bold text-heading text-xl">Arquitectura detectada</p>
            <ul className="space-y-2 text-body">
              <li>• Hexagonal (Ports & Adapters) en backend/src/</li>
              <li>• SPA React desacoplada vía REST + JWT</li>
              <li>• Monorepo: frontend · backend · ml · docs · testing</li>
              <li>• Repositorio: {GITHUB_REPO}</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-heading text-xl">Capas encontradas</p>
            <ul className="space-y-2 text-body">
              <li>• <strong>Domain:</strong> PredictionEngine, RoleHelper, CodeGenerator</li>
              <li>• <strong>Application:</strong> 17 services + validators/</li>
              <li>• <strong>Infrastructure:</strong> 11 repositories + database/</li>
              <li>• <strong>Interfaces:</strong> 12 controllers + 13 routes + middleware</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-heading text-xl">Servicios Application (17)</p>
            <p className="text-body text-sm md:text-base font-mono leading-relaxed">
              AuthService · UsuarioService · ProductorService · LoteService · CalidadService ·
              TrazabilidadService · ProduccionService · PrediccionService · PredictionService ·
              DashboardService · ReportesService · ReportExportService · ChatbotService ·
              ChatbotDataService · AuditoriaService · BaseDatosService · ActionLogService
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-heading text-xl">Repositories (11)</p>
            <p className="text-body text-sm md:text-base font-mono leading-relaxed">
              Productor · Lote · Calidad · Trazabilidad · Prediccion · Dashboard · Reportes ·
              Produccion · Usuario · Auditoria · Catalog
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-emerald-200 dark:border-emerald-800">
          <p className="font-bold text-heading text-xl mb-3">Mejoras visuales realizadas</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-body text-base md:text-lg">
            <li>✓ Diagrama vertical empresarial a pantalla completa</li>
            <li>✓ Capas hexagonales en paneles grandes (min 320px)</li>
            <li>✓ Flujo horizontal de 9 pasos con conectores animados</li>
            <li>✓ 8 métricas KPI con iconos y gradientes</li>
            <li>✓ 7 tarjetas de ecosistema (Frontend → Testing)</li>
            <li>✓ Pipelines GitHub → Railway / Vercel</li>
            <li>✓ Tipografía grande (text-2xl–4xl) para exposición</li>
            <li>✓ Modo claro/oscuro · hover · animaciones suaves</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
