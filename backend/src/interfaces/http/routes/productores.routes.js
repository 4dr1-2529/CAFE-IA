import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { validateBody } from '../middleware/validate.js'
import { validateProductorBody } from '../../../application/validators/productor.validator.js'
import { ProductorController } from '../controllers/ProductorController.js'

const router = Router()

router.get('/', readGuard, asyncHandler(ProductorController.list))
router.post('/', writeGuard, validateBody(validateProductorBody), asyncHandler(ProductorController.create))
router.put('/:id', writeGuard, validateBody(validateProductorBody), asyncHandler(ProductorController.update))
router.delete('/:id', writeGuard, asyncHandler(ProductorController.remove))

export default router
