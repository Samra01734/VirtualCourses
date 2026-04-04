import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import google from "../assets/google.jpg"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from 'react-spinners';
import api from '../services/api';
import { toast } from 'react-toastify'; // make sure toast is imported
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Login() {

  const [show , setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const handleLogin = async () => {
    setLoading(true)

    try {
      const result = await api.post(
        "/auth/login",
        { email, password }
      )
       dispatch(setUserData(result.data))
        toast.success("Login Successfully")
      setLoading(false)
      // navigate to welcome/dashboard page after login
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
        {/* LEFT SIDE - LOGIN FORM */}
        <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white'>

          <div className='mb-8'>
            <h1 className='font-extrabold text-gray-900 text-3xl tracking-tight'>Welcome back</h1>
            <h2 className='text-gray-500 text-sm mt-2'>Please enter your details to sign in.</h2>
          </div>

          {/* Email input */}
          <div className='flex flex-col gap-2 w-full mb-5'>
            <label htmlFor="email" className="font-semibold text-sm text-gray-700">Email Address</label>
            <input
              id='email'
              type='text'
              placeholder='Enter your email'
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password input */}
          <div className='flex flex-col gap-2 w-full mb-3'>
            <label htmlFor="password" className="font-semibold text-sm text-gray-700">Password</label>
            <div className='relative w-full'>
              <input
                id='password'
                type={show ? "text" : "password"}
                placeholder='••••••••'
                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
              <div 
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShow(!show)}
              >
                {show ? <FaRegEye className='w-5 h-5'/> : <FaRegEyeSlash className='w-5 h-5'/>}
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <span className='text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors' onClick={()=>navigate("/forget")}>
              Forgot password?
            </span>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className='w-full py-3.5 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2'
            disabled={loading}
          >
            {loading ? <ClockLoader size={22} color='white' /> : "Sign in"}
          </button>

          {/* Divider */}
          <div className='w-full flex items-center gap-3 my-6'>
            <div className='flex-1 h-[1px] bg-gray-100'></div>
            <div className='text-gray-400 text-xs font-medium uppercase tracking-wider'>Or continue with</div>
            <div className='flex-1 h-[1px] bg-gray-100'></div>
          </div>

          {/* Google login */}
          <div className='w-full py-3 border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer transition-colors'>
            <img src={google} className='w-5 h-5 mr-3' alt='Google' />
            <span className='text-sm font-semibold text-gray-700'>Google</span>
          </div>

          {/* Navigate to signup */}
          <div className='text-gray-500 text-sm mt-8 text-center'>
            Don't have an account?
            <span
              className='font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer ml-1 transition-colors'
              onClick={()=>navigate("/signup")}
            >
              Sign up for free
            </span>
          </div>
        </div>

        {/* RIGHT SIDE - BRAND SECTION */}
        <div className='hidden md:flex w-1/2 h-full bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 items-center justify-center flex-col relative overflow-hidden'>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 right-0 top-0"></div>
          
          <div className="relative z-10 flex flex-col items-center p-12 text-center">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl p-1 shadow-2xl mb-8 border border-white/20">
              <img src={logo} alt='logo' className='w-full h-full rounded-xl object-cover' />
            </div>
            <h2 className='text-3xl font-bold text-white mb-4 tracking-tight'>Virtual Courses</h2>
            <p className="text-indigo-100 text-lg font-light leading-relaxed">
              Unlock your potential with world-class education. Learn from the best, anywhere, anytime.
            </p>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Login