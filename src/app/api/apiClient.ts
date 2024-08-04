import axios from "axios";
import Cookies from "js-cookie";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
