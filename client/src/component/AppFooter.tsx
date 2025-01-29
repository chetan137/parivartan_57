import React from "react";
import { Layout, Typography, Space, Divider } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={footerStyle}>
      <Typography.Text strong style={{ fontSize: "16px", color: "#333" }}>
        © {new Date().getFullYear()} BuyerDash. All Rights Reserved.
      </Typography.Text>

      <Divider style={{ margin: "15px 0", borderColor: "#ddd" }} />

      <nav>
        <Space size="large" wrap>
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
          <Link to="/productM" style={linkStyle}>
            Product Management
          </Link>
          <Link to="/orderManagement" style={linkStyle}>
            Order Management
          </Link>
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </Space>
      </nav>
    </Footer>
  );
};

// 🟢 Sticky Footer Styles
const footerStyle: React.CSSProperties = {
  position: "relative",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "#787473",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
};

// 🟢 Reusable link styles
const linkStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "14px",

  textDecoration: "none",
  transition: "color 0.3s ease",
};

export default AppFooter;
