import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { createCustomError } from '../errors/CustomError'
import 'dotenv/config'
import dayjs from 'dayjs'

const dayJS = dayjs()

declare module 'jsonwebtoken' {
    export interface JwtPayload {
        id: number
    }
}

export const generateAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.jwt
    console.log(`Refresh Token: ${refreshToken}`) 
    try {
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as jwt.JwtPayload
        const token = jwt.sign({ id: decode.id }, process.env.JWT_SECRET as string, { expiresIn: '30s'})
        res.json({ token })
    } catch (error) {
        throw createCustomError('Expired token: Login again', 401)
    }
}

export const storeRefreshToken = async (req: Request, res: Response) => {
    const { authorization } = req.headers
    if( !authorization || !authorization.startsWith('Bearer ')) { throw createCustomError('Login / register first', 401)}
    const refreshToken = authorization?.split(' ')[1]
    console.log('Token set in cookies')
    res.cookie('jwt', refreshToken, { secure: true, httpOnly: true, expires: dayJS.add(3, 'minute').toDate()}).send()
}

export const deleteRefreshToken = async (req: Request, res: Response) => {
    res.clearCookie('jwt').send()
}
