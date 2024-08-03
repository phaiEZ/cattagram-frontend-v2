import React, { useState } from "react";
import { Modal, Button, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "../api/image";
import { useRouter } from "next/navigation";

interface ImageUploadModalProps {
  visible: boolean;
  onClose: () => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  visible,
  onClose,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as File;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64Image = reader.result?.toString() || "";

          await uploadImage({
            img: base64Image,
            description: values.description,
            id: "",
            created: "",
            update: "",
            user: {
              id: "",
              created: "",
              update: "",
              username: "",
              password: "",
              catName: "",
              ownerName: "",
              gender: "",
              breeds: "",
              description: "",
              profilePic: "",
              birthPlace: "",
            },
          });
          message.success("Image uploaded successfully");
          form.resetFields();
          setFileList([]);
          onClose();
          router.refresh(); // Refresh the page after upload
        };
      } else {
        message.error("Please select an image to upload");
      }
    } catch (error) {
      message.error("Failed to upload image");
      console.error("Upload Image Failed:", error);
    }
  };

  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const beforeUpload = (file: File) => {
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Image must be smaller than 1MB!");
    }
    return isLt1M;
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="upload" onClick={handleOk} className="w-full">
          <div className="text-xl">Upload</div>
        </Button>,
      ]}
      width={800}>
      <div className="flex flex-col gap-8">
        <Form form={form} layout="vertical">
          <Form.Item name="upload">
            <Upload
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              listType="picture">
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter a description!" },
            ]}>
            <Input.TextArea
              className="w-full"
              autoSize={{ minRows: 4, maxRows: 4 }}
              placeholder="Enter a description for the image."
              style={{ fontSize: "20px" }}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
