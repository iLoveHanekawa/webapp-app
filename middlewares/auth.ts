import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        export interface Request {
            id: number
        }
    }
}

export const authMidware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw Error('no token')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.id = (decoded as JwtPayload).id
    } catch (error) {
        throw Error('unauthorized')
    }
    next()
}
