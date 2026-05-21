import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId
    setToasts((t) => [...t, { id, message, type }])
    if (duration > 0) setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
  }

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }

  const styles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
    info: 'bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-950 dark:border-sky-800 dark:text-sky-200',
  }

  return (
    <ToastContext.Provider value={{ toast, addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const Icon = icons[t.type] || Info
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg animate-fadeIn ${styles[t.type]}`}
              role="alert"
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm flex-1">{t.message}</p>
              <button type="button" onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx.toast
}
