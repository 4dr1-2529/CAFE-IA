import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { validateBody } from '../middleware/validate.js'
import { ProduccionController } from '../controllers/ProduccionController.js'
import { validateCreateProduccion } from '../../../application/validators/produccion.validator.js'

const router = Router()

router.get('/', readGuard, asyncHandler(ProduccionController.list))
router.post('/', writeGuard, validateBody(validateCreateProduccion), asyncHandler(ProduccionController.create))

export default router
