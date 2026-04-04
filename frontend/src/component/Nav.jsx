import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logoutUser, setUserData } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import api from '../services/api';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Get userData from Redux
  const userData = useSelector(state => state.user?.userData);

  // ✅ Hydrate Redux from localStorage on mount (Google login persistence)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser && !userData) {
      dispatch(setUserData(storedUser));
    }
  }, [dispatch, userData]);

  const handleLogout = async () => {
    try {
      // Notify backend to clear httpOnly cookie (if any)
      await api.get("/auth/logout");
    } catch (error) {
      console.log("Backend logout error:", error);
    }
    
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className='w-[100%] h-[80px] fixed top-0 px-6 lg:px-12 py-[10px] flex items-center justify-between bg-black/20 backdrop-blur-lg border-b border-white/10 z-50 transition-all duration-300'>

      {/* Logo */}
      <div className='flex items-center gap-3 cursor-pointer group' onClick={() => navigate("/")}>
        <div className='w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[2px] shadow-lg group-hover:scale-105 transition-transform duration-300'>
          <img
            src={logo}
            alt="logo"
            className='w-full h-full rounded-xl object-cover border-2 border-transparent'
          />
        </div>
        <span className='hidden lg:block text-xl font-bold text-white tracking-tight drop-shadow-md'>
          VirtualCourses
        </span>
      </div>

      {/* Desktop Menu */}
      <div className='relative lg:flex items-center justify-center gap-6 hidden'>

        {/* Dashboard for educators */}
        {userData?.role === "educator" && (
          <div
            className='px-5 py-2.5 rounded-xl text-[15px] font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer'
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        )}

        {/* Login / Logout */}
        {!userData ? (
          <div className="flex gap-4">
            <span
              className='px-6 py-2.5 text-[15px] font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer flex items-center'
              onClick={() => navigate('/login')}
            >
              Log in
            </span>
            <span
              className='px-6 py-2.5 bg-indigo-600 text-white rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:bg-indigo-500 hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all duration-300 text-[15px] font-medium cursor-pointer'
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Profile Circle */}
            <div
              onClick={() => setShow(prev => !prev)}
              className='w-[45px] h-[45px] rounded-full text-indigo-600 flex items-center justify-center text-[18px] font-bold bg-indigo-50 border-2 border-indigo-100 cursor-pointer shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300'
            >
              {userData?.photoUrl ? (
                <img src={userData.photoUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : userData?.name ? (
                userData.name.slice(0, 1).toUpperCase()
              ) : (
                <IoPersonCircle className='w-[25px] h-[25px]' />
              )}
            </div>
          </div>
        )}

        {/* Dropdown */}
        {show && (
          <div className='absolute top-[120%] right-0 flex flex-col w-48 text-[15px] rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transform origin-top-right transition-all duration-200'>
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <p className="text-sm font-semibold text-gray-800 truncate">{userData?.name}</p>
              <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
            </div>
            <span
              onClick={() => { navigate("/profile"); setShow(false); }}
              className='px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-2'
            >
              My Profile
            </span>
            <span
              onClick={() => { navigate("/courses"); setShow(false); }}
              className='px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-2'
            >
              My Courses
            </span>
            <div className="h-[1px] bg-gray-100"></div>
            <span
              onClick={() => { handleLogout(); setShow(false); }}
              className='px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer transition-colors flex items-center gap-2 font-medium'
            >
              Log out
            </span>
          </div>
        )}
      </div>

      {/* Hamburger */}
      <GiHamburgerMenu
        onClick={() => setMenuOpen(true)}
        className='w-[28px] h-[28px] lg:hidden text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors'
      />

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className='fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity'
        />
      )}

      {/* Right Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col items-center gap-6 pt-[80px] z-50 transform transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Cross */}
        <RxCross2
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 w-[28px] h-[28px] text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
        />

        {/* User Circle */}
        {userData && (
          <div className='flex flex-col items-center gap-3 mb-4 w-full px-6'>
            <div className='w-[80px] h-[80px] rounded-full border-4 border-indigo-50 flex items-center justify-center text-[32px] font-bold bg-indigo-100 text-indigo-600 shadow-md'>
              {userData?.photoUrl ? (
                <img src={userData.photoUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : userData?.name ? (
                userData.name.slice(0, 1).toUpperCase()
              ) : (
                <IoPersonCircle className='w-[45px] h-[45px]' />
              )}
            </div>
            <div className="text-center">
              <span className='text-[18px] font-bold text-gray-800 block'>
                {userData.name}
              </span>
              <span className='text-[14px] text-gray-500'>
                {userData.email}
              </span>
            </div>
          </div>
        )}

        {/* Drawer Links */}
        <div className="w-full px-6 flex flex-col gap-2">
          {userData && (
            <>
              <span
                onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                className='w-full px-4 py-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium transition cursor-pointer'
              >
                My Profile
              </span>

              <span
                onClick={() => { navigate("/courses"); setMenuOpen(false); }}
                className='w-full px-4 py-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium transition cursor-pointer'
              >
                My Courses
              </span>
            </>
          )}

          {userData?.role === "educator" && (
            <span
              onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
              className='w-full px-4 py-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium transition cursor-pointer'
            >
              Dashboard
            </span>
          )}

          <div className="h-[1px] bg-gray-100 my-2 w-full"></div>

          {!userData ? (
            <>
              <span
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
                className='w-full px-4 py-3 rounded-xl text-center text-gray-700 hover:bg-gray-50 font-medium transition cursor-pointer'
              >
                Log in
              </span>
              <span
                onClick={() => { navigate("/signup"); setMenuOpen(false); }}
                className='w-full px-4 py-3 mt-2 rounded-xl text-center bg-gray-900 text-white hover:bg-indigo-600 shadow-md font-medium transition cursor-pointer'
              >
                Sign up
              </span>
            </>
          ) : (
            <span
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className='w-full px-4 py-3 rounded-xl text-center text-red-600 hover:bg-red-50 font-medium transition cursor-pointer'
            >
              Log out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;