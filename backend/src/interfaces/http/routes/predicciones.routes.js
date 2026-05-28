import { Router } from 'express'
import { readGuard, writeGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { PrediccionController } from '../controllers/PrediccionController.js'
import { validateBody } from '../middleware/validate.js'
import { validateExecutePrediccion } from '../../../application/validators/prediccion.validator.js'

const router = Router()

router.get('/', readGuard, asyncHandler(PrediccionController.list))
router.post('/ejecutar', writeGuard, validateBody(validateExecutePrediccion), asyncHandler(PrediccionController.execute))

export default router
