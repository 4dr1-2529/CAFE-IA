import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartEmpty from '../ui/ChartEmpty.jsx'

const DEFAULT_COLORS = ['#b8895a', '#5c8a6b', '#7c9eb2', '#c4a574', '#8b6914']

export default function ComparisonPiePanel({ title, data, emptyMessage, colors = DEFAULT_COLORS }) {
  return (
    <div className="border border-cafe-100 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-900/30">
      <h3 className="font-semibold text-cafe-900 dark:text-slate-100 mb-3">{title}</h3>
      {(data || []).length === 0 ? (
        <ChartEmpty message={emptyMessage} />
      ) : (
        <div className="h-64 chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {data.map((e, i) => (
                  <Cell key={e.name} fill={e.color || colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
