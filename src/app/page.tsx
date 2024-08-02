"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchUser, logout } from "./api/userApi";
import { CatProfile } from "./type/user";

const Home: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <h1 className="text-4xl mb-4">Welcome to Cattagram!</h1>
    </div>
  );
};

export default Home;
