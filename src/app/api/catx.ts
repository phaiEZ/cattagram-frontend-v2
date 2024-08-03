import apiClient from "./apiClient";

export const fetchAllCatx = async () => {
  try {
    const response = await apiClient.get(`/catx/`);

    return response.data;
  } catch (error) {
    throw new Error("Get catX post");
  }
};
