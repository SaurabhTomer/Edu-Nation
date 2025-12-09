import express from 'express'
import { isAuth } from '../middlewares/auth.middleware.js'
import { getCurrentUser } from '../controllers/usercontroller.js'

const userRouter = express.Router()


//get request 

userRouter.get("/getcurrentuser" , isAuth , getCurrentUser);


export default userRouter