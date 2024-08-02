"use client";

import React, { useEffect, useState } from "react";
import { CatProfile } from "../type/user";

import { fetchUser } from "../api/userApi";
import { message } from "antd";
import { Tabs } from "antd";
import { fetchUserImage } from "../api/image";
import Cookies from "js-cookie";
import { img } from "../type/img";

const ProtectedPage: React.FC = () => {
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);
  const [images, setImages] = useState<img[]>([]);

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
    const loadImage = async () => {
      if (catProfile) {
        try {
          const imageData = await fetchUserImage(catProfile.id);
          setImages(imageData);
          console.log(imageData);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    loadImage();
  }, [catProfile]);

  return (
    <div className="flex flex-col  h-screen px-16 pt-16 gap-8">
      <div className="flex w-full gap-16">
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
            <div className="flex flex-col  font-kanit my-auto gap-2">
              <div>เพศ : {catProfile?.gender}</div>
              <div>เจ้าของ : {catProfile?.ownerName}</div>
              <div>เจ้าของ : {catProfile?.ownerName}</div>
            </div>
          </div>
          <div className="font-kanit w-full  text-[#000000] bg-white  border-2 p-2 my-2 rounded-md border-slate-100    ">
            {catProfile?.description}
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        items={[
          { label: `CatX`, key: "1", children: <>hello</> },
          {
            label: `Photos`,
            key: "2",
            children: (
              <div className="grid grid-cols-4 gap-8 ">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 pb-8 shadow-lg mx-auto ml-0 flex flex-col gap-4">
                    <img
                      src={image.img}
                      alt={`User image ${index}`}
                      className="h-[300px] w-[300px] object-cover"
                    />
                    <div className="text-kanit text-md">
                      {image.description}
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProtectedPage;
