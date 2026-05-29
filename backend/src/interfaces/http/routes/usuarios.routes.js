import { Router } from 'express'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { validateBody } from '../middleware/validate.js'
import {
  validateCreateUsuario,
  validateUpdateUsuario,
  validateResetPassword,
  validatePatchEstado,
  validatePatchRol,
} from '../../../application/validators/usuario.validator.js'
import { UsuarioController } from '../controllers/UsuarioController.js'

const router = Router()
import { adminGuard } from '../middleware/rbac.js'

router.get('/', ...adminGuard, asyncHandler(UsuarioController.list))
router.get('/activos', ...adminGuard, asyncHandler(UsuarioController.listActive))
router.get('/:id', ...adminGuard, asyncHandler(UsuarioController.getById))
router.post('/', ...adminGuard, validateBody(validateCreateUsuario), asyncHandler(UsuarioController.create))
router.put('/:id', ...adminGuard, validateBody(validateUpdateUsuario), asyncHandler(UsuarioController.update))
router.patch('/:id/estado', ...adminGuard, validateBody(validatePatchEstado), asyncHandler(UsuarioController.setEstado))
router.patch('/:id/rol', ...adminGuard, validateBody(validatePatchRol), asyncHandler(UsuarioController.changeRol))
router.post('/:id/reset-password', ...adminGuard, validateBody(validateResetPassword), asyncHandler(UsuarioController.resetPassword))

export default router
