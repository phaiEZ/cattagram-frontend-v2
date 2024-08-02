import React from "react";
import { LoginOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

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
  },
  {
    key: "/profile",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LoginOutlined />,
  },
];

const Navbar: React.FC = () => {
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      Cookies.remove("auth_token");
      router.push("/login");
    } else {
      router.push(e.key);
    }
  };

  return (
    <div className="h-screen flex flex-col fixed ">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
        className="flex flex-col flex-grow "
      />
    </div>
  );
};

export default Navbar;
