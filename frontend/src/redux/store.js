// store.js
import { configureStore } from '@reduxjs/toolkit';
//import userReducer from './userSlice.js'; // ensure path + name correct ho
import userSlice from './userSlice'
import courseSlice from './courseSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,// must be a valid reducer function
    course:courseSlice
  },
});