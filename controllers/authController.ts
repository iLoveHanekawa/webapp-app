import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
import authModel from "../models/authModel";
import bcrypt from 'bcryptjs'
import { createCustomError } from "../errors/CustomError";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    if( !email || !password ) {
        throw createCustomError('Mail and Pass are required fields', 401)
    }
    const user = await authModel.findOne({ email: email })
    if(!user) {
        throw createCustomError('Please register first', 401)
    }

    const isPassCorrect = bcrypt.compare(password, user.password)
    if(!isPassCorrect) {
        throw createCustomError('Incorrect password', 401)
    }

    const authToken = user.createJWT(process.env.JWT_SECRET as string)
    const refreshToken = user.createJWT(process.env.JWT_REFRESH_SECRET as string)
    console.log({ user, authToken, refreshToken });
    
    res.json({ user, authToken, refreshToken })
}

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    if( !email || !password || !lastName || !firstName ) {
        throw createCustomError('All fields are required', 400)
    }
    const user = await authModel.create({ firstName, lastName, email, password })
    const authToken = user.createJWT(process.env.JWT_SECRET as string)
    const refreshToken = user.createJWT(process.env.JWT_REFRESH_SECRET as string)
    console.log({ user, authToken, refreshToken });
    res.status(201).json({ user, authToken, refreshToken })
}

export const dashboard = async (req: Request, res: Response) => {
    const { id } = req
    const num = Math.floor(Math.random() * 100)
    res.json({ user: `Hello ${id}`, msg: `secret string: ${num}`})
}
