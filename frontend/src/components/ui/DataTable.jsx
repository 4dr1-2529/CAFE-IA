import EmptyState from './EmptyState.jsx'

export default function DataTable({
  columns,
  rows,
  rowKey = 'id',
  emptyTitle = 'Sin datos',
  emptyDescription,
  className = '',
}) {
  if (!rows?.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription || 'No hay registros para mostrar en este momento.'}
      />
    )
  }

  return (
    <div className={`overflow-x-auto rounded-xl border border-card ${className}`}>
      <table className="table-shell">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.className || ''}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row[rowKey] ?? idx}>
              {columns.map((col) => (
                <td key={col.key} className={col.className || ''}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
