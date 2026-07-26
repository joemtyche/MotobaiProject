import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import { REFRESH_TOKEN } from "./constants";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
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
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
          const newAccessToken = response.data.access;

          localStorage.setItem(ACCESS_TOKEN, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          window.location.href = '/login'; 
        }
      } else {
        alert('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);


export default api;
