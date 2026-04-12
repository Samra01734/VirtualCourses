import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("🚀 API CALL STARTED: getCurrentUser");

        // 1. Token check
        const token = localStorage.getItem("token");
        console.log("🔑 TOKEN FROM LOCALSTORAGE:", token);

        if (!token) {
          console.log("❌ No token found!");
          dispatch(setUserData(null));
          return;
        }

        // 2. API call
        const result = await api.get("/user/getcurrentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 3. Response check
        console.log("✅ USER DATA RECEIVED:", result.data);

        // 4. Redux update
        dispatch(setUserData({ ...result.data, token }));

      } catch (error) {
        console.log("❌ ERROR FETCHING USER:");
        console.log("STATUS:", error.response?.status);
        console.log("MESSAGE:", error.response?.data || error.message);

        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  return null;
};

export default useGetCurrentUser;