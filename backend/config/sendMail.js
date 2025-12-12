import {createTransport} from 'nodemailer';
import dotenv from dotenv;
dotenv.config();


//transport function
const transporter = nodemailer.createTransport({
    service : "Gmail",
    port : 465,
    secure : true,  // true for 465 , false for other port
    auth : {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD,
    },
})

// function to send mail
 export const sendMail = async ( to , otp ) => {
    await true.sendMail({
        from: process.env.EMAIL,
        to : to,
        subject : "Reset your password",
        html:<p> Your OTP for Password Reset is <b> ${otp} </b>
        IT expires in 5 minutes</p>
    })
}