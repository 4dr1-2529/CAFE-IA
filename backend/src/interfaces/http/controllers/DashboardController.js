import { DashboardService } from '../../../application/services/DashboardService.js'

export class DashboardController {
  static async metrics(_req, res) {
    res.json(await DashboardService.getMetrics())
  }
}
