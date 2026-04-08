import Course from "../model/courseModel.js"

// CREATE COURSE
export const createcourse = async (req, res) => {
  try {
    const { title, category, description } = req.body

    if (!title || !category) {
      return res.status(400).json({ message: "title and category are required" })
    }

    const course = await Course.create({
      title,
      category,
  
      creator: req.userId
    })

    return res.status(201).json(course)

  } catch (error) {
    return res.status(500).json({ message: `CreateCourse error ${error}` })
  }
}


// GET PUBLISHED COURSES
export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })

    if (!courses || courses.length === 0) {
      return res.status(400).json({ message: "Courses Not Found" })
    }

    return res.status(200).json(courses)

  } catch (error) {
    return res.status(500).json({ message: `Failed to get published courses ${error}` })
  }
}


// GET CREATOR COURSES
export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId

    const courses = await Course.find({ creator: userId })

    if (!courses || courses.length === 0) {
      return res.status(400).json({ message: "Courses Not Found" })
    }

    return res.status(200).json(courses)

  } catch (error) {
    return res.status(500).json({ message: `Failed to get creator courses ${error}` })
  }
}


// EDIT COURSE
export const editCourses = async (req, res) => {
  try {
    const { courseId } = req.params
    const { title, subTitle, description, category, level, isPublished, price } = req.body

    let thumbnail
    if (req.file) {
      thumbnail = await upload.cloudinary(req.file.path)
    }

    let course = await Course.findById(courseId)   // ✅ fix (Course capital)

    if (!course) {
      return res.status(400).json({ message: "Course not found" })
    }

    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,          // ✅ fix spelling
      isPublished,
      price
    }

    if (thumbnail) updateData.thumbnail = thumbnail  // ✅ only if exists

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })

    return res.status(200).json(course)

  } catch (error) {
    return res.status(500).json({ message: `failed to edit Course ${error}` })
  }
}


// GET COURSE BY ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params

    let course = await Course.findById(courseId)

    if (!course) {
      return res.status(400).json({ message: "Course is not found" })
    }

    return res.status(200).json(course)

  } catch (error) {
    return res.status(500).json({ message: `failed to get Course by id ${error}` })
  }
}


// REMOVE COURSE
export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params

    const course = await Course.findById(courseId)   // ✅ missing variable fix

    if (!course) {
      return res.status(400).json({ message: "Course is not found" })
    }

    await Course.findByIdAndDelete(courseId)  // ✅ no need for new:true

    return res.status(200).json({ message: "Course Removed" })

  } catch (error) {
    return res.status(500).json({ message: `failed to delete Course by id ${error}` })
  }
}