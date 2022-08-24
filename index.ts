import express, { Request, Response } from 'express'
import 'dotenv/config'
import 'express-async-errors'
import { connectDB } from './db/connect'
import { authRouter } from './routes/authRouter'

const app = express()

app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    res.send('hi mom')
})
app.use('/api/v1', authRouter)

const port = Number(process.env.PORT) || 5000

const start = async (port: number, uri: string) => {
    try {
        connectDB(uri)
        console.log('connected to db')
        app.listen(port, () => {
            console.log(`server listening at port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start(port, process.env.MONGO_URI as string)