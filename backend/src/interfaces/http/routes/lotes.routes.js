import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { validateBody } from '../middleware/validate.js'
import { validateCreateLote } from '../../../application/validators/lote.validator.js'
import { LoteController } from '../controllers/LoteController.js'

const router = Router()

router.get('/', readGuard, asyncHandler(LoteController.list))
router.get('/next-code', readGuard, asyncHandler(LoteController.nextCode))
router.get('/:id', readGuard, asyncHandler(LoteController.getById))
router.post('/', writeGuard, validateBody(validateCreateLote), asyncHandler(LoteController.create))

export default router
