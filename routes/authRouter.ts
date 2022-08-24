import express from 'express'
import { dashboard, login, register } from '../controllers/authController'

export const authRouter = express.Router()

authRouter.route('/login').post(login)
authRouter.route('/register').post(register)
authRouter.route('/dashboard').post(dashboard)