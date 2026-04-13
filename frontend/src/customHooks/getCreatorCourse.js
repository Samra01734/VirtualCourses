import { useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice'
import { serverUrl } from '../config'

function useGetCreatorCourse() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(() => {

    // ❗ user login check
    if (!userData?._id) {
      console.log("User not logged in")
      return
    }

    const creatorCourses = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getcreator`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        )

        console.log("API Response:", result.data)

        // 👇 agar backend {courses: []} bhej raha ho
        dispatch(setCreatorCourseData(result.data.courses || result.data))

      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message)
      }
    }

    creatorCourses()

  }, [userData, dispatch])
}

export default useGetCreatorCourse