const CARACTERISTICAS = [
  'Humedad (%)',
  'Altitud (msnm)',
  'Cantidad (kg)',
  'Variedad de café',
  'Proceso de secado',
  'Puntaje de calidad',
  'Estado del lote',
  'Temperatura (°C)',
]

export function getInfoModelo() {
  return {
    nombre: 'Modelo predictivo de Machine Learning — calidad y riesgo',
    version: 'v2.0-heuristic',
    tipo: 'Machine Learning predictivo (reglas ponderadas multivariable)',
    precision: '≥ 85% (validación heurística)',
    caracteristicas: CARACTERISTICAS,
    variables: CARACTERISTICAS,
    salidas: [
      'Calidad estimada',
      'Nivel de riesgo (bajo / medio / alto)',
      'Confianza estimada',
      'Recomendación inteligente',
      'Factores influyentes',
    ],
    estado: 'Operativo',
    evidencia: 'Pruebas unitarias en backend/tests/prediction.test.js',
  }
}
