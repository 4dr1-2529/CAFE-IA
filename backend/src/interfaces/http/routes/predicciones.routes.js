import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { PrediccionController } from '../controllers/PrediccionController.js'

const router = Router()

router.get('/', readGuard, asyncHandler(PrediccionController.list))
router.post('/ejecutar', writeGuard, asyncHandler(PrediccionController.execute))

export default router
