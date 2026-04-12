import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ForgetPassword from './pages/forgetPassword'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useGetCurrentUser from './customHooks/getCurrentUser'

// User Pages
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

// Educator Pages
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import EditCourse from './pages/Educator/EditCourse'

// Route Protection
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import getCreatorCourse from './customHooks/getCreatorCourse'

function App() {

  // ✅ sirf call kar rahe hain (crash avoid)
  useGetCurrentUser()
  getCreatorCourse()

  return (
    <>
      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <Routes>

        {/* 🔓 Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forget' element={<ForgetPassword />} />
        </Route>

        {/* 🔐 Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<EditProfile />} />

          {/* ✅ DIRECT ACCESS (no role check now) */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/create-course' element={<CreateCourses />} />
          <Route path='/edit-course/:id' element={<EditCourse />} />

        </Route>

        {/* 🏠 Home */}
        <Route path='/' element={<Home />} />

        {/* ❌ Catch */}
        <Route path='*' element={<Navigate to="/" />} />

      </Routes>
    </>
  )
}

export default App