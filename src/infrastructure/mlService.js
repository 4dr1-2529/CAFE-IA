// Infrastructure - Servicio de modelo ML

export function getInfoModelo() {
  return {
    nombre: 'Modelo predictivo basado en reglas de Machine Learning',
    tipo: 'Reglas de decisión heurísticas',
    precision: 'Aproximada según reglas de calidad',
    caracteristicas: ['Humedad', 'Temperatura', 'Altitud', 'Tipo de Secado', 'Variedad de Café', 'Puntaje de Taza'],
    version: '1.0.0',
    descripcion: 'Modelo basado en reglas de negocio que evalúa condiciones de café sostenible y genera predicciones de calidad con factores influyentes.'
  }
}
