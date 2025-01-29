import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { loginSeller } from "../services/api.tsx";

const SellerLogin: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      const response = await loginSeller(values);
      notification.success({ message: "Login Successful!" });

      // Store user session (you might need a global state like Redux or Context API)
      localStorage.setItem("seller", JSON.stringify(response.seller));

      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error: any) {
      notification.error({
        message: "Login Failed",
        description: error.response?.data?.error || "Invalid credentials",
      });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Seller Login</h2>
      <Form layout="vertical" form={form} onFinish={handleLogin}>
        <Form.Item
          name="mobileNo"
          label="mobileNo"
          rules={[{ required: true, message: "Please enter your mobileNo" }]}
        >
          <Input placeholder="Enter mobileNo" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <p>
        Don't have an account?{" "}
        <a onClick={() => navigate("/seller-register")}>Register here</a>
      </p>
    </div>
  );
};

export default SellerLogin;
