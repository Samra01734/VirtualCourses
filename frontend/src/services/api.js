import axios from 'axios';
import { store } from '../redux/store';
import { logoutUser } from '../redux/userSlice';

// We define serverUrl directly here to avoid circular dependency with App.jsx
export const serverUrl = "http://localhost:5000";

const api = axios.create({
  baseURL: `${serverUrl}/api`,
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Access Redux store directly to get the token
    const state = store.getState();
    const token = state.user.userData?.token || localStorage.getItem('token');
    
    if (token && token !== 'undefined' && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, perfectly log out the user and clear token
      store.dispatch(logoutUser());
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
