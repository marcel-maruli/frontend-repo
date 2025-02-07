import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = Cookies.get('_SSID')

  if (token) {
  config.headers.Authorization =  `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
