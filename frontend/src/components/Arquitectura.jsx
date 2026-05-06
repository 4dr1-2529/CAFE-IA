import { Network, ArrowRight, Database, Cpu, Globe, Shield, Code, Layers } from 'lucide-react'

export default function Arquitectura() {
  const capas = [
    {
      nombre: 'PRESENTACIÓN',
      color: 'bg-amber-500',
      icon: Globe,
      descripcion: 'Interfaz de usuario - React Components',
      componentes: ['Login', 'Dashboard', 'Formularios', 'Gráficos']
    },
    {
      nombre: 'APLICACIÓN',
      color: 'bg-blue-500',
      icon: Layers,
      descripcion: 'Servicios de aplicación (puerta de entrada a backend)',
      componentes: ['frontend/src/services/api.js', 'getLotes()', 'createLote()', 'createControlCalidad()', 'ejecutarPrediccionIA()']
    },
    {
      nombre: 'DOMINIO',
      color: 'bg-green-500',
      icon: Shield,
      descripcion: 'Entidades del negocio - Modelos',
      componentes: ['Lote', 'Productor', 'EvaluacionCalidad', 'PrediccionIA']
    },
    {
      nombre: 'INFRAESTRUCTURA',
      color: 'bg-purple-500',
      icon: Cpu,
      descripcion: 'Backend + Persistencia + IA/ML',
      componentes: ['Express routes', 'backend/routes/*', 'SQLite (backend/database.sqlite)', 'Módulo IA/ML (reglas)']
    }
  ]

  const flujo = [
    { paso: 1, descripcion: 'Usuario interactúa con la UI', modulo: 'Presentación' },
    { paso: 2, descripcion: 'React consume services/api.js', modulo: 'Aplicación' },
    { paso: 3, descripcion: 'Express ejecuta rutas REST', modulo: 'Infraestructura' },
    { paso: 4, descripcion: 'Se procesa la predicción IA/ML', modulo: 'Infraestructura' },
    { paso: 5, descripcion: 'Se persiste en SQLite', modulo: 'Infraestructura' },
    { paso: 6, descripcion: 'Respuesta retorna al usuario', modulo: 'Presentación' }
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-cafe-800 to-cafe-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Arquitectura del Sistema</h1>
            <p className="text-cafe-100">React/Vite → services/api.js → Express routes → SQLite → Módulo IA/ML</p>
          </div>
        </div>
      </div>

      {/* Diagrama de capas */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-6">Arquitectura por Capas Reales</h2>
        
        <div className="space-y-4">
          {capas.map((capa, index) => {
            const Icon = capa.icon
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < capas.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-cafe-200 -translate-x-1/2 z-0"></div>
                )}
                
                <div className="flex items-start gap-4 relative z-10">
                  {/* Icon */}
                  <div className={`${capa.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-cafe-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-cafe-900">{capa.nombre}</h3>
                      <span className={`${capa.color} text-white text-xs px-2 py-1 rounded-full`}>
                        Capa {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-cafe-600 mb-3">{capa.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                      {capa.componentes.map((comp, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-cafe-200 rounded text-xs text-cafe-700">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Flujo de datos */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-6">Flujo de Datos</h2>
        
        <div className="flex items-center justify-between overflow-x-auto pb-4">
          {flujo.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center min-w-[120px]">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.paso}
                </div>
                <p className="text-xs text-cafe-600 mt-2 text-center">{item.modulo}</p>
                <p className="text-xs text-cafe-500 text-center mt-1">{item.descripcion}</p>
              </div>
              {index < flujo.length - 1 && (
                <ArrowRight className="w-5 h-5 text-cafe-300 mx-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Estructura de carpetas */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Estructura de Carpetas</h2>
        
        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-green-400 font-mono text-sm">
{`cafe-cursor/
├── frontend/
│   ├── src/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── backend/
│   ├── routes/
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── database.sqlite
└── README.md`}
          </pre>
        </div>
      </div>

      {/* Descripción de capas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="font-semibold text-cafe-900 mb-3">Capa de Presentación</h3>
          <p className="text-sm text-cafe-600">
            Componentes React que manejan la interfaz de usuario. 
            Incluyen formularios, tablas, gráficos y navegación.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="font-semibold text-cafe-900 mb-3">Capa de Aplicación</h3>
          <p className="text-sm text-cafe-600">
            Casos de uso que orquestan la lógica de negocio. 
            Coordinan las operaciones entre dominio e infraestructura.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="font-semibold text-cafe-900 mb-3">Capa de Dominio</h3>
          <p className="text-sm text-cafe-600">
            Entidades y reglas del negocio puro. 
            Independientes de cualquier framework o tecnología externa.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
          <h3 className="font-semibold text-cafe-900 mb-3">Capa de Infraestructura</h3>
          <p className="text-sm text-cafe-600">
            Implementación de servicios externos:
            API Express, motor predictivo por reglas y persistencia SQLite.
          </p>
        </div>
      </div>

      <div className="bg-cafeVerde-50 border border-cafeVerde-200 rounded-xl p-6">
        <h3 className="font-semibold text-cafeVerde-900 mb-3">Flujo Principal</h3>
        <p className="text-sm text-cafeVerde-700 mb-4">Cada módulo de UI consume endpoints en `frontend/src/services/api.js`, que llegan a rutas Express y finalmente se guardan en SQLite.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="font-medium text-cafe-900">Frontend</p>
            <p className="text-xs text-cafe-600 mt-1">React + Vite</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-medium text-cafe-900">Node.js (Express)</p>
            <p className="text-xs text-cafe-600 mt-1">/api/productores, /api/lotes, /api/reportes</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-medium text-cafe-900">SQLite</p>
            <p className="text-xs text-cafe-600 mt-1">Persistencia local en backend/database.sqlite</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-600" />
          Evidencia IA/ML (PMV1)
        </h2>
        <div className="bg-cafe-50 border border-cafe-200 rounded-lg p-4 text-sm text-cafe-700">
          <p className="mb-2"><span className="font-semibold">Modelo usado:</span> Modelo predictivo basado en reglas de Machine Learning.</p>
          <p className="mb-2"><span className="font-semibold">Estado actual:</span> No existe entrenamiento con dataset real en esta versión PMV.</p>
          <p className="mb-2"><span className="font-semibold">Siguiente evolución:</span> Integrar un servicio Python + Scikit-learn para entrenamiento y evaluación.</p>
          <p className="mb-2"><span className="font-semibold">Variables de entrada:</span> humedad, temperatura, altitud, tipo de secado, variedad de café y puntaje de calidad (si existe).</p>
          <p><span className="font-semibold">Salida:</span> calidad predicha, confianza y recomendación técnica. La predicción se registra en SQLite solo cuando el usuario presiona “Ejecutar Predicción”.</p>
        </div>
      </div>
    </div>
  )
}