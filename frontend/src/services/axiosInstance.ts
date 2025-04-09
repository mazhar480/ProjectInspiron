// src/services/axiosInstance.ts
import axios from "axios";

// Create an Axios instance with JWT attached to every request
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to every request
  }
  return config;
});

export default axiosInstance;
