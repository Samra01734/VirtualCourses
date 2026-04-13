import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import api from '../services/api'
import { setUserData } from "../redux/userSlice"

const useGetCurrentUser = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    const fetchUser = async () => {
      try {

        const result = await api.get("/user/getcurrentuser")

        // Preserve token if it exists in local storage
        const currentToken = localStorage.getItem("token");
        const userDataWithToken = currentToken 
          ? { ...result.data, token: currentToken } 
          : result.data;

        dispatch(setUserData(userDataWithToken))

      } catch (error) {

        console.log(error)
        dispatch(setUserData(null))

      }
    }

    fetchUser()

  }, [dispatch])

  return null
}

export default useGetCurrentUser