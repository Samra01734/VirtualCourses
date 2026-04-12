import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import google from "../assets/google.jpg"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from 'react-spinners';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Login() {

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true)

    try {
      const result = await api.post("/auth/login", {
        email,
        password
      })

      // 🔥 IMPORTANT FIX (TOKEN SAVE)
      localStorage.setItem("token", result.data.token)

      // redux update
      dispatch(setUserData(result.data))

      toast.success("Login Successfully")

      setLoading(false)
      navigate("/")

    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 z-0"></div>

      <form
        className='w-full max-w-[1000px] h-auto md:h-[600px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl flex overflow-hidden z-10'
        onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
      >

        {/* LEFT SIDE */}
        <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white'>

          <div className='mb-8'>
            <h1 className='font-extrabold text-gray-900 text-3xl'>Welcome back</h1>
            <h2 className='text-gray-500 text-sm mt-2'>
              Please enter your details to sign in.
            </h2>
          </div>

          {/* EMAIL */}
          <div className='mb-5'>
            <label className="font-semibold text-sm text-gray-700">Email Address</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* PASSWORD */}
          <div className='mb-3'>
            <label className="font-semibold text-sm text-gray-700">Password</label>

            <div className='relative mt-2'>
              <input
                type={show ? "text" : "password"}
                placeholder='••••••••'
                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShow(!show)}
              >
                {show ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* FORGOT */}
          <div className="flex justify-end mb-6">
            <span
              className='text-sm text-indigo-600 cursor-pointer'
              onClick={() => navigate("/forget")}
            >
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className='w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-indigo-600 transition flex justify-center'
          >
            {loading ? <ClockLoader size={20} color="white" /> : "Sign in"}
          </button>

          {/* DIVIDER */}
          <div className='flex items-center my-6'>
            <div className='flex-1 h-[1px] bg-gray-200'></div>
            <span className='px-3 text-xs text-gray-400'>OR</span>
            <div className='flex-1 h-[1px] bg-gray-200'></div>
          </div>

          {/* GOOGLE */}
          <div className='flex items-center justify-center border rounded-xl py-3 cursor-pointer hover:bg-gray-50'>
            <img src={google} className='w-5 h-5 mr-2' />
            <span className='text-sm font-medium'>Continue with Google</span>
          </div>

          {/* SIGNUP */}
          <p className='text-center text-sm mt-6 text-gray-500'>
            Don't have an account?
            <span
              className='text-indigo-600 ml-1 cursor-pointer'
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className='hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-indigo-900 items-center justify-center flex-col text-white'>
          <img src={logo} className='w-24 h-24 rounded-xl mb-5' />
          <h2 className='text-2xl font-bold'>Virtual Courses</h2>
          <p className='text-center mt-2 text-indigo-200 px-10'>
            Learn anytime, anywhere with modern courses.
          </p>
        </div>

      </form>
    </div>
  )
}

export default Login