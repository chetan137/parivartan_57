import React from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { registerSeller } from "../services/api.tsx";

const { Option } = Select;

const SellerRegister: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSellerSubmit = async (values: any) => {
    try {
      await registerSeller(values);
      notification.success({ message: "Seller Registered Successfully!" });
      form.resetFields();
      navigate("/seller-login"); // Redirect to login page
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error.response?.data?.error || "Registration failed. Try again.",
      });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Seller Registration</h2>
      <Form layout="vertical" form={form} onFinish={handleSellerSubmit}>
        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="mobileNo"
          label="Mobile Number"
          rules={[
            { required: true, message: "Mobile number is required" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit mobile number",
            },
          ]}
        >
          <Input placeholder="Enter your mobile number" />
        </Form.Item>

        <Form.Item name="state" label="State" rules={[{ required: true }]}>
          <Input placeholder="Enter your state" />
        </Form.Item>

        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input placeholder="Enter your city" />
        </Form.Item>

        <Form.Item name="pincode" label="Pincode" rules={[{ required: true }]}>
          <Input placeholder="Enter your pincode" />
        </Form.Item>

        <Form.Item
          name="categories"
          label="Categories"
          rules={[{ required: true }]}
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
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter account holder name" />
        </Form.Item>

        <Form.Item
          name={["bankDetails", "accountNumber"]}
          label="Bank Account Number"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter account number" />
        </Form.Item>

        <Form.Item
          name={["bankDetails", "ifscCode"]}
          label="IFSC Code"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter IFSC code" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register as Seller
          </Button>
        </Form.Item>
      </Form>

      <p>
        Already have an account?{" "}
        <a onClick={() => navigate("/seller-login")}>Login here</a>
      </p>
    </div>
  );
};

export default SellerRegister;
