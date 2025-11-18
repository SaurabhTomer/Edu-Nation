import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js'

const authRouter = express.Router()

//auth routes
authRouter.post('/signup' , isAuth,signup)
authRouter.post('/login' ,isAuth, login)
authRouter.get('/logout' ,isAuth, logout)

export default authRouter