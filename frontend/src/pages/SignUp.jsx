import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { auth, provider } from '../../utils/firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';

function SignUp() {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // ============================
  // ✅ SIGNUP FUNCTION
  // ============================
  const handleSignup = async () => {

    // 🔥 NAME VALIDATION
    if (!name.trim()) {
      return toast.error("Name is required");
    }

    // 🔥 EMAIL VALIDATION
    if (!email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Enter a valid email");
    }

    // 🔥 PASSWORD VALIDATION
    if (!password) {
      return toast.error("Password is required");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    setLoading(true);

    try {
      const result = await api.post(
        "/auth/signup",
        { name, email, password, role }
      );

      dispatch(setUserData(result.data));
      toast.success("Signup successful 🎉");
      navigate('/');

    } catch (error) {
      console.log("BACKEND ERROR:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // ✅ GOOGLE SIGNUP
  // ============================
  const googleSignUp = () => {
    signInWithRedirect(auth, provider);
  };

  // ============================
  // ✅ GOOGLE REDIRECT HANDLER
  // ============================
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const user = result.user;

          const googleUserData = {
            name: user.displayName,
            email: user.email,
            password: null,
            role: "student"
          };

          try {
            const res = await api.post(
              "/auth/signup-google",
              googleUserData
            );

            dispatch(setUserData(res.data));
            toast.success("Logged in with Google!");
            navigate('/');

          } catch (err) {
            toast.error(err.response?.data?.message || "Google login failed!");
          }
        }
      })
      .catch(() => {
        toast.error("Google login failed!");
      });
  }, [dispatch, navigate]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 z-0"></div>

      <form 
        className='w-full max-w-[1000px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl flex overflow-hidden z-10' 
        onSubmit={(e) => e.preventDefault()}
      >
        {/* LEFT SIDE - FORM */}
        <div className='w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white'>

          <div className='mb-6'>
            <h1 className='font-extrabold text-gray-900 text-3xl tracking-tight'>Let's get started</h1>
            <h2 className='text-gray-500 text-sm mt-1'>Create your account to unlock all features.</h2>
          </div>

          <div className='flex flex-col gap-4 w-full'>
            {/* NAME */}
            <div className='flex flex-col gap-1.5 w-full'>
              <label className="font-semibold text-sm text-gray-700">Full Name</label>
              <input
                type='text'
                placeholder='Enter your full name'
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className='flex flex-col gap-1.5 w-full'>
              <label className="font-semibold text-sm text-gray-700">Email Address</label>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className='flex flex-col gap-1.5 w-full'>
              <label className="font-semibold text-sm text-gray-700">Password</label>
              <div className='relative w-full'>
                <input
                  type={show ? "text" : "password"}
                  placeholder='Create a strong password'
                  className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div 
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaRegEye className='w-4 h-4'/> : <FaRegEyeSlash className='w-4 h-4'/>}
                </div>
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="font-semibold text-sm text-gray-700 block mb-1.5">I am a...</label>
              <div className='flex w-full gap-3'>
                <div 
                  onClick={() => setRole("student")}
                  className={`flex-1 py-2 border-2 rounded-xl text-sm text-center font-medium cursor-pointer transition-all ${role === "student" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                >
                  Student
                </div>
                <div 
                  onClick={() => setRole("educator")}
                  className={`flex-1 py-2 border-2 rounded-xl text-sm text-center font-medium cursor-pointer transition-all ${role === "educator" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                >
                  Educator
                </div>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className='w-full py-3 mt-6 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2'
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Create Account"}
          </button>

          {/* Divider */}
          <div className='w-full flex items-center gap-3 my-5'>
            <div className='flex-1 h-[1px] bg-gray-100'></div>
            <div className='text-gray-400 text-[11px] font-medium uppercase tracking-wider'>Or</div>
            <div className='flex-1 h-[1px] bg-gray-100'></div>
          </div>

          {/* Google login */}
          <div 
            onClick={googleSignUp}
            className='w-full py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer transition-colors mb-4'
          >
            <img src={google} className='w-4 h-4 mr-3' alt='Google' />
            <span className='text-sm font-semibold text-gray-700'>Sign up with Google</span>
          </div>

          <div className='text-gray-500 text-sm text-center'>
            Already have an account?
            <span
              className='font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer ml-1 transition-colors'
              onClick={() => navigate("/login")}
            >
              Log in here
            </span>
          </div>

        </div>

        {/* RIGHT SIDE - BRAND SECTION */}
        <div className='hidden md:flex w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 items-center justify-center flex-col relative overflow-hidden'>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 right-0 bottom-0"></div>
          
          <div className="relative z-10 flex flex-col items-center p-12 text-center">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl p-1 shadow-2xl mb-8 border border-white/20">
              <img src={logo} alt='logo' className='w-full h-full rounded-xl object-cover' />
            </div>
            <h2 className='text-3xl font-bold text-white mb-4 tracking-tight'>Join the Community</h2>
            <p className="text-indigo-100 text-lg font-light leading-relaxed">
              Start your learning journey today. Connect with top educators and accelerate your career growth.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}

export default SignUp;