import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import AddListing from "./AddListing";

const { Header } = Layout;

const AppNavbar = () => {
  const location = useLocation(); // Get the current URL path

  return (
    <Header style={headerStyle}>
      <Link to="/dashboard">Home</Link>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]} // Highlight active page
        style={{ flex: 1, justifyContent: "end" }}
      >
        <Menu.Item key="/dashboard">
          <Link to="/AddListing">AddListing</Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item></Menu.Item>
      </Menu>
    </Header>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  background: "#001529",
};

const logoStyle: React.CSSProperties = {
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  marginRight: "20px",
};

export default AppNavbar;
