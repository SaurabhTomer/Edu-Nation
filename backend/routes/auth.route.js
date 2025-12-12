import express from 'express'
import { login, logout, signup ,googleAuth, sendOTP, verifyOTP, ResetPassword } from '../controllers/auth.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js'

const authRouter = express.Router()

//auth routes
authRouter.post('/signup' ,signup)
authRouter.post('/login' , login)
authRouter.get('/logout' ,isAuth, logout)
authRouter.post('/sendotp' , sendOTP)
authRouter.post('/verifyotp' , verifyOTP)
authRouter.post('/resetpassword' , ResetPassword)


authRouter.post("/google", googleAuth);


export default authRouter