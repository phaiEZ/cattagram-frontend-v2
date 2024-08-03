"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { changePassword } from "../api/userApi";

interface ModalChangePasswordProps {
  visible: boolean;
  onClose: () => void;
}

const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({
  visible,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await changePassword(values);
      message.success("Password changed successfully");
      onClose();
      form.resetFields();
    } catch (error: any) {
      console.error(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateNewPassword = (_: any, value: any) => {
    if (!value || form.getFieldValue("newPassword") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("New passwords do not match!"));
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      title="Change Password">
      <Form
        form={form}
        name="changePassword"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          name="oldPassword"
          rules={[
            { required: true, message: "Please input your old password!" },
          ]}
          className="bg-white"
          label="Old Password">
          <Input.Password placeholder="Old Password" className="rounded-lg" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
          className="bg-white"
          label="New Password">
          <Input.Password placeholder="New Password" className="rounded-lg" />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your new password!" },
            { validator: validateNewPassword },
          ]}
          className="bg-white"
          label="Confirm New Password">
          <Input.Password
            placeholder="Confirm New Password"
            className="rounded-lg"
          />
        </Form.Item>
        <Form.Item className="mt-8">
          <Button
            htmlType="submit"
            loading={loading}
            className="w-full rounded-lg bg-[#001529] text-white hover:bg-gray-800">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChangePassword;
