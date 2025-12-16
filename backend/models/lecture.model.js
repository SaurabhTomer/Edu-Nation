import mongoose from "mongoose";
 const lectureSchema = new mongoose.Schema({
    lectureTitle:{
        type:String,
        required:true,
    },
    isPreviewFree:{
        type:Boolean,
    },
    videoUrl :{
        type:String,
    }
 } , {timestamps:true})

 export const Lecture = mongoose.model("Lecture" , lectureSchema);