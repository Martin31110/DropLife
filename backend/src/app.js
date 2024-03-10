import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import forumRoutes from './routes/forum.routes.js';
import roleChangeRequestRoutes from './routes/roleChangeRequest.routes.js';


const app = express()

//Middlewares
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/api', authRoutes);
app.use('/api', forumRoutes);
app.use('/api', roleChangeRequestRoutes);

export default app;