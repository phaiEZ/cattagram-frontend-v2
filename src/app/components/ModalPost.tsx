"use client";

import React from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { CatProfile } from "../type/user";
import { createCatxPost } from "../api/catx";

interface ModalPostProps {
  visible: boolean;
  onClose: () => void;
  catProfile: CatProfile | null;
}

const ModalPost: React.FC<ModalPostProps> = ({
  visible,
  onClose,
  catProfile,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        createCatxPost(values);
        message.success("Post created successfully");
        window.location.reload();
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="post" onClick={handleOk} className="w-full">
          <div className="text-xl">Post</div>
        </Button>,
      ]}
      width={800}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center gap-4 ">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={catProfile?.profilePic}
            alt="Cat Profile"
          />
          <div>
            <div className="font-bold flex items-center gap-1">
              <div className="text-xl">{catProfile?.catName}</div>
              <div className="text-md ">({catProfile?.breeds})</div>
            </div>
            <div className=" text-md text-gray-600">
              {catProfile?.ownerName}
            </div>
          </div>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter content!" }]}>
            <Input.TextArea
              className="w-full"
              autoSize={{ minRows: 4, maxRows: 4 }}
              placeholder="What happened to your cat."
              style={{ fontSize: "20px" }}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalPost;
