"use client";

import React, { useEffect, useState } from "react";
import { CatProfile } from "../type/user";
import { fetchUser, getUserInfoById } from "../api/userApi";
import { message, Tabs, Button } from "antd";
import { fetchUserImage } from "../api/image";
import Cookies from "js-cookie";
import { img } from "../type/img";
import ModalPost from "../components/ModalPost";
import { getCatxByUserId } from "../api/catx";
import CatxCard from "../components/CatxCard";
import { CatxPost } from "../type/catx";
import ImageUploadModal from "../components/ImageUploadModal";
import { useParams, useRouter } from "next/navigation";
import ImageCard from "../components/ImageCard";
import ModalUpdateInfo from "../components/ModalUpdateInfo";
import ModalChangePassword from "../components/ModalChangePassword";

const Page: React.FC = () => {
  const [userData, setUserData] = useState<CatProfile | null>(null);
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);
  const [images, setImages] = useState<img[]>([]);
  const [catxs, setCatxs] = useState<CatxPost[]>([]);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const showUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
  };

  const showModal = () => {
    setIsPostModalOpen(true);
  };

  const handleModalClose = () => {
    setIsPostModalOpen(false);
  };

  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  const showChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleChangePasswordModalClose = () => {
    setIsChangePasswordModalOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const Data = await fetchUser();
        setUserData(Data);
        console.log("UserData", Data);
      } catch (error: any) {
        message.error(error.message);
        console.error(error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const loadImage = async () => {
      if (slug) {
        try {
          const imageData = await fetchUserImage(slug);
          setImages(imageData);
          console.log("imageData", imageData);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    loadImage();
  }, [slug]);

  useEffect(() => {
    const fetchUser = async () => {
      if (slug)
        try {
          const Data = await getUserInfoById(slug);
          setCatProfile(Data);
          console.log("CatProfile", Data);
        } catch (error: any) {
          message.error(error.message);
        }
    };
    fetchUser();
  }, [slug]);

  useEffect(() => {
    const loadCatx = async () => {
      if (slug) {
        try {
          const catxData = await getCatxByUserId(slug);
          setCatxs(catxData);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    loadCatx();
  }, [slug]);

  return (
    <div className="flex flex-col ml-12 h-screen pt-16 gap-8 px-32">
      <ModalUpdateInfo
        visible={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        userData={catProfile}
      />
      <ModalPost
        visible={isPostModalOpen}
        onClose={handleModalClose}
        catProfile={catProfile}
      />
      <ImageUploadModal
        visible={isUploadModalOpen}
        onClose={handleUploadModalClose}
      />
      <ModalChangePassword
        visible={isChangePasswordModalOpen}
        onClose={handleChangePasswordModalClose}
      />
      <div className="flex w-full gap-16 justify-center">
        <div className="bg-white p-4 pb-12 shadow-lg">
          <img
            className="h-[200px] w-[200px] object-cover"
            src={catProfile?.profilePic}
          />
        </div>
        <div className="flex flex-col gap-4 pt-8 w-2/3 ">
          <div className="flex flex-row gap-16 ">
            <div className="flex flex-col">
              <div className="font-kanit font-bold text-4xl text-[#000000] ">
                {catProfile?.catName}
              </div>
              <div className="font-kanit font-bold text-2xl text-[#D9D9D9] ">
                {catProfile?.breeds}
              </div>
            </div>
            <div className="flex flex-col font-kanit my-auto gap-2">
              <div>Gender : {catProfile?.gender}</div>
              <div>Owner Name : {catProfile?.ownerName}</div>
              <div>Breeds : {catProfile?.breeds}</div>
              <div>Cat's birthplace : {catProfile?.birthPlace}</div>
            </div>
            <div className="flex flex-col ml-auto gap-2">
              {userData?.id === catProfile?.id && (
                <Button onClick={showUpdateModal} className="ml-auto">
                  Edit Info
                </Button>
              )}
              {userData?.id === catProfile?.id && (
                <Button onClick={showChangePasswordModal}>
                  Change Password
                </Button>
              )}
            </div>
          </div>
          <div className="font-kanit w-5/6 text-[#000000] bg-white border-2 p-2 my-2 rounded-md border-slate-100">
            {catProfile?.description}
          </div>
        </div>
      </div>
      <div className="px-24">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          items={[
            {
              label: `CatX`,
              key: "1",
              children: (
                <div className="flex flex-col gap-4  py-8 ">
                  {userData?.id === catProfile?.id && (
                    <div className="bg-white shadow-md px-4 p-8 rounded-xl flex items-center gap-4 w-full">
                      <img
                        className="h-16 w-16 object-cover rounded-full"
                        src={catProfile?.profilePic}
                      />
                      <button
                        className="bg-gray-300 p-3 px-4 w-full rounded-full hover:bg-gray-400"
                        onClick={showModal}>
                        <div className="text-gray-500 text-left">
                          What happened to your cat.
                        </div>
                      </button>
                    </div>
                  )}
                  <div className="gap-8 flex flex-col w-full">
                    {catxs.map((catxPost) => (
                      <CatxCard key={catxPost.id} catxPost={catxPost} />
                    ))}
                  </div>
                </div>
              ),
            },
            {
              label: `Photos`,
              key: "2",
              children: (
                <div className="flex flex-col gap-4 ">
                  {userData?.id === catProfile?.id && (
                    <Button onClick={showUploadModal}>Upload Image</Button>
                  )}

                  <div className="grid grid-cols-4 gap-8 ">
                    {images.map((image, index) => (
                      <ImageCard key={index} image={image} index={index} />
                    ))}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Page;
