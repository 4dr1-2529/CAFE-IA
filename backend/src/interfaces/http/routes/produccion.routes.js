import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { ProduccionController } from '../controllers/ProduccionController.js'

const router = Router()

router.get('/', readGuard, asyncHandler(ProduccionController.list))
router.post('/', writeGuard, asyncHandler(ProduccionController.create))

export default router
