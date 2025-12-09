import express from 'express'
import { login, logout, signup ,googleAuth } from '../controllers/auth.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js'

const authRouter = express.Router()

//auth routes
authRouter.post('/signup' ,signup)
authRouter.post('/login' , login)
authRouter.get('/logout' ,isAuth, logout)
//no midddleware in it

authRouter.post("/google", googleAuth);
export default authRouter