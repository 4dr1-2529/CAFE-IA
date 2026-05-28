import { Router } from 'express'
import { adminGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { AuditoriaController } from '../controllers/AuditoriaController.js'

const router = Router()

router.get('/', adminGuard, asyncHandler(AuditoriaController.list))
router.post('/', adminGuard, asyncHandler(AuditoriaController.create))

export default router
