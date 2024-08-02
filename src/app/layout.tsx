"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "antd/dist/reset.css";

import "./globals.css";
import Navbar from "./components/navbar";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  // Hide navbar on login page
  const showNavbar = pathname !== "/login";

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <div className="flex ">
            {showNavbar && <Navbar />}
            <div className={`flex-1 ${showNavbar ? "ml-52" : "w-full"}`}>
              {children}
            </div>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
