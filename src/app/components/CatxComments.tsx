import React, { useState, useEffect } from "react";
import { Button, Input, List, message, Space } from "antd";
import {
  createComment,
  deleteComment,
  getCommentsByCatxId,
} from "../api/comment";
import { Comment } from "../type/comment";
import Cookies from "js-cookie";
import { comment } from "postcss";
interface CatxCommentsProps {
  catxId: string;
}

const CatxComments: React.FC<CatxCommentsProps> = ({ catxId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const userId = Cookies.get("userId");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data: any = await getCommentsByCatxId(catxId);
      setComments(data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      await createComment({ catxId, text: newComment });
      setNewComment("");
      fetchComments();
      message.success("Comment added successfully");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      fetchComments();
      message.success("Comment deleted successfully");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="w-full ">
      {comments.map((comment) => (
        <div className="flex gap-2 mb-2 items-center ">
          <img
            className="h-10 w-10 object-cover rounded-full "
            src={comment.user.profilePic}
            alt="Cat Profile"
          />
          <div className="flex flex-col  ">
            <div className="flex gap-2">
              <div className="font-bold">{comment.user.username}</div>
              <div className=" text-gray-500">
                {new Date(comment.created).toLocaleDateString()}
              </div>
            </div>
            <div>{comment.text}</div>
          </div>
          {userId === comment.user.id && (
            <Button
              className=" ml-auto"
              type="link"
              danger
              onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </Button>
          )}
        </div>
      ))}

      <Space direction="vertical" size="large" className="w-full">
        <Space.Compact style={{ width: "100%" }}>
          <Input
            defaultValue="Combine input and button"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="primary" onClick={handleAddComment}>
            Comment
          </Button>
        </Space.Compact>
      </Space>
    </div>
  );
};

export default CatxComments;
