import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { CatxPost } from "../type/catx";
import { updateCatxPost } from "../api/catx";

interface ModalEditPostProps {
  visible: boolean;
  onClose: () => void;
  catxPost: CatxPost;
}

const ModalEditPost: React.FC<ModalEditPostProps> = ({
  visible,
  onClose,
  catxPost,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        description: catxPost.description,
      });
    }
  }, [visible, catxPost.description, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateCatxPost(catxPost.id, values.description);
      message.success("Post updated successfully");
      form.resetFields();
      onClose();
      window.location.reload(); // Refresh the page after update
    } catch (error) {
      message.error("Failed to update post");
      console.error("Update Post Failed:", error);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="update" onClick={handleOk} className="w-full">
          <div className="text-xl">Update</div>
        </Button>,
      ]}
      width={800}>
      <div className="pt-8">
        <Form form={form} layout="vertical">
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter a description!" },
            ]}>
            <Input.TextArea
              className="w-full"
              autoSize={{ minRows: 4, maxRows: 4 }}
              placeholder="Edit description"
              style={{ fontSize: "20px" }}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalEditPost;
