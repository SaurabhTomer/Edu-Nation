import express from 'express'
import { createCourse, createLecture, deleteCourse, editCourse, getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourse, removeLecture } from '../controllers/course.controller.js';
import { isAuth } from './../middlewares/auth.middleware.js';
import { upload } from './../middlewares/multer.js';

const courseRouter = express.Router()



courseRouter.post("/create" , isAuth, createCourse);
courseRouter.get("/getpublished" , getPublishedCourse);
courseRouter.get("/getcreatorcourse" ,isAuth ,  getCreatorCourses);
courseRouter.patch("/editcourse/:courseId" ,isAuth , upload.single("thumbnail"),  editCourse);
courseRouter.get("/getcourse/:courseId" ,isAuth ,  getCourseById);
courseRouter.delete("/deletecourse/:courseId" ,isAuth ,   deleteCourse);

// for lecture routes
courseRouter.post("/createlecture/:courseId" , isAuth , createLecture );
courseRouter.get("/courselecture/:courseId" , isAuth , getCourseLecture );
courseRouter.patch("/editlecture/:lectureId" , isAuth ,upload.single("videoUrl"), editCourse );
courseRouter.delete("/removelecture/:lectureId" , isAuth , removeLecture );

export default courseRouter