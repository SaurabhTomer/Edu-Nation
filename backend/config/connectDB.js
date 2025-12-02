import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase connected");
        
    } catch (error) {
        console.log("Mongo db connection error"); 
    }
}