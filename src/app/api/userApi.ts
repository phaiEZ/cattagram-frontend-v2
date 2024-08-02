import apiClient from "./apiClient";
import Cookies from "js-cookie";

export const fetchUser = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user information");
  }
};

export const logout = () => {
  Cookies.remove("token");
};
