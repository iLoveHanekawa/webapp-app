export class CustomError extends Error {
    statusCode: number
    constructor(msg: string, code: number) {
        super(msg)
        this.statusCode = code
    }
}

export const createCustomError = (msg: string, code: number) => {
    return new CustomError(msg, code)
}