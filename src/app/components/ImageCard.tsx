"use client";
import React, { useState } from "react";
import { img } from "../type/img";
import Cookies from "js-cookie";
import { Button, Dropdown, Popconfirm, message } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import type { MenuProps } from "antd";
import { deleteImage } from "../api/image";

interface ImageCardProps {
  image: img;
  index: number;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, index }) => {
  const userId = Cookies.get("userId");
  const [open, setOpen] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await deleteImage(image.id);
      message.success("image deleted successfully");
      window.location.reload();
    } catch (error) {
      message.error("Failed to delete post");
      console.error("Delete Post Failed:", error);
    } finally {
      setOpen(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Delete",
      key: "1",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => showPopconfirm(),
    },
  ];

  return (
    <Popconfirm
      open={open}
      title="Are you sure to delete this post?"
      placement="topRight"
      onConfirm={confirmDelete}
      onCancel={handleCancel}
      okText="Yes"
      cancelText="No">
      <div className="bg-white p-4 pb-8 shadow-md mx-auto ml-0 flex flex-col gap-4">
        <img
          src={image.img}
          alt={`User image ${index}`}
          className="h-[300px] w-[300px] object-cover"
        />
        <div className="flex  items-center">
          <div className="text-kanit text-md">{image.description}</div>
          {userId === image.user.id && (
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
      </div>
    </Popconfirm>
  );
};

export default ImageCard;
