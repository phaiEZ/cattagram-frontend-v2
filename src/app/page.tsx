"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";
import Cookies from "js-cookie";
import axios from "axios";

const Home: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log(response);
        setUser(response.data);
      } catch (error) {
        message.error("Failed to fetch user information");
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <h1 className="text-4xl mb-4">Welcome to Cattagram!</h1>
    </div>
  );
};

export default Home;
