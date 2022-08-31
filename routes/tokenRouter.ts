import { generateAccessToken, storeRefreshToken, deleteRefreshToken } from '../controllers/refreshController'
import express from 'express'
export const tokenRouter = express.Router()

tokenRouter.route('/token').get(generateAccessToken)
tokenRouter.route('/refresh').get(storeRefreshToken)
tokenRouter.route('/logout').get(deleteRefreshToken)
