import { Router } from 'express'
import { readGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { BaseDatosController } from '../controllers/BaseDatosController.js'

const router = Router()

router.get('/', readGuard, asyncHandler(BaseDatosController.resumen))
router.get('/:tabla', readGuard, asyncHandler(BaseDatosController.tabla))

export default router
