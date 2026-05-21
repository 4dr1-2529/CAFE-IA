import { BookOpen, CheckCircle, Package, Link, Eye, LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'

const historias = [
  {
    id: 'HU01',
    titulo: 'Registrar y gestionar productores',
    descripcion: 'Como administrador, quiero registrar productores con validación para asociar cada lote a su origen verificable.',
    estado: 'Implementado',
    prioridad: 'Alta',
    modulo: 'Productores',
    endpoint: 'GET/POST/PUT/DELETE /api/productores',
    vista: '/productores',
    sprint: 'PMV1',
    criterios: [
      'Código automático P001, P002…',
      'Validación frontend (validation.js) + toast',
      'RBAC: escritura solo admin/supervisor',
      'Persistencia MySQL productores',
    ],
  },
  {
    id: 'HU02',
    titulo: 'Registrar producción y lotes',
    descripcion: 'Como supervisor, quiero registrar lotes de café con catálogos (variedad, secado, estado) vinculados a productor.',
    estado: 'Implementado',
    prioridad: 'Alta',
    modulo: 'Registro Producción',
    endpoint: 'POST /api/lotes · GET /api/lotes/next-code',
    vista: '/registro',
    sprint: 'PMV1–PMV2',
    criterios: [
      'Campos obligatorios validados (DTO backend)',
      'FK a catálogos: variedad_id, proceso_secado_id, estado_lote_id',
      'Trazabilidad inicial automática (5 etapas)',
      'Sin predicción IA automática al crear lote',
      'Seed PMV2: hasta 25 lotes demo',
    ],
  },
  {
    id: 'HU03',
    titulo: 'Consultar trazabilidad de lotes',
    descripcion: 'Como usuario autenticado, quiero ver la línea de tiempo y el detalle de cada lote para auditoría del proceso.',
    estado: 'Implementado',
    prioridad: 'Alta',
    modulo: 'Trazabilidad',
    endpoint: 'GET /api/trazabilidad · GET /api/lotes/:id',
    vista: '/trazabilidad',
    sprint: 'PMV1',
    criterios: [
      'Lista y búsqueda por código o productor',
      'Componente TrazabilidadTimeline por etapas',
      'Código QR simulado por lote',
      'Orden cronológico sin duplicar etapas',
    ],
  },
  {
    id: 'HU04',
    titulo: 'Evaluar calidad del café',
    descripcion: 'Como evaluador, quiero registrar cata sensorial y obtener puntaje 0–100 con clasificación automática.',
    estado: 'Implementado',
    prioridad: 'Alta',
    modulo: 'Control Calidad',
    endpoint: 'POST /api/control-calidad',
    vista: '/calidad',
    sprint: 'PMV1',
    criterios: [
      'Parámetros 1–10 con decimales (aroma, acidez, cuerpo, sabor, balance)',
      'Puntaje final 0–100 y etiqueta Alta/Media/Baja',
      'Tests unitarios computeScores',
      'Visible en Reportes y Base de Datos',
    ],
  },
  {
    id: 'HU05',
    titulo: 'Predecir calidad con IA bajo demanda',
    descripcion: 'Como analista, quiero ejecutar predicción IA solo cuando lo decida, con factores y recomendaciones técnicas.',
    estado: 'Implementado',
    prioridad: 'Alta',
    modulo: 'Módulo IA',
    endpoint: 'POST /api/predicciones/ejecutar',
    vista: '/ia',
    sprint: 'PMV2',
    criterios: [
      'Motor PredictionEngine v2 (dominio)',
      'Una predicción por lote; selector solo pendientes',
      'Salida: calidad, confianza %, riesgo %, factores, alertas',
      'Endpoint unificado (sin /prediccion-ia duplicado)',
      'Coherencia Reportes IA ↔ Base de Datos',
    ],
  },
  {
    id: 'HU06',
    titulo: 'Generar reportes y exportaciones',
    descripcion: 'Como administrador, quiero reportes de producción, calidad, trazabilidad e IA con export PDF/Excel.',
    estado: 'Implementado',
    prioridad: 'Alta',
    modulo: 'Reportes',
    endpoint: 'GET /api/reportes/* · export/:tipo/:formato',
    vista: '/reportes',
    sprint: 'PMV2',
    criterios: [
      'Agregados desde MySQL (ReportesService hexagonal)',
      'Totales de predicciones reales (sin demos obsoletas)',
      'Export PDF y Excel',
      'Resumen trazabilidad por etapa actual',
    ],
  },
  {
    id: 'HU07',
    titulo: 'Dashboard analítico',
    descripcion: 'Como gerente, quiero un panel con KPIs y gráficos para monitorear producción, calidad e IA.',
    estado: 'Implementado',
    prioridad: 'Media',
    modulo: 'Dashboard',
    endpoint: 'GET /api/dashboard/metrics',
    vista: '/',
    sprint: 'PMV2',
    criterios: [
      'KPIs: lotes, productores, evaluaciones, predicciones',
      'Gráficos Recharts con tema claro/oscuro',
      'Vistas SQL opcionales en backend',
      'readGuard JWT obligatorio',
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

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="Scrum · PMV2"
        title="Historias de Usuario"
        subtitle="Requisitos funcionales HU01–HU07 con trazabilidad vista ↔ endpoint ↔ criterios de aceptación"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Historias" value={historias.length} icon={BookOpen} color="blue" />
        <KpiCard label="Implementadas" value={implementadas} icon={CheckCircle} color="green" />
        <KpiCard label="En desarrollo" value="0" icon={Package} color="amber" />
        <KpiCard label="Pendientes" value="0" icon={Eye} color="purple" />
      </div>

      <div className="space-y-4">
        {historias.map((historia) => (
          <article key={historia.id} className="card-panel overflow-hidden p-0">
            <div className="bg-slate-100 dark:bg-slate-900/60 px-4 py-3 border-b border-slate-200 dark:border-slate-600">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm font-bold text-amber-700 dark:text-amber-300">{historia.id}</span>
                  <h3 className="font-semibold text-heading">{historia.titulo}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-subtle">{historia.sprint}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeEstado(historia.estado)}`}>
                    {historia.estado}
                  </span>
                  <span className={`text-xs font-semibold ${prioridadClass(historia.prioridad)}`}>
                    {historia.prioridad}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
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
                    <NavLink
                      to={historia.vista}
                      className="text-sm font-mono text-amber-700 dark:text-amber-300 hover:underline"
                    >
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
          Evolución por PMV (Scrum)
        </h2>
        <div className="overflow-x-auto">
          <table className="table-shell">
            <thead>
              <tr>
                <th>PMV</th>
                <th>Alcance</th>
                <th>Historias</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { pmv: 'PMV1', alcance: 'CRUD productores, lotes, trazabilidad, calidad, IA básica', hu: 'HU01–HU04', ok: true },
                { pmv: 'PMV2', alcance: 'MySQL 39 tablas, JWT/RBAC, dashboard, reportes export, seed 25 lotes', hu: 'HU05–HU07', ok: true },
                { pmv: 'PMV3', alcance: 'Hexagonal completo, tests CI, dark mode, hardening API', hu: 'Transversal', ok: true },
              ].map((row) => (
                <tr key={row.pmv}>
                  <td className="font-bold">{row.pmv}</td>
                  <td>{row.alcance}</td>
                  <td className="font-mono text-xs">{row.hu}</td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium">
                      <CheckCircle className="w-4 h-4" /> Completado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 p-4">
        <p className="text-sm text-body">
          <strong className="text-heading">Matriz de pruebas:</strong> ver{' '}
          <code className="text-xs bg-white dark:bg-slate-800 px-1 rounded border border-slate-200 dark:border-slate-600">
            docs/MATRIZ_PRUEBAS_HU.md
          </code>
          . Ejecutar <code className="text-xs bg-white dark:bg-slate-800 px-1 rounded">cd backend && npm test</code> para
          validación automatizada HU01, HU02, HU04, HU05 y HU06.
        </p>
      </div>
    </div>
  )
}
