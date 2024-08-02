"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, logout } from "./api/userApi";
import { CatProfile } from "./type/user";
import Cookies from "js-cookie";
import { message } from "antd";

const Home: React.FC = () => {
  const router = useRouter();
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);

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

  return (
    <div className="flex flex-col items-center py-8 mb-4 w-full px-96 gap-8">
      <div className=" bg-slate-900 px-4 p-8 rounded-xl flex items-center gap-4 w-full ">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src={catProfile?.profilePic}></img>
        <div className=" bg-gray-700 p-3 px-4 w-full rounded-full">
          <div className="text-gray-200">What happend to your cat.</div>
        </div>
      </div>

      <div className=" bg-slate-900 px-4 p-4 rounded-xl flex flex-col gap-4 w-full ">
        <div className="flex flex-row items-center gap-4">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={catProfile?.profilePic}></img>
          <div className="text-white">
            <div className="font-bold text-xl">{catProfile?.catName}</div>
            <div className="text-gray-300">{catProfile?.created}</div>
          </div>
        </div>
        <div className="text-white text-xl p-2">{catProfile?.description}</div>
        <div className="text-white text-xl bg-slate-700 px-8 py-2 rounded-md mr-auto">
          comment
        </div>
      </div>
      <div className=" bg-slate-900 px-4 p-4 rounded-xl flex flex-col gap-4 w-full ">
        <div className="flex flex-row items-center gap-4">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={catProfile?.profilePic}></img>
          <div className="text-white">
            <div className="font-bold text-xl">{catProfile?.catName}</div>
            <div className="text-gray-300">{catProfile?.created}</div>
          </div>
        </div>
        <div className="text-white text-xl p-2">{catProfile?.description}</div>
        <div className="text-white text-xl bg-slate-700 px-8 py-2 rounded-md mr-auto">
          comment
        </div>
      </div>
      <div className=" bg-slate-900 px-4 p-4 rounded-xl flex flex-col gap-4 w-full ">
        <div className="flex flex-row items-center gap-4">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={catProfile?.profilePic}></img>
          <div className="text-white">
            <div className="font-bold text-xl">{catProfile?.catName}</div>
            <div className="text-gray-300">{catProfile?.created}</div>
          </div>
        </div>
        <div className="text-white text-xl p-2">{catProfile?.description}</div>
        <div className="text-white text-xl bg-slate-700 px-8 py-2 rounded-md mr-auto">
          comment
        </div>
      </div>
      <div className=" bg-slate-900 px-4 p-4 rounded-xl flex flex-col gap-4 w-full ">
        <div className="flex flex-row items-center gap-4">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={catProfile?.profilePic}></img>
          <div className="text-white">
            <div className="font-bold text-xl">{catProfile?.catName}</div>
            <div className="text-gray-300">{catProfile?.created}</div>
          </div>
        </div>
        <div className="text-white text-xl p-2">{catProfile?.description}</div>
        <div className="text-white text-xl bg-slate-700 px-8 py-2 rounded-md mr-auto">
          comment
        </div>
      </div>
    </div>
  );
};

export default Home;
