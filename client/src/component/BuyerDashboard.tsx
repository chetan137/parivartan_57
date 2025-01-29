import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Input,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Table,
  Tag,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title } = Typography;

// TypeScript interfaces
interface Order {
  id: string;
  product: string;
  date: string;
  status: "Delivered" | "In Transit" | "Pending";
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
}

// Main Dashboard Component
const BuyerDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Placeholder effect for fetching data (Replace with actual API calls)
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        width={260}
        style={{
          background: "linear-gradient(180deg, #1E3A8A, #2563EB)",
          color: "#fff",
          paddingTop: "20px",
        }}
      >
        <Title level={4} style={{ color: "#fff", textAlign: "center" }}>
          BuyerDash
        </Title>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["dashboard"]}
          style={{ background: "transparent" }}
        >
          <Menu.Item key="dashboard">
            <Link to="/BuyerDashboard" style={{ color: "#fff" }}>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="marketplace">
            <Link to="/Marketplace" style={{ color: "#fff" }}>
              Marketplace
            </Link>
          </Menu.Item>
          <Menu.Item key="orders">
            <Link to="/orders" style={{ color: "#fff" }}>
              My Orders
            </Link>
          </Menu.Item>
          <Menu.Item key="messages">
            <Link to="/messages" style={{ color: "#fff" }}>
              Messages
            </Link>
          </Menu.Item>
          <Menu.Item key="reviews">
            <Link to="/reviews" style={{ color: "#fff" }}>
              My Reviews
            </Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <Link to="/settings" style={{ color: "#fff" }}>
              Settings
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ padding: "20px", background: "#F8FAFC" }}>
        <Content>
          {/* Top Navigation */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 20 }}
          >
            <Col span={10}>
              <Input.Search
                placeholder="Search products..."
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
              <Badge count={3} style={{ marginRight: 20 }}>
                <ShoppingCartOutlined
                  style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
                />
              </Badge>
              {/* <Badge count={5} style={{ marginRight: 20 }}>
                <BellOutlined
                  style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
                />
              </Badge> */}
              <UserOutlined
                style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
              />
            </Col>
          </Row>

          {/* Analytics Cards */}
          <Row gutter={[16, 16]}>
            {[
              { title: "Total Spent", value: "₹45,000", color: "#1E3A8A" },
              { title: "Orders Placed", value: "8", color: "#2563EB" },
              { title: "Pending Reviews", value: "1", color: "#EAB308" },
              { title: "Saved Sellers", value: "5", color: "#16A34A" },
            ].map((card, index) => (
              <Col span={6} key={index}>
                <Card
                  bordered={false}
                  style={{
                    background: `linear-gradient(135deg, ${card.color}, #60A5FA)`,
                    color: "#fff",
                    textAlign: "center",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Title level={5} style={{ color: "#fff" }}>
                    {card.title}
                  </Title>
                  <Title level={3} style={{ color: "#fff" }}>
                    {card.value}
                  </Title>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Orders & Recommended Products */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            {/* Recent Orders */}
            <Col span={12}>
              <Card title="Recent Orders" bordered={false}>
                <Table
                  dataSource={orders}
                  pagination={false}
                  columns={[
                    { title: "Product", dataIndex: "product", key: "product" },
                    { title: "Date", dataIndex: "date", key: "date" },
                    {
                      title: "Status",
                      dataIndex: "status",
                      key: "status",
                      render: (status: Order["status"]) => {
                        let color =
                          status === "Delivered"
                            ? "green"
                            : status === "In Transit"
                            ? "orange"
                            : "red";
                        return <Tag color={color}>{status}</Tag>;
                      },
                    },
                  ]}
                />
              </Card>
            </Col>

            {/* Recommended Products */}
            <Col span={12}>
              <Card title="Recommended Products" bordered={false}>
                <Table
                  dataSource={recommendedProducts}
                  pagination={false}
                  columns={[
                    { title: "Name", dataIndex: "name", key: "name" },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                    { title: "Price", dataIndex: "price", key: "price" },
                  ]}
                />
              </Card>
            </Col>
          </Row>

          {/* Browse Marketplace Button */}
          <Row justify="center" style={{ marginTop: 20 }}>
            <Button
              type="primary"
              size="large"
              style={{ background: "#2563EB", borderColor: "#1E3A8A" }}
            >
              Browse Marketplace
            </Button>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BuyerDashboard;
