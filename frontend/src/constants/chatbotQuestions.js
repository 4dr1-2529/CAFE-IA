/** Preguntas sugeridas del Chatbot IA por rol y categoría */

export const CHATBOT_CATEGORIES_ADMIN = [
  {
    category: 'Preguntas generales',
    questions: [
      '¿Qué hace el sistema?',
      '¿Cuál es el resumen global del sistema?',
      '¿Qué incluye PMV1?',
      '¿Qué mejoras tiene PMV2?',
      '¿Cuál es la arquitectura del proyecto?',
      '¿Qué tecnologías usa el stack?',
      '¿Qué módulos tiene el sistema?',
      '¿Cuál es el objetivo del proyecto?',
    ],
  },
  {
    category: 'Producción',
    questions: [
      '¿Cuántos clientes hay?',
      '¿Cuántos productores hay en total?',
      '¿Cuántos lotes hay en total?',
      '¿Cuál es la producción total en kg?',
      '¿Qué cliente tiene mayor producción?',
      '¿Qué productor tiene más producción?',
      '¿Cuál es la producción del mes actual?',
      '¿Cuántos lotes hay por etapa de producción?',
    ],
  },
  {
    category: 'Trazabilidad',
    questions: [
      '¿Cómo funciona la trazabilidad?',
      '¿Cuántos lotes tienen trazabilidad?',
      '¿Cuántos lotes no tienen trazabilidad?',
      '¿Qué lotes no tienen trazabilidad?',
      '¿Cuánta trazabilidad hay por etapa?',
      '¿Qué etapas registra la trazabilidad?',
    ],
  },
  {
    category: 'Calidad',
    questions: [
      '¿Cuál es el mejor lote por calidad?',
      '¿Cuál es el lote con menor calidad?',
      '¿Qué productor tiene mejor calidad?',
      '¿Cuál es el promedio de calidad global?',
      '¿Cuántos lotes tienen control de calidad?',
      '¿Cómo se interpreta el puntaje de calidad?',
    ],
  },
  {
    category: 'IA',
    questions: [
      '¿Qué hace el módulo IA?',
      '¿Cuántos lotes tienen predicción IA?',
      '¿Cuántos lotes no tienen IA?',
      '¿Qué lotes no tienen predicción IA?',
      '¿Cuántas alertas de riesgo hay?',
      '¿Cuáles son los lotes con riesgo alto?',
    ],
  },
  {
    category: 'Reportes',
    questions: [
      '¿Qué reportes puedo generar?',
      '¿Cuántos reportes se han generado?',
      '¿Dónde veo la auditoría del sistema?',
      '¿Cuántas acciones hay en auditoría?',
    ],
  },
  {
    category: 'Administración',
    questions: [
      '¿Qué puede hacer el ADMIN?',
      '¿Qué usuarios están activos?',
      '¿Quién es el usuario más activo?',
      '¿Qué acciones recientes hicieron los clientes?',
      '¿Cuál es la contraseña temporal para clientes?',
      '¿Cómo resetear contraseña de cliente?',
      '¿Cuántos lotes tiene cada cliente?',
      '¿Cuántos productores tiene cada cliente?',
      '¿Cuál es la calidad promedio por cliente?',
      '¿Cuál es el estado de Railway?',
      '¿Cuál es el estado de Vercel?',
      '¿Qué evidencias PMV existen?',
      '¿Cuáles son las historias de usuario?',
      '¿Cómo está configurada la base de datos?',
      '¿Qué medidas de seguridad usa el sistema?',
    ],
  },
]

export const CHATBOT_CATEGORIES_CLIENTE = [
  {
    category: 'Preguntas generales',
    questions: [
      '¿Qué hace el sistema?',
      '¿Qué incluye PMV1?',
      '¿Qué mejoras tiene PMV2?',
      '¿Qué puede hacer mi rol CLIENTE?',
      '¿Cómo funciona la trazabilidad?',
      '¿Cómo funciona el módulo IA?',
    ],
  },
  {
    category: 'Producción',
    questions: [
      '¿Cuántos productores tengo?',
      '¿Cuántos lotes tengo?',
      '¿Cuál es mi producción total?',
      '¿Cuál es mi producción del mes?',
      '¿Qué productor tiene más producción?',
      '¿En qué etapas están mis lotes?',
      '¿Cómo registro un productor?',
      '¿Cómo registro un lote?',
    ],
  },
  {
    category: 'Trazabilidad',
    questions: [
      '¿Cuántos de mis lotes tienen trazabilidad?',
      '¿Cuántos de mis lotes no tienen trazabilidad?',
      '¿Qué lotes no tienen trazabilidad?',
      '¿Cómo veo mi trazabilidad?',
      '¿Qué lotes tengo pendientes?',
    ],
  },
  {
    category: 'Calidad',
    questions: [
      '¿Cuál es mi calidad promedio?',
      '¿Cuál es mi mejor lote?',
      '¿Cuál es mi lote con menor calidad?',
      '¿Cómo interpreto la calidad de mis lotes?',
      '¿Cuántos lotes tienen control de calidad?',
    ],
  },
  {
    category: 'IA',
    questions: [
      '¿Cuántos de mis lotes tienen predicción IA?',
      '¿Cuántos de mis lotes no tienen IA?',
      '¿Qué lotes no tienen predicción IA?',
      '¿Tengo alertas o recomendaciones IA?',
      '¿Qué hace el módulo IA con mis datos?',
    ],
  },
  {
    category: 'Reportes',
    questions: [
      '¿Qué reportes puedo generar?',
      '¿Cómo veo mis reportes?',
      '¿Cuántos reportes he generado?',
    ],
  },
  {
    category: 'Mi cuenta',
    questions: [
      '¿Cuántos clientes hay en el sistema?',
      '¿Cuál es la producción total global?',
      '¿Qué cliente tiene más producción?',
      '¿Cómo contacto al administrador?',
      '¿Cuáles son mis datos registrados?',
    ],
  },
]

export function getChatbotCategories(isAdmin) {
  return isAdmin ? CHATBOT_CATEGORIES_ADMIN : CHATBOT_CATEGORIES_CLIENTE
}

export function countChatbotQuestions(isAdmin) {
  const cats = getChatbotCategories(isAdmin)
  return cats.reduce((n, c) => n + c.questions.length, 0)
}
