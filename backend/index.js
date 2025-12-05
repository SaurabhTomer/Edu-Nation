import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import cors from 'cors';

const port = process.env.PORT || 5000
const app  = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//routes api
app.use('/api/auth' , authRouter);



app.listen(port , (req,res)=>{
    connectDB();
    console.log('server started')
})