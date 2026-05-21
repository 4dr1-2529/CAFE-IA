export default function KpiCard({ label, value, unit, icon: Icon, trend, color = 'amber' }) {
  const colors = {
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
    blue: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200',
  }

  return (
    <div className="card-panel hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {value}
            {unit && <span className="text-lg font-semibold text-slate-500 dark:text-slate-400 ml-1">{unit}</span>}
          </p>
          {trend && <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mt-2">{trend}</p>}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}
