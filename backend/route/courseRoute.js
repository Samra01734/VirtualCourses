import express  from 'express'
import { createcourse, editCourses, getCourseById, getCreatorCourses, removeCourse,getPublishedCourses }
 from '../controllers/courseController.js'
import isAuth  from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
const  courseRouter=express.Router()

courseRouter.post("/create",isAuth,createcourse)
courseRouter.get("/getPublished",getPublishedCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.post("/editcourse/:courseId",isAuth, upload.single
    ("thumbnail"),editCourses
)
courseRouter.get("/getcoursebyid/:courseId",isAuth,getCourseById)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)

export default courseRouter