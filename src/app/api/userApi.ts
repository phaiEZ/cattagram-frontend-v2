import apiClient from "./apiClient";
import Cookies from "js-cookie";
import qs from "qs";

export const fetchUser = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user information");
  }
};

export const signup = async (values: any) => {
  try {
    const response = await apiClient.post(
      "/user/signup",
      qs.stringify({
        username: values.username,
        password: values.password,
        catName: values.catName,
        ownerName: values.ownerName,
        gender: values.gender,
        breeds: values.breeds,
        description: values.description,
        profilePic: values.profilePic,
        birthPlace: values.birthPlace,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const logout = () => {
  Cookies.remove("token");
};
