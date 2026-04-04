import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ForgetPassword from './pages/forgetPassword'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { serverUrl } from './services/api';

import useGetCurrentUser from './customHooks/getCurrentUser'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  useGetCurrentUser()

  return (
    <>
      {/* ✅ TOASTIFY */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />

      <Routes>
        {/* Public Routes (Accessible only to non-logged-in users) */}
        <Route element={<PublicRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forget' element={<ForgetPassword />} />
        </Route>

        {/* Protected Routes (Accessible only to logged-in users) */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Home - Accessible to everyone */}
        <Route path='/' element={<Home />} />

        {/* Catch-all */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App