import { ActionLogService } from './ActionLogService.js'
import { resolveChatbotIntent, UNKNOWN_MESSAGE } from './chatbotIntentHandlers.js'
import { RoleHelper } from '../../shared/RoleHelper.js'

/** Frases exactas (prioridad alta) */
const EXACT_INTENTS = [
  { intent: 'project_overview', any: ['que hace cafe sostenible ai', 'que hace cafe sostenible', 'que hace el sistema', 'resume el proyecto'] },
  { intent: 'pmv1_modules', any: ['pmv1', 'incluye pmv1', 'modulos pmv1', 'que incluye pmv1'] },
  { intent: 'pmv2_info', any: ['pmv2', 'mejoras pmv2', 'que mejoras tiene pmv2'] },
  { intent: 'architecture_hexagonal', any: ['arquitectura hexagonal', 'hexagonal', 'arquitectura del proyecto'] },
  { intent: 'backend_flow', any: ['como funciona el backend'] },
  { intent: 'frontend_flow', any: ['como funciona el frontend'] },
  { intent: 'tech_react', any: ['que hace react'] },
  { intent: 'tech_express', any: ['que hace express'] },
  { intent: 'tech_mysql', any: ['que hace mysql', 'por que usan mysql', 'base de datos'] },
  { intent: 'tech_jwt', any: ['que hace jwt'] },
  { intent: 'tech_tailwind', any: ['que hace tailwind'] },
  { intent: 'tech_node', any: ['node.js', 'nodejs', 'que hace node'] },
  { intent: 'con_trazabilidad', any: ['cuantos lotes tienen trazabilidad', 'lotes con trazabilidad'] },
  { intent: 'con_ia', any: ['cuantos lotes tienen prediccion ia', 'lotes tienen ia', 'lotes con ia'] },
  { intent: 'mejor_lote', any: ['mejor lote', 'mejor lote por calidad', 'cual es mi mejor lote'] },
  { intent: 'peor_lote', any: ['menor calidad', 'peor calidad', 'lote con menor calidad'] },
  { intent: 'promedio_calidad', any: ['promedio de calidad', 'calidad promedio', 'mi calidad promedio'] },
  { intent: 'productor_mejor_calidad', any: ['productor tiene mejor calidad', 'mejor productor por calidad'] },
  { intent: 'productor_mayor_produccion', any: ['productor tiene mas produccion', 'productor con mas produccion'] },
  { intent: 'produccion_mes', any: ['produccion del mes', 'produccion mes actual', 'mi produccion del mes'] },
  { intent: 'lotes_por_etapa', any: ['lotes por etapa', 'etapas de produccion', 'en que etapas estan'] },
  { intent: 'trazabilidad_etapas', any: ['trazabilidad por etapa', 'cuanta trazabilidad por etapa'] },
  { intent: 'usuario_mas_activo', any: ['usuario mas activo', 'quien es el usuario mas activo'] },
  { intent: 'resumen_por_cliente', any: ['lotes por cliente', 'productores por cliente', 'cada cliente', 'calidad por cliente'] },
  { intent: 'alertas_ia', any: ['alertas de riesgo', 'tengo alertas', 'recomendaciones ia'] },
  { intent: 'riesgo_alto', any: ['riesgo alto', 'lotes con riesgo alto'] },
  { intent: 'railway_status', any: ['estado de railway', 'estado railway'] },
  { intent: 'vercel_status', any: ['estado de vercel', 'estado vercel'] },
  { intent: 'evidencias_pmv', any: ['evidencias pmv'] },
  { intent: 'historias_usuario', any: ['historias de usuario'] },
  { intent: 'seguridad', any: ['medidas de seguridad', 'seguridad del sistema'] },
  { intent: 'contactar_admin', any: ['contacto al administrador', 'contactar admin', 'como contacto al admin'] },
  { intent: 'mis_datos', any: ['mis datos registrados', 'cuales son mis datos'] },
  { intent: 'interpretar_calidad', any: ['interpreta el puntaje', 'como interpreto la calidad', 'como se interpreta'] },
  { intent: 'registrar_productor', any: ['como registro un productor', 'registrar productor'] },
  { intent: 'ver_reportes', any: ['como veo mis reportes', 'como veo reportes', 'mis reportes'] },
  { intent: 'count_reportes', any: ['cuantos reportes', 'reportes generados', 'reportes he generado'] },
  { intent: 'count_auditoria', any: ['cuantas acciones hay en auditoria', 'auditoria del sistema'] },
  { intent: 'mi_trazabilidad', any: ['como veo mi trazabilidad', 'ver mi trazabilidad'] },
]

const recentRequests = new Map()

function normalizeText(text = '') {
  return String(text)
    .replaceAll(/[<>]/g, '')
    .trim()
    .slice(0, 300)
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
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
  if (hasAny(clean, ['con trazabilidad', 'tienen trazabilidad']) && hasAny(clean, ['cuant', 'lotes'])) add('con_trazabilidad', 7)
  if (hasAny(clean, ['con ia', 'tienen prediccion', 'con prediccion']) && hasAny(clean, ['cuant', 'lotes'])) add('con_ia', 7)
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

  if (hasAny(clean, ['mi produccion', 'produccion total']) && hasAny(clean, ['mi', 'tengo', 'mio', 'mía', 'global'])) {
    if (hasAny(clean, ['global', 'sistema', 'total global']) && !hasAny(clean, ['mi', 'mio'])) add('global_scope_denied', 9)
    else add('mi_produccion', 7)
  }

  if (hasAny(clean, ['productor']) && hasAny(clean, ['mas produccion', 'mayor produccion'])) add('productor_mayor_produccion', 7)
  if (hasAny(clean, ['mejor lote', 'mejor calidad']) && hasAny(clean, ['lote', 'mi'])) add('mejor_lote', 7)
  if (hasAny(clean, ['peor', 'menor']) && hasAny(clean, ['calidad', 'lote'])) add('peor_lote', 7)
  if (hasAny(clean, ['promedio']) && hasAny(clean, ['calidad'])) add('promedio_calidad', 7)
  if (hasAny(clean, ['alerta', 'riesgo'])) add('alertas_ia', 6)
  if (hasAny(clean, ['railway'])) add('railway_status', 8)
  if (hasAny(clean, ['vercel'])) add('vercel_status', 8)
  if (hasAny(clean, ['evidencia'])) add('evidencias_pmv', 7)
  if (hasAny(clean, ['historia'])) add('historias_usuario', 7)
  if (hasAny(clean, ['seguridad', 'jwt', 'rbac'])) add('seguridad', 6)
  if (hasAny(clean, ['contactar', 'contacto']) && hasAny(clean, ['admin'])) add('contactar_admin', 8)
  if (hasAny(clean, ['cuantos clientes', 'total clientes', 'clientes hay'])) add('count_clientes', 8)
  if (hasAny(clean, ['clientes hay en el sistema', 'cuantos clientes hay en'])) add('global_scope_denied', 9)

  if (hasAny(clean, ['para que sirve', 'objetivo', 'beneficios', 'que problema resuelve'])) add('project_purpose', 5)
  if (hasAny(clean, ['modulos del sistema', 'modulos tiene'])) add('system_modules', 5)

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  if (ranked.length && ranked[0][1] >= 5) return ranked[0][0]
  return 'unknown'
}

function detectIntent(q) {
  if (!q) return 'unknown'
  const clean = q.replaceAll(/[^\w\s]/g, ' ').replaceAll(/\s+/g, ' ').trim()

  for (const rule of EXACT_INTENTS) {
    if (rule.any?.some((kw) => clean.includes(kw))) return rule.intent
  }

  return detectIntentScored(clean)
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
    return resolveChatbotIntent(intent, meta)
  }

  static async ask(message, meta = {}) {
    ChatbotService.checkSpam(meta)
    const question = normalizeText(message)
    const intent = detectIntent(question)
    let answer = UNKNOWN_MESSAGE

    try {
      answer = await ChatbotService.resolveAnswer(intent, meta)

      await ActionLogService.fromMeta(meta, {
        accion: 'CONSULTAR_CHATBOT',
        modulo: 'chatbot',
        descripcion: `${meta.user?.nombre || 'Usuario'} consultó Chatbot IA: ${question.slice(0, 100)}`,
        entidad: 'chatbot',
        resultado: 'exito',
        detalle: { intent, rol: RoleHelper.normalizeRol(meta.user?.rol) },
      })
    } catch (error) {
      await ActionLogService.fromMeta(meta, {
        accion: 'CONSULTAR_CHATBOT',
        modulo: 'chatbot',
        descripcion: `${meta.user?.nombre || 'Usuario'} consultó Chatbot IA (error)`,
        entidad: 'chatbot',
        resultado: 'error',
        detalle: { intent },
      })
      if (error?.status) throw error
      throw Object.assign(new Error('No fue posible procesar la consulta del chatbot en este momento.'), { status: 503 })
    }

    return { answer, intent }
  }
}
