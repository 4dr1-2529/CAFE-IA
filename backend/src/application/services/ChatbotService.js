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
  'No entendí la consulta. Usa las preguntas sugeridas por categoría o prueba: clientes, lotes, trazabilidad, calidad, IA o resumen del sistema.'

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
  const clean = q.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()

  for (const rule of EXACT_INTENTS) {
    if (rule.any?.some((kw) => clean.includes(kw))) return rule.intent
  }

  return detectIntentScored(clean)
}

function formatLoteList(rows) {
  if (!rows?.length) return 'No hay lotes en esa categoría.'
  return rows
    .map((r) => ChatbotDataService.formatLoteFriendly(r.codigo_lote, r.productor))
    .join(', ')
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
        return `Resumen global (ADMIN): ${counts.clientes} clientes · ${counts.productores} productores · ${counts.lotes} lotes · ${counts.produccionKg?.toFixed?.(1) ?? counts.produccionKg} kg · ${counts.conTrazabilidad ?? 0} con trazabilidad · ${counts.sinTrazabilidad} sin trazabilidad · ${counts.conIA ?? 0} con IA · ${counts.sinIA} sin IA · ${counts.predicciones ?? 0} predicciones.`
      }
      return `Tus datos (CLIENTE): ${counts.productores} productores · ${counts.lotes} lotes · ${counts.produccionKg} kg · ${counts.conTrazabilidad ?? 0} con trazabilidad · ${counts.sinTrazabilidad} sin trazabilidad · ${counts.conIA ?? 0} con IA · ${counts.sinIA} sin IA · calidad promedio ${counts.promedioCalidad ?? 'N/D'}.`
    }

    if (intent === 'global_scope_denied') {
      return 'Como CLIENTE solo puedes consultar tus propios datos (productores, lotes, producción, calidad, trazabilidad e IA de tu cuenta). Para información global contacta al administrador.'
    }

    if (intent === 'con_trazabilidad') {
      const n = counts.conTrazabilidad ?? counts.lotes - counts.sinTrazabilidad
      const scope = isAdmin ? 'En el sistema' : 'En tu cuenta'
      return `${scope} hay ${n} lotes con trazabilidad registrada.`
    }
    if (intent === 'con_ia') {
      const n = counts.conIA ?? counts.lotes - counts.sinIA
      const scope = isAdmin ? 'En el sistema' : 'En tu cuenta'
      return `${scope} hay ${n} lotes con predicción IA.`
    }

    if (intent === 'mejor_lote') {
      const row = await ChatbotDataService.mejorLote(user)
      if (!row) return isAdmin ? 'No hay evaluaciones de calidad registradas.' : 'Aún no tienes lotes evaluados en control de calidad.'
      const label = ChatbotDataService.formatLoteFriendly(row.codigo_lote, row.productor)
      return isAdmin
        ? `El mejor lote es ${label} con puntaje ${row.puntaje}.`
        : `Tu mejor lote es ${label} con puntaje ${row.puntaje}.`
    }
    if (intent === 'peor_lote') {
      const row = await ChatbotDataService.peorLote(user)
      if (!row) return 'No hay datos de calidad para comparar.'
      const label = ChatbotDataService.formatLoteFriendly(row.codigo_lote, row.productor)
      return isAdmin
        ? `El lote con menor calidad es ${label} (${row.puntaje} pts).`
        : `Tu lote con menor calidad es ${label} (${row.puntaje} pts).`
    }
    if (intent === 'promedio_calidad') {
      const prom = isAdmin ? await ChatbotDataService.promedioCalidadGlobal(user) : counts.promedioCalidad ?? (await ChatbotDataService.promedioCalidadGlobal(user))
      const scope = isAdmin ? 'El promedio global de calidad' : 'Tu promedio de calidad'
      return `${scope} es ${prom} puntos (escala 70–95 en datos demo).`
    }
    if (intent === 'productor_mejor_calidad') {
      const row = await ChatbotDataService.productorMejorCalidad(user)
      if (!row) return 'No hay productores con evaluaciones de calidad.'
      return isAdmin
        ? `El productor con mejor calidad promedio es ${row.nombre} (${row.puntaje} pts).`
        : `Tu productor con mejor calidad es ${row.nombre} (${row.puntaje} pts).`
    }
    if (intent === 'productor_mayor_produccion') {
      const row = await ChatbotDataService.productorMayorProduccion(user)
      if (!row) return 'No hay datos de producción por productor.'
      return isAdmin
        ? `El productor con mayor producción es ${row.nombre} con ${Number(row.kg).toFixed(1)} kg.`
        : `Tu productor con mayor producción es ${row.nombre} con ${Number(row.kg).toFixed(1)} kg.`
    }
    if (intent === 'produccion_mes') {
      const kg = await ChatbotDataService.produccionMes(user)
      return isAdmin
        ? `La producción del mes actual (por fecha de cosecha) es ${kg.toFixed(1)} kg.`
        : `Tu producción del mes actual es ${kg.toFixed(1)} kg.`
    }
    if (intent === 'lotes_por_etapa') {
      const rows = await ChatbotDataService.lotesPorEtapa(user)
      if (!rows?.length) return 'No hay lotes por etapa.'
      const txt = rows.map((r) => `${r.estado}: ${r.c}`).join(' · ')
      return isAdmin ? `Lotes por etapa: ${txt}.` : `Tus lotes por etapa: ${txt}.`
    }
    if (intent === 'trazabilidad_etapas') {
      const rows = await ChatbotDataService.trazabilidadPorEtapa(user)
      if (!rows?.length) return 'No hay registros de trazabilidad.'
      return `Trazabilidad por etapa: ${rows.map((r) => `${r.etapa}: ${r.c}`).join(' · ')}.`
    }
    if (intent === 'usuario_mas_activo') {
      if (!isAdmin) return 'Solo el ADMIN puede ver el usuario más activo del sistema.'
      const row = await ChatbotDataService.usuarioMasActivo()
      return row ? `El usuario más activo es ${row.nombre} con ${row.acciones} acciones en auditoría.` : 'No hay actividad registrada.'
    }
    if (intent === 'resumen_por_cliente') {
      if (!isAdmin) return 'Solo el ADMIN puede ver el desglose por cliente.'
      const rows = await ChatbotDataService.resumenPorCliente()
      if (!rows?.length) return 'No hay clientes registrados.'
      return rows
        .map((r) => `${r.codigo_usuario} ${r.nombre}: ${r.productores} productores, ${r.lotes} lotes, ${Number(r.kg).toFixed(0)} kg, calidad ${r.calidad}`)
        .join(' | ')
    }
    if (intent === 'alertas_ia' || intent === 'riesgo_alto') {
      const total = await ChatbotDataService.alertasCount(user)
      const lista = await ChatbotDataService.lotesRiesgoAlto(user, 5)
      const scope = isAdmin ? 'En el sistema' : 'En tu cuenta'
      const ejemplos = lista?.length ? formatLoteList(lista.map((r) => ({ codigo_lote: r.codigo_lote, productor: null }))) : 'ninguno'
      return `${scope} hay ${total} alertas IA. Lotes con riesgo ≥50%: ${ejemplos}.`
    }
    if (intent === 'railway_status') {
      return 'Railway hospeda el backend Express y MySQL en producción (cafe-sostenible-api-production). El estado depende del despliegue activo; verifica el panel Railway si hay indisponibilidad.'
    }
    if (intent === 'vercel_status') {
      return 'Vercel hospeda el frontend React en https://cafe-ia-inky.vercel.app. Si la API responde pero la web no carga, revisa el último deploy en Vercel.'
    }
    if (intent === 'evidencias_pmv') {
      return 'Evidencias PMV: PMV1 incluye 9 evidencias (dashboard, productores, producción, trazabilidad, calidad, IA, reportes, chatbot, despliegue). PMV2 añade multiusuario, códigos automáticos y dataset ampliado. Consulta el módulo Evidencias PMV en el menú ADMIN.'
    }
    if (intent === 'historias_usuario') {
      return 'Historias de usuario HU01–HU12 cubren registro de productores, lotes, trazabilidad, control de calidad, predicciones IA, reportes, roles ADMIN/CLIENTE y chatbot. Ver módulo Historias de Usuario (solo ADMIN).'
    }
    if (intent === 'seguridad') {
      return 'Seguridad: autenticación JWT, contraseñas con bcrypt, RBAC (admin/cliente), filtro por user_id en endpoints de cliente, validación de entrada, auditoría de acciones y HTTPS en producción (Railway/Vercel).'
    }
    if (intent === 'contactar_admin') {
      return 'Para soporte contacta al administrador del sistema: admin@cafeai.com (módulo Usuarios y auditoría solo ADMIN).'
    }
    if (intent === 'mis_datos') {
      if (isAdmin) return `Tu sesión ADMIN: ${user?.email || 'admin'}. Puedes consultar todos los datos globales del sistema.`
      return `Tus datos: ${counts.productores} productores, ${counts.lotes} lotes, ${counts.produccionKg} kg, calidad promedio ${counts.promedioCalidad ?? 'N/D'}.`
    }
    if (intent === 'interpretar_calidad') {
      return 'El puntaje de calidad (70–95 en demo) combina aroma, sabor, cuerpo y balance. ≥88 Excelente, ≥78 Buena, ≥68 Aceptable. Usa Control de Calidad y el dashboard para comparar lotes y productores.'
    }
    if (intent === 'registrar_productor') {
      return 'Ve a Productores → Nuevo productor. Completa nombre, DNI, parcela y ubicación. El código P00X se asigna automáticamente y queda vinculado a tu cuenta CLIENTE.'
    }
    if (intent === 'ver_reportes') {
      return 'Abre el módulo Reportes, elige tipo (Producción, Calidad, Trazabilidad o IA) y exporta PDF/Excel. Solo verás reportes de tus lotes si eres CLIENTE.'
    }
    if (intent === 'count_reportes') {
      return isAdmin
        ? `Se han generado ${counts.reportes ?? 0} reportes en el sistema.`
        : `Has generado ${counts.reportes ?? 0} reportes en tu cuenta.`
    }
    if (intent === 'count_auditoria') {
      if (!isAdmin) return 'Solo el ADMIN puede consultar la auditoría global.'
      return `Hay ${counts.auditoria ?? 0} registros en auditoría. Revisa Historial / Auditoría en el menú ADMIN.`
    }
    if (intent === 'mi_trazabilidad') {
      return isAdmin
        ? 'La trazabilidad global está en el módulo Trazabilidad con filtros por cliente y lote.'
        : `Tienes ${counts.conTrazabilidad ?? 0} lotes con trazabilidad y ${counts.sinTrazabilidad} sin completar. Abre Trazabilidad para registrar etapas.`
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
      if (isAdmin) {
        return `Hay ${counts.lotes} lotes. ${counts.conTrazabilidad ?? 0} con trazabilidad, ${counts.sinTrazabilidad} sin trazabilidad, ${counts.conIA ?? 0} con IA, ${counts.sinIA} sin IA.`
      }
      return `Tienes ${counts.lotes} lotes. ${counts.conTrazabilidad ?? 0} con trazabilidad, ${counts.sinTrazabilidad} sin trazabilidad, ${counts.conIA ?? 0} con IA, ${counts.sinIA} sin IA.`
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
