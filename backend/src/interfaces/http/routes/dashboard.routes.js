import { Router } from 'express'
import { readGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { DashboardController } from '../controllers/DashboardController.js'

const router = Router()
router.get('/metrics', readGuard, asyncHandler(DashboardController.metrics))

export default router
