"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, logout } from "./api/userApi";
import { CatProfile } from "./type/user";
import Cookies from "js-cookie";
import { message } from "antd";
import { Button, Modal, Divider, Input } from "antd";
import CatxCard from "./components/CatxCard";
import { fetchAllCatx } from "./api/catx";

const Home: React.FC = () => {
  const router = useRouter();
  const { TextArea } = Input;
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [catxPosts, setCatxPosts] = useState<any[]>([]);

  const showModal = () => {
    setIsPostModalOpen(true);
  };

  const handleOk = () => {
    setIsPostModalOpen(false);
  };

  const handleCancel = () => {
    setIsPostModalOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        console.log(userData);
        setCatProfile(userData);

        Cookies.set("userId", userData?.id);
      } catch (error: any) {
        message.error(error.message);
        console.error(error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchCatxData = async () => {
      try {
        const data = await fetchAllCatx();
        setCatxPosts(data);
        console.log("catx", data);
      } catch (error) {
        message.error("Failed to fetch cat profiles.");
        console.error(error);
      }
    };

    fetchCatxData();
  }, []);

  return (
    <div className="flex flex-col items-center py-8 mb-4 w-full px-96 gap-8">
      <Modal
        open={isPostModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="post" onClick={handleOk} className="w-full ">
            <div className="text-xl ">Post</div>
          </Button>,
        ]}
        width={800}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row items-center gap-4 ">
            <img
              className="h-16 w-16 object-cover rounded-full"
              src={catProfile?.profilePic}
            />
            <div>
              <div className="font-bold flex items-center gap-1">
                <div className="text-xl">{catProfile?.catName}</div>
                <div className="text-md ">({catProfile?.breeds})</div>
              </div>
              <div className=" text-md text-gray-600">
                {catProfile?.ownerName}
              </div>
            </div>
          </div>
          <TextArea
            className="w-full"
            autoSize={{ minRows: 4, maxRows: 4 }}
            placeholder="What happend to your cat."
            style={{ fontSize: "20px" }}
          />
        </div>
      </Modal>
      <div className=" bg-white shadow-md px-4 p-8 rounded-xl flex items-center gap-4 w-full ">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src={catProfile?.profilePic}
        />
        <button
          className=" bg-gray-300 p-3 px-4 w-full rounded-full hover:bg-gray-400"
          onClick={showModal}>
          <div className="text-gray-500 text-left">
            What happend to your cat.
          </div>
        </button>
      </div>
      {catProfile && <CatxCard CatxCard={catProfile} />}
    </div>
  );
};

export default Home;
