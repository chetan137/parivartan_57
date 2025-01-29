import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { fetchSellerCategories, createListing } from "../services/api.tsx";

const { Option } = Select;

interface ListingFormProps {
  sellerId: string;
  onSubmit: (formData: any) => void; // Accepts a function that gets the form data
}

const AddListing: React.FC<ListingFormProps> = ({ sellerId }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSellerCategories(sellerId).then(setCategories);
  }, [sellerId]);

  const handleSubmit = async (values: any) => {
    const formData = {
      category: selectedCategory,
      sellerId,
      data: values,
    };

    try {
      await createListing(formData);
      form.resetFields();
      alert("Listing added successfully!");
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Add a Listing</h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="category"
          label="Select Category"

          rules={[{ required: true }]}
        >
          <Select onChange={(value) => setSelectedCategory(value)}>
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedCategory === "farmer" && (
          <>
            <Form.Item
              name="materialName"
              label="Material Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter material name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>

            <Form.Item
              name="rate"
              label="Rate (₹)"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="photos" label="Upload Photos">
              <Upload action="/upload" listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        {selectedCategory === "painter" && (
          <>
            <Form.Item name="rate" label="Price" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="pictures" label="Upload Pictures">
              <Upload action="/upload" listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Listing
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddListing;
