import { DashboardService } from '../../../application/services/DashboardService.js'

const metaFromReq = (req) => ({
  ip: req.ip,
  userAgent: req.get('user-agent'),
})

export class DashboardController {
  static async dashboard(req, res) {
    res.json(
      await DashboardService.getDashboard(req.user, metaFromReq(req))
    )
  }

  static async metrics(req, res) {
    res.json(
      await DashboardService.getMetrics(req.user, metaFromReq(req))
    )
  }
}
