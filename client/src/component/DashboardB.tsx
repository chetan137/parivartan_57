import React from "react";
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Typography,
  Badge,
  Button,
  Tag,
} from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const DashboardB: React.FC = () => {
  const recentOrders = [
    { name: "Organic Tomatoes", date: "2025-01-20", status: "Delivered" },
    { name: "Fresh Milk", date: "2025-01-18", status: "In Transit" },
    { name: "Whole Wheat Bread", date: "2025-01-15", status: "Delivered" },
  ];

  const recommendedProducts = [
    { name: "Organic Honey", seller: "Nature's Best", price: "₹250" },
    { name: "Handmade Pottery", seller: "Artisan Crafts", price: "₹800" },
    { name: "Fresh Apples", seller: "Orchard Delights", price: "₹120/kg" },
  ];

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
            <Link to="/BuyerDashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="marketplace">
            <Link to="/Marketplace">Marketplace</Link>
          </Menu.Item>
          <Menu.Item key="orders">
            <Link to="/orders">My Orders</Link>
          </Menu.Item>
          <Menu.Item key="BuyInfo">
            <Link to="/BuyInfo">BuyInfo</Link>
          </Menu.Item>
          <Menu.Item key="reviews">
            <Link to="/BuyerReviews">My Reviews</Link>
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
              <input
                type="text"
                placeholder="Search products..."
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </Col>
            <Col>
              <Badge count={3} style={{ marginRight: 20 }}>
                <ShoppingCartOutlined
                  style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
                />
              </Badge>
              <Badge count={5} style={{ marginRight: 20 }}>
                <BellOutlined
                  style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
                />
              </Badge>
              <UserOutlined
                style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
              />
            </Col>
          </Row>

          {/* Welcome Message */}
          <Title level={2} style={{ color: "#1E3A8A" }}>
            Welcome back, Buyer!
          </Title>

          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
            <Col span={6}>
              <Card>
                <Text>Total Spent</Text>
                <Title level={4}>₹15,231.89</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Text>Orders Placed</Text>
                <Title level={4}>23</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Text>Pending Reviews</Text>
                <Title level={4}>3</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Text>Saved Sellers</Text>
                <Title level={4}>12</Title>
              </Card>
            </Col>
          </Row>

          {/* Recent Orders & Recommended Products */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Recent Orders">
                {recentOrders.map((order, index) => (
                  <Row
                    key={index}
                    justify="space-between"
                    style={{ marginBottom: 10 }}
                  >
                    <Col>
                      <Text>{order.name}</Text>
                      <Text type="secondary" style={{ display: "block" }}>
                        {order.date}
                      </Text>
                    </Col>
                    <Tag
                      color={order.status === "Delivered" ? "green" : "blue"}
                    >
                      {order.status}
                    </Tag>
                  </Row>
                ))}
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Recommended Products">
                {recommendedProducts.map((product, index) => (
                  <Row
                    key={index}
                    justify="space-between"
                    style={{ marginBottom: 10 }}
                  >
                    <Col>
                      <Text>{product.name}</Text>
                      <Text type="secondary" style={{ display: "block" }}>
                        {product.seller}
                      </Text>
                    </Col>
                    <Text strong>{product.price}</Text>
                  </Row>
                ))}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardB;
