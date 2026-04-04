import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import api from "../services/api"
import { ClipLoader } from "react-spinners"
import { FaLongArrowAltLeft } from "react-icons/fa"

function ForgetPassword() {

  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Step 1 Send OTP
  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email")
      return
    }

    setLoading(true)
    try {
      const result = await api.post("/auth/sendotp", { email })
      toast.success(result.data.message)
      setStep(2)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Error sending OTP")
    }
    setLoading(false)
  }

  // Step 2 Verify OTP
  const verifyOtp = async () => {
    if (!email || !otp) {
      toast.error("Email and OTP are required")
      return
    }

    setLoading(true)
    try {
      const result = await api.post(
        "/auth/verifyotp",
        {
          email: email.trim(),
          otp: otp.toString().trim()
        }
      )
      toast.success(result.data.message)
      setStep(3)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Invalid OTP")
    }
    setLoading(false)
  }

  // Step 3 Reset Password
  const resetPassword = async () => {
    if (!newPassword || !conPassword) {
      toast.error("Please fill all fields")
      return
    }

    if (newPassword !== conPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const result = await api.post(
        "/auth/resetpassword",
        {
          email: email.trim(),
          newPassword: newPassword.trim() // backend expects 'newPassword'
        }
      )
      toast.success(result.data.message)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Error resetting password")
    }
    setLoading(false)
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 z-0"></div>

      <div className='relative z-10 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl p-8 sm:p-10 max-w-md w-full overflow-hidden'>
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

        {/* Back button */}
        <div 
          className='w-10 h-10 mb-6 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors'
          onClick={() => navigate("/login")}
        >
          <FaLongArrowAltLeft className='w-4 h-4' />
        </div>

        {/* Step 1 */}
        {step === 1 &&
          <div className='animate-fade-in'>
            <h2 className='text-3xl font-extrabold mb-2 text-gray-900 tracking-tight'>
              Forgot Password
            </h2>
            <p className="text-gray-500 text-sm mb-8">No worries, we'll send you reset instructions.</p>
            
            <form className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-1.5'>
                  Email Address
                </label>
                <input
                  id='email'
                  type='email'
                  className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter your registered email'
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <button
                type="button"
                onClick={sendOtp}
                disabled={loading}
                className='w-full bg-gray-900 hover:bg-indigo-600 text-white py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center'
              >
                {loading ? <ClipLoader size={20} color='white' /> : "Send Reset Code"}
              </button>
            </form>
          </div>
        }

        {/* Step 2 */}
        {step === 2 &&
          <div className='animate-fade-in'>
            <h2 className='text-3xl font-extrabold mb-2 text-gray-900 tracking-tight'>
              Check your email
            </h2>
            <p className="text-gray-500 text-sm mb-8">We've sent a 6-digit verification code to <span className="font-semibold text-gray-800">{email}</span>.</p>
            
            <form className='space-y-6'>
              <div>
                <label htmlFor='otp' className='block text-sm font-semibold text-gray-700 mb-1.5'>
                  Verification Code
                </label>
                <input
                  id='otp'
                  type='text'
                  className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-center tracking-[0.5em] font-mono'
                  placeholder='000000'
                  required
                  maxLength={6}
                  onChange={(e)=>setOtp(e.target.value)}
                  value={otp}
                />
              </div>
              <button
                type="button"
                onClick={verifyOtp}
                disabled={loading}
                className='w-full bg-gray-900 hover:bg-indigo-600 text-white py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center'
              >
                {loading ? <ClipLoader size={20} color='white' /> : "Verify Code"}
              </button>
            </form>
          </div>
        }

        {/* Step 3 */}
        {step === 3 &&
          <div className='animate-fade-in'>
            <h2 className='text-3xl font-extrabold mb-2 text-gray-900 tracking-tight'>
              Set new password
            </h2>
            <p className='text-sm text-gray-500 mb-8'>
              Your new password must be different from previous used passwords.
            </p>
            
            <form className='space-y-5'>
              <div>
                <label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-1.5'>
                  New Password
                </label>
                <input
                  id='password'
                  type='password'
                  className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                  placeholder='••••••••'
                  required
                  onChange={(e)=>setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
              
              <div>
                <label htmlFor='cpassword' className='block text-sm font-semibold text-gray-700 mb-1.5'>
                  Confirm Password
                </label>
                <input
                  id='cpassword'
                  type='password'
                  className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'
                  placeholder='••••••••'
                  required
                  onChange={(e)=>setConPassword(e.target.value)}
                  value={conPassword}
                />
              </div>
              
              <button
                type="button"
                onClick={resetPassword}
                disabled={loading}
                className='w-full mt-2 bg-gray-900 hover:bg-indigo-600 text-white py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center'
              >
                {loading ? <ClipLoader size={20} color='white' /> : "Reset Password"}
              </button>
            </form>
          </div>
        }

      </div>
    </div>
  )
}

export default ForgetPassword