"use client";

import React, { useState } from "react";
import { Form, Input, Button, Divider, Upload, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import qs from "qs";
import { signup } from "../api/userApi";
const { TextArea } = Input;

const Page: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log({
      username: values.username,
      password: values.password,
      catName: values.catName,
      ownerName: values.ownerName,
      gender: values.gender,
      breeds: values.breeds,
      description: values.description,
      profilePic: values.profilePic,
      birthPlace: values.birthPlace,
    });

    try {
      const response = await signup(values);
      console.log("Sign up response:", response);
      message.success("Sign up success. Welcome " + response.username);
      router.push("/signin");
    } catch (error: any) {
      console.log(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmPassword = (_: any, value: any) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Passwords do not match!"));
  };

  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = () => {
      form.setFieldsValue({ profilePic: reader.result });
    };
    reader.readAsDataURL(file);

    return false;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001529] w-full">
      <div className="bg-white shadow-md rounded-lg p-8 w-[32%]">
        <div className="text-center">
          <div className="font-logotext text-[52px] text-[#001529]">
            Catagram
          </div>
        </div>
        <Form form={form} name="signUp" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="bg-white"
            label="Username">
            <Input
              placeholder="Username"
              className="rounded-lg"
              defaultValue={""}
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="bg-white"
              label="Password">
              <Input.Password
                className="bg-white rounded-lg"
                placeholder="Password"
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="rePassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                { validator: validateConfirmPassword },
              ]}
              className="bg-white"
              label="Confirm password">
              <Input.Password
                className="bg-white rounded-lg"
                placeholder="Confirm Password"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="ownerName"
            rules={[
              { required: true, message: "Please input your owner name!" },
            ]}
            className="bg-white"
            label="Owner Name">
            <Input className="bg-white rounded-lg" placeholder="Owner Name" />
          </Form.Item>

          <Form.Item
            name="profilePic"
            rules={[
              {
                required: true,
                message: "Please upload your profile picture!",
              },
            ]}
            className="bg-white"
            label="Profile Image">
            <Upload beforeUpload={beforeUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Divider>Cat Info</Divider>
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item
              name="catName"
              rules={[
                { required: true, message: "Please input your cat's name!" },
              ]}
              className="bg-white"
              label="Cat Name">
              <Input className="bg-white rounded-lg" />
            </Form.Item>
            <Form.Item
              name="breeds"
              rules={[
                { required: true, message: "Please input your cat's breed!" },
              ]}
              className="bg-white"
              label="Breeds">
              <Input className="bg-white rounded-lg" />
            </Form.Item>
            <Form.Item
              name="gender"
              rules={[
                { required: true, message: "Please input your cat's gender!" },
              ]}
              className="bg-white"
              label="Gender">
              <Input className="bg-white rounded-lg" />
            </Form.Item>
            <Form.Item
              name="birthPlace"
              rules={[
                {
                  required: true,
                  message: "Please input your cat's birthplace!",
                },
              ]}
              className="bg-white"
              label="Cat's birthplace">
              <Input className="bg-white rounded-lg" />
            </Form.Item>
          </div>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className="mt-8">
            <Button
              htmlType="submit"
              loading={loading}
              className="w-full rounded-lg bg-[#001529] text-white hover:bg-gray-800"
              style={{
                backgroundColor: "#001529",
                borderColor: "#001529",
                color: "white",
              }}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
