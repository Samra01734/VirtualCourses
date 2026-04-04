import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { FaLongArrowAltLeft, FaEnvelope, FaBookOpen, FaUserTag } from "react-icons/fa";

function Profile() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10'>
      
      <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl w-full max-w-lg overflow-hidden border border-gray-100'>

        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div 
            className='absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors text-white'
            onClick={() => navigate("/")}
          >
            <FaLongArrowAltLeft className='w-5 h-5' />
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 relative flex flex-col items-center">
          
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              {userData?.photoUrl ? (
                <img 
                  src={userData.photoUrl} 
                  className='w-full h-full object-cover'
                  alt="Profile"
                />
              ) : (
                <div className='w-full h-full bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-600 flex items-center justify-center text-4xl font-bold'>
                  {userData?.name?.slice(0,1).toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {/* Name & Role */}
          <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>
            {userData?.name || "User"}
          </h2>
          <div className="flex items-center gap-2 mt-1 mb-6">
            <FaUserTag className="text-indigo-500 w-4 h-4" />
            <p className='text-sm font-medium text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full'>
              {userData?.role}
            </p>
          </div>

          {/* Bio Section */}
          <div className="w-full bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">About Me</p>
            <p className="text-gray-700 leading-relaxed text-sm">
              {userData?.description || "This user hasn't added a bio yet. Click edit profile to tell us about yourself!"}
            </p>
          </div>

          {/* Stats / Info */}
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
            <div className='flex items-center gap-4 bg-white border border-gray-100 shadow-sm p-4 rounded-2xl'>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                <p className="text-sm text-gray-900 font-semibold truncate">{userData?.email || "N/A"}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 bg-white border border-gray-100 shadow-sm p-4 rounded-2xl'>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <FaBookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Enrolled Courses</p>
                <p className="text-sm text-gray-900 font-semibold">{userData?.enrolledCourses?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            className='w-full py-3.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-indigo-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300' 
            onClick={() => navigate("/EditProfile")}
          >
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  )
}

export default Profile;