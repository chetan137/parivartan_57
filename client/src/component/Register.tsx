import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";

import { registerSeller, googleAuthBuyer } from "../services/api.tsx";

const { Option } = Select;

const Register: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleUserTypeChange = (value: string) => {
    setUserType(value);
    form.resetFields();
  };

  const handleSellerSubmit = async (values: any) => {
    try {
      const response = await registerSeller(values);
      notification.success({ message: "Seller Registered Successfully!" });
      form.resetFields();
      console.log(response)
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.response?.data?.error || "Registration failed",
      });
    }
  };

  const handleBuyerSubmit = () => {
    googleAuthBuyer(); // Redirect to Google OAuth
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Register</h2>
      <Form layout="vertical" form={form} onFinish={handleSellerSubmit}>
        <Form.Item
          label="I am a"
          name="userType"
          rules={[{ required: true, message: "Please select user type" }]}
        >
          <Select
            placeholder="Select User Type"
            onChange={handleUserTypeChange}
          >
            <Option value="buyer">Buyer</Option>
            <Option value="seller">Seller</Option>
          </Select>
        </Form.Item>

        {userType === "seller" && (
          <>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              name="mobileNo"
              label="Mobile Number"
              rules={[{ required: true, message: "Mobile number is required" }]}
            >
              <Input placeholder="Enter your mobile number" />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "State is required" }]}
            >
              <Input placeholder="Enter your state" />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input placeholder="Enter your city" />
            </Form.Item>

            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[{ required: true, message: "Pincode is required" }]}
            >
              <Input placeholder="Enter your pincode" />
            </Form.Item>

            <Form.Item
              name="categories"
              label="Categories"
              rules={[{ required: true, message: "Categories are required" }]}
            >
              <Select mode="multiple" placeholder="Select categories">
                <Option value="farmer">Farmer</Option>
                <Option value="potter">Potter</Option>
                <Option value="painter">Painter</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={["bankDetails", "accountHolderName"]}
              label="Bank Account Holder Name"
              rules={[
                {
                  required: true,
                  message: "Bank account holder name is required",
                },
              ]}
            >
              <Input placeholder="Enter account holder name" />
            </Form.Item>

            <Form.Item
              name={["bankDetails", "accountNumber"]}
              label="Bank Account Number"
              rules={[
                { required: true, message: "Bank account number is required" },
              ]}
            >
              <Input placeholder="Enter account number" />
            </Form.Item>

            <Form.Item
              name={["bankDetails", "ifscCode"]}
              label="IFSC Code"
              rules={[{ required: true, message: "IFSC code is required" }]}
            >
              <Input placeholder="Enter IFSC code" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register as Seller
              </Button>
            </Form.Item>
          </>
        )}

        {userType === "buyer" && (
          <Form.Item>
            <Button type="primary" onClick={handleBuyerSubmit}>
              Register with Google
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default Register;
