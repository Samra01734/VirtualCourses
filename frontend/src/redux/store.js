// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js'; // ensure path + name correct ho

export const store = configureStore({
  reducer: {
    user: userReducer // must be a valid reducer function
  },
});