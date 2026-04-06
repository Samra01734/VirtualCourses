import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaUser,
  FaBook,
  FaMoneyBillWave,
  FaPlusCircle
} from 'react-icons/fa'

function Dashboard() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-[#f6f6f7] via-white to-[#f3e8ff]'>

      <div className='w-full px-6 py-10 space-y-10'>

        {/* 🔙 Back to Home */}
        <div
          onClick={() => navigate("/")}
          className='flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black transition'
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </div>

        {/* 👤 Main Section */}
        <div className='max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-200'>

          {/* Profile Image / Initial */}
          {
            userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="Educator"
                className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-purple-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {userData?.name?.slice(0,1).toUpperCase()}
              </div>
            )
          }

          {/* Info */}
          <div className='text-center md:text-left space-y-2'>

            <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center md:justify-start'>
              <FaUser className="text-purple-500" />
              Welcome, {userData?.name || "Educator ✨"}
            </h1>

            <h2 className='text-lg font-semibold text-gray-700 flex items-center gap-2 justify-center md:justify-start'>
              <FaMoneyBillWave className="text-green-500" />
              Total Earnings: 0
            </h2>

            <p className='text-gray-500 text-sm'>
              {userData?.description || "Start creating courses for your students"}
            </p>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 pt-3 justify-center md:justify-start'>

              <button
                onClick={() => navigate("/courses")}
                className='flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transition'
              >
                <FaBook />
                My Courses
              </button>

              <button
                onClick={() => navigate("/create-course")}
                className='flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg shadow hover:scale-105 transition'
              >
                <FaPlusCircle />
                Create Course
              </button>

            </div>

          </div>
        </div>

        {/* 📊 Graph Section (empty for now) */}
        <div className='max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-md p-6 border border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-700 flex items-center gap-2'>
            📊 Analytics
          </h2>
          <p className='text-gray-500 text-sm mt-2'>
            You can add your charts here later.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard