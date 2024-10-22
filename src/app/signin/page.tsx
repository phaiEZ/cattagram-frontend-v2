// src/components/Login.tsx
"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { login } from "../api/authApi";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await login(values.username, values.password);
      if (response.status === 201) {
        message.success("Login successful!");
        const token = response.data.accessToken;
        Cookies.set("token", token);
        router.push("/");
      } else {
        message.success("Login failed: " + response.data.message);
      }
    } catch (error: any) {
      message.error(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001529] w-full">
      <div className="bg-white shadow-md rounded-lg p-8 w-[24%]">
        <div className="text-center mb-8">
          <div className="font-logotext text-[64px] text-[#001529] ">
            Catagram
          </div>
        </div>
        <Form name="login" onFinish={onFinish} className="space-y-6">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="bg-white">
            <Input placeholder="Username" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="bg-white">
            <Input.Password
              className="bg-white rounded-lg "
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              className="w-full rounded-lg bg-[#001529] text-white hover:bg-gray-800"
              style={{
                backgroundColor: "#001529",
                borderColor: "#001529",
                color: "white",
              }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-6">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
