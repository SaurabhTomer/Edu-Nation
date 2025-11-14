import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDB.js';
dotenv.config();

const port = process.env.PORT
const app  = express()

app.get('/' , (req,res)=>{
    res.send('hello ')
})


app.listen(port , (req,res)=>{
    connectDB();
    console.log('hello ki hal chal')
})