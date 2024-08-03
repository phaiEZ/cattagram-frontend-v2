"use client";

import React, { useState } from "react";
import { Form, Input, Button, Divider, Upload, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import { updateUserInfo } from "../api/userApi";
const { TextArea } = Input;

interface ModalUpdateInfoProps {
  visible: boolean;
  onClose: () => void;
  userData: any;
}

const ModalUpdateInfo: React.FC<ModalUpdateInfoProps> = ({
  visible,
  onClose,
  userData,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log(values);

    try {
      await updateUserInfo(values);
      message.success("User information updated successfully");
      window.location.reload();
      onClose();
    } catch (error: any) {
      console.error(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: any) => {
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Image must smaller than 1MB!");
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
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      title="Update User Information"
      width={800}>
      <Form
        form={form}
        name="updateInfo"
        onFinish={onFinish}
        layout="vertical"
        initialValues={userData}>
        <div className="flex gap-4">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="bg-white w-full"
            label="Username">
            <Input placeholder="Username" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="ownerName"
            rules={[
              { required: true, message: "Please input your owner name!" },
            ]}
            className="bg-white w-full"
            label="Owner Name">
            <Input className="bg-white rounded-lg" placeholder="Owner Name" />
          </Form.Item>
        </div>
        <Form.Item
          name="profilePic"
          rules={[
            { required: true, message: "Please upload your profile picture!" },
          ]}
          className="bg-white"
          label="Profile Image">
          <Upload beforeUpload={beforeUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Divider>Cat Info</Divider>
        <div className="flex gap-4">
          <Form.Item
            name="catName"
            rules={[
              { required: true, message: "Please input your cat's name!" },
            ]}
            className="bg-white w-full"
            label="Cat Name">
            <Input className="bg-white rounded-lg" />
          </Form.Item>
          <Form.Item
            name="breeds"
            rules={[
              { required: true, message: "Please input your cat's breed!" },
            ]}
            className="bg-white w-full"
            label="Breeds">
            <Input className="bg-white rounded-lg" />
          </Form.Item>
        </div>
        <div className="flex gap-4">
          <Form.Item
            name="gender"
            rules={[
              { required: true, message: "Please input your cat's gender!" },
            ]}
            className="bg-white w-full"
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
            className="bg-white w-full"
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
            className="w-full rounded-lg bg-[#001529] text-white hover:bg-gray-800">
            Update Info
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateInfo;
