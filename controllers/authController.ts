import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
import authModel from "../models/authModel";
import bcrypt from 'bcryptjs'
import { createCustomError } from "../errors/CustomError";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    if( !email || !password ) {
        throw Error('Mail and Pass are required fields')
    }
    const user = await authModel.findOne({ email: email })
    if(!user) {
        throw createCustomError('Please register first', 401)
    }

    const isPassCorrect = bcrypt.compare(password, user.password)
    if(!isPassCorrect) {
        throw createCustomError('Incorrect password', 401)
    }

    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' })
    res.json({ user, token })
}

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    if( !email || !password || !lastName || !firstName ) {
        throw Error('All fields are required')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    const user = await authModel.create({ firstName, lastName, email, password: hashPass })
    const token = jwt.sign({ name: `${user.firstName} ${user.lastName}`}, process.env.JWT_SECRET as string, { expiresIn: '30d' })
    console.log(user);
    res.status(201).json({ user })
}

export const dashboard = async (req: Request, res: Response) => {
    const { id } = req
    const num = Math.floor(Math.random() * 100)        
    res.json({ user: `Hello ${id}`, msg: `secret string: ${num}`})
}
