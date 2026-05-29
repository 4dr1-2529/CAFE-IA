import { runSeedFinal } from '../../../infrastructure/database/seed-final.js'
import { sendError } from '../../../shared/apiResponse.js'

export class SystemController {
  static async seedFinal(req, res) {
    const force = req.body?.force === true || req.query?.force === '1'
    if (!force) {
      return sendError(res, 400, 'Debe enviar { "force": true } para ejecutar el seed final en producción.')
    }
    const result = await runSeedFinal({ force: true, initDb: false })
    res.json({ ok: true, data: result })
  }
}
