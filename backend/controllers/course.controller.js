import { Course } from "../models/course.model.js";

export const createCourse = async (req , res) => {
    try {
        const userId = req.userId;
        const { title , category } = req.body;

        if( !title || !category){
            return res.status(400).json({message:"Title and category are required"})
        }

        const course = await Course.create({
            title,
            description,
            creator : userId
        })

        return res.status(201).json({message:"Course is created" , course})

    } catch (error) {
         return res.status(500).json({message:"create course error" , error})
    }
}

export 