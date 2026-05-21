import { Router } from 'express'
import { AuthService } from '../../../application/services/AuthService.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Email y contraseña requeridos' })
    const result = await AuthService.login(email, password, {
      ip: req.ip,
      userAgent: req.get('user-agent')
    })
    res.json(result)
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message })
  }
})

router.post('/register', async (req, res) => {
  try {
    const user = await AuthService.register(req.body)
    res.status(201).json({ message: 'Usuario registrado', user })
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message })
  }
})

router.post('/logout', authenticate, async (req, res) => {
  await AuthService.logout(req.body?.refreshToken)
  res.json({ message: 'Sesión cerrada' })
})

router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user })
})

export default router
