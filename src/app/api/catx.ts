import apiClient from "./apiClient";
import qs from "qs";

interface createCatxPost {
  description: string;
}

export const fetchAllCatx = async () => {
  try {
    const response = await apiClient.get(`/catx/`);

    return response.data;
  } catch (error) {
    throw new Error("Get catX post");
  }
};

export const getCatxByUserId = async (userId: string) => {
  try {
    const response = await apiClient.get(`/catx/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error("Get catX post");
  }
};

export const createCatxPost = async (values: createCatxPost) => {
  try {
    const response = await apiClient.post(
      "/catx/create",
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to create cat post");
  }
};

export const deleteCatxPost = async (id: string) => {
  try {
    const response = await apiClient.delete(`/catx/${id}`);

    return response.data;
  } catch (error) {
    throw new Error("Failed to delete cat post");
  }
};

export const updateCatxPost = async (id: string, description: string) => {
  try {
    const response = await apiClient.patch(`/catx/${id}`, {
      description,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update cat post");
  }
};
