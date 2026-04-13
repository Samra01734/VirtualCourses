import axios from 'axios';
import React, { useState } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { hotoUrl, setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handEditProfile = async () => {
    setLoading(true)

    try {
      const formData = new FormData(); // ✅ moved here
      formData.append("name", name)
      formData.append("description", description)
      if (photoUrl) {
        formData.append("photoUrl", photoUrl)
      }

      const result = await api.post(
        "/user/profile",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      dispatch(setUserData(result.data))
      setLoading(false)
      navigate("/")

      toast.success("Profile updated successfully") // ✅ fixed spelling

    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error?.response?.data?.message || "Update failed")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10'>
      <div className='bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10 max-w-xl w-full relative'>
        
        <div 
          className='absolute top-6 left-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors'
          onClick={() => navigate("/profile")}
        >
          <FaLongArrowAltLeft className='w-5 h-5' />
        </div>

        <div className="text-center mb-8 mt-2">
          <h2 className='text-3xl font-bold text-gray-900 tracking-tight'>Edit Profile</h2>
          <p className="text-gray-500 mt-2 text-sm">Update your photo and personal details.</p>
        </div>

        <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>

          {/* Avatar Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative group cursor-pointer">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-50 flex items-center justify-center">
                {userData?.photoUrl ? (
                  <img 
                    src={userData.photoUrl} 
                    className='w-full h-full object-cover group-hover:opacity-75 transition-opacity'
                    alt=""
                  />
                ) : (
                  <div className='w-full h-full bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold'>
                    {userData?.name?.slice(0,1)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>
            
            <div className='mt-4 w-full'>
              <label className="block w-full cursor-pointer">
                <span className="sr-only">Choose profile photo</span>
                <input 
                  type="file" 
                  name='photoUrl'
                  accept='image/*'
                  onChange={(e) => setPhotoUrl(e.target.files[0])}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-600
                    hover:file:bg-indigo-100 transition-all
                  "
                />
              </label>
            </div>
          </div>

          <div className="h-[1px] bg-gray-100 w-full my-6"></div>

          {/* Name Input */}
          <div>
            <label htmlFor='name' className='block text-sm font-semibold text-gray-700 mb-1.5'>
              Full Name
            </label>
            <input  
              id='name'
              type='text'
              placeholder={userData.name}
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
              Email Address
            </label>
            <input  
              readOnly
              type='text'
              value={userData.email}
              className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed outline-none'
            />
          </div>

          {/* Bio Textarea */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
              Bio
            </label>
            <textarea
              name='description'
              rows={4}
              placeholder='Tell us a little bit about yourself...'
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all'
              onChange={(e) => setDescriptio(e.target.value)}
              value={description}
            />
          </div>

          {/* Submit Button */}
          <button
            className='w-full bg-gray-900 hover:bg-indigo-600 text-white py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 mt-4'
            disabled={loading}
            onClick={handEditProfile}
          >
            {loading ? <ClipLoader size={22} color='white' /> : "Save Changes"}
          </button>

        </form>
      </div>useNavigate } from "react-router-dom";
import api from '../services/api';
import { setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';
import toast from "react-hot-toast"; // ✅ added

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);

  const [name, setName] = useState(userData.name || "")
  const [description, setDescriptio] = useState(userData.description || "")
  const [p
    </div>
  )
}

export default EditProfile