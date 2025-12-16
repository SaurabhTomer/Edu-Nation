import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { uploadOnCloudinary } from "./../config/claudinary.js";


export const createCourse = async (req, res) => {
  try {
    //fetch user id and details
    const userId = req.userId;
    const { title, category } = req.body;

    //check field
    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }

    //crate course
    const course = await Course.create({
      title,
      description,
      creator: userId,
    });

    //return res
    return res.status(201).json({ message: "Course is created", course });
  } catch (error) {
    return res.status(500).json({ message: "create course error", error });
  }
};

export const getPublishedCourse = async (req, res) => {
  try {
    //find course that have is published true in their model
    const Courses = await Course.find({ isPublished: true });

    if (!Courses) {
      return res.status(400).json({ message: "Courses not found" });
    }

    //return published coursses
    return res.status(200).json({ message: "Courses fetched ", Courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get published course error", error });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    //fetch details
    const userId = req.userId;

    //find courses of crator those who have user id this in their model
    const Courses = await Course.find({ creator: userId });

    if (!Courses) {
      return res.status(400).json({ message: "Courses not found" });
    }

    //return  coursses
    return res
      .status(200)
      .json({ message: "Courses fetched of creator ", Courses });
  } catch (error) {
    return res.status(500).json({ message: "get creator course error", error });
  }
};

export const editCourse = async (req, res) => {
  try {
    //fetch courseid to hich course to edit
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
    } = req.body;

    //took file like this
    let thumbnail;

    //if file is not their
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    //find coursse
    let course = await Course.findById({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    //updatedData wbich have to chnaged
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
      thumbnail,
    };

    //update course
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({ message: "Courses edited  ", course });
  } catch (error) {
    return res.status(500).json({ message: "Course edited error", error });
  }
};

export const getCourseById = async (req, res) => {
  try {
    //fetch courseid from params
    const { courseId } = req.params;

    //search by id
    const Courses = await Course.findById({ courseId });

    if (!Courses) {
      return res.status(400).json({ message: "Course is not found" });
    }

    //send course in response
    return res.status(200).json({ message: "Courses finded  ", Courses });
  } catch (error) {
    return res.status(500).json({ message: "Course finding error", error });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    //fetch courseid from params
    const { courseId } = req.params;

    //search by id
    const Courses = await Course.findById({ courseId });

    if (!Courses) {
      return res.status(400).json({ message: "Course is not found" });
    }

    //delete course
    Courses = await Course.findByIdAndDelete(courseId, { new: true });

    return res.status(200).json({ message: "Courses deletion success  " });
  } catch (error) {
    return res.status(500).json({ message: "Course deletion error", error });
  }
};

export const createLecture = async (req, res) => {
  try {
    //fetch data from body
    const { lectureTitle } = req.body;
    //fecth courseId from params
    const { courseId } = req.params;

    //check
    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "field is missing" });
    }

    //crate Lecture
    const lecture = await Lecture.create({ lectureTitle });
    //find course by id
    const course = await Course.findById(courseId);

    // if course is present then push lecture in it
    if (course) {
      course.lectures.push(lecture._id);
    }
    //get all details of kecture like all (ispublished , titile , vidoeurl)
    await course.populate("lectures");
    //save course
    await course.save();
    return res.status(201).json({ lecture, course });
  } catch (error) {
    return res.status(500).json({ message: "lecture create error", error });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    //fecth courseId from params
    const { courseId } = req.params;
    //check
    if (!courseId) {
      return res.status(400).json({ message: "course is required " });
    }

    const course = await Course.findById({ courseId });
    if (course) {
      return res.status(404).json({ message: "course is not found " });
    }
    //get all deatils of lecture
    await course.populate("lectures");
    await course.save();

    return res.status(200).json({ course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get course lecture  error", error });
  }
};

export const editLecture = async (req, res) => {
  try {
    //fecth  from params
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    //find lecture by id
    const lecture = await Lecture.findById({ lectureId });
    //check
    if (lecture) {
      return res.status(404).json({ message: "Lecture is not found " });
    }

    // if video is given then uplaod it on cloudniary anf get url from it
    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }
    //lecture title 
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    //is PreviewFree
    lecture.isPreviewFree = isPreviewFree;


    //save
    await Lecture.save();

    return res.status(200).json( lecture );
  } catch (error) {
    return res
      .status(500)
      .json({ message: " lecture  edit  error", error });
  }
};

export const removeLecture = async (req, res) => {
  try {
    //fecth  from params
    const { lectureId } = req.params;
    
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if(!lecture){
      return res.status(404).json({message:"Lecture is not found"})
    }
  

  await Course.updateOne(

    {lectures : lectureId},
    {$pull:{lectures : lectureId}}

  )
    return res.status(200).json( {message:"lecture removed"} );
  } catch (error) {
    return res
      .status(500)
      .json({ message: " lecture  remove  error", error });
  }
};

