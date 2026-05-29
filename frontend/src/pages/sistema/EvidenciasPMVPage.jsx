import {
  Camera, CheckCircle, Database, Shield, Sparkles, Server, TestTube,
  LogIn, UserCog, Users, Package, Award, LayoutDashboard, FileText, Route,
  Bot, ClipboardList, Brain,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'

const RAILWAY_API = 'https://cafe-sostenible-api-production-03ad.up.railway.app'

const pmv1Evidencias = [
  {
    modulo: 'Login',
    icon: LogIn,
    color: 'from-slate-600 to-slate-800',
    objetivo: 'Autenticar usuarios con JWT y restaurar sesión al recargar la app.',
    descripcion:
      'LoginPage.jsx + AuthContext.jsx consumen POST /api/auth/login. El token se guarda en localStorage y se valida con GET /api/auth/me. Roles normalizados: admin y cliente.',
    estado: 'Implementado',
    resultado:
      'Login operativo en producción Railway. Credenciales seed: admin@cafeai.com / admin123 y cliente1@cafeai.com / mbappe29.',
    evidenciaVisual: 'testing/cypress/e2e/PF-01-login-admin.cy.js · PF-02-login-cliente.cy.js',
    detalles: [
      'Vista: /login · AuthService.js · auth.routes.js',
      'JWT Bearer + refresh en tabla sesiones',
      'Registro público deshabilitado en producción',
    ],
  },
  {
    modulo: 'Usuarios',
    icon: UserCog,
    color: 'from-indigo-600 to-indigo-800',
    objetivo: 'Permitir al ADMIN gestionar cuentas, roles y contraseñas del sistema.',
    descripcion:
      'UsuariosPage.jsx (solo admin) consume /api/usuarios con adminGuard. CRUD, activar/desactivar, cambio de rol y reset de contraseña.',
    estado: 'Implementado',
    resultado:
      'GET /api/usuarios operativo en Railway (rev. v2.6.1). Alcance global ADMIN; CLIENTE no accede al módulo.',
    evidenciaVisual: 'Vista /usuarios · PF-11-roles.cy.js (nav admin vs cliente)',
    detalles: [
      'Endpoints: GET/POST/PUT /usuarios, PATCH /estado, PATCH /rol, POST /reset-password',
      'UsuarioService.js · UsuarioRepository.js · roles admin/cliente',
      'Menú visible solo para rol admin en MainLayout.jsx',
    ],
  },
  {
    modulo: 'Productores',
    icon: Users,
    color: 'from-emerald-600 to-green-700',
    objetivo: 'Registrar productores cafetaleros con código automático y alcance por usuario.',
    descripcion:
      'ProductoresPage.jsx + ProductorService. ADMIN ve todos; CLIENTE solo los suyos (user_id). Códigos P001… generados en ProductorRepository.',
    estado: 'Implementado',
    resultado: 'CRUD completo con validación DTO. Seed PMV2: 5 productores demo en Junín.',
    evidenciaVisual: 'testing/cypress/e2e/PF-05-productores.cy.js',
    detalles: [
      'GET/POST/PUT/DELETE /api/productores',
      'Badge UI: PMV2 · HU01 · ProductoresPage.jsx',
      'Tests: integration.test.js (listar productores)',
    ],
  },
  {
    modulo: 'Producción',
    icon: Package,
    color: 'from-amber-500 to-orange-600',
    objetivo: 'Registrar lotes de café y movimientos de producción vinculados a productor.',
    descripcion:
      'RegistroProduccionPage.jsx registra lotes vía POST /api/lotes y consulta GET /api/produccion. Código de lote automático con CodeGenerator.js.',
    estado: 'Implementado',
    resultado: 'Al crear lote se generan 5 etapas de trazabilidad automática. Seed: hasta 25 lotes demo.',
    evidenciaVisual: 'testing/cypress/e2e/PF-06-registro-produccion.cy.js',
    detalles: [
      'POST /api/lotes · GET /api/lotes/next-code · GET/POST /api/produccion',
      'LoteService.js · ProduccionService.js · FK a catálogos MySQL',
      'writeGuard: admin y cliente pueden registrar',
    ],
  },
  {
    modulo: 'Calidad',
    icon: Award,
    color: 'from-violet-600 to-purple-700',
    objetivo: 'Evaluar calidad sensorial del café con puntaje 0–100 y clasificación.',
    descripcion:
      'ControlCalidadPage.jsx + CalidadService. Registra aroma, acidez, cuerpo, sabor, balance y calcula puntaje final.',
    estado: 'Implementado',
    resultado: 'Evaluaciones persistidas en control_calidad. Visible en Reportes y Base de Datos.',
    evidenciaVisual: 'backend/tests/calidad.service.test.js (computeScores)',
    detalles: [
      'GET/POST /api/control-calidad (alias /api/evaluaciones)',
      'Clasificación Alta/Media/Baja según puntaje',
      'Tablas: control_calidad, criterios_calidad, evaluaciones_detalle',
    ],
  },
  {
    modulo: 'Dashboard',
    icon: LayoutDashboard,
    color: 'from-sky-600 to-blue-700',
    objetivo: 'Mostrar KPIs y gráficos según rol (ADMIN global / CLIENTE personal).',
    descripcion:
      'DashboardPage.jsx consume GET /api/dashboard y GET /api/dashboard/metrics. Recharts con tema claro/oscuro.',
    estado: 'Implementado',
    resultado: 'KPIs: lotes, productores, evaluaciones, predicciones, trazabilidad activa, alertas IA.',
    evidenciaVisual: 'testing/cypress/e2e/PF-03-dashboard-admin.cy.js · PF-04-dashboard-cliente.cy.js',
    detalles: [
      'DashboardService.js · DashboardRepository.js · views.sql',
      'Badge UI: PMV2 · Dashboard analítico',
      'Tests: integration.test.js GET /dashboard/metrics',
    ],
  },
  {
    modulo: 'Reportes',
    icon: FileText,
    color: 'from-rose-600 to-red-700',
    objetivo: 'Generar reportes agregados y exportar PDF/Excel desde datos MySQL.',
    descripcion:
      'ReportesPage.jsx + ReportesService + ReportExportService. Reportes de producción, calidad, predicciones y trazabilidad.',
    estado: 'Implementado',
    resultado: 'Exportación PDF/Excel vía GET /api/reportes/export/:tipo/:formato (pdfkit + exceljs).',
    evidenciaVisual: 'testing/cypress/e2e/PF-09-reportes.cy.js',
    detalles: [
      'GET /api/reportes/produccion · /calidad · /predicciones · /trazabilidad',
      'Alcance por rol: ADMIN global, CLIENTE filtrado por user_id',
      'Tabla historial_reportes en MySQL',
    ],
  },
  {
    modulo: 'Trazabilidad',
    icon: Route,
    color: 'from-teal-600 to-cyan-700',
    objetivo: 'Consultar línea de tiempo por lote con etapas del proceso cafetalero.',
    descripcion:
      'TrazabilidadPage.jsx + TrazabilidadTimeline. Lista lotes, detalle por código y QR simulado (CAFE-{id}).',
    estado: 'Implementado',
    resultado: '5 etapas: Producción, Secado, Control de calidad, Almacenamiento, Comercialización.',
    evidenciaVisual: 'testing/cypress/e2e/PF-07-trazabilidad.cy.js',
    detalles: [
      'GET/POST /api/trazabilidad · GET /api/lotes/:id',
      'TrazabilidadService.js · trazabilidadSql.js con scope por rol',
      'qr_codigo en tabla lotes',
    ],
  },
  {
    modulo: 'Base de Datos',
    icon: Database,
    color: 'from-fuchsia-600 to-pink-700',
    objetivo: 'Visualizar tablas MySQL con alcance ADMIN (global) o CLIENTE (personal).',
    descripcion:
      'BaseDatosPage.jsx + BaseDatosService. Resumen de conteos y consulta por tabla: productores, lotes, produccion, trazabilidad, control_calidad, predicciones_ia, usuarios (admin).',
    estado: 'Implementado',
    resultado: 'GET /api/base-datos y GET /api/base-datos/:tabla con readGuard y filtro por user_id.',
    evidenciaVisual: 'Vista /basedatos · menú admin-only para tabla usuarios',
    detalles: [
      'BaseDatosController.js · ActionLogService registra consultas',
      'ADMIN: 7 tablas · CLIENTE: 6 tablas operativas',
      'Coherencia con Reportes e IA verificada en flujos manuales',
    ],
  },
]

const pmv2Evidencias = [
  {
    modulo: 'Chatbot IA',
    icon: Bot,
    color: 'from-blue-600 to-indigo-700',
    objetivo: 'Asistente conversacional con conocimiento del proyecto y datos reales de MySQL.',
    descripcion:
      'ChatbotIAPage.jsx + ChatbotService.js + ChatbotDataService.js. Intent matching sobre arquitectura, PMV, trazabilidad, reportes y conteos en vivo.',
    estado: 'Implementado',
    resultado: 'POST /api/chatbot responde según rol. ADMIN consulta datos globales; CLIENTE solo los suyos.',
    evidenciaVisual: 'testing/cypress/e2e/PF-10-chatbot.cy.js',
    detalles: [
      'readGuard JWT · ActionLogService en cada consulta',
      'Conocimiento: PMV1/PMV2, stack, flujo hexagonal, SonarQube',
      'Nav: grupo PMV2 / Mejoras en MainLayout.jsx',
    ],
  },
  {
    modulo: 'Auditoría',
    icon: ClipboardList,
    color: 'from-orange-600 to-red-700',
    objetivo: 'Registrar y consultar historial de acciones administrativas del sistema.',
    descripcion:
      'AuditoriaPage.jsx + AuditoriaService. Solo ADMIN. Lista logs de auditoria_logs y permite registrar entradas manuales.',
    estado: 'Implementado',
    resultado: 'GET/POST /api/auditoria con adminGuard. Login, CRUD y consultas quedan en ActionLogService.',
    evidenciaVisual: 'Vista /auditoria · visible solo para admin en sidebar',
    detalles: [
      'AuditoriaRepository.js · tabla auditoria_logs',
      'Complementa ActionLogService (LOGIN, CREAR_CLIENTE, etc.)',
      'Menú: Auditoría / Historial (admin)',
    ],
  },
  {
    modulo: 'Módulo IA',
    icon: Brain,
    color: 'from-violet-700 to-purple-900',
    objetivo: 'Ejecutar predicción de calidad bajo demanda con motor heurístico v2.',
    descripcion:
      'ModuloIAPage.jsx + PrediccionService + domain/PredictionEngine.js. Una predicción por lote; selector solo lotes pendientes.',
    estado: 'Implementado',
    resultado: 'POST /api/predicciones/ejecutar → calidad, confianza %, riesgo %, factores, alertas, recomendaciones.',
    evidenciaVisual: 'testing/cypress/e2e/PF-08-modulo-ia.cy.js · backend/tests/prediction.test.js',
    detalles: [
      'Tablas: predicciones_ia, alertas_ia, recomendaciones_ia, variables_prediccion',
      'Modelo: heurística v2.0 · carpeta ml/ para entrenamiento futuro',
      'Badge UI: PMV2 · Machine Learning',
    ],
  },
]

const infraEvidencias = [
  { k: 'Backend Railway', v: RAILWAY_API, ok: true },
  { k: 'Frontend Vercel', v: 'Build Vite → *.vercel.app (VITE_API_URL → Railway)', ok: true },
  { k: 'MySQL', v: '39 tablas · utf8mb4 · migrate.js al arrancar', ok: true },
  { k: 'Revisión API', v: 'mysql-hexagonal-v2.6.1-usuarios-limit', ok: true },
  { k: 'Tests backend', v: '6 archivos · health, validators, prediction, calidad, integration', ok: true },
  { k: 'Tests E2E', v: '11 specs Cypress PF-01 … PF-11', ok: true },
]

function EvidenciaCard({ ev }) {
  const Icon = ev.icon
  return (
    <article className="card-panel overflow-hidden p-0 flex flex-col">
      <div className={`bg-gradient-to-r ${ev.color} p-4`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{ev.modulo}</h3>
              <span className="text-white/90 text-xs font-medium">{ev.estado}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3 flex-1">
        <div>
          <p className="text-xs font-semibold text-subtle uppercase tracking-wide">Objetivo</p>
          <p className="text-sm text-body mt-1">{ev.objetivo}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-subtle uppercase tracking-wide">Descripción</p>
          <p className="text-sm text-body mt-1">{ev.descripcion}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-subtle uppercase tracking-wide">Resultado</p>
          <p className="text-sm text-body mt-1">{ev.resultado}</p>
        </div>
        {ev.evidenciaVisual && (
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" /> Evidencia visual
            </p>
            <p className="text-xs text-body mt-1 font-mono">{ev.evidenciaVisual}</p>
          </div>
        )}
        <ul className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-slate-600">
          {ev.detalles.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-body">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function EvidenciasPMVPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="Evidencias · CAFE-IA"
        title="Evidencias del Producto Mínimo Viable"
        subtitle="Funcionalidades reales verificadas en código, API Railway, MySQL y pruebas Cypress — separadas PMV1 (operaciones) y PMV2 (mejoras IA)"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="PMV1" value={pmv1Evidencias.length} unit="módulos" icon={Server} color="green" />
        <KpiCard label="PMV2" value={pmv2Evidencias.length} unit="módulos" icon={Sparkles} color="amber" />
        <KpiCard label="Tablas MySQL" value="39" icon={Database} color="purple" />
        <KpiCard label="Cypress E2E" value="11" icon={TestTube} color="blue" />
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Infraestructura desplegada (estado actual)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {infraEvidencias.map((item) => (
            <div key={item.k} className="rounded-xl bg-slate-100 dark:bg-slate-900/60 p-3 border border-slate-200 dark:border-slate-600">
              <p className="text-xs font-semibold text-subtle uppercase">{item.k}</p>
              <p className={`text-sm font-medium mt-1 break-all ${item.ok ? 'text-emerald-700 dark:text-emerald-300' : 'text-heading'}`}>
                {item.v}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-heading text-xl font-bold mb-1">PMV1 — Operaciones core</h2>
        <p className="text-sm text-muted mb-4">
          Login, Usuarios, Productores, Producción, Calidad, Dashboard, Reportes, Trazabilidad, Base de Datos
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {pmv1Evidencias.map((ev) => (
            <EvidenciaCard key={ev.modulo} ev={ev} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-heading text-xl font-bold mb-1">PMV2 — Mejoras inteligentes</h2>
        <p className="text-sm text-muted mb-4">Chatbot IA, Auditoría, Módulo IA</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {pmv2Evidencias.map((ev) => (
            <EvidenciaCard key={ev.modulo} ev={ev} />
          ))}
        </div>
      </section>

      <div className="card-panel border-l-4 border-l-amber-500">
        <p className="text-sm text-body">
          <strong className="text-heading">Capturas para informe académico:</strong> ejecute{' '}
          <code className="text-xs bg-slate-200 dark:bg-slate-700 px-1 rounded">npx cypress run</code> en{' '}
          <code className="text-xs bg-slate-200 dark:bg-slate-700 px-1 rounded">testing/</code> o capture manualmente
          cada vista en modo claro/oscuro. Incluya GET {RAILWAY_API}/api/health y esta página (/evidencias).
        </p>
      </div>
    </div>
  )
}
