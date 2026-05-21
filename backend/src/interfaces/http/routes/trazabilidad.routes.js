import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { validateBody } from '../middleware/validate.js'
import { validateCreateTrazabilidad } from '../../../application/validators/trazabilidad.validator.js'
import { TrazabilidadController } from '../controllers/TrazabilidadController.js'

const router = Router()

router.get('/', readGuard, asyncHandler(TrazabilidadController.list))
router.post('/', writeGuard, validateBody(validateCreateTrazabilidad), asyncHandler(TrazabilidadController.create))

export default router
