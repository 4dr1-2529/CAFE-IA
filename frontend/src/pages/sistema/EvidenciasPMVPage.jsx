import {
  Camera, Github, Folder, Database, CheckCircle, Code, Terminal,
  Shield, TestTube, Sparkles, Server, FileCheck,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import KpiCard from '../../components/ui/KpiCard.jsx'

const evidencias = [
  {
    categoria: 'Repositorio y documentación',
    descripcion: 'Control de versiones y guías PMV2',
    icon: Github,
    color: 'from-slate-700 to-slate-900',
    items: [
      'Monorepo cafe-cursor (frontend + backend + ml + docs)',
      'README.md, docs/PMV2.md, AUDITORIA_TECNICA.md',
      'CI GitHub Actions (.github/workflows/ci.yml)',
      'INICIAR.bat — arranque automático en Windows',
    ],
  },
  {
    categoria: 'Estructura del proyecto',
    descripcion: 'Organización hexagonal real',
    icon: Folder,
    color: 'from-sky-600 to-blue-700',
    items: [
      'frontend/src/pages — 9 módulos (auth, dashboard, ia, sistema…)',
      'frontend/src/constants/projectStructure.js — árbol oficial',
      'backend/src — domain · application · infrastructure · interfaces/http',
      'backend/sql — schema.sql (39 tablas), seeds.sql, views.sql',
      'docs/ESTRUCTURA_PROYECTO.md — documentación de carpetas',
    ],
  },
  {
    categoria: 'Frontend (React + Vite)',
    descripcion: 'UI SaaS con modo claro/oscuro',
    icon: Terminal,
    color: 'from-emerald-600 to-green-700',
    items: [
      'React 18 + Vite + Tailwind (darkMode: class)',
      'PageHeader, KpiCard, FormField, Skeleton, TrazabilidadTimeline',
      'Validación cliente: utils/validation.js + toasts globales',
      'Puerto dev: localhost:5174',
    ],
  },
  {
    categoria: 'Base de datos MySQL',
    descripcion: 'Persistencia empresarial PMV2',
    icon: Database,
    color: 'from-violet-600 to-purple-700',
    items: [
      'MySQL 8+ — base cafe_sostenible',
      '39 tablas: seguridad, productores, lotes, calidad, IA, reportes',
      'Seed PMV2: 5 productores × 5 lotes = 25 lotes demo',
      'Migración automática al iniciar backend',
    ],
  },
  {
    categoria: 'Backend (Express hexagonal)',
    descripcion: 'API REST segura puerto 3029',
    icon: Server,
    color: 'from-amber-500 to-orange-600',
    items: [
      'Controllers → Services → Repositories → MySQL pool',
      'JWT + RBAC: readGuard / writeGuard (admin, supervisor)',
      'Helmet + rate-limit + validadores DTO',
      'Auth demo: admin@cafeai.com / admin123',
    ],
  },
  {
    categoria: 'Módulos funcionales',
    descripcion: 'Flujos verificables con datos reales',
    icon: CheckCircle,
    color: 'from-rose-600 to-red-700',
    items: [
      'CRUD productores con validación y toast',
      'Registro lotes + trazabilidad 5 etapas automática',
      'Control calidad — puntaje 0–100 y clasificación',
      'IA bajo demanda: POST /api/predicciones/ejecutar',
      'Dashboard KPIs, reportes PDF/Excel, consulta BD',
    ],
  },
  {
    categoria: 'Lista de cotejo PMV2',
    descripcion: 'Criterios de aceptación académicos',
    icon: FileCheck,
    color: 'from-emerald-700 to-cafeVerde-800',
    items: [
      'HU01–HU06 + dashboard implementados',
      'Sin endpoint duplicado de IA (unificado en /predicciones/ejecutar)',
      'Selector IA: solo lotes sin predicción previa',
      'Reportes y Base de Datos coherentes (mismas predicciones)',
      'Tests automatizados: npm test en backend (~18 casos)',
      'Modo oscuro/claro con contraste legible en todas las vistas',
    ],
  },
  {
    categoria: 'Seguridad y calidad',
    descripcion: 'QA y hardening PMV2',
    icon: Shield,
    color: 'from-indigo-600 to-indigo-800',
    items: [
      'JWT en Authorization Bearer',
      'Roles: admin, supervisor, productor',
      'Tests: health, validators, prediction, calidad, integration',
      'Matriz HU: docs/MATRIZ_PRUEBAS_HU.md',
    ],
  },
]

const tecnologias = [
  'React 18', 'Vite 5', 'TailwindCSS', 'Recharts', 'Lucide',
  'React Router 6', 'Express 4', 'MySQL 8', 'JWT', 'bcrypt',
  'Helmet', 'Jest + Supertest', 'Node.js 18+',
]

const comandos = [
  { label: 'Arranque rápido (Windows)', code: 'INICIAR.bat' },
  { label: 'Backend', code: 'cd backend && npm install && npm start' },
  { label: 'Frontend', code: 'cd frontend && npm install && npm run dev' },
  { label: 'Seed PMV2 (25 lotes)', code: 'cd backend && set SEED_PMV2_FORCE=1 && npm run db:seed:pmv2' },
  { label: 'Tests', code: 'cd backend && npm test' },
]

export default function EvidenciasPMVPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        badge="PMV2 · Evidencias"
        title="Evidencias del Producto Mínimo Viable"
        subtitle="Documentación técnica, capturas de flujo, instalación y lista de cotejo para evaluación académica — Café Sostenible AI v2.0"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Versión" value="2.0" unit="PMV2" icon={Sparkles} color="amber" />
        <KpiCard label="Tablas MySQL" value="39" icon={Database} color="purple" />
        <KpiCard label="Lotes demo" value="25" icon={CheckCircle} color="green" />
        <KpiCard label="Tests API" value="18+" icon={TestTube} color="blue" />
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4">Información del proyecto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: 'Nombre', v: 'Café Sostenible AI' },
            { k: 'Región', v: 'Junín — Perú' },
            { k: 'Stack', v: 'React + Express + MySQL' },
            { k: 'Estado', v: '✓ Operativo PMV2', ok: true },
          ].map((item) => (
            <div key={item.k} className="rounded-xl bg-slate-100 dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-600">
              <p className="text-xs font-semibold text-subtle uppercase tracking-wide">{item.k}</p>
              <p className={`font-semibold mt-1 ${item.ok ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-slate-100'}`}>
                {item.v}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {evidencias.map((ev, index) => {
          const Icon = ev.icon
          return (
            <div key={index} className="card-panel overflow-hidden p-0 flex flex-col">
              <div className={`bg-gradient-to-r ${ev.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{ev.categoria}</h3>
                    <p className="text-white/85 text-xs">{ev.descripcion}</p>
                  </div>
                </div>
              </div>
              <ul className="p-4 space-y-2 flex-1">
                {ev.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-body">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Comandos para ejecutar el proyecto
        </h2>
        <div className="space-y-3">
          {comandos.map((c) => (
            <div key={c.label} className="rounded-xl bg-slate-900 dark:bg-slate-950 p-4 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1"># {c.label}</p>
              <code className="text-emerald-400 font-mono text-sm break-all">{c.code}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Pruebas funcionales recomendadas
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 p-4">
            <p className="font-semibold text-heading mb-2">Prueba IA con lote real</p>
            <ol className="list-decimal ml-5 space-y-1 text-sm text-body">
              <li>Registrar productor y lote (MySQL).</li>
              <li>Módulo IA → selector solo lotes sin predicción.</li>
              <li>Ejecutar predicción → ver resultado, factores y recomendación.</li>
              <li>Validar historial y que el lote ya no aparece en el selector.</li>
              <li>Coherencia en Reportes IA y Base de Datos.</li>
            </ol>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 p-4">
            <p className="font-semibold text-heading mb-2">Prueba RBAC y escritura</p>
            <ol className="list-decimal ml-5 space-y-1 text-sm text-body">
              <li>POST /api/lotes sin token → 401.</li>
              <li>Login admin → JWT en peticiones.</li>
              <li>Crear lote con token admin/supervisor → 201.</li>
              <li>Dashboard /metrics con JWT → KPIs JSON.</li>
              <li>Ejecutar npm test en backend → suite verde.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="card-panel">
        <h2 className="text-heading text-lg mb-4">Tecnologías y herramientas</h2>
        <div className="flex flex-wrap gap-2">
          {tecnologias.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="card-panel border-l-4 border-l-amber-500">
        <p className="text-sm text-body">
          <strong className="text-heading">Evidencia visual:</strong> capture pantallas de Dashboard, Módulo IA,
          Trazabilidad, Reportes y esta página en modo claro y oscuro para el informe académico.
          Incluya captura de <code className="text-xs bg-slate-200 dark:bg-slate-700 px-1 rounded">npm test</code> y
          del esquema MySQL (39 tablas).
        </p>
      </div>
    </div>
  )
}
