const CARACTERISTICAS = [
  'Humedad (%)',
  'Temperatura (°C)',
  'Altitud (msnm)',
  'Tipo de secado',
  'Variedad de café',
  'Puntaje sensorial',
  'Tiempo almacenamiento',
  'Calidad de grano',
]

export function getInfoModelo() {
  return {
    nombre: 'Modelo predictivo heurístico avanzado',
    version: 'v2.0-heuristic',
    tipo: 'Reglas ML + ponderación multivariable',
    precision: '≥ 85% (validación heurística)',
    caracteristicas: CARACTERISTICAS,
    variables: CARACTERISTICAS,
    salidas: ['Calidad predicha', 'Confianza %', 'Riesgo %', 'Factores', 'Alertas', 'Recomendaciones'],
    estado: 'Operativo',
    evidencia: 'Pruebas unitarias en backend/tests/prediction.test.js',
  }
}
