import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// Create an Axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to add the access token to the headers
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers = [];

// Notify subscribers with the new token
const onTokenRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Add a subscriber
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Function to refresh the token
const getRefreshToken = async (refreshToken) => {
  return axios.post(`${BASE_URL}/api/v1/auth/refresh-token`, { refreshToken });
};

// Response interceptor to handle errors and refresh the token if needed
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = Cookies.get('refreshToken');

        try {
          const refreshResponse = await getRefreshToken(refreshToken);
          const newAccessToken = refreshResponse.data.accessToken;

          // Update the access token in cookies
          Cookies.set('accessToken', newAccessToken, { expires: 1 / 24 });

          // Notify all subscribers with the new token
          onTokenRefreshed(newAccessToken);

          isRefreshing = false;
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // Wait for the token refresh and retry the original request
      return new Promise((resolve) => {
        addRefreshSubscriber((newAccessToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          resolve(instance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

// Export the Axios instance
export default instance;
