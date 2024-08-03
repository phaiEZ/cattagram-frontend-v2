"use client";
import React, { useState } from "react";

import { CatxPost } from "../type/catx";
import { Button, Dropdown, Popconfirm, message } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { deleteCatxPost } from "../api/catx";
import Cookies from "js-cookie";
import ModalEditPost from "./ModalEditPost";
import { useRouter } from "next/navigation";

interface CatxCardProps {
  catxPost: CatxPost;
}

const CatxCard: React.FC<CatxCardProps> = ({ catxPost }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const confirmDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteCatxPost(catxPost.id);
      message.success("Post deleted successfully");
      setConfirmLoading(false);
      window.location.reload();
    } catch (error) {
      message.error("Failed to delete post");
      console.error("Delete Post Failed:", error);
      setConfirmLoading(false);
    } finally {
      setOpen(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: () => showEditModal(),
    },
    {
      label: "Delete",
      key: "2",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => showPopconfirm(),
    },
  ];

  const userId = Cookies.get("userId");

  return (
    <Popconfirm
      open={open}
      title="Are you sure to delete this post?"
      placement="topRight"
      onConfirm={confirmDelete}
      onCancel={handleCancel}
      okButtonProps={{ loading: confirmLoading }}
      okText="Yes"
      cancelText="No">
      <div className="bg-white shadow-md px-4 p-4 rounded-xl flex flex-col gap-4 w-full">
        <ModalEditPost
          visible={isEditModalOpen}
          onClose={handleEditModalClose}
          catxPost={catxPost}
        />
        <div className="flex flex-row items-center gap-4">
          <button onClick={() => router.push(`/${catxPost.user.id}`)}>
            <img
              className="h-16 w-16 object-cover rounded-full"
              src={catxPost.user.profilePic}
              alt="Cat Profile"
            />
          </button>
          <div>
            <div className="font-bold flex items-center gap-1">
              <button onClick={() => router.push(`/${catxPost.user.id}`)}>
                <div className="text-xl hover:underline">
                  {catxPost.user.username}
                </div>
              </button>
            </div>
            <div className="text-md text-gray-600">
              {new Date(catxPost.created).toLocaleDateString()}
            </div>
          </div>
          {userId === catxPost.user.id && (
            <Dropdown
              menu={{ items }}
              className="ml-auto"
              placement="bottomLeft">
              <button>
                <MoreOutlined className="hover:bg-slate-100 p-2 rounded-full" />
              </button>
            </Dropdown>
          )}
        </div>
        <div className="text-black text-xl p-2">{catxPost.description}</div>
        <div className="grid grid-cols-4">
          <Button>
            <div className="text-gray-600 font-bold">comment</div>
          </Button>
        </div>
      </div>
    </Popconfirm>
  );
};

export default CatxCard;
