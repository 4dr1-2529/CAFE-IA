import { Layers, CheckCircle2 } from 'lucide-react'

const PMV1 = ['Login', 'Dashboard', 'Productores', 'Lotes', 'Producción', 'Trazabilidad', 'Calidad', 'Reportes', 'BD']
const PMV2 = ['Chatbot IA', 'Auditoría', 'Historial', 'ML/IA', 'Reportes+']

export default function Pmv3IntegrationBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/40 border border-amber-200/60 dark:border-amber-800/40 text-sm">
        <Layers className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-cafe-800 dark:text-slate-200">
          <strong className="text-amber-700 dark:text-amber-300">PMV3</strong> integra PMV1 + PMV2 con KPIs, timeline, IA y auditoría mejorados.
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-amber-200/80 dark:border-amber-800/50 bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center shrink-0">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-cafe-900 dark:text-white text-lg">PMV3 — Versión integrada</h3>
          <p className="text-sm text-cafe-600 dark:text-slate-400 mt-1">
            Consolida y optimiza los módulos de PMV1 y PMV2 en una experiencia unificada con indicadores en tiempo real.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cafe-500 mb-2">PMV1 · Operaciones</p>
              <div className="flex flex-wrap gap-1.5">
                {PMV1.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cafe-100 dark:bg-slate-800 text-xs text-cafe-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cafe-500 mb-2">PMV2 · Mejoras</p>
              <div className="flex flex-wrap gap-1.5">
                {PMV2.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-xs text-amber-800 dark:text-amber-200">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" /> {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
