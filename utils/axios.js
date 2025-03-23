import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


let isRefreshing = false;
let refreshSubscribers = [];


const onTokenRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};


const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Function to refresh the token
const getRefreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh-token`, { refreshToken });
    return response;
  } catch (error) {
    throw error;
  }
};


// instance.interceptors.request.use(
//   async (config) => {
//     // Exclude sign-up and login routes from requiring authentication
//     const urlPath = new URL(config.url, BASE_URL).pathname;

//     if (urlPath === "/api/v1/auth/signup" || urlPath === "/api/v1/auth/login") {
//       return config;
//     }
    

//     let token = Cookies.get("accessToken");

//     if (!token) {
//       const refreshToken = Cookies.get("refreshToken");
//       if (!refreshToken) {
//         throw new Error("No accessToken or refreshToken available. User must log in.");
//       }

//       if (!isRefreshing) {
//         isRefreshing = true;

//         try {
//           const refreshResponse = await getRefreshToken(refreshToken);
//           const newAccessToken = refreshResponse.data.accessToken;

//           Cookies.set("accessToken", newAccessToken, { expires: 5 / 24 });
//           onTokenRefreshed(newAccessToken);

//           token = newAccessToken;
//         } catch (refreshError) {
//           console.error("Error refreshing token:", refreshError);
//           isRefreshing = false;
//           throw refreshError;
//         }

//         isRefreshing = false;
//       } else {
//         await new Promise((resolve) =>
//           addRefreshSubscriber((newAccessToken) => {
//             token = newAccessToken;
//             resolve();
//           })
//         );
//       }
//     }

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
instance.interceptors.request.use(
  async (config) => {
    const urlPath = new URL(config.url, BASE_URL).pathname;

    if (urlPath === "/api/v1/auth/signup" || urlPath === "/api/v1/auth/login") {
      return config;
    }

    let token = Cookies.get("accessToken"); 

    if (!token) {
      const refreshToken = Cookies.get("refreshToken"); 
      if (!refreshToken) {
        throw new Error("No accessToken or refreshToken available. User must log in.");
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResponse = await getRefreshToken(refreshToken);
          const newAccessToken = refreshResponse.data.accessToken;

          Cookies.set("accessToken", newAccessToken, { expires: 5 / 24 });
          onTokenRefreshed(newAccessToken);

          token = newAccessToken;
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          isRefreshing = false;
          throw refreshError;
        }

        isRefreshing = false;
      } else {
        await new Promise((resolve) =>
          addRefreshSubscriber((newAccessToken) => {
            token = newAccessToken;
            resolve();
          })
        );
      }
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor to handle errors and refresh token if expired
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

          
          Cookies.set('accessToken', newAccessToken, { expires: 1 / 24 });

          
          onTokenRefreshed(newAccessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          isRefreshing = false;
          return instance(originalRequest); 
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

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


export default instance;