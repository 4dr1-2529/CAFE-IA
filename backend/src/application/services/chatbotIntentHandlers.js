import { ChatbotDataService } from './ChatbotDataService.js'
import { RoleHelper } from '../../shared/RoleHelper.js'

export const UNKNOWN_MESSAGE =
  'No entendí la consulta. Usa las preguntas sugeridas por categoría o prueba: clientes, lotes, trazabilidad, calidad, IA o resumen del sistema.'

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

function accountScope(isAdmin, adminLabel = 'En el sistema', clientLabel = 'En tu cuenta') {
  return isAdmin ? adminLabel : clientLabel
}

function formatLoteList(rows) {
  if (!rows?.length) return 'No hay lotes en esa categoría.'
  return rows.map((r) => ChatbotDataService.formatLoteFriendly(r.codigo_lote, r.productor)).join(', ')
}

function resolveKnowledgeIntent(intent, isAdmin) {
  const knowledge = {
    project_overview: 'Café Sostenible AI es una plataforma de trazabilidad e inteligencia para lotes de café sostenible. Ayuda a registrar operaciones, evaluar calidad, predecir riesgo con Machine Learning y generar reportes técnicos.',
    project_purpose: 'Café Sostenible AI es una plataforma de trazabilidad e inteligencia para lotes de café sostenible. Ayuda a registrar operaciones, evaluar calidad, predecir riesgo con Machine Learning y generar reportes técnicos.',
    pmv1_modules: `Módulos operativos PMV1: ${PROJECT_KNOWLEDGE.pmv1Modules.join(', ')}.`,
    pmv2_info: PROJECT_KNOWLEDGE.pmv2,
    architecture_general: PROJECT_KNOWLEDGE.architecture,
    architecture_hexagonal: PROJECT_KNOWLEDGE.architecture,
    backend_flow: PROJECT_KNOWLEDGE.backendFlow,
    frontend_flow: PROJECT_KNOWLEDGE.frontendFlow,
    ml_module: PROJECT_KNOWLEDGE.mlModule,
    traceability: PROJECT_KNOWLEDGE.traceability,
    sonarqube: PROJECT_KNOWLEDGE.sonarqube,
    role_admin: PROJECT_KNOWLEDGE.adminCapabilities,
    role_cliente: PROJECT_KNOWLEDGE.clienteCapabilities,
    registro_lote: PROJECT_KNOWLEDGE.registroLote,
    tech_stack: PROJECT_KNOWLEDGE.stack,
    tech_react: 'React construye la interfaz del sistema con componentes reutilizables y navegación entre módulos.',
    tech_express: 'Express expone la API REST del backend, enruta peticiones y aplica middlewares de seguridad/validación.',
    tech_mysql: 'MySQL almacena productores, lotes, trazabilidad, calidad, predicciones, reportes y auditoría con relaciones consistentes.',
    tech_jwt: 'JWT incluye id, nombre, email y rol (admin o cliente). El backend filtra datos según el rol en cada endpoint.',
    tech_tailwind: 'Tailwind permite mantener un diseño consistente y responsive con utilidades CSS del sistema.',
    tech_node: 'Node.js ejecuta el backend JavaScript del proyecto y permite APIs rápidas y escalables.',
    global_scope_denied: 'Como CLIENTE solo puedes consultar tus propios datos (productores, lotes, producción, calidad, trazabilidad e IA de tu cuenta). Para información global contacta al administrador.',
    railway_status: 'Railway hospeda el backend Express y MySQL en producción (cafe-sostenible-api-production). El estado depende del despliegue activo; verifica el panel Railway si hay indisponibilidad.',
    vercel_status: 'Vercel hospeda el frontend React en https://cafe-ia-inky.vercel.app. Si la API responde pero la web no carga, revisa el último deploy en Vercel.',
    evidencias_pmv: 'Evidencias PMV: PMV1 incluye 9 evidencias (dashboard, productores, producción, trazabilidad, calidad, IA, reportes, chatbot, despliegue). PMV2 añade multiusuario, códigos automáticos y dataset ampliado. Consulta el módulo Evidencias PMV en el menú ADMIN.',
    historias_usuario: 'Historias de usuario HU01–HU12 cubren registro de productores, lotes, trazabilidad, control de calidad, predicciones IA, reportes, roles ADMIN/CLIENTE y chatbot. Ver módulo Historias de Usuario (solo ADMIN).',
    seguridad: 'Seguridad: autenticación JWT, contraseñas con bcrypt, RBAC (admin/cliente), filtro por user_id en endpoints de cliente, validación de entrada, auditoría de acciones y HTTPS en producción (Railway/Vercel).',
    contactar_admin: 'Para soporte contacta al administrador del sistema: admin@cafeai.com (módulo Usuarios y auditoría solo ADMIN).',
    interpretar_calidad: 'El puntaje de calidad (70–95 en demo) combina aroma, sabor, cuerpo y balance. ≥88 Excelente, ≥78 Buena, ≥68 Aceptable. Usa Control de Calidad y el dashboard para comparar lotes y productores.',
    registrar_productor: 'Ve a Productores → Nuevo productor. Completa nombre, DNI, parcela y ubicación. El código P00X se asigna automáticamente y queda vinculado a tu cuenta CLIENTE.',
    ver_reportes: 'Abre el módulo Reportes, elige tipo (Producción, Calidad, Trazabilidad o IA) y exporta PDF/Excel. Solo verás reportes de tus lotes si eres CLIENTE.',
    reportes: 'Puedes generar reportes de Producción, Calidad, Trazabilidad e Inteligencia Artificial en PDF o Excel desde el módulo Reportes. Cada exportación queda registrada en auditoría.',
    reset_password: isAdmin
      ? 'El ADMIN puede actualizar la contraseña de un cliente desde el módulo Usuarios.'
      : 'Para cambiar tu contraseña contacta al administrador.',
    temp_password: isAdmin ? undefined : 'Por seguridad no puedo mostrar contraseñas por chat.',
  }

  if (intent === 'system_modules') {
    const base = PROJECT_KNOWLEDGE.pmv1Modules.join(', ')
    return isAdmin ? `Módulos: ${base}. Solo ADMIN: ${PROJECT_KNOWLEDGE.adminOnlyModules.join(', ')}.` : `Tus módulos disponibles: ${base}.`
  }

  return knowledge[intent] ?? null
}

async function resolveCountsIntent(intent, ctx) {
  const { isAdmin, counts, user } = ctx

  if (intent === 'system_status') {
    if (isAdmin) {
      return `Resumen global (ADMIN): ${counts.clientes} clientes · ${counts.productores} productores · ${counts.lotes} lotes · ${counts.produccionKg?.toFixed?.(1) ?? counts.produccionKg} kg · ${counts.conTrazabilidad ?? 0} con trazabilidad · ${counts.sinTrazabilidad} sin trazabilidad · ${counts.conIA ?? 0} con IA · ${counts.sinIA} sin IA · ${counts.predicciones ?? 0} predicciones.`
    }
    return `Tus datos (CLIENTE): ${counts.productores} productores · ${counts.lotes} lotes · ${counts.produccionKg} kg · ${counts.conTrazabilidad ?? 0} con trazabilidad · ${counts.sinTrazabilidad} sin trazabilidad · ${counts.conIA ?? 0} con IA · ${counts.sinIA} sin IA · calidad promedio ${counts.promedioCalidad ?? 'N/D'}.`
  }

  if (intent === 'con_trazabilidad') {
    const n = counts.conTrazabilidad ?? counts.lotes - counts.sinTrazabilidad
    return `${accountScope(isAdmin)} hay ${n} lotes con trazabilidad registrada.`
  }
  if (intent === 'con_ia') {
    const n = counts.conIA ?? counts.lotes - counts.sinIA
    return `${accountScope(isAdmin)} hay ${n} lotes con predicción IA.`
  }
  if (intent === 'count_reportes') {
    return isAdmin ? `Se han generado ${counts.reportes ?? 0} reportes en el sistema.` : `Has generado ${counts.reportes ?? 0} reportes en tu cuenta.`
  }
  if (intent === 'count_auditoria') {
    if (!isAdmin) return 'Solo el ADMIN puede consultar la auditoría global.'
    return `Hay ${counts.auditoria ?? 0} registros en auditoría. Revisa Historial / Auditoría en el menú ADMIN.`
  }
  if (intent === 'count_clientes') {
    if (!isAdmin) return 'Solo el ADMIN puede consultar el total de clientes del sistema.'
    return `Hay ${counts.clientes} clientes activos registrados.`
  }
  if (intent === 'count_productores') {
    return isAdmin ? `Hay ${counts.productores} productores en total en el sistema.` : `Tienes ${counts.productores} productores registrados.`
  }
  if (intent === 'count_lotes') {
    const suffix = `${counts.conTrazabilidad ?? 0} con trazabilidad, ${counts.sinTrazabilidad} sin trazabilidad, ${counts.conIA ?? 0} con IA, ${counts.sinIA} sin IA.`
    return isAdmin ? `Hay ${counts.lotes} lotes. ${suffix}` : `Tienes ${counts.lotes} lotes. ${suffix}`
  }
  if (intent === 'sin_calidad') {
    return `${accountScope(isAdmin)} hay ${counts.sinCalidad} lotes pendientes de control de calidad.`
  }
  if (intent === 'mi_produccion') {
    if (isAdmin) return `La producción global es ${counts.produccionKg ?? 'N/D'} kg (suma de lotes). Consulta Reportes para detalle por cliente.`
    return `Tu producción total registrada es ${counts.produccionKg} kg en ${counts.lotes} lotes.`
  }
  if (intent === 'mis_datos') {
    if (isAdmin) return `Tu sesión ADMIN: ${user?.email || 'admin'}. Puedes consultar todos los datos globales del sistema.`
    return `Tus datos: ${counts.productores} productores, ${counts.lotes} lotes, ${counts.produccionKg} kg, calidad promedio ${counts.promedioCalidad ?? 'N/D'}.`
  }
  if (intent === 'mi_trazabilidad') {
    return isAdmin
      ? 'La trazabilidad global está en el módulo Trazabilidad con filtros por cliente y lote.'
      : `Tienes ${counts.conTrazabilidad ?? 0} lotes con trazabilidad y ${counts.sinTrazabilidad} sin completar. Abre Trazabilidad para registrar etapas.`
  }
  if (intent === 'mis_pendientes') {
    const parts = []
    if (counts.sinTrazabilidad) parts.push(`${counts.sinTrazabilidad} sin trazabilidad`)
    if (counts.sinIA) parts.push(`${counts.sinIA} sin predicción IA`)
    if (counts.sinCalidad) parts.push(`${counts.sinCalidad} sin control de calidad`)
    if (!parts.length) return isAdmin ? 'No hay lotes pendientes globales en esas categorías.' : 'No tienes lotes pendientes en trazabilidad, IA o calidad.'
    return isAdmin ? `Pendientes globales: ${parts.join(', ')}.` : `Tienes pendientes: ${parts.join(', ')}. Revisa Trazabilidad, Módulo IA y Control de Calidad.`
  }

  return null
}

async function resolveQueryIntent(intent, ctx) {
  const { user, isAdmin, counts } = ctx

  if (intent === 'mejor_lote') {
    const row = await ChatbotDataService.mejorLote(user)
    if (!row) return isAdmin ? 'No hay evaluaciones de calidad registradas.' : 'Aún no tienes lotes evaluados en control de calidad.'
    const label = ChatbotDataService.formatLoteFriendly(row.codigo_lote, row.productor)
    return isAdmin ? `El mejor lote es ${label} con puntaje ${row.puntaje}.` : `Tu mejor lote es ${label} con puntaje ${row.puntaje}.`
  }
  if (intent === 'peor_lote') {
    const row = await ChatbotDataService.peorLote(user)
    if (!row) return 'No hay datos de calidad para comparar.'
    const label = ChatbotDataService.formatLoteFriendly(row.codigo_lote, row.productor)
    return isAdmin ? `El lote con menor calidad es ${label} (${row.puntaje} pts).` : `Tu lote con menor calidad es ${label} (${row.puntaje} pts).`
  }
  if (intent === 'promedio_calidad') {
    const prom = isAdmin ? await ChatbotDataService.promedioCalidadGlobal(user) : counts.promedioCalidad ?? (await ChatbotDataService.promedioCalidadGlobal(user))
    return `${accountScope(isAdmin, 'El promedio global de calidad', 'Tu promedio de calidad')} es ${prom} puntos (escala 70–95 en datos demo).`
  }
  if (intent === 'productor_mejor_calidad') {
    const row = await ChatbotDataService.productorMejorCalidad(user)
    if (!row) return 'No hay productores con evaluaciones de calidad.'
    return isAdmin ? `El productor con mejor calidad promedio es ${row.nombre} (${row.puntaje} pts).` : `Tu productor con mejor calidad es ${row.nombre} (${row.puntaje} pts).`
  }
  if (intent === 'productor_mayor_produccion') {
    const row = await ChatbotDataService.productorMayorProduccion(user)
    if (!row) return 'No hay datos de producción por productor.'
    return isAdmin ? `El productor con mayor producción es ${row.nombre} con ${Number(row.kg).toFixed(1)} kg.` : `Tu productor con mayor producción es ${row.nombre} con ${Number(row.kg).toFixed(1)} kg.`
  }
  if (intent === 'produccion_mes') {
    const kg = await ChatbotDataService.produccionMes(user)
    return isAdmin ? `La producción del mes actual (por fecha de cosecha) es ${kg.toFixed(1)} kg.` : `Tu producción del mes actual es ${kg.toFixed(1)} kg.`
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
    return rows.map((r) => `${r.codigo_usuario} ${r.nombre}: ${r.productores} productores, ${r.lotes} lotes, ${Number(r.kg).toFixed(0)} kg, calidad ${r.calidad}`).join(' | ')
  }
  if (intent === 'alertas_ia' || intent === 'riesgo_alto') {
    const total = await ChatbotDataService.alertasCount(user)
    const lista = await ChatbotDataService.lotesRiesgoAlto(user, 5)
    const ejemplos = lista?.length ? formatLoteList(lista.map((r) => ({ codigo_lote: r.codigo_lote, productor: null }))) : 'ninguno'
    return `${accountScope(isAdmin)} hay ${total} alertas IA. Lotes con riesgo ≥50%: ${ejemplos}.`
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
    return `${accountScope(isAdmin)} hay ${counts.sinTrazabilidad} lotes sin trazabilidad. Ejemplos: ${formatLoteList(lista)}`
  }
  if (intent === 'sin_ia') {
    const lista = await ChatbotDataService.listLotesSinIA(user, 5)
    return `${accountScope(isAdmin)} hay ${counts.sinIA} lotes sin predicción IA. Ejemplos: ${formatLoteList(lista)}`
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
  if (intent === 'temp_password' && isAdmin) {
    return ChatbotDataService.clientPasswordHint()
  }

  return null
}

export async function resolveChatbotIntent(intent, meta = {}) {
  const user = meta.user
  const isAdmin = RoleHelper.isAdmin(user)
  const counts = await ChatbotDataService.counts(user)
  const ctx = { user, isAdmin, counts }

  const knowledge = resolveKnowledgeIntent(intent, isAdmin)
  if (knowledge) return knowledge

  const fromCounts = await resolveCountsIntent(intent, ctx)
  if (fromCounts) return fromCounts

  const fromQuery = await resolveQueryIntent(intent, ctx)
  if (fromQuery) return fromQuery

  return UNKNOWN_MESSAGE
}
