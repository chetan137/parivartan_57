import React, { useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Tabs,
  Button,
  Badge,
  Rate,
  Typography,
} from "antd";
import {
  EditOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const BuyerReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState("published");

  const publishedReviews = [
    {
      id: 1,
      product: "Handwoven Cotton Saree",
      seller: "Traditional Weavers Co-op",
      review:
        "Beautiful craftsmanship! The saree is exactly as described and the quality is excellent. The colors are vibrant and the material is comfortable to wear.",
      rating: 5,
      date: "2024-01-20",
    },
    {
      id: 2,
      product: "Organic Honey Set",
      seller: "Himalayan Bee Farms",
      review:
        "Great quality honey with authentic taste. The packaging could be improved but the product itself is excellent.",
      rating: 4,
      date: "2024-01-15",
    },
  ];

  const pendingReviews = [
    {
      id: 3,
      product: "Clay Tea Set",
      seller: "Artisan Pottery Hub",
      review: "Awaiting your review...",
      rating: 0,
      date: "2024-01-25",
    },
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
          AgriBuyer
        </Title>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["reviews"]}
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
          <Menu.Item key="BuyInfo">
            <Link to="/BuyInfo" style={{ color: "#fff" }}>
              BuyInfo
            </Link>
          </Menu.Item>
          <Menu.Item key="reviews">
            <Link to="/BuyerReviews" style={{ color: "#fff" }}>
              My Reviews
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ padding: "20px", background: "#F8FAFC" }}>
        <Content>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Reviews</h1>
            <div className="flex space-x-4">
              <Badge count={3}>
                <ShoppingCartOutlined className="text-2xl cursor-pointer text-blue-600" />
              </Badge>
              <Badge count={5}>
                <BellOutlined className="text-2xl cursor-pointer text-blue-600" />
              </Badge>
              <UserOutlined className="text-2xl cursor-pointer text-blue-600" />
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Manage your product reviews and ratings
          </p>

          {/* Tabs */}
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            {/* Published Reviews */}
            <TabPane tab="Published Reviews" key="published">
              {publishedReviews.length === 0 ? (
                <p className="text-gray-500">No published reviews yet.</p>
              ) : (
                publishedReviews.map((review) => (
                  <Card
                    key={review.id}
                    className="mb-4 shadow-lg rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-700">
                          {review.product}
                        </h3>
                        <p className="text-gray-500">Sold by {review.seller}</p>
                        <p className="mt-2 text-gray-700">{review.review}</p>
                      </div>
                      <div className="text-right">
                        <Rate
                          disabled
                          defaultValue={review.rating}
                          className="mb-2"
                        />
                        <p className="text-gray-500">{review.date}</p>
                        <Button
                          icon={<EditOutlined />}
                          type="primary"
                          className="mt-4"
                        >
                          Edit Review
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabPane>

            {/* Pending Reviews */}
            <TabPane tab="Pending Reviews" key="pending">
              {pendingReviews.length === 0 ? (
                <p className="text-gray-500">No pending reviews.</p>
              ) : (
                pendingReviews.map((review) => (
                  <Card
                    key={review.id}
                    className="mb-4 shadow-lg rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-700">
                          {review.product}
                        </h3>
                        <p className="text-gray-500">Sold by {review.seller}</p>
                        <p className="mt-2 text-gray-500 italic">
                          {review.review}
                        </p>
                      </div>
                      <div className="text-right">
                        <Rate
                          disabled
                          defaultValue={review.rating}
                          className="mb-2"
                        />
                        <p className="text-gray-500">{review.date}</p>
                        <Button type="primary" className="mt-4">
                          Write Review
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BuyerReviews;
