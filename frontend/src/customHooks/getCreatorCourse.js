import React, { useEffect } from 'react'
import {serverUrl} from  "../App"
import axios from "axios"

function getCreatorCourse() {
  return (
    useEffect(()=>{
      const creatorCourses=async()=>{
        try {
          const result=await axios.get(serverUrl,+"/api/course/getcreator",{with})
        } catch (error) {
          
        }
      }
    },[])
  )
}

export default getCreatorCourse
