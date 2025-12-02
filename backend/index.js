import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';

const port = process.env.PORT
const app  = express()

//middleware
app.use(express.json())
app.use(cookieParser())

//routes api
app.use('/api/auth' , authRouter);



app.listen(port , (req,res)=>{
    connectDB();
    console.log('server started')
})