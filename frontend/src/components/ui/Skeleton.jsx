export function Skeleton({ className = '' }) {
  return <div className={`skeleton-shimmer ${className}`} aria-hidden />
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-3 animate-fadeIn" aria-busy="true" aria-label="Cargando tabla">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function KpiSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
  )
}

export function CardSkeleton({ className = 'h-48' }) {
  return <Skeleton className={`rounded-2xl ${className}`} />
}
