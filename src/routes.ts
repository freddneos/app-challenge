import { Router } from 'express'
import { authController, caseController, conditionController, seedController } from './controllers/index'
import Seed from './data-layer/seeds/seed'
import { authMiddleware } from './middlewares'

const routes = Router()

// routes.get('/users', UserController.index)
routes.post('/auth/signup', authController.signup)
routes.post('/auth/login', authController.login)
routes.post('/auth/logout', authMiddleware.isAuthenticated, authController.logout)

routes.post('/cases/review-case/:case', authMiddleware.isAuthenticated, caseController.reviewCase)
routes.post('/cases/next-case', authMiddleware.isAuthenticated, caseController.nextCaseToReview)

routes.get('/conditions', conditionController.index)
routes.get('/seed', seedController.runSeed)

export default routes
