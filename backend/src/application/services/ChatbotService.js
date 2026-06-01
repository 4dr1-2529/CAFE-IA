import { ActionLogService } from './ActionLogService.js'
import { resolveChatbotIntent, UNKNOWN_MESSAGE } from './chatbotIntentHandlers.js'
import { detectIntent } from './chatbotIntentScoring.js'
import { RoleHelper } from '../../shared/RoleHelper.js'

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
