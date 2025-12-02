import mongoose from "mongoose";
import dotenv from'dotenv'
dotenv.config();

export const connectDB = async () => {
    try {
        // console.log(process.env.MONGODB_URL);
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL is not set in environment');
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase connected");
        
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
}