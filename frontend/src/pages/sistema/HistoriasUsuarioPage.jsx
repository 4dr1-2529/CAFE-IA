import { BookOpen, CheckCircle, Package, Link, Eye, LayoutDashboard, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'

/** Historias derivadas de funcionalidades implementadas en código (mayo 2026) */
const historias = [
  {
    id: 'HU01',
    titulo: 'Iniciar sesión con JWT',
    actor: 'Usuario (admin o cliente)',
    descripcion: 'Como usuario registrado, quiero iniciar sesión con email y contraseña para acceder a la plataforma con mi rol.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 1 — Auth',
    modulo: 'Login',
    endpoint: 'POST /api/auth/login · GET /api/auth/me',
    vista: '/login',
    criterios: [
      'LoginPage.jsx valida credenciales y guarda JWT en localStorage',
      'AuthContext restaura sesión al recargar con /auth/me',
      'Credenciales seed: admin@cafeai.com / cliente1@cafeai.com',
      'Tests: PF-01-login-admin · PF-02-login-cliente · integration.test.js',
    ],
  },
  {
    id: 'HU02',
    titulo: 'Gestionar usuarios del sistema',
    actor: 'Administrador',
    descripcion: 'Como administrador, quiero crear, editar, activar/desactivar y resetear contraseñas de usuarios con rol admin o cliente.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 2 — Multiusuario',
    modulo: 'Usuarios',
    endpoint: 'GET/POST/PUT /api/usuarios · PATCH /estado · /rol · POST /reset-password',
    vista: '/usuarios',
    criterios: [
      'UsuariosPage.jsx visible solo para admin (AdminRoute + MainLayout)',
      'adminGuard en usuarios.routes.js',
      'Roles: admin y cliente (RoleHelper.js)',
      'No desactivar último admin · no quitarse rol admin a sí mismo',
    ],
  },
  {
    id: 'HU03',
    titulo: 'Registrar y gestionar productores',
    actor: 'Administrador / Cliente',
    descripcion: 'Como usuario autenticado, quiero registrar productores con código automático para asociar lotes a su origen.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 1 — CRUD core',
    modulo: 'Productores',
    endpoint: 'GET/POST/PUT/DELETE /api/productores',
    vista: '/productores',
    criterios: [
      'Código P001… generado en ProductorRepository.nextCodigoForUser',
      'ADMIN ve todos; CLIENTE solo productores con su user_id',
      'Validación DTO en productor.validator.js',
      'Test E2E: PF-05-productores.cy.js',
    ],
  },
  {
    id: 'HU04',
    titulo: 'Registrar producción y lotes',
    actor: 'Administrador / Cliente',
    descripcion: 'Como usuario operativo, quiero registrar lotes de café con catálogos (variedad, secado, estado) vinculados a un productor.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 2 — Lotes',
    modulo: 'Registro Producción',
    endpoint: 'POST /api/lotes · GET /api/lotes/next-code · GET/POST /api/produccion',
    vista: '/registro',
    criterios: [
      'CodeGenerator asigna código legible por usuario',
      'Trazabilidad inicial: 5 etapas automáticas al crear lote',
      'POST /lotes sin token → 401 (integration.test.js)',
      'Test E2E: PF-06-registro-produccion.cy.js',
    ],
  },
  {
    id: 'HU05',
    titulo: 'Consultar trazabilidad de lotes',
    actor: 'Administrador / Cliente',
    descripcion: 'Como usuario autenticado, quiero ver la línea de tiempo y el detalle de cada lote para auditar el proceso cafetalero.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 2 — Trazabilidad',
    modulo: 'Trazabilidad',
    endpoint: 'GET /api/trazabilidad · GET /api/lotes/:id',
    vista: '/trazabilidad',
    criterios: [
      'TrazabilidadTimeline por etapas ordenadas',
      'QR simulado qr_codigo = CAFE-{id}',
      'Scope por rol en trazabilidadSql.js',
      'Test E2E: PF-07-trazabilidad.cy.js',
    ],
  },
  {
    id: 'HU06',
    titulo: 'Evaluar calidad del café',
    actor: 'Administrador / Cliente',
    descripcion: 'Como evaluador, quiero registrar cata sensorial y obtener puntaje 0–100 con clasificación automática.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 3 — Calidad',
    modulo: 'Control Calidad',
    endpoint: 'GET/POST /api/control-calidad',
    vista: '/calidad',
    criterios: [
      'Parámetros sensoriales 1–10 → puntaje 0–100',
      'Clasificación Alta / Media / Baja',
      'Test unitario: calidad.service.test.js (computeScores)',
      'Datos visibles en Reportes y Base de Datos',
    ],
  },
  {
    id: 'HU07',
    titulo: 'Dashboard analítico por rol',
    actor: 'Administrador / Cliente',
    descripcion: 'Como gerente o cliente, quiero un panel con KPIs y gráficos filtrados según mi rol para monitorear la operación.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 3 — Dashboard',
    modulo: 'Dashboard',
    endpoint: 'GET /api/dashboard · GET /api/dashboard/metrics',
    vista: '/',
    criterios: [
      'KPIs: lotes, productores, evaluaciones, predicciones, trazabilidad activa',
      'Gráficos Recharts con chartTheme.js (claro/oscuro)',
      'ADMIN: vista global · CLIENTE: scope user_id',
      'Tests: PF-03-dashboard-admin · PF-04-dashboard-cliente · integration.test.js',
    ],
  },
  {
    id: 'HU08',
    titulo: 'Generar reportes y exportaciones',
    actor: 'Administrador / Cliente',
    descripcion: 'Como usuario autenticado, quiero reportes de producción, calidad, trazabilidad e IA con export PDF/Excel.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV1',
    sprint: 'Sprint 4 — Reportes',
    modulo: 'Reportes',
    endpoint: 'GET /api/reportes/* · /export/:tipo/:formato',
    vista: '/reportes',
    criterios: [
      'ReportesService agrega datos MySQL por rol',
      'Export PDF (pdfkit) y Excel (exceljs)',
      'Tipos: produccion, calidad, predicciones, trazabilidad',
      'Test E2E: PF-09-reportes.cy.js',
    ],
  },
  {
    id: 'HU09',
    titulo: 'Consultar base de datos del sistema',
    actor: 'Administrador / Cliente',
    descripcion: 'Como usuario autenticado, quiero visualizar tablas MySQL con alcance global (admin) o personal (cliente).',
    estado: 'Implementado',
    prioridad: 'Media',
    pmv: 'PMV1',
    sprint: 'Sprint 4 — Transparencia datos',
    modulo: 'Base de Datos',
    endpoint: 'GET /api/base-datos · GET /api/base-datos/:tabla',
    vista: '/basedatos',
    criterios: [
      'BaseDatosPage.jsx muestra resumen y filas por tabla',
      'ADMIN: 7 tablas incl. usuarios · CLIENTE: 6 tablas operativas',
      'ActionLogService registra cada consulta',
      'Coherencia con Reportes e IA verificada en flujos manuales',
    ],
  },
  {
    id: 'HU10',
    titulo: 'Predecir calidad con IA bajo demanda',
    actor: 'Administrador / Cliente',
    descripcion: 'Como analista, quiero ejecutar predicción IA solo cuando lo decida, con factores, alertas y recomendaciones.',
    estado: 'Implementado',
    prioridad: 'Alta',
    pmv: 'PMV2',
    sprint: 'Sprint 5 — IA predictiva',
    modulo: 'Módulo IA',
    endpoint: 'POST /api/predicciones/ejecutar · GET /api/predicciones',
    vista: '/ia',
    criterios: [
      'PredictionEngine v2.0-heuristic en domain/',
      'Una predicción por lote; selector solo lotes pendientes',
      'Salida: calidad, confianza %, riesgo %, factores, alertas',
      'Tests: prediction.test.js · PF-08-modulo-ia.cy.js',
    ],
  },
  {
    id: 'HU11',
    titulo: 'Consultar asistente Chatbot IA',
    actor: 'Administrador / Cliente',
    descripcion: 'Como usuario, quiero un chatbot que responda sobre el proyecto, arquitectura y datos reales de mi operación.',
    estado: 'Implementado',
    prioridad: 'Media',
    pmv: 'PMV2',
    sprint: 'Sprint 5 — Chatbot',
    modulo: 'Chatbot IA',
    endpoint: 'POST /api/chatbot',
    vista: '/chatbot-ia',
    criterios: [
      'ChatbotService.js con intents: PMV, arquitectura, trazabilidad, conteos',
      'ChatbotDataService consulta MySQL según rol',
      'Nav en grupo PMV2 / Mejoras (MainLayout.jsx)',
      'Test E2E: PF-10-chatbot.cy.js',
    ],
  },
  {
    id: 'HU12',
    titulo: 'Auditar acciones del sistema',
    actor: 'Administrador',
    descripcion: 'Como administrador, quiero consultar y registrar el historial de auditoría de acciones críticas del sistema.',
    estado: 'Implementado',
    prioridad: 'Media',
    pmv: 'PMV2',
    sprint: 'Sprint 6 — Auditoría',
    modulo: 'Auditoría',
    endpoint: 'GET/POST /api/auditoria',
    vista: '/auditoria',
    criterios: [
      'AuditoriaPage.jsx solo visible para admin',
      'adminGuard en auditoria.routes.js',
      'Tabla auditoria_logs + ActionLogService (LOGIN, CRUD usuarios…)',
      'RBAC verificado en PF-11-roles.cy.js',
    ],
  },
]

function badgeEstado(estado) {
  const map = {
    Implementado: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700',
    'En Desarrollo': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700',
    Pendiente: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600',
  }
  return map[estado] || map.Pendiente
}

function pmvBadge(pmv) {
  return pmv === 'PMV2'
    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
}

function prioridadClass(p) {
  const map = {
    Alta: 'text-red-700 dark:text-red-300',
    Media: 'text-amber-700 dark:text-amber-300',
    Baja: 'text-emerald-700 dark:text-emerald-300',
  }
  return map[p] || 'text-subtle'
}

export default function HistoriasUsuarioPage() {
  const implementadas = historias.filter((h) => h.estado === 'Implementado').length
  const pmv1 = historias.filter((h) => h.pmv === 'PMV1')
  const pmv2 = historias.filter((h) => h.pmv === 'PMV2')

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="Historias · CAFE-IA"
        title="Historias de Usuario"
        subtitle="12 historias implementadas — trazabilidad vista ↔ endpoint ↔ actor ↔ PMV1/PMV2"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Total HU" value={historias.length} icon={BookOpen} color="blue" />
        <KpiCard label="Implementadas" value={implementadas} icon={CheckCircle} color="green" />
        <KpiCard label="PMV1" value={pmv1.length} icon={Package} color="emerald" />
        <KpiCard label="PMV2" value={pmv2.length} icon={Eye} color="amber" />
      </div>

      <div className="space-y-4">
        {historias.map((historia) => (
          <article key={historia.id} className="card-panel overflow-hidden p-0">
            <div className="bg-slate-100 dark:bg-slate-900/60 px-4 py-3 border-b border-slate-200 dark:border-slate-600">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm font-bold text-amber-700 dark:text-amber-300">{historia.id}</span>
                  <h3 className="font-semibold text-heading">{historia.titulo}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${pmvBadge(historia.pmv)}`}>{historia.pmv}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-subtle">{historia.sprint}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeEstado(historia.estado)}`}>
                    {historia.estado}
                  </span>
                  <span className={`text-xs font-semibold ${prioridadClass(historia.prioridad)}`}>{historia.prioridad}</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-3 text-sm">
                <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="text-subtle">Actor:</span>
                <span className="font-medium text-heading">{historia.actor}</span>
              </div>

              <p className="text-sm text-body mb-4 italic">&ldquo;{historia.descripcion}&rdquo;</p>

              <p className="text-xs font-semibold text-subtle uppercase tracking-wide mb-2">Criterios de aceptación</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {historia.criterios.map((criterio, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-body">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    {criterio}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <p className="text-xs text-subtle">Módulo</p>
                    <p className="text-sm font-medium text-heading">{historia.modulo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <Link className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-subtle">Endpoint</p>
                    <p className="text-sm font-mono text-heading break-all">{historia.endpoint}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                  <div>
                    <p className="text-xs text-subtle">Vista</p>
                    <NavLink to={historia.vista} className="text-sm font-mono text-amber-700 dark:text-amber-300 hover:underline">
                      {historia.vista}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          Clasificación por PMV (implementación real)
        </h2>
        <div className="overflow-x-auto">
          <table className="table-shell">
            <thead>
              <tr>
                <th>PMV</th>
                <th>Módulos</th>
                <th>Historias</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">PMV1</td>
                <td>Login, Usuarios, Productores, Producción, Calidad, Dashboard, Reportes, Trazabilidad, Base de Datos</td>
                <td className="font-mono text-xs">HU01–HU09</td>
                <td>
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium">
                    <CheckCircle className="w-4 h-4" /> 9/9 implementadas
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-bold">PMV2</td>
                <td>Chatbot IA, Auditoría, Módulo IA</td>
                <td className="font-mono text-xs">HU10–HU12</td>
                <td>
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium">
                    <CheckCircle className="w-4 h-4" /> 3/3 implementadas
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 p-4">
        <p className="text-sm text-body">
          <strong className="text-heading">Validación automatizada:</strong>{' '}
          <code className="text-xs bg-white dark:bg-slate-800 px-1 rounded">cd backend && npm test</code> (health, validators, prediction, calidad, integration) ·{' '}
          <code className="text-xs bg-white dark:bg-slate-800 px-1 rounded">cd testing && npx cypress run</code> (PF-01 … PF-11).
          Matriz detallada: <code className="text-xs bg-white dark:bg-slate-800 px-1 rounded">docs/MATRIZ_PRUEBAS_HU.md</code>.
        </p>
      </div>
    </div>
  )
}
