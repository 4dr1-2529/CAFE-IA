import { BarChart3 } from 'lucide-react'

export default function ChartEmpty({
  message = 'No hay datos suficientes para generar esta gráfica.',
}) {
  return (
    <div className="chart-empty">
      <BarChart3 className="w-10 h-10 mb-3 opacity-40 text-muted" aria-hidden />
      <p>{message}</p>
    </div>
  )
}
