import apiClient from "./apiClient";

export const fetchUserImage = async (userId: string) => {
  try {
    const response = await apiClient.get(`/image/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user image");
  }
};
