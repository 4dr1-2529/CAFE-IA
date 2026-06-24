/** Contenido compartido PMV3 para dashboard, reportes y documentación UI */

export const PMV3_MAIN_BANNER =
  'PMV3: Integración de gestión, trazabilidad, calidad e inteligencia artificial'

export const PMV3_CHATBOT_MEJORAS_ANSWER =
  'PMV3 integra PMV1 y PMV2 en una versión unificada. Mejora el dashboard con KPIs visuales en tiempo real, la trazabilidad con línea de tiempo y porcentaje de avance, el control de calidad con indicadores y recomendaciones automáticas, el módulo IA/ML con predicción, probabilidad de riesgo y variables analizadas, los reportes con pestaña Resumen PMV3, la auditoría con tabla detallada de acciones y el chatbot con consultas sobre todos los módulos. Mantiene compatibilidad con React, Express, MySQL, Railway y Vercel.'

export const PMV3_DASHBOARD_IMPROVEMENTS = [
  { titulo: 'Integración PMV1 + PMV2', desc: 'Banner y navegación unificada con grupos Gestión, Operaciones e Inteligencia.' },
  { titulo: 'KPIs en tiempo real', desc: 'Productores, lotes trazables, evaluaciones, predicciones IA y acciones auditadas desde MySQL.' },
  { titulo: 'Trazabilidad visual', desc: 'Línea de tiempo por lote con barra de progreso y etapas completadas.' },
  { titulo: 'Calidad asistida', desc: 'Indicadores, recomendación automática y validaciones de formulario.' },
  { titulo: 'IA explicable', desc: 'Variables analizadas, probabilidad de riesgo y recomendación por lote.' },
  { titulo: 'Reportes consolidados', desc: 'Pestaña Resumen PMV3 con tabla de mejoras y evidencias.' },
]

export const PMV3_IMPROVEMENTS_TABLE = [
  { modulo: 'Sidebar / Navegación', mejora: 'PMV3 · Integrado con grupos y acceso Resumen PMV3', evidencia: 'MainLayout.jsx', estado: 'Completado' },
  { modulo: 'Dashboard', mejora: 'Banner principal, KPIs PMV3 y sección de mejoras', evidencia: 'DashboardPage.jsx', estado: 'Completado' },
  { modulo: 'Trazabilidad', mejora: 'Línea de tiempo, % avance y etapas completadas', evidencia: 'TrazabilidadTimeline.jsx', estado: 'Completado' },
  { modulo: 'Control de calidad', mejora: 'Indicadores, recomendación y validaciones', evidencia: 'ControlCalidadPage.jsx', estado: 'Completado' },
  { modulo: 'IA / Machine Learning', mejora: 'Variables, probabilidad, recomendación y explicación del modelo', evidencia: 'ModuloIAPage.jsx', estado: 'Completado' },
  { modulo: 'Chatbot IA', mejora: 'Pregunta PMV3 con respuesta de integración', evidencia: 'chatbotIntentHandlers.js', estado: 'Completado' },
  { modulo: 'Auditoría', mejora: 'Tabla usuario/acción/módulo/fecha/detalle', evidencia: 'AuditoriaPage.jsx', estado: 'Completado' },
  { modulo: 'Reportes', mejora: 'Pestaña Resumen PMV3 con tabla de mejoras', evidencia: 'ReportesPage.jsx', estado: 'Completado' },
  { modulo: 'Evidencias PMV', mejora: 'Tarjetas PMV1, PMV2 y PMV3 con estado Completado', evidencia: 'EvidenciasPMVPage.jsx', estado: 'Completado' },
]

export const PMV3_VERSION_CARDS = [
  {
    id: 'pmv1',
    titulo: 'PMV1',
    subtitulo: 'Gestión base del sistema',
    items: ['Login', 'Dashboard', 'Productores', 'Lotes', 'Producción', 'Trazabilidad', 'Calidad', 'Reportes', 'Base de datos'],
    color: 'from-emerald-600 to-green-700',
  },
  {
    id: 'pmv2',
    titulo: 'PMV2',
    subtitulo: 'IA, chatbot y auditoría',
    items: ['Chatbot IA', 'Auditoría / Historial', 'Módulo IA/ML', 'Reportes mejorados', 'Multiusuario ADMIN/CLIENTE'],
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'pmv3',
    titulo: 'PMV3',
    subtitulo: 'Integración, mejora visual, trazabilidad avanzada y calidad',
    items: ['KPIs integrados', 'Timeline visual', 'Calidad asistida', 'IA explicable', 'Resumen PMV3', 'UX unificada'],
    color: 'from-amber-500 to-orange-600',
  },
]
