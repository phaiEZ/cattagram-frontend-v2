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
  const showNavbar = pathname !== "/signin" && pathname !== "/signup";

  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: "url('bg.png')",
        }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            zIndex: 0,
          }}></div>
        <AntdRegistry>
          <div className="flex ">
            {showNavbar && <Navbar />}
            <div className={`flex-1 z-50 ${showNavbar ? "ml-64" : "w-full"}`}>
              {children}
            </div>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
