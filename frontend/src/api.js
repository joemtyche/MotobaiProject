import axios from "axios";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./authTokens";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
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
    const requestUrl = originalRequest?.url || "";
    const isAuthRequest =
      requestUrl.includes("/api/token/") ||
      requestUrl.includes("/api/user/register/");

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
          const newAccessToken = response.data.access;

          setAccessToken(newAccessToken);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          alert('Session expired. Please log in again.');
          clearAuthTokens();
          window.location.href = '/login'; 
        }
      } else {
        alert('Session expired. Please log in again.');
        clearAuthTokens();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);


export default api;
