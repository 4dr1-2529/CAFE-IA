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

const adminOnly = adminGuard

router.get('/', adminOnly, asyncHandler(UsuarioController.list))
router.get('/activos', adminOnly, asyncHandler(UsuarioController.listActive))
router.get('/:id', adminOnly, asyncHandler(UsuarioController.getById))
router.post('/', adminOnly, validateBody(validateCreateUsuario), asyncHandler(UsuarioController.create))
router.put('/:id', adminOnly, validateBody(validateUpdateUsuario), asyncHandler(UsuarioController.update))
router.patch('/:id/estado', adminOnly, validateBody(validatePatchEstado), asyncHandler(UsuarioController.setEstado))
router.patch('/:id/rol', adminOnly, validateBody(validatePatchRol), asyncHandler(UsuarioController.changeRol))
router.post('/:id/reset-password', adminOnly, validateBody(validateResetPassword), asyncHandler(UsuarioController.resetPassword))

export default router
