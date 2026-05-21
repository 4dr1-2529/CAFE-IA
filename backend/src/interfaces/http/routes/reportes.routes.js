import { Router } from 'express'
import { readGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { ReportesController } from '../controllers/ReportesController.js'

const router = Router()
router.use(readGuard)

router.get('/produccion', asyncHandler(ReportesController.produccion))
router.get('/calidad', asyncHandler(ReportesController.calidad))
router.get('/predicciones', asyncHandler(ReportesController.predicciones))
router.get('/trazabilidad', asyncHandler(ReportesController.trazabilidad))
router.get('/export/:tipo/:formato', asyncHandler(ReportesController.export))

export default router
