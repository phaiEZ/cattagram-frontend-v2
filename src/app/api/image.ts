import { uploadImg } from "../type/img";
import apiClient from "./apiClient";
import qs from "qs";

export const fetchUserImage = async (userId: string) => {
  try {
    const response = await apiClient.get(`/image/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user image");
  }
};

export const uploadImage = async (values: uploadImg) => {
  console.log(values);

  const response = await apiClient.post(
    "/image/upload-image",
    qs.stringify(values),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};
