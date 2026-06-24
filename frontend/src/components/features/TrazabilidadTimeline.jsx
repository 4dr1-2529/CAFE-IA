import { CheckCircle, Circle, Clock } from 'lucide-react'

const estadoIcon = {
  Completado: CheckCircle,
  'En proceso': Clock,
  Pendiente: Circle,
}

const estadoColor = {
  Completado: 'text-emerald-600 bg-emerald-100 border-emerald-200 dark:bg-emerald-900/40 dark:border-emerald-800',
  'En proceso': 'text-amber-600 bg-amber-100 border-amber-200 dark:bg-amber-900/40 dark:border-amber-800',
  Pendiente: 'text-slate-500 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-600',
}

export default function TrazabilidadTimeline({ etapas = [], productor, codigoLote }) {
  if (!etapas.length) {
    return (
      <p className="text-sm text-cafe-500 dark:text-slate-400 text-center py-8">
        No hay etapas de trazabilidad registradas.
      </p>
    )
  }

  const sorted = [...etapas].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
  const completadas = sorted.filter((e) => e.estado === 'Completado').length
  const progreso = sorted.length ? Math.round((completadas / sorted.length) * 100) : 0

  return (
    <div className="space-y-4">
      {sorted.length > 0 && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-cafe-600 dark:text-slate-400 mb-1">
            <span>Progreso del lote · Etapas completadas: {completadas}</span>
            <span className="font-semibold">{completadas}/{sorted.length} etapas · {progreso}% avance</span>
          </div>
          <div className="h-2 rounded-full bg-cafe-100 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      )}
      {(productor || codigoLote) && (
        <div className="flex flex-wrap gap-3 text-sm">
          {codigoLote && (
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 font-mono font-semibold">
              {codigoLote}
            </span>
          )}
          {productor && (
            <span className="px-3 py-1 rounded-full bg-cafe-100 text-cafe-800 dark:bg-slate-700 dark:text-slate-200">
              Productor: {productor}
            </span>
          )}
        </div>
      )}
      <div className="relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-cafe-200 dark:bg-slate-600" />
        {sorted.map((etapa, i) => {
          const Icon = estadoIcon[etapa.estado] || Circle
          const colors = estadoColor[etapa.estado] || estadoColor.Pendiente
          return (
            <div key={etapa.id ?? i} className="relative pb-8 last:pb-0">
              <div
                className={`absolute -left-5 w-8 h-8 rounded-full border-2 flex items-center justify-center ${colors}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="ml-4 bg-white dark:bg-slate-800 rounded-xl border border-cafe-100 dark:border-slate-700 p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-semibold text-cafe-900 dark:text-white">{etapa.etapa}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${colors}`}>{etapa.estado}</span>
                </div>
                {etapa.descripcion && (
                  <p className="text-sm text-cafe-600 dark:text-slate-400 mt-2">{etapa.descripcion}</p>
                )}
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-cafe-500 dark:text-slate-500">
                  {etapa.fecha && <span>Fecha: {etapa.fecha}</span>}
                  {etapa.ubicacion && <span>Ubicación: {etapa.ubicacion}</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
