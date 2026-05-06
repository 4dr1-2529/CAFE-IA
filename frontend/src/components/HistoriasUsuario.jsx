import { BookOpen, CheckCircle, Package, Route, Award, Brain, Link, Eye } from 'lucide-react'

export default function HistoriasUsuario() {
  const historias = [
    {
      id: 'HU01',
      titulo: 'Registrar productor',
      descripcion: 'Como administrador, quiero registrar productores para asociar cada lote con su origen.',
      estado: 'Implementado',
      prioridad: 'Alta',
      modulo: 'Productores',
      endpoint: 'POST /api/productores',
      vista: '/productores',
      criterios: ['ID automático P001, P002...', 'Guardar en SQLite', 'Recargar lista al registrar']
    },
    {
      id: 'HU02',
      titulo: 'Registrar producción de café',
      descripcion: 'Como productor, quiero registrar digitalmente la producción de café para mantener un control preciso de mis lotes.',
      estado: 'Implementado',
      prioridad: 'Alta',
      modulo: 'Registro Producción',
      endpoint: 'POST /api/lotes',
      vista: '/registro',
      criterios: [
        'Formulario con todos los campos requeridos',
        'Validación de datos obligatorios',
        'Generación automática de código de lote',
        'Selección de productor desde lista',
        'No crear predicción automática al registrar'
      ]
    },
    {
      id: 'HU03',
      titulo: 'Ver trazabilidad de lotes',
      descripcion: 'Como administrador, quiero visualizar la trazabilidad completa de cada lote para seguir el ciclo de producción.',
      estado: 'Implementado',
      prioridad: 'Alta',
      modulo: 'Trazabilidad',
      endpoint: 'GET /api/lotes/:id',
      vista: '/trazabilidad',
      criterios: [
        'Lista de todos los lotes registrados',
        'Búsqueda por código, productor o parcela',
        'Línea de tiempo por estado',
        'Detalle completo del lote seleccionado',
        'Simulación de código QR'
      ]
    },
    {
      id: 'HU04',
      titulo: 'Evaluar calidad del café',
      descripcion: 'Como evaluador Q Grader, quiero registrar las evaluaciones de calidad para clasificar los lotes.',
      estado: 'Implementado',
      prioridad: 'Alta',
      modulo: 'Control Calidad',
      endpoint: 'POST /api/control-calidad',
      vista: '/calidad',
      criterios: [
        'Selección de lote a evaluar',
        'Parámetros de cata (1–10) con decimales: aroma, acidez, cuerpo, sabor, balance',
        'Cálculo automático de puntaje final (0–100)',
        'Clasificación automática (Alta/Media/Baja)',
        'Guardar evaluación real en SQLite y reflejarla en Base de Datos y Reportes'
      ]
    },
    {
      id: 'HU05',
      titulo: 'Predecir calidad con IA',
      descripcion: 'Como usuario, quiero utilizar el módulo de inteligencia artificial para predecir la calidad del café antes de la evaluación.',
      estado: 'Implementado',
      prioridad: 'Alta',
      modulo: 'Módulo IA',
      endpoint: 'POST /api/prediccion-ia',
      vista: '/ia',
      criterios: [
        'Entrada de variables: humedad, temperatura, altitud, tipo de secado, variedad de café y puntaje (si existe)',
        'Modelo usado: “Modelo predictivo basado en reglas de Machine Learning”',
        'No usa entrenamiento supervisado con dataset real en esta versión PMV',
        'Arquitectura preparada para integrar motor Python + Scikit-learn en una siguiente iteración',
        'La predicción se registra SOLO al presionar “Ejecutar Predicción”',
        'Resultado: calidad predicha, confianza y recomendación técnica',
        'Factores influyentes visualizados',
        'Un lote real solo puede tener una predicción IA',
        'Lotes predichos no vuelven a aparecer en el selector',
        'Conteo de predicciones = predicciones reales (sin demos antiguas)'
      ]
    },
    {
      id: 'HU06',
      titulo: 'Generar reportes',
      descripcion: 'Como administrador, quiero reportes de producción, trazabilidad, calidad y predicción IA con datos reales.',
      estado: 'Implementado',
      prioridad: 'Alta',
      modulo: 'Reportes',
      endpoint: 'GET /api/reportes/*',
      vista: '/reportes',
      criterios: [
        'Resumen de lotes y producción total',
        'Reporte de calidad con evaluaciones reales guardadas',
        'Reporte de IA: total predicciones reales, alta/media/baja, promedio confianza, lotes pendientes',
        'Reporte de trazabilidad: resumen por etapa actual por lote (sin duplicar filas por etapa)',
        'Coherencia: Reporte IA coincide con Base de Datos (mismas predicciones válidas)'
      ]
    }
  ]

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Implementado': return 'bg-green-100 text-green-700 border-green-200'
      case 'En Desarrollo': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Pendiente': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'Alta': return 'text-red-600'
      case 'Media': return 'text-yellow-600'
      case 'Baja': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cafe-900">Historias de Usuario</h1>
            <p className="text-cafe-600">Requisitos funcionales con trazabilidad entre vista, endpoint y evidencia PMV.</p>
          </div>
        </div>
      </div>

      {/* Lista de historias */}
      <div className="space-y-4">
        {historias.map((historia, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-cafe-100 overflow-hidden">
            {/* Header */}
            <div className="bg-cafe-50 p-4 border-b border-cafe-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-cafe-600">{historia.id}</span>
                  <h3 className="font-semibold text-cafe-900">{historia.titulo}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(historia.estado)}`}>
                    {historia.estado}
                  </span>
                  <span className={`text-xs font-medium ${getPrioridadColor(historia.prioridad)}`}>
                    {historia.prioridad}
                  </span>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-4">
              <p className="text-sm text-cafe-600 mb-4">{historia.descripcion}</p>
              
              {/* Criterios de aceptación */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-cafe-500 mb-2">Criterios de Aceptación:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {historia.criterios.map((criterio, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-cafe-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {criterio}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Información técnica */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-cafe-100">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-xs text-cafe-500">Módulo</p>
                    <p className="text-sm font-medium text-cafe-900">{historia.modulo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-cafe-500">Endpoint</p>
                    <p className="text-sm font-mono text-cafe-900">{historia.endpoint}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-xs text-cafe-500">Vista</p>
                    <p className="text-sm font-mono text-cafe-900">{historia.vista}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Resumen de Implementación</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-600">6</p>
            <p className="text-sm text-green-700">Historias</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-600">6</p>
            <p className="text-sm text-green-700">Implementadas</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-gray-600">0</p>
            <p className="text-sm text-gray-700">En Desarrollo</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-gray-600">0</p>
            <p className="text-sm text-gray-700">Pendientes</p>
          </div>
        </div>
      </div>

      {/* Leyenda de estados */}
      <div className="bg-cafe-50 rounded-xl p-4">
        <p className="text-sm text-cafe-600">
          <strong>Leyenda:</strong> Las historias de usuario están basadas en el formato ágil (Scrum/Kanban) 
          y cada una cuenta con criterios de aceptación que deben cumplirse para considerar la historia completa.
        </p>
      </div>
    </div>
  )
}