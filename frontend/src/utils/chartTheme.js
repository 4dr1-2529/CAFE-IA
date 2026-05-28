/** Paleta café / verde para gráficas Recharts */
export const CHART_PALETTE = ['#b8895a', '#5c8a6b', '#7c9eb2', '#cfa278', '#3d7d5c', '#9a6f46']

/** Props de ejes legibles en claro y oscuro (usar dentro de contenedor con clase chart-container) */
export const chartAxisTick = { fontSize: 11, fill: 'var(--chart-axis)' }
export const chartGridStroke = 'var(--chart-grid)'

export function chartTooltipStyle() {
  return {
    contentStyle: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-card)',
      borderRadius: '12px',
      color: 'var(--text-primary)',
      fontSize: '13px',
    },
  }
}
