import { ActionLogService } from './ActionLogService.js'
import { ChatbotDataService } from './ChatbotDataService.js'
import { RoleHelper } from '../../shared/RoleHelper.js'

const PROJECT_KNOWLEDGE = {
  pmv1Modules: ['Dashboard', 'Productores', 'Registro Producción', 'Trazabilidad', 'Control Calidad', 'Módulo IA', 'Reportes', 'Chatbot IA'],
  adminOnlyModules: ['Base de Datos', 'Auditoría / Historial', 'Usuarios', 'Evidencias PMV', 'Arquitectura', 'Historias Usuario'],
  architecture: 'El sistema usa arquitectura hexagonal: interfaces HTTP, capa de aplicación, dominio e infraestructura.',
  backendFlow: 'El backend (Node.js + Express) recibe rutas, valida datos, ejecuta servicios de aplicación y persiste en MySQL.',
  frontendFlow: 'El frontend (React + Vite + Tailwind) consume API REST con JWT y presenta dashboards, tablas, formularios y reportes.',
  mlModule:
    'El módulo IA es un modelo predictivo de Machine Learning que estima calidad del café y nivel de riesgo (bajo, medio, alto) a partir de humedad, altitud, cantidad, variedad, proceso de secado, puntaje de calidad y estado del lote.',
  traceability: 'La trazabilidad registra etapas del lote: producción, secado, control de calidad, almacenamiento y comercialización.',
  stack: 'Tecnologías principales: React, Express, Node.js, MySQL, JWT, Tailwind CSS y arquitectura hexagonal.',
  sonarqube:
    'SonarQube analiza la calidad del código (bugs, vulnerabilidades, deuda técnica y cobertura). En este proyecto se usa para validar estándares antes de entregas PMV.',
  pmv2:
    'PMV2 añade multiusuario ADMIN/CLIENTE, códigos automáticos de lote, dashboard por rol, reportes exportables, chatbot con datos reales y dataset de prueba ampliado.',
  adminCapabilities:
    'ADMIN controla todo: ve todos los clientes, productores, lotes, producción, trazabilidad, calidad, predicciones IA, reportes, auditoría global, base de datos y configuración del sistema.',
  clienteCapabilities:
    'CLIENTE solo ve su información: registra productores, lotes, producción, trazabilidad, control de calidad, predicciones IA y reportes propios. No accede a usuarios, auditoría global ni base de datos.',
  registroLote:
    'Para registrar un lote: vaya a Registro de Producción, seleccione su productor, complete cantidad, humedad, temperatura y altitud. El sistema asigna automáticamente el número y código de lote al guardar.',
}

const UNKNOWN_MESSAGE =
  'No entendí la consulta. Prueba con: cuántos clientes/lotes/productores, trazabilidad, módulo IA, reportes o resumen del sistema.'

/** Frases exactas (prioridad alta) */
const EXACT_INTENTS = [
  { intent: 'project_overview', any: ['que hace cafe sostenible ai', 'que hace cafe sostenible', 'que hace el sistema', 'resume el proyecto'] },
  { intent: 'pmv1_modules', any: ['pmv1', 'incluye pmv1', 'modulos pmv1'] },
  { intent: 'pmv2_info', any: ['pmv2', 'mejoras pmv2', 'que mejoras tiene pmv2'] },
  { intent: 'architecture_hexagonal', any: ['arquitectura hexagonal', 'hexagonal'] },
  { intent: 'backend_flow', any: ['como funciona el backend'] },
  { intent: 'frontend_flow', any: ['como funciona el frontend'] },
  { intent: 'tech_react', any: ['que hace react'] },
  { intent: 'tech_express', any: ['que hace express'] },
  { intent: 'tech_mysql', any: ['que hace mysql', 'por que usan mysql'] },
  { intent: 'tech_jwt', any: ['que hace jwt'] },
  { intent: 'tech_tailwind', any: ['que hace tailwind'] },
  { intent: 'tech_node', any: ['node.js', 'nodejs', 'que hace node'] },
]

const recentRequests = new Map()

function normalizeText(text = '') {
  return String(text)
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 300)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function hasAny(clean, words) {
  return words.some((w) => clean.includes(w))
}

function hasAll(clean, words) {
  return words.every((w) => clean.includes(w))
}

/**
 * Detección flexible por puntuación de palabras clave.
 * Variaciones como "cliente con más kg" activan la misma intención.
 */
function detectIntentScored(clean) {
  const scores = {}
  const add = (intent, pts) => {
    scores[intent] = (scores[intent] || 0) + pts
  }

  if (hasAny(clean, ['sonar', 'sonarqube'])) add('sonarqube', 8)
  if (hasAny(clean, ['pmv2', 'mejoras pmv'])) add('pmv2_info', 6)
  if (hasAny(clean, ['pmv1'])) add('pmv1_modules', 6)

  if (hasAny(clean, ['trazabilidad', 'seguimiento del cafe', 'seguimiento cafe'])) add('traceability', 7)
  if (hasAny(clean, ['machine learning', 'modelo predictivo', 'modulo ia', 'modulo de ia', 'prediccion ia', 'inteligencia artificial'])) add('ml_module', 7)

  if (hasAny(clean, ['tecnologias', 'stack tecnologico', 'que tecnologias'])) add('tech_stack', 6)
  if (hasAny(clean, ['arquitectura'])) add('architecture_general', 5)

  if (hasAny(clean, ['resumen global', 'estado del sistema', 'resumen del sistema'])) add('system_status', 8)

  if (hasAny(clean, ['contrasena temporal', 'password temporal', 'contrasena para clientes', 'contrasena de clientes'])) add('temp_password', 9)
  if (hasAny(clean, ['resetear contrasena', 'resetear password', 'cambiar contrasena'])) add('reset_password', 7)

  if (hasAny(clean, ['usuarios activos', 'usuarios estan activos', 'que usuarios estan activos'])) add('usuarios_activos', 7)
  if (hasAny(clean, ['acciones recientes', 'acciones de clientes', 'hicieron los clientes'])) add('acciones_recientes', 7)

  if (hasAny(clean, ['que puede hacer el admin', 'rol admin', 'administrador puede', 'puede hacer un admin'])) add('role_admin', 7)
  if (hasAny(clean, ['que puede hacer el cliente', 'rol cliente', 'mi rol cliente', 'puede hacer un cliente'])) add('role_cliente', 7)

  if (hasAny(clean, ['como registro un lote', 'como registro lote', 'registrar un lote', 'registrar lote'])) add('registro_lote', 7)
  if (hasAny(clean, ['que reportes', 'reportes puedo', 'generar reportes'])) add('reportes', 6)

  if (hasAny(clean, ['sin trazabilidad', 'no tienen trazabilidad', 'pendientes trazabilidad', 'sin traza'])) add('sin_trazabilidad', 7)
  if (hasAny(clean, ['sin ia', 'sin prediccion', 'no tienen prediccion', 'pendientes ia', 'sin inteligencia'])) add('sin_ia', 7)
  if (hasAny(clean, ['pendientes calidad', 'sin control de calidad', 'control calidad pendiente'])) add('sin_calidad', 6)
  if (hasAny(clean, ['lotes pendientes', 'tengo pendientes', 'mis pendientes', 'que lotes tengo pendientes'])) add('mis_pendientes', 7)

  if (hasAny(clean, ['cliente']) && hasAny(clean, ['mas lotes', 'mayor lotes', 'mas lotes'])) add('cliente_mas_lotes', 8)
  if (
    hasAny(clean, ['cliente']) &&
    hasAny(clean, ['produccion', 'kg', 'kilo', 'kilogramo']) &&
    hasAny(clean, ['mayor', 'mas', 'maximo', 'top'])
  ) {
    add('cliente_mayor_produccion', 9)
  }

  if (hasAny(clean, ['cliente']) && hasAny(clean, ['cuant', 'total', 'hay', 'numero', 'cuantos'])) add('count_clientes', 8)
  else if (hasAny(clean, ['cuant', 'total', 'hay', 'cuantos']) && hasAny(clean, ['productor'])) add('count_productores', 7)
  else if (hasAny(clean, ['cuant', 'total', 'hay', 'cuantos']) && hasAny(clean, ['lote'])) add('count_lotes', 7)

  if (hasAny(clean, ['mi produccion', 'produccion total']) && hasAny(clean, ['mi', 'tengo', 'mio', 'mía'])) add('mi_produccion', 7)

  if (hasAny(clean, ['para que sirve', 'objetivo', 'beneficios', 'que problema resuelve'])) add('project_purpose', 5)
  if (hasAny(clean, ['modulos del sistema', 'modulos tiene'])) add('system_modules', 5)

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  if (ranked.length && ranked[0][1] >= 5) return ranked[0][0]
  return 'unknown'
}

function detectIntent(q) {
  if (!q) return 'unknown'
  const clean = q.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()

  for (const rule of EXACT_INTENTS) {
    if (rule.any?.some((kw) => clean.includes(kw))) return rule.intent
  }

  return detectIntentScored(clean)
}

function formatLoteList(rows) {
  if (!rows?.length) return 'No hay lotes en esa categoría.'
  return rows.map((r) => r.codigo_lote).join(', ')
}

export class ChatbotService {
  static antiSpamKey(meta = {}) {
    return String(meta.user?.sub || meta.ip || 'anon')
  }

  static checkSpam(meta = {}) {
    const key = ChatbotService.antiSpamKey(meta)
    const now = Date.now()
    const prev = recentRequests.get(key) || 0
    recentRequests.set(key, now)
    if (now - prev < 700) {
      throw Object.assign(new Error('Espera un momento antes de enviar otra consulta.'), { status: 429 })
    }
  }

  static async resolveAnswer(intent, meta = {}) {
    const user = meta.user
    const isAdmin = RoleHelper.isAdmin(user)
    const counts = await ChatbotDataService.counts(user)

    if (intent === 'project_overview' || intent === 'project_purpose') {
      return 'Café Sostenible AI es una plataforma de trazabilidad e inteligencia para lotes de café sostenible. Ayuda a registrar operaciones, evaluar calidad, predecir riesgo con Machine Learning y generar reportes técnicos.'
    }
    if (intent === 'pmv1_modules') return `Módulos operativos PMV1: ${PROJECT_KNOWLEDGE.pmv1Modules.join(', ')}.`
    if (intent === 'pmv2_info') return PROJECT_KNOWLEDGE.pmv2
    if (intent === 'system_modules') {
      const base = PROJECT_KNOWLEDGE.pmv1Modules.join(', ')
      if (isAdmin) return `Módulos: ${base}. Solo ADMIN: ${PROJECT_KNOWLEDGE.adminOnlyModules.join(', ')}.`
      return `Tus módulos disponibles: ${base}.`
    }
    if (intent === 'architecture_general' || intent === 'architecture_hexagonal') return PROJECT_KNOWLEDGE.architecture
    if (intent === 'backend_flow') return PROJECT_KNOWLEDGE.backendFlow
    if (intent === 'frontend_flow') return PROJECT_KNOWLEDGE.frontendFlow
    if (intent === 'ml_module') return PROJECT_KNOWLEDGE.mlModule
    if (intent === 'traceability') return PROJECT_KNOWLEDGE.traceability
    if (intent === 'sonarqube') return PROJECT_KNOWLEDGE.sonarqube
    if (intent === 'role_admin') return PROJECT_KNOWLEDGE.adminCapabilities
    if (intent === 'role_cliente') return PROJECT_KNOWLEDGE.clienteCapabilities
    if (intent === 'registro_lote') return PROJECT_KNOWLEDGE.registroLote
    if (intent === 'tech_stack') return PROJECT_KNOWLEDGE.stack
    if (intent === 'tech_react') return 'React construye la interfaz del sistema con componentes reutilizables y navegación entre módulos.'
    if (intent === 'tech_express') return 'Express expone la API REST del backend, enruta peticiones y aplica middlewares de seguridad/validación.'
    if (intent === 'tech_mysql') return 'MySQL almacena productores, lotes, trazabilidad, calidad, predicciones, reportes y auditoría con relaciones consistentes.'
    if (intent === 'tech_jwt') return 'JWT incluye id, nombre, email y rol (admin o cliente). El backend filtra datos según el rol en cada endpoint.'
    if (intent === 'tech_tailwind') return 'Tailwind permite mantener un diseño consistente y responsive con utilidades CSS del sistema.'
    if (intent === 'tech_node') return 'Node.js ejecuta el backend JavaScript del proyecto y permite APIs rápidas y escalables.'

    if (intent === 'system_status') {
      if (isAdmin) {
        return `Resumen global (ADMIN): ${counts.clientes} clientes · ${counts.productores} productores · ${counts.lotes} lotes · ${counts.sinTrazabilidad} sin trazabilidad · ${counts.sinIA} sin predicción IA · ${counts.sinCalidad} sin control de calidad.`
      }
      return `Tus datos (CLIENTE): ${counts.productores} productores · ${counts.lotes} lotes · ${counts.produccionKg} kg · ${counts.sinTrazabilidad} sin trazabilidad · ${counts.sinIA} sin IA.`
    }

    if (intent === 'count_clientes') {
      if (!isAdmin) return 'Solo el ADMIN puede consultar el total de clientes del sistema.'
      return `Hay ${counts.clientes} clientes activos registrados.`
    }
    if (intent === 'count_productores') {
      if (isAdmin) return `Hay ${counts.productores} productores en total en el sistema.`
      return `Tienes ${counts.productores} productores registrados.`
    }
    if (intent === 'count_lotes') {
      if (isAdmin) return `Hay ${counts.lotes} lotes en total. ${counts.sinTrazabilidad} sin trazabilidad y ${counts.sinIA} sin predicción IA.`
      return `Tienes ${counts.lotes} lotes. ${counts.sinTrazabilidad} sin trazabilidad y ${counts.sinIA} sin predicción IA.`
    }
    if (intent === 'cliente_mas_lotes') {
      if (!isAdmin) return 'Solo el ADMIN puede ver qué cliente tiene más lotes.'
      const row = await ChatbotDataService.clienteConMasLotes()
      return row ? `El cliente con más lotes es ${row.nombre} con ${row.lotes} lotes.` : 'No hay datos de clientes con lotes.'
    }
    if (intent === 'cliente_mayor_produccion') {
      if (!isAdmin) return 'Solo el ADMIN puede ver el ranking de producción por cliente.'
      const row = await ChatbotDataService.clienteMayorProduccion()
      return row ? `El cliente con mayor producción es ${row.nombre} con ${Number(row.kg).toFixed(1)} kg.` : 'No hay datos de producción por cliente.'
    }
    if (intent === 'sin_trazabilidad') {
      const lista = await ChatbotDataService.listLotesSinTrazabilidad(user, 5)
      const scope = isAdmin ? 'En el sistema' : 'En tu cuenta'
      return `${scope} hay ${counts.sinTrazabilidad} lotes sin trazabilidad. Ejemplos: ${formatLoteList(lista)}`
    }
    if (intent === 'sin_ia') {
      const lista = await ChatbotDataService.listLotesSinIA(user, 5)
      const scope = isAdmin ? 'En el sistema' : 'En tu cuenta'
      return `${scope} hay ${counts.sinIA} lotes sin predicción IA. Ejemplos: ${formatLoteList(lista)}`
    }
    if (intent === 'sin_calidad') {
      const scope = isAdmin ? 'En el sistema' : 'En tu cuenta'
      return `${scope} hay ${counts.sinCalidad} lotes pendientes de control de calidad.`
    }
    if (intent === 'mi_produccion') {
      if (isAdmin) return `La producción global es ${counts.produccionKg ?? 'N/D'} kg (suma de lotes). Consulta Reportes para detalle por cliente.`
      return `Tu producción total registrada es ${counts.produccionKg} kg en ${counts.lotes} lotes.`
    }
    if (intent === 'mis_pendientes') {
      const parts = []
      if (counts.sinTrazabilidad) parts.push(`${counts.sinTrazabilidad} sin trazabilidad`)
      if (counts.sinIA) parts.push(`${counts.sinIA} sin predicción IA`)
      if (counts.sinCalidad) parts.push(`${counts.sinCalidad} sin control de calidad`)
      if (!parts.length) return isAdmin ? 'No hay lotes pendientes globales en esas categorías.' : 'No tienes lotes pendientes en trazabilidad, IA o calidad.'
      return isAdmin
        ? `Pendientes globales: ${parts.join(', ')}.`
        : `Tienes pendientes: ${parts.join(', ')}. Revisa Trazabilidad, Módulo IA y Control de Calidad.`
    }
    if (intent === 'reportes') {
      return 'Puedes generar reportes de Producción, Calidad, Trazabilidad e Inteligencia Artificial en PDF o Excel desde el módulo Reportes. Cada exportación queda registrada en auditoría.'
    }
    if (intent === 'usuarios_activos') {
      if (!isAdmin) return 'Solo el ADMIN puede listar usuarios activos del sistema.'
      const rows = await ChatbotDataService.usuariosActivos()
      if (!rows.length) return 'No hay usuarios activos.'
      return `Usuarios activos (${rows.length}): ${rows.map((r) => `${r.nombre} (${r.email})`).join('; ')}.`
    }
    if (intent === 'acciones_recientes') {
      if (!isAdmin) return 'Solo el ADMIN puede ver acciones recientes de otros clientes.'
      const rows = await ChatbotDataService.accionesRecientesClientes()
      if (!rows.length) return 'No hay acciones recientes de clientes.'
      return rows.map((r) => `${r.usuario}: ${r.descripcion || r.accion}`).join(' · ')
    }
    if (intent === 'reset_password') {
      if (!isAdmin) return 'Para cambiar tu contraseña contacta al administrador.'
      return 'El ADMIN puede actualizar la contraseña de un cliente desde el módulo Usuarios.'
    }
    if (intent === 'temp_password') {
      if (!isAdmin) return 'Por seguridad no puedo mostrar contraseñas por chat.'
      return ChatbotDataService.clientPasswordHint()
    }

    return UNKNOWN_MESSAGE
  }

  static async ask(message, meta = {}) {
    ChatbotService.checkSpam(meta)
    const question = normalizeText(message)
    const intent = detectIntent(question)
    let answer = UNKNOWN_MESSAGE

    try {
      answer = await ChatbotService.resolveAnswer(intent, meta)

      await ActionLogService.log({
        usuarioId: meta.user?.sub || null,
        accion: 'CONSULTAR_CHATBOT',
        modulo: 'chatbot',
        descripcion: question.slice(0, 120),
        entidad: 'chatbot',
        resultado: 'exito',
        ip: meta.ip,
        userAgent: meta.userAgent,
        detalle: { intent, rol: RoleHelper.normalizeRol(meta.user?.rol) },
      })
    } catch (error) {
      await ActionLogService.log({
        usuarioId: meta.user?.sub || null,
        accion: 'CONSULTAR_CHATBOT',
        modulo: 'chatbot',
        descripcion: question.slice(0, 120),
        entidad: 'chatbot',
        resultado: 'error',
        ip: meta.ip,
        userAgent: meta.userAgent,
        detalle: { intent },
      })
      if (error?.status) throw error
      throw Object.assign(new Error('No fue posible procesar la consulta del chatbot en este momento.'), { status: 503 })
    }

    return { answer, intent }
  }
}
