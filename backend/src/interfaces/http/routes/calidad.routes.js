import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { validateBody } from '../middleware/validate.js'
import { validateCreateCalidad } from '../../../application/validators/calidad.validator.js'
import { CalidadController } from '../controllers/CalidadController.js'

const router = Router()

router.get('/', readGuard, asyncHandler(CalidadController.list))
router.post('/', writeGuard, validateBody(validateCreateCalidad), asyncHandler(CalidadController.create))

export default router
