import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
import authModel from "../models/authModel";
export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    if( !email || !password ) {
        throw Error('Mail and Pass are required fields')
    }
    const user = await authModel.findOne({ email: email })

    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' })
    res.json({ user, token })
}

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    if( !email || !password || !lastName || !firstName ) {
        throw Error('All fields are required')
    }
    const user = await authModel.create({ firstName, lastName, email, password })
    console.log(user);
    res.status(201).json({ user })
}

export const dashboard = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw Error('no token')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        const num = Math.floor(Math.random() * 100)
        console.log(decoded);
        
        res.json({ user: `Hello ${(decoded as jwt.JwtPayload).id}`, msg: `secret string: ${num}`})
    } catch (error) {
        throw Error('unauthorized')
    }
}
