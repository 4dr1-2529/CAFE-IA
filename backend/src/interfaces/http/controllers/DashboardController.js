import { DashboardService } from '../../../application/services/DashboardService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'

export class DashboardController {
  static async dashboard(req, res) {
    const meta = requestMeta(req)
    res.json(await DashboardService.getDashboard(meta.user, meta))
  }

  static async metrics(req, res) {
    const meta = requestMeta(req)
    res.json(await DashboardService.getMetrics(meta.user, meta))
  }
}
