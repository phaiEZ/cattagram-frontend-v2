import React from "react";
import { LoginOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const Navbar: React.FC = () => {
  const router = useRouter();
  let userId = Cookies.get("userId");
  const items: MenuItem[] = [
    {
      key: "spacer",
      label: <div className="flex-grow"></div>,
      disabled: true,
    },
    {
      key: "logo",

      label: (
        <Link href={"/"} className="flex items-center justify-center">
          <div className="font-logotext text-4xl text-white">Catagram</div>
        </Link>
      ),
      disabled: true,
    },
    {
      key: "spacer",
      label: <div className="flex-grow"></div>,
      disabled: true,
    },
    {
      key: "/",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => router.push("/"),
    },
    {
      key: `/${userId}`,
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => {
        userId = Cookies.get("userId");
        if (userId) {
          router.push(`/${userId}`);
        } else {
          message.error("User ID not found.");
        }
      },
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LoginOutlined />,
      onClick: () => {
        Cookies.remove("token");
        Cookies.remove("userId");
        router.push("/signin");
      },
    },
  ];

  return (
    <div className="h-screen flex flex-col fixed">
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
        className="flex flex-col flex-grow"
      />
    </div>
  );
};

export default Navbar;
