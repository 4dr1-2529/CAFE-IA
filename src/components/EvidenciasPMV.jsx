import { Camera, Github, Folder, Database, CheckCircle, Code, Terminal } from 'lucide-react'

export default function EvidenciasPMV() {
  const evidencias = [
    {
      categoria: 'GitHub',
      descripcion: 'Código fuente y control de versiones',
      icon: Github,
      color: 'bg-gray-900',
      items: [
        'Código fuente completo',
        'Historial de cambios (si aplica)',
        'Documentación README',
        'Licencia MIT'
      ]
    },
    {
      categoria: 'Estructura del Proyecto',
      descripcion: 'Organización de archivos y carpetas',
      icon: Folder,
      color: 'bg-blue-500',
      items: [
        'src/domain - Entidades del negocio',
        'src/application - Casos de uso',
        'src/infrastructure - Servicios IA',
        'src/components - UI React'
      ]
    },
    {
      categoria: 'Instalación Frontend',
      descripcion: 'Configuración del entorno React',
      icon: Terminal,
      color: 'bg-green-500',
      items: [
        'npm install - Instalar dependencias',
        'npm run dev - Iniciar servidor',
        'Vite + React + TailwindCSS',
        'Puerto: localhost:5173'
      ]
    },
    {
      categoria: 'Base de Datos',
      descripcion: 'Base de datos real con SQLite',
      icon: Database,
      color: 'bg-purple-500',
      items: [
        'SQLite local real',
        'Tablas: productores, lotes, produccion, trazabilidad, control_calidad, predicciones_ia',
        'Persistencia real en backend/database.sqlite',
        'Consultas reales (reportes y listados) sobre SQLite'
      ]
    },
    {
      categoria: 'Instalación Backend',
      descripcion: 'Servidor Express + SQLite',
      icon: Terminal,
      color: 'bg-amber-500',
      items: [
        'cd backend && npm install',
        'npm start',
        'API en http://localhost:3001/api',
        'Persistencia en backend/database.sqlite'
      ]
    },
    {
      categoria: 'Módulos Funcionales',
      descripcion: 'Evidencias por módulo real',
      icon: CheckCircle,
      color: 'bg-red-500',
      items: [
        'Registro productor y lote',
        'Control de calidad con puntaje 0-100',
        'Predicción IA bajo demanda',
        'Reportes con datos reales',
        'Consulta trazabilidad',
        'Prueba IA/ML con lote real en SQLite'
      ]
    },
    {
      categoria: 'Lista de cotejo PMV1',
      descripcion: 'Criterios de aceptación verificados',
      icon: CheckCircle,
      color: 'bg-cafeVerde-600',
      items: [
        'HU01–HU06 implementadas (PMV1)',
        'Predicciones IA: solo bajo demanda (botón “Ejecutar Predicción”)',
        'Predicciones demo antiguas: filtradas/ocultas (solo se cuentan “usuario”)',
        'Selector IA: solo lotes pendientes (sin predicción IA)',
        'Reporte IA y Base de Datos consistentes (mismas predicciones válidas)',
        'Trazabilidad ordenada por lote y línea de tiempo por etapas',
        'Control de calidad: parámetros 1–10 con decimales; puntaje final 0–100; guardado en SQLite'
      ]
    }
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Evidencias PMV</h1>
            <p className="text-amber-100">Capturas y documentación del Producto Mínimo Viable</p>
          </div>
        </div>
      </div>

      {/* Info del proyecto */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Información del Proyecto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Nombre del Proyecto</p>
            <p className="font-semibold text-cafe-900">Café Sostenible AI</p>
          </div>
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Versión</p>
            <p className="font-semibold text-cafe-900">1.0.0 (PMV)</p>
          </div>
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Tecnología Frontend</p>
            <p className="font-semibold text-cafe-900">React + Vite + TailwindCSS</p>
          </div>
          <div className="bg-cafe-50 rounded-lg p-4">
            <p className="text-xs text-cafe-500">Estado</p>
            <p className="font-semibold text-green-600">✓ Funcional</p>
          </div>
        </div>
      </div>

      {/* Grid de evidencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evidencias.map((ev, index) => {
          const Icon = ev.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-cafe-100 overflow-hidden">
              {/* Header de la card */}
              <div className={`${ev.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{ev.categoria}</h3>
                    <p className="text-white/80 text-xs">{ev.descripcion}</p>
                  </div>
                </div>
              </div>
              
              {/* Contenido */}
              <div className="p-4">
                <ul className="space-y-2">
                  {ev.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-cafe-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )
        })}
      </div>

      {/* Comandos de instalación */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-amber-600" />
          Comandos para Ejecutar el Proyecto
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2"># Instalar dependencias</p>
            <code className="text-green-400 font-mono text-sm">cd cafe-cursor && npm install</code>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2"># Iniciar servidor de desarrollo</p>
            <code className="text-green-400 font-mono text-sm">npm run dev</code>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2"># Iniciar backend</p>
            <code className="text-green-400 font-mono text-sm">cd backend && npm install && npm start</code>
          </div>
        </div>
      </div>

      {/* Pruebas funcionales con datos reales */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Pruebas funcionales (PMV1) con SQLite real
        </h2>
        <div className="space-y-3 text-sm text-cafe-700">
          <div className="bg-cafe-50 border border-cafe-200 rounded-lg p-4">
            <p className="font-semibold text-cafe-900 mb-1">Prueba IA/ML con lote real</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Registrar productor y lote (se guarda en SQLite).</li>
              <li>Ir a Módulo IA → “Seleccionar lote”: debe aparecer solo lotes sin predicción.</li>
              <li>Presionar “Ejecutar Predicción”.</li>
              <li>Validar que en Historial aparezca 1 predicción real con lote/productor y recomendación.</li>
              <li>Validar que el lote ya no aparezca en el selector.</li>
            </ol>
          </div>
          <div className="bg-cafe-50 border border-cafe-200 rounded-lg p-4">
            <p className="font-semibold text-cafe-900 mb-1">Prueba de coherencia (Reportes vs BaseDatos)</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Crear 2 predicciones reales en Módulo IA.</li>
              <li>Ir a Reportes → IA: “Total predicciones reales” debe ser 2.</li>
              <li>Ir a Base de Datos → Predicciones IA: debe listar exactamente esas 2 (sin “Lote null”).</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Tecnologías usadas */}
      <div className="bg-white rounded-xl shadow-sm border border-cafe-100 p-6">
        <h2 className="text-lg font-semibold text-cafe-900 mb-4">Tecnologías y Herramientas</h2>
        <div className="flex flex-wrap gap-3">
          {['React 18', 'Vite', 'TailwindCSS', 'Recharts', 'Lucide React', 'React Router', 'Express', 'SQLite', 'JavaScript ES6+'].map((tech, i) => (
            <span key={i} className="px-4 py-2 bg-cafe-100 text-cafe-700 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}