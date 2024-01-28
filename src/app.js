import express from 'express'
import morgan from 'morgan'
import authRoutes from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

//Middlewares
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/api', authRoutes)


export default app;