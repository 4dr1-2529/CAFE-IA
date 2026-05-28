import { Router } from 'express'
import { readGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { ChatbotController } from '../controllers/ChatbotController.js'

const router = Router()

router.post('/', readGuard, asyncHandler(ChatbotController.ask))

export default router
