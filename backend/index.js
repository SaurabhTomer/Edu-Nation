import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import userRouter from './routes/user.route.js';

const port = process.env.PORT;
const app  = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// auth routes api
app.use('/api/auth' , authRouter);
//user api route
app.use('/api/user' , userRouter);



app.listen(port , (req,res)=>{
    connectDB();
    console.log('server started')
})