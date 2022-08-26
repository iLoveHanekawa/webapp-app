import { Request, Response } from "express";

export const noRoute = (req: Request, res: Response) => {
    res.status(404).send({ msg: 'page not found'})
}