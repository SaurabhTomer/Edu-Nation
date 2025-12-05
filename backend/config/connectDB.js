import dotenv from'dotenv'
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
       
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase connected");
        
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
}