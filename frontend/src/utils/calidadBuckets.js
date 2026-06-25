export function classifyCalidadLabel(label = '') {
  const key = String(label).toLowerCase()
  if (key.includes('excel') || key.includes('alta')) return 'alta'
  if (key.includes('acept') || key.includes('buen') || key.includes('medi')) return 'media'
  return 'baja'
}

function aggregateCalidad(items, getLabel, getCount) {
  const porCalidad = { alta: 0, media: 0, baja: 0 }
  items.forEach((item) => {
    porCalidad[classifyCalidadLabel(getLabel(item))] += getCount(item)
  })
  return porCalidad
}

export function countCalidadFromEvaluaciones(evaluaciones = []) {
  return aggregateCalidad(
    evaluaciones,
    (e) => e.calidad_final,
    () => 1
  )
}

export function sumCalidadFromDistribucion(distribucion = []) {
  return aggregateCalidad(
    distribucion,
    (d) => d.calidad_final,
    (d) => Number(d.cantidad) || 0
  )
}
