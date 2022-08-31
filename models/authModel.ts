import mongoose, { InsertManyOptions, Model } from "mongoose";
import bcrypt from 'bcryptjs'
import { Request } from "express";
import 'dotenv/config'
import * as jwt from 'jsonwebtoken'

interface Auth {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

interface AuthMethods {
    createJWT(secret: string): string
}

type AuthModel = Model<Auth, {}, AuthMethods>


const authSchema = new mongoose.Schema<Auth, AuthModel, AuthMethods>({
    firstName: {
        type: String,
        required: [true, 'Please provide first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Provide valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
})


authSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

authSchema.method('createJWT', function createJWT(this: mongoose.Document<unknown, any, Auth> & Auth & {
    _id: mongoose.Types.ObjectId;
} & AuthMethods, secret: string) {
    return jwt.sign({ id: `${this._id}`}, secret, { expiresIn: secret === (process.env.JWT_SECRET)? '5s': '3m'})
})

export default mongoose.model<Auth, AuthModel>('users', authSchema)