import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload } from 'jsonwebtoken'
import { createCustomError } from "../errors/CustomError";

declare global {
    namespace Express {
        export interface Request {
            id: number
        }
    }
}

export const authMidware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    console.log(`authHeader: ${authHeader}`);
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw Error('no token')
    }
    try {
        const token = authHeader.split(' ')[1]
        console.log(`Auth token: ${token}`)
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.id = (decoded as JwtPayload).id
    } catch (error) {
        throw createCustomError('Token expired', 401)
    }
    next()
}
