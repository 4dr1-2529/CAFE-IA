import { Router } from 'express'
import { AuthService } from '../../../application/services/AuthService.js'
import { requestMeta } from '../../../application/services/ActionLogService.js'
import { authenticate } from '../middleware/auth.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { env } from '../../../config/env.js'
import { sendError } from '../../../shared/apiResponse.js'

const router = Router()

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body || {}
    if (!email || !password) return sendError(res, 400, 'Email y contraseña requeridos')
    const result = await AuthService.login(email, password, requestMeta(req))
    res.json({ ok: true, ...result })
  })
)

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    if (env.nodeEnv === 'production' && !env.allowPublicRegister) {
      return sendError(res, 403, 'Registro público deshabilitado. Contacte al administrador.')
    }
    const user = await AuthService.register(req.body)
    res.status(201).json({ ok: true, message: 'Usuario registrado', data: user })
  })
)

router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body || {}
    if (!refreshToken) return sendError(res, 400, 'refreshToken requerido')
    const result = await AuthService.refresh(refreshToken)
    res.json({ ok: true, ...result })
  })
)

router.post(
  '/logout',
  authenticate,
  asyncHandler(async (req, res) => {
    await AuthService.logout(req.body?.refreshToken, requestMeta(req))
    res.json({ ok: true, message: 'Sesión cerrada' })
  })
)

router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    res.json({ ok: true, data: { user: req.user } })
  })
)

export default router
