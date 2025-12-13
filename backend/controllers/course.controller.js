import { Course } from "../models/course.model.js";
import { Course } from './../models/course.model';

export const createCourse = async (req , res) => {
    try {
        //fetch user id and details
        const userId = req.userId;
        const { title , category } = req.body;

        //check field
        if( !title || !category){
            return res.status(400).json({message:"Title and category are required"})
        }

        //crate course
        const course = await Course.create({
            title,
            description,
            creator : userId
        })

        //return res
        return res.status(201).json({message:"Course is created" , course})

    } catch (error) {
         return res.status(500).json({message:"create course error" , error})
    }
}

export const getPublishedCourse = async (req , res) => {
    try {
        
        //find course that have is published true in their model
        const Courses = await Course.find({isPublished : true})

         if( !Courses){
            return res.status(400).json({message:"Courses not found"})
        }

        //return published coursses
         return res.status(200).json({message:"Courses fetched " , Courses})
    } catch (error) {
          return res.status(500).json({message:"get published course error" , error})
    }
}

export const getCreatorCourses = async (req , res) => {
    try {
        //fetch details
        const userId = req.userId;

        //find courses of crator those who have user id this in their model
        const Courses  = await Course.find({ creator : userId })

        
         if( !Courses){
            return res.status(400).json({message:"Courses not found"})
        }

        //return  coursses
         return res.status(200).json({message:"Courses fetched of creator " , Courses})

    } catch (error) {
        return res.status(500).json({message:"get creator course error" , error})
    
    }
}