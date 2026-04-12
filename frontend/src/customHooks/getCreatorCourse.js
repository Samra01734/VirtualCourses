import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";
import { serverUrl } from "../config";

function useGetCreatorCourse() {
  const dispatch = useDispatch();

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getcreator`,
          {
            withCredentials: true, // ✅ IMPORTANT (cookie auth)
          }
        );

        console.log("Creator Courses:", result.data);

        // backend returns array directly
        dispatch(setCreatorCourseData(result.data));

      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
      }
    };

    creatorCourses();
  }, [dispatch]);
}

export default useGetCreatorCourse;