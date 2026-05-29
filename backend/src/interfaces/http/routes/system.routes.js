import { Router } from 'express'
import { adminGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { SystemController } from '../controllers/SystemController.js'

const router = Router()

router.post('/seed-final', ...adminGuard, asyncHandler(SystemController.seedFinal))

export default router
