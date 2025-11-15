import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
dotenv.config();

const port = process.env.PORT
const app  = express()

//middleware
app.use(express.json())
app.use(cookieParser())

//routes api
app.use('/api/auth' , authRouter);

app.get('/' , (req,res)=>{
    res.send('hello ')
})


app.listen(port , (req,res)=>{
    connectDB();
    console.log('hello ki hal chal')
})