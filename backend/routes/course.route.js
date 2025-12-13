import express from 'express'
import { createCourse, deleteCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourse } from '../controllers/course.controller.js';
import { isAuth } from './../middlewares/auth.middleware.js';
import { upload } from './../middlewares/multer.js';

const courseRouter = express.Router()



courseRouter.post("/create" , isAuth, createCourse);
courseRouter.get("/getpublished" , getPublishedCourse);
courseRouter.get("/getcreatorcourse" ,isAuth ,  getCreatorCourses);
courseRouter.post("/editcourse/:courseId" ,isAuth , upload.single("thumbnail"),  editCourse);
courseRouter.get("/getcourse/:courseId" ,isAuth ,  getCourseById);
courseRouter.delete("/deletecourse/:courseId" ,isAuth ,   deleteCourse);

export default courseRouter