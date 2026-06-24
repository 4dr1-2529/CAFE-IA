import { Sparkles } from 'lucide-react'

/** Mensaje visible de mejora PMV3 por módulo */
export default function Pmv3ImprovementNotice({ children, className = '' }) {
  return (
    <div
      className={`flex items-start gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/30 border border-amber-300/70 dark:border-amber-700/50 text-sm ${className}`}
    >
      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p className="text-cafe-800 dark:text-slate-200">
        <strong className="text-amber-700 dark:text-amber-300">Mejora PMV3:</strong>{' '}
        {children}
      </p>
    </div>
  )
}
