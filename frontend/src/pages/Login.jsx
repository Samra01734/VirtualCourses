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
    if (!email || !password) {
      toast.error("Please fill all fields")
      return;
    }

    setLoading(true)

    try {
      const result = await api.post("/auth/login", {
        email,
        password
      })

      // ✅ SAFE RESPONSE CHECK
      if (result.data?.token) {
        localStorage.setItem("token", result.data.token)  // 🔥 IMPORTANT FIX
      }

      dispatch(setUserData(result.data))

      toast.success("Login Successful")

      setEmail("")
      setPassword("")

      navigate("/")

    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message || "Login failed"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 z-0"></div>

      <form
        className='w-full max-w-[1000px] h-auto md:h-[600px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl flex overflow-hidden z-10'
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
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
            className='w-full py-3 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl flex justify-center'
          >
            {loading ? <ClockLoader size={20} color='white' /> : "Sign in"}
          </button>

          {/* DIVIDER */}
          <div className='my-6 flex items-center gap-3'>
            <div className='flex-1 h-[1px] bg-gray-200'></div>
            <span className='text-xs text-gray-400'>OR</span>
            <div className='flex-1 h-[1px] bg-gray-200'></div>
          </div>

          {/* GOOGLE */}
          <div className='border p-3 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50'>
            <img src={google} className='w-5 h-5 mr-2' />
            <span className='text-sm font-medium'>Google</span>
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

        {/* RIGHT SIDE (UNCHANGED DESIGN) */}
        <div className='hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 items-center justify-center flex-col relative overflow-hidden'>

          <div className="absolute w-72 h-72 bg-purple-500 blur-3xl opacity-30"></div>

          <div className="relative z-10 text-center p-10">
            <img src={logo} className='w-24 h-24 mx-auto mb-5 rounded-xl' />
            <h2 className='text-white text-3xl font-bold mb-3'>
              Virtual Courses
            </h2>
            <p className='text-indigo-100'>
              Learn anytime, anywhere with world-class education.
            </p>
          </div>

        </div>

      </form>
    </div>
  )
}

export default Login