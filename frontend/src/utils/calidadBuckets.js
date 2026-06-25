export function classifyCalidadLabel(label = '') {
  const key = String(label).toLowerCase()
  if (key.includes('excel') || key.includes('alta')) return 'alta'
  if (key.includes('acept') || key.includes('buen') || key.includes('medi')) return 'media'
  return 'baja'
}

export function countCalidadFromEvaluaciones(evaluaciones = []) {
  const porCalidad = { alta: 0, media: 0, baja: 0 }
  evaluaciones.forEach((e) => {
    porCalidad[classifyCalidadLabel(e.calidad_final)]++
  })
  return porCalidad
}

export function sumCalidadFromDistribucion(distribucion = []) {
  const porCalidad = { alta: 0, media: 0, baja: 0 }
  distribucion.forEach((d) => {
    porCalidad[classifyCalidadLabel(d.calidad_final)] += Number(d.cantidad) || 0
  })
  return porCalidad
}
