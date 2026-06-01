import { ChatbotService } from '../../../application/services/ChatbotService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class ChatbotController {
  static async ask(req, res) {
    const message = String(req.body?.message || '')
      .replaceAll(/[<>]/g, '')
      .replaceAll(/\s+/g, ' ')
      .trim()
    if (!message) return res.status(400).json({ ok: false, message: 'El mensaje es obligatorio' })
    if (message.length > 300) return res.status(400).json({ ok: false, message: 'El mensaje excede el máximo de 300 caracteres' })

    const data = await ChatbotService.ask(message, requestMeta(req))
    res.json(data)
  }
}
