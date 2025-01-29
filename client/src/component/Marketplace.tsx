import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Input,
  Row,
  Col,
  Card,
  Select,
  Button,
  Badge,
  Typography,
  Skeleton,
} from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
  StarOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Interfaces
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  location: string;
  rating: number;
  seller: string;
}

// Main Component
const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call (Replace with actual API request)
    setTimeout(() => {
      setProducts([]);
      setLoading(false);
    }, 2000);
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
          defaultSelectedKeys={["marketplace"]}
          style={{ background: "transparent" }}
        >
          <Menu.Item key="dashboard">
            <Link to="/BuyerDashboard" style={{ color: "#fff" }}>
              BuyerDashboard
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

          {/* Page Header */}
          <Title level={2} style={{ color: "#1E3A8A" }}>
            Marketplace
          </Title>
          <Text type="secondary">
            Discover unique products from local sellers across India
          </Text>

          {/* Filter Options */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col span={6}>
              <Select defaultValue="All Categories" style={{ width: "100%" }}>
                <Option value="All">All Categories</Option>
                <Option value="Clothing">Clothing</Option>
                <Option value="Food">Food</Option>
                <Option value="Handicrafts">Handicrafts</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select defaultValue="All India" style={{ width: "100%" }}>
                <Option value="All">All India</Option>
                <Option value="Delhi">Delhi</Option>
                <Option value="Mumbai">Mumbai</Option>
                <Option value="Bangalore">Bangalore</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select defaultValue="Featured" style={{ width: "100%" }}>
                <Option value="Featured">Featured</Option>
                <Option value="Best Selling">Best Selling</Option>
                <Option value="New Arrivals">New Arrivals</Option>
              </Select>
            </Col>
          </Row>

          {/* Product Grid */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Col span={8} key={index}>
                  <Card bordered={false} style={{ borderRadius: 10 }}>
                    <Skeleton.Image style={{ width: "100%", height: 200 }} />
                    <Skeleton active />
                  </Card>
                </Col>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <Col span={8} key={product.id}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      borderRadius: 10,
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    }}
                    cover={
                      <div
                        style={{
                          width: "100%",
                          height: 200,
                          background: "#F3F4F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ShoppingOutlined
                          style={{ fontSize: 50, color: "#9CA3AF" }}
                        />
                      </div>
                    }
                  >
                    <Title level={5}>{product.name}</Title>
                    <Text type="secondary">{product.seller}</Text>
                    <Text strong style={{ display: "block", marginTop: 5 }}>
                      {product.price}
                    </Text>
                    <Text type="secondary" style={{ display: "block" }}>
                      {product.location}
                    </Text>
                    <Text>
                      <StarOutlined style={{ color: "#FBBF24" }} />{" "}
                      {product.rating}
                    </Text>
                    <Row justify="space-between" style={{ marginTop: 10 }}>
                      <Button type="default">Add to Cart</Button>
                      <Button type="primary">View Details</Button>
                    </Row>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Text>No products available</Text>
              </Col>
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Marketplace;
