import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from '../../assets/empty.jpg'
import {
  FaArrowLeft,
  FaPlusCircle,
  FaBookOpen
} from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { useSelector } from 'react-redux'

function Courses() {
  const navigate = useNavigate()

  const { creatorCourseData } = useSelector((state) => state.course)

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f6f6f7] via-white to-[#f3e8ff] p-6'>

      {/* 🔙 Back */}
      <div
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black transition mb-6'
      >
        <FaArrowLeft />
        <span>Back</span>
      </div>

      {/* 🔝 Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>

        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaBookOpen className="text-purple-500" />
          All Created Courses
        </h1>

        <button
          onClick={() => navigate("/create-course")}
          className='flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transition'
        >
          <FaPlusCircle />
          Create Course
        </button>

      </div>

      {/* 📊 TABLE VIEW */}
      <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>

        <table className='min-w-full text-sm'>
          <thead className='border-b bg-gray-50'>
            <tr>
              <th className='text-left py-3 px-4'>Course</th>
              <th className='text-left py-3 px-4'>Price</th>
              <th className='text-left py-3 px-4'>Status</th>
              <th className='text-left py-3 px-4'>Action</th>
            </tr>
          </thead>

          <tbody>
            {creatorCourseData && creatorCourseData.length > 0 ? (
              creatorCourseData.map((course) => (
                <tr
                  key={course?._id}
                  className='border-b hover:bg-gray-50 transition'
                >

                  {/* COURSE */}
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-4'>
                      <img
                        src={course?.thumbnail || image}
                        className='w-24 h-14 object-cover rounded-md'
                        alt=""
                      />
                      <span className='font-medium'>
                        {course?.title || "Untitled Course"}
                      </span>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className='px-4 py-3'>
                    {course?.price ? `Rs: ${course.price}` : "$0"}
                  </td>

                  {/* STATUS */}
                  <td className='px-4 py-3'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        course?.isPublished
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className='px-4 py-3'>
                    <BiEdit
                      onClick={() => navigate(`/edit-course/${course?._id}`)}
                      className='text-gray-600 hover:text-blue-600 cursor-pointer'
                    />
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className='text-center py-10 text-gray-400'>
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

      {/* 📱 MOBILE VIEW */}
      <div className='md:hidden space-y-4'>

        {creatorCourseData && creatorCourseData.length > 0 ? (
          creatorCourseData.map((course) => (
            <div
              key={course?._id}
              className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'
            >

              {/* TOP */}
              <div className='flex gap-4 items-center'>

                <img
                  src={course?.thumbnail || image}
                  className='w-16 h-16 rounded-md object-cover'
                  alt=""
                />

                <div className='flex-1'>
                  <h2 className='font-medium text-sm'>
                    {course?.title || "Untitled Course"}
                  </h2>

                  <p className='text-gray-600 text-xs mt-1'>
                    {course?.price ? `Rs: ${course.price}` : "$0"}
                  </p>
                </div>

                <BiEdit
                  onClick={() => navigate(`/edit-course/${course?._id}`)}
                  className='text-gray-600 hover:text-blue-600 cursor-pointer'
                />
              </div>

              {/* STATUS */}
              <span
                className={`w-fit px-3 py-1 text-xs rounded-full ${
                  course?.isPublished
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {course?.isPublished ? "Published" : "Draft"}
              </span>

            </div>
          ))
        ) : (
          <p className='text-center text-gray-400 mt-10'>
            No courses found
          </p>
        )}

      </div>

    </div>
  )
}

export default Courses