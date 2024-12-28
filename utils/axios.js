
import axios from 'axios';
import { useAuthStore } from './authStore'; // Adjust the import to match your project's structure
import { refreshToken } from '../../backend/routes/authRoute'; // Adjust this to your refresh token API method
import { cookies } from 'next/headers';

// Create an Axios instance
const instance = axios.create({
  withCredentials: true, // Send cookies with each request
  baseURL: `${BASE_URL}` // Base URL for all requests
});

// Request interceptor to add the access token to the headers
instance.interceptors.request.use(
  (config) => {
    const token = cookies().get('accessToken') || localStorage.getItem('accessToken'); // Get access token from local storage
    console.log('Access Token:', token); // Log the token for debugging

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers if it exists
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Reject the promise if there's an error
  }
);

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers = [];

// Subscribe to token refresh event
const onTokenRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Add a subscriber
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Response interceptor to handle errors and refresh the token if needed
instance.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  async (error) => {
    const originalRequest = error.config; // Store the original request

    // Check if the error is a 401 Unauthorized due to an invalid token
    if (error.response?.status === 401 && error.response.data?.message === 'Unauthorized - Invalid token') {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token from local storage

        try {
          // Attempt to get a new access token using the refresh token
          const refreshResponse = await getRefreshToken(refreshToken);

          // Update the access token in the state
          useAuthStore.getState().updateAccessToken(refreshResponse.data.accessToken);

          // Notify all subscribers with the new token
          onTokenRefreshed(refreshResponse.data.accessToken);

          // Set refreshing flag to false
          isRefreshing = false;
        } catch (refreshError) {
          // Log the error if refreshing the token fails
          console.error('Refresh token failed:', refreshError);

          // Logout the user if the refresh token fails
          useAuthStore.getState().logout();
          isRefreshing = false;

          // Reject the promise with the error
          return Promise.reject(refreshError);
        }
      }

      // Wait for the refresh to complete and retry the original request
      return new Promise((resolve) => {
        addRefreshSubscriber((newAccessToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          resolve(instance(originalRequest));
        });
      });
    }

    // Reject the promise with the error if not a 401
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default instance;
