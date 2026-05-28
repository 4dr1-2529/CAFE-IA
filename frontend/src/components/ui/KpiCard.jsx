export default function KpiCard({ label, value, unit, icon: Icon, trend, color = 'amber' }) {
  const colors = {
    amber: 'bg-amber-100 text-amber-900 dark:bg-amber-900/45 dark:text-amber-200',
    green: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/45 dark:text-emerald-200',
    purple: 'bg-purple-100 text-purple-900 dark:bg-purple-900/45 dark:text-purple-200',
    blue: 'bg-sky-100 text-sky-900 dark:bg-sky-900/45 dark:text-sky-200',
  }

  return (
    <div className="card-panel-interactive group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-muted">{label}</p>
          <p className="text-3xl font-bold text-primary mt-1 tabular-nums">
            {value}
            {unit && <span className="text-lg font-semibold text-muted ml-1">{unit}</span>}
          </p>
          {trend && (
            <p className="text-xs font-medium text-success mt-2">{trend}</p>
          )}
        </div>
        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${colors[color]}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}
