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
import { CatxPost } from "./type/catx";
import ModalPost from "./components/ModalPost";

const Home: React.FC = () => {
  const router = useRouter();
  const { TextArea } = Input;
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);

  const [catxPosts, setCatxPosts] = useState<CatxPost[]>([]);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const showModal = () => {
    setIsPostModalOpen(true);
  };

  const handleModalClose = () => {
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
        console.log("x", data);
      } catch (error) {
        message.error("Failed to fetch cat posts.");
        console.error(error);
      }
    };

    fetchCatxData();
  }, []);

  return (
    <div className="flex flex-col items-center py-8 mb-4 w-full px-96 gap-8">
      <ModalPost
        visible={isPostModalOpen}
        onClose={handleModalClose}
        catProfile={catProfile}
      />
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
      {catxPosts.map((catxPost) => (
        <CatxCard key={catxPost.id} catxPost={catxPost} />
      ))}
    </div>
  );
};

export default Home;
