import axios from 'axios';

// Create an Axios instance
const inventoryApiClient = axios.create({
  baseURL: 'http://192.168.10.122:8082/', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (optional)
});

// Add a request interceptor
inventoryApiClient.interceptors.request.use(
  async (config) => {
    // Retrieve token from localStorage or your preferred storage
    // const token = localStorage.getItem('keycloakToken'); // Example: retrieve token from localStorage

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional, for handling errors or responses globally)
inventoryApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiry or unauthorized access
      console.error('Unauthorized. Redirect to login or refresh token.');
    }
    return Promise.reject(error);
  }
);

export default inventoryApiClient;
