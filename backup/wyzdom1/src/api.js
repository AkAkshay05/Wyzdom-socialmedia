// // src/utils/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/', // Replace with your Django backend URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;
// src/utils/api.js
import axios from 'axios';

const token = localStorage.getItem('token'); // Retrieve token from local storage (if applicable)

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if token exists
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can modify config before the request is sent
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle the response error
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized errors (example)
    }
    return Promise.reject(error);
  }
);

export default api;
