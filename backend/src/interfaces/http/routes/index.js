import { Router } from 'express'
import authRoutes from './auth.routes.js'
import dashboardRoutes from './dashboard.routes.js'
import productoresRoutes from './productores.routes.js'
import lotesRoutes from './lotes.routes.js'
import produccionRoutes from './produccion.routes.js'
import trazabilidadRoutes from './trazabilidad.routes.js'
import calidadRoutes from './calidad.routes.js'
import prediccionesRoutes from './predicciones.routes.js'
import reportesRoutes from './reportes.routes.js'

const apiRouter = Router()

apiRouter.use('/auth', authRoutes)
apiRouter.use('/dashboard', dashboardRoutes)
apiRouter.use('/productores', productoresRoutes)
apiRouter.use('/lotes', lotesRoutes)
apiRouter.use('/produccion', produccionRoutes)
apiRouter.use('/trazabilidad', trazabilidadRoutes)
apiRouter.use('/control-calidad', calidadRoutes)
apiRouter.use('/evaluaciones', calidadRoutes)
apiRouter.use('/predicciones', prediccionesRoutes)
apiRouter.use('/reportes', reportesRoutes)

export default apiRouter
