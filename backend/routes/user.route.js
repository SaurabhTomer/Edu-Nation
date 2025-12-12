import express from 'express'
import { isAuth } from '../middlewares/auth.middleware.js'
import { getCurrentUser, updateProfile } from '../controllers/usercontroller.js'
import { upload } from './../middlewares/multer.js';

const userRouter = express.Router()


//get request 

userRouter.get("/getcurrentuser" , isAuth , getCurrentUser);
userRouter.post("/profile" , isAuth  , upload.single("photoUrl"), updateProfile);


export default userRouter