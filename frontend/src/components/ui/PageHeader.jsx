export default function PageHeader({ title, subtitle, badge, action, icon: Icon }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cafe-800 via-cafe-700 to-cafeVerde-700 dark:from-slate-800 dark:via-slate-800 dark:to-emerald-900 p-6 md:p-8 text-white shadow-lg mb-6 animate-fadeIn">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/15 items-center justify-center shrink-0 backdrop-blur-sm">
              <Icon className="w-6 h-6 text-amber-300" />
            </div>
          )}
          <div>
            {badge && (
              <span className="inline-block mb-2 px-3 py-1 text-xs font-bold rounded-full bg-amber-400 text-slate-900 shadow-sm">
                {badge}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h1>
            {subtitle && (
              <p className="text-slate-100/95 dark:text-slate-200 mt-1.5 text-sm md:text-base max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
