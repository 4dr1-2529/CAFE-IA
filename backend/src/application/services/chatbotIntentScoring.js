/** Frases exactas (prioridad alta) */
export const EXACT_INTENTS = [
  { intent: 'project_overview', any: ['que hace cafe sostenible ai', 'que hace cafe sostenible', 'que hace el sistema', 'resume el proyecto'] },
  { intent: 'pmv3_mejoras', any: ['que mejoras incluye el pmv3', 'mejoras del pmv3', 'mejoras pmv3', 'que incluye pmv3'] },
  { intent: 'pmv3_info', any: ['pmv3', 'que es pmv3', 'version pmv3', 'que incluye pmv3', 'mejoras pmv3'] },
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

function hasAny(clean, words) {
  return words.some((w) => clean.includes(w))
}

/** Reglas simples: si coincide alguna palabra clave, suma puntos al intent */
const KEYWORD_RULES = [
  { intent: 'sonarqube', pts: 8, any: ['sonar', 'sonarqube'] },
  { intent: 'pmv3_info', pts: 8, any: ['pmv3', 'version integrada', 'pmv3 integra'] },
  { intent: 'pmv2_info', pts: 6, any: ['pmv2', 'mejoras pmv'] },
  { intent: 'pmv1_modules', pts: 6, any: ['pmv1'] },
  { intent: 'traceability', pts: 7, any: ['trazabilidad', 'seguimiento del cafe', 'seguimiento cafe'] },
  { intent: 'ml_module', pts: 7, any: ['machine learning', 'modelo predictivo', 'modulo ia', 'modulo de ia', 'prediccion ia', 'inteligencia artificial'] },
  { intent: 'tech_stack', pts: 6, any: ['tecnologias', 'stack tecnologico', 'que tecnologias'] },
  { intent: 'architecture_general', pts: 5, any: ['arquitectura'] },
  { intent: 'system_status', pts: 8, any: ['resumen global', 'estado del sistema', 'resumen del sistema'] },
  { intent: 'temp_password', pts: 9, any: ['contrasena temporal', 'password temporal', 'contrasena para clientes', 'contrasena de clientes'] },
  { intent: 'reset_password', pts: 7, any: ['resetear contrasena', 'resetear password', 'cambiar contrasena'] },
  { intent: 'usuarios_activos', pts: 7, any: ['usuarios activos', 'usuarios estan activos', 'que usuarios estan activos'] },
  { intent: 'acciones_recientes', pts: 7, any: ['acciones recientes', 'acciones de clientes', 'hicieron los clientes'] },
  { intent: 'role_admin', pts: 7, any: ['que puede hacer el admin', 'rol admin', 'administrador puede', 'puede hacer un admin'] },
  { intent: 'role_cliente', pts: 7, any: ['que puede hacer el cliente', 'rol cliente', 'mi rol cliente', 'puede hacer un cliente'] },
  { intent: 'registro_lote', pts: 7, any: ['como registro un lote', 'como registro lote', 'registrar un lote', 'registrar lote'] },
  { intent: 'reportes', pts: 6, any: ['que reportes', 'reportes puedo', 'generar reportes'] },
  { intent: 'sin_trazabilidad', pts: 7, any: ['sin trazabilidad', 'no tienen trazabilidad', 'pendientes trazabilidad', 'sin traza'] },
  { intent: 'sin_ia', pts: 7, any: ['sin ia', 'sin prediccion', 'no tienen prediccion', 'pendientes ia', 'sin inteligencia'] },
  { intent: 'sin_calidad', pts: 6, any: ['pendientes calidad', 'sin control de calidad', 'control calidad pendiente'] },
  { intent: 'mis_pendientes', pts: 7, any: ['lotes pendientes', 'tengo pendientes', 'mis pendientes', 'que lotes tengo pendientes'] },
  { intent: 'cliente_mas_lotes', pts: 8, any: ['cliente'], alsoAny: ['mas lotes', 'mayor lotes'] },
  { intent: 'productor_mayor_produccion', pts: 7, any: ['productor'], alsoAny: ['mas produccion', 'mayor produccion'] },
  { intent: 'mejor_lote', pts: 7, any: ['mejor lote', 'mejor calidad'], alsoAny: ['lote', 'mi'] },
  { intent: 'peor_lote', pts: 7, any: ['peor', 'menor'], alsoAny: ['calidad', 'lote'] },
  { intent: 'promedio_calidad', pts: 7, any: ['promedio'], alsoAny: ['calidad'] },
  { intent: 'alertas_ia', pts: 6, any: ['alerta', 'riesgo'] },
  { intent: 'railway_status', pts: 8, any: ['railway'] },
  { intent: 'vercel_status', pts: 8, any: ['vercel'] },
  { intent: 'evidencias_pmv', pts: 7, any: ['evidencia'] },
  { intent: 'historias_usuario', pts: 7, any: ['historia'] },
  { intent: 'seguridad', pts: 6, any: ['seguridad', 'jwt', 'rbac'] },
  { intent: 'count_clientes', pts: 8, any: ['cuantos clientes', 'total clientes', 'clientes hay'] },
  { intent: 'global_scope_denied', pts: 9, any: ['clientes hay en el sistema', 'cuantos clientes hay en'] },
  { intent: 'project_purpose', pts: 5, any: ['para que sirve', 'objetivo', 'beneficios', 'que problema resuelve'] },
  { intent: 'system_modules', pts: 5, any: ['modulos del sistema', 'modulos tiene'] },
]

function applyKeywordRules(clean, add) {
  for (const rule of KEYWORD_RULES) {
    if (!hasAny(clean, rule.any)) continue
    if (rule.alsoAny && !hasAny(clean, rule.alsoAny)) continue
    add(rule.intent, rule.pts)
  }
}

function applyCompositeRules(clean, add) {
  if (hasAny(clean, ['con trazabilidad', 'tienen trazabilidad']) && hasAny(clean, ['cuant', 'lotes'])) {
    add('con_trazabilidad', 7)
  }
  if (hasAny(clean, ['con ia', 'tienen prediccion', 'con prediccion']) && hasAny(clean, ['cuant', 'lotes'])) {
    add('con_ia', 7)
  }
  if (
    hasAny(clean, ['cliente']) &&
    hasAny(clean, ['produccion', 'kg', 'kilo', 'kilogramo']) &&
    hasAny(clean, ['mayor', 'mas', 'maximo', 'top'])
  ) {
    add('cliente_mayor_produccion', 9)
  }
  if (hasAny(clean, ['contactar', 'contacto']) && hasAny(clean, ['admin'])) {
    add('contactar_admin', 8)
  }
}

function applyCountRules(clean, add) {
  const countWords = ['cuant', 'total', 'hay', 'numero', 'cuantos']
  if (hasAny(clean, ['cliente']) && hasAny(clean, countWords)) {
    add('count_clientes', 8)
    return
  }
  if (hasAny(clean, countWords) && hasAny(clean, ['productor'])) {
    add('count_productores', 7)
    return
  }
  if (hasAny(clean, countWords) && hasAny(clean, ['lote'])) {
    add('count_lotes', 7)
  }
}

function applyProduccionRules(clean, add) {
  if (!hasAny(clean, ['mi produccion', 'produccion total'])) return
  if (!hasAny(clean, ['mi', 'tengo', 'mio', 'mía', 'global'])) return

  const isGlobal = hasAny(clean, ['global', 'sistema', 'total global']) && !hasAny(clean, ['mi', 'mio'])
  add(isGlobal ? 'global_scope_denied' : 'mi_produccion', isGlobal ? 9 : 7)
}

function detectIntentScored(clean) {
  const scores = {}
  const add = (intent, pts) => {
    scores[intent] = (scores[intent] || 0) + pts
  }

  applyKeywordRules(clean, add)
  applyCompositeRules(clean, add)
  applyCountRules(clean, add)
  applyProduccionRules(clean, add)

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  if (ranked.length && ranked[0][1] >= 5) return ranked[0][0]
  return 'unknown'
}

export function detectIntent(q) {
  if (!q) return 'unknown'
  const clean = q.replaceAll(/[^\w\s]/g, ' ').replaceAll(/\s+/g, ' ').trim()

  for (const rule of EXACT_INTENTS) {
    if (rule.any?.some((kw) => clean.includes(kw))) return rule.intent
  }

  return detectIntentScored(clean)
}
