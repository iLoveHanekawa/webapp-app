import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/CustomError'

export const errorMidware = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    res.status(500).json({ msg: "something went wrong"})
}
