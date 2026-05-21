import { Inbox } from 'lucide-react'

export default function EmptyState({ icon: Icon = Inbox, title = 'Sin datos', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-cafe-100 dark:bg-slate-700 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-cafe-400 dark:text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-cafe-900 dark:text-white">{title}</h3>
      {description && <p className="text-sm text-cafe-500 dark:text-slate-400 mt-2 max-w-md">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
