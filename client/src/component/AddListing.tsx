import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  fetchSellerDetails,
  createListing,
  uploadImages,
} from "../services/api.tsx";

const { Option } = Select;

interface ListingFormProps {
  sellerId: string;
}

const farmerItems = [
  "Wheat",
  "Rice",
  "Vegetables",
  "Fruits",
  "Organic Honey",
  "Milk & Dairy",
  "Spices",
  "Pulses",
];

const AddListing: React.FC<ListingFormProps> = ({ sellerId }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data = await fetchSellerDetails(sellerId);
        setCategory(data.category || "farmer"); // Default to "farmer" if no data found
      } catch (error) {
        console.error("Error fetching seller details:", error);
        setCategory("farmer"); // Default to "farmer" if an error occurs
      }
    };

    getCategory();
  }, [sellerId]);

  const handleSubmit = async (values: any) => {
    const formData = {
      category,
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

  const handleImageUpload = async ({ fileList }: any) => {
    const files = fileList.map((file: any) => file.originFileObj);
    const response = await uploadImages(files);
    return response.urls;
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Add a Listing</h2>
      {category ? (
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Dropdown for Farmers to Select Item */}
          {(category === "farmer" || !category) && (
            <>
              <Form.Item
                name="selectedItem"
                label="Select Item to Sell"
                rules={[{ required: true, message: "Please select an item" }]}
              >
                <Select placeholder="Choose an item" onChange={setSelectedItem}>
                  {farmerItems.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="materialName"
                label="Material Name"
                initialValue={selectedItem || ""}
                rules={[
                  { required: true, message: "Please enter a material name" },
                ]}
              >
                <Input
                  placeholder="Enter material name"
                  value={selectedItem || ""}
                />
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
                label="Rate (₹ per kg/liter)"
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
                <Upload action={handleImageUpload} listType="picture">
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </>
          )}

          {category === "painter" && (
            <>
              <Form.Item name="rate" label="Price" rules={[{ required: true }]}>
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="pictures" label="Upload Pictures">
                <Upload action={handleImageUpload} listType="picture">
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AddListing;
