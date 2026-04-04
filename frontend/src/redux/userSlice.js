import { createSlice } from "@reduxjs/toolkit";

const getUserDataFromStorage = () => {
  try {
    const data = localStorage.getItem("userData");
    return data && data !== "undefined" ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: getUserDataFromStorage()
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      if (action.payload) {
        localStorage.setItem("userData", JSON.stringify(action.payload));
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      }
    },
    logoutUser: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    }
  }
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;