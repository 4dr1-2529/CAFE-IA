import { Router } from 'express'
import { readGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { DashboardController } from '../controllers/DashboardController.js'

const router = Router()
// /api/dashboard/ con barra final (opcional)
router.get('/', readGuard, asyncHandler(DashboardController.dashboard))
router.get('/metrics', readGuard, asyncHandler(DashboardController.metrics))

export default router
