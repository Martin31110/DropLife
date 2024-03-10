import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import forumRoutes from './routes/forum.routes.js';
// import cookieSession from 'cookie-session';
import session from 'express-session';
import passport from 'passport';
import keys from './config/keys.js'

// import roleChangeRequestRoutes from './routes/roleChangeRequest.routes.js';
const app = express()

//Middlewares
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: [keys.session.cookieKey], // Cambia esto por una clave secreta más segura
    resave: false,
    saveUninitialized: true,
  })
);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home',{user:req.user});
});
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use('/api', authRoutes);
app.use('/api', forumRoutes);
// app.use('/api', roleChangeRequestRoutes);

export default app;