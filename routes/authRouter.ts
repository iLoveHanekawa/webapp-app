import express from 'express'
import { dashboard, login, register } from '../controllers/authController'
import { authMidware } from '../middlewares/auth'

export const authRouter = express.Router()

authRouter.route('/login').post(login)
authRouter.route('/register').post(register)
authRouter.route('/dashboard').post(authMidware, dashboard)