import { Router } from 'express'
import { readGuard, adminGuard } from '../middleware/rbac.js'
import { asyncHandler } from '../../../shared/asyncHandler.js'
import { DashboardController } from '../controllers/DashboardController.js'
import { UsuarioController } from '../controllers/UsuarioController.js'
import authRoutes from './auth.routes.js'
import usuariosRoutes from './usuarios.routes.js'
import dashboardRoutes from './dashboard.routes.js'
import productoresRoutes from './productores.routes.js'
import lotesRoutes from './lotes.routes.js'
import produccionRoutes from './produccion.routes.js'
import trazabilidadRoutes from './trazabilidad.routes.js'
import calidadRoutes from './calidad.routes.js'
import prediccionesRoutes from './predicciones.routes.js'
import reportesRoutes from './reportes.routes.js'
import chatbotRoutes from './chatbot.routes.js'
import auditoriaRoutes from './auditoria.routes.js'
import baseDatosRoutes from './base-datos.routes.js'
import systemRoutes from './system.routes.js'

const apiRouter = Router()

apiRouter.use('/auth', authRoutes)
apiRouter.get('/auth/usuarios', ...adminGuard, asyncHandler(UsuarioController.listActive))
apiRouter.use('/usuarios', usuariosRoutes)
apiRouter.get('/dashboard', readGuard, asyncHandler(DashboardController.dashboard))
apiRouter.use('/dashboard', dashboardRoutes)
apiRouter.use('/productores', productoresRoutes)
apiRouter.use('/lotes', lotesRoutes)
apiRouter.use('/produccion', produccionRoutes)
apiRouter.use('/trazabilidad', trazabilidadRoutes)
apiRouter.use('/control-calidad', calidadRoutes)
apiRouter.use('/evaluaciones', calidadRoutes)
apiRouter.use('/predicciones', prediccionesRoutes)
apiRouter.use('/reportes', reportesRoutes)
apiRouter.use('/chatbot', chatbotRoutes)
apiRouter.use('/auditoria', auditoriaRoutes)
apiRouter.use('/base-datos', baseDatosRoutes)
apiRouter.use('/admin', systemRoutes)

export default apiRouter
