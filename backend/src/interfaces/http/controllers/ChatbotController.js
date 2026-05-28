import { ChatbotService } from '../../../application/services/ChatbotService.js'

export class ChatbotController {
  static async ask(req, res) {
    const message = String(req.body?.message || '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (!message) return res.status(400).json({ ok: false, message: 'El mensaje es obligatorio' })
    if (message.length > 300) return res.status(400).json({ ok: false, message: 'El mensaje excede el máximo de 300 caracteres' })

    const data = await ChatbotService.ask(message, {
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    })
    res.json(data)
  }
}
