import { CreateComment } from "../type/comment";
import apiClient from "./apiClient";

export const createComment = async (commentData: CreateComment) => {
  try {
    const response = await apiClient.post<Comment>(
      "/comment/create",
      commentData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create comment");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await apiClient.delete<{ message: string }>(
      `/comment/${commentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete comment");
  }
};

export const getCommentsByCatxId = async (catxId: string) => {
  try {
    const response = await apiClient.get<Comment[]>(`/comment/${catxId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
};
