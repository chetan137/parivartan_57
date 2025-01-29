import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Input,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Typography,
  Select,
  Tag,
} from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Static Orders Data
const sampleOrders = [
  {
    id: "1",
    orderNumber: "ORD12345",
    orderDate: "2024-01-20",
    seller: "Handicrafts India",
    items: [
      { name: "Handwoven Saree", quantity: 1, price: 1299 },
      { name: "Clay Tea Set", quantity: 1, price: 899 },
    ],
    total: 2198,
    status: "Delivered",
  },
  {
    id: "2",
    orderNumber: "ORD12346",
    orderDate: "2024-01-22",
    seller: "Organic Farms",
    items: [{ name: "Organic Honey", quantity: 2, price: 499 }],
    total: 998,
    status: "In Transit",
  },
  {
    id: "3",
    orderNumber: "ORD12347",
    orderDate: "2024-01-25",
    seller: "EcoStyle Crafts",
    items: [
      { name: "Jute Bag", quantity: 1, price: 699 },
      { name: "Wooden Spice Box", quantity: 1, price: 1199 },
    ],
    total: 1898,
    status: "Pending",
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState(sampleOrders);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={260} style={{ background: "#1E3A8A", color: "#fff" }}>
        <Title level={4} style={{ color: "#fff", textAlign: "center" }}>
          BuyerDash
        </Title>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["orders"]}
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
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ padding: "20px", background: "#F8FAFC" }}>
        <Content>
          <Title level={2} style={{ color: "#1E3A8A" }}>
            My Orders
          </Title>
          <Text type="secondary">Track and manage your orders</Text>

          {/* Orders List */}
          <div style={{ marginTop: 20 }}>
            {orders.map((order) => (
              <Card
                key={order.id}
                style={{ marginBottom: 20, borderRadius: 10 }}
              >
                <Row justify="space-between">
                  <Col>
                    <Text strong>Order #{order.orderNumber}</Text>
                    <Text type="secondary" style={{ display: "block" }}>
                      Order Date: {order.orderDate}
                    </Text>
                    <Text type="secondary" style={{ display: "block" }}>
                      Seller: {order.seller}
                    </Text>
                  </Col>
                  <Col>
                    <Tag
                      color={
                        order.status === "Delivered"
                          ? "green"
                          : order.status === "In Transit"
                          ? "blue"
                          : "orange"
                      }
                    >
                      {order.status}
                    </Tag>
                  </Col>
                </Row>

                {order.items.map((item, index) => (
                  <Row
                    key={index}
                    justify="space-between"
                    style={{ marginTop: 10 }}
                  >
                    <Col>
                      <Text>{item.name}</Text>
                      <Text type="secondary" style={{ marginLeft: 10 }}>
                        Qty: {item.quantity}
                      </Text>
                    </Col>
                    <Col>
                      <Text strong>₹{item.price}</Text>
                    </Col>
                  </Row>
                ))}

                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginTop: 20 }}
                >
                  <Col>
                    <Text strong>Total: ₹{order.total}</Text>
                  </Col>
                  <Col>
                    <Button type="default" style={{ marginRight: 10 }}>
                      Track Order
                    </Button>
                    <Button type="dashed" style={{ marginRight: 10 }}>
                      Write Review
                    </Button>
                    <Button type="primary">View Details</Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Orders;
