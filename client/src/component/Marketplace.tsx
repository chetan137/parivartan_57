import React, { useState } from "react";
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
} from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  StarFilled,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Static Product Data
const allProducts = [
  {
    id: "1",
    name: "Handwoven Cotton Saree",
    category: "Clothing",
    price: "₹1,299",
    location: "West Bengal",
    rating: 4.5,
    seller: "Traditional Weavers",
    image:
      "https://supima.com/wp-content/uploads/2017/03/supima-cotton-bundle.jpg",
  },
  {
    id: "2",
    name: "Organic Honey Set",
    category: "Food",
    price: "₹499",
    location: "Himachal Pradesh",
    rating: 4.8,
    seller: "Himalayan Bee Farms",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnJqCUS1AivtriAmCIdznqPImwSMgMg8P8Q&s",
  },
  {
    id: "3",
    name: "Clay Tea Set",
    category: "Handicrafts",
    price: "₹899",
    location: "Rajasthan",
    rating: 4.2,
    seller: "Artisan Pottery Hub",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/4/300080373/TD/ZT/JJ/28816920/clay-tea-cup-set.jpg",
  },
  {
    id: "3",
    name: "Clay Tea Set",
    category: "Handicrafts",
    price: "₹899",
    location: "Rajasthan",
    rating: 4.2,
    seller: "Artisan Pottery Hub",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/4/300080373/TD/ZT/JJ/28816920/clay-tea-cup-set.jpg",
  },
  {
    id: "4",
    name: "Handmade Jute Bag",
    category: "Accessories",
    price: "₹699",
    location: "Kolkata",
    rating: 4.7,
    seller: "EcoStyle Crafts",
    image:
      "https://d2ma7w4w9grdob.cloudfront.net/media/54037Natural-Handmade-FoldOver-Bohemian-Jute-Clutch-Bag-HO-29-(1).JPG",
  },
  {
    id: "5",
    name: "Wooden Spice Box",
    category: "Kitchen",
    price: "₹1,199",
    location: "Kerala",
    rating: 4.6,
    seller: "Kerala Woodworks",
    image: "https://m.media-amazon.com/images/I/81xvkv+rEXL.jpg",
  },
  {
    id: "6",
    name: "Handwoven Wool Shawl",
    category: "Clothing",
    price: "₹1,599",
    location: "Himachal Pradesh",
    rating: 4.9,
    seller: "Mountain Looms",
    image:
      "https://shop.gaatha.com/image/catalog/Vankar-Babubhai-Ladhubhai/20_03_2023/Salt-Deserts-of-Kutch-Kutchi-Bhujodi-Handwoven-Raw-Wool-Long-Shawl-Long-Dhabro.jpg",
  },
];

const Marketplace = () => {
  const [cartCount, setCartCount] = useState(2);
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleFilterChange = () => {
    let filtered = allProducts.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (location === "All" || product.location === location)
    );
    setFilteredProducts(filtered);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
      <Layout style={{ padding: "20px", background: "#F8FAFC" }}>
        <Content>
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
              <Badge count={cartCount} style={{ marginRight: 20 }}>
                <ShoppingCartOutlined
                  style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
                />
              </Badge>
              <UserOutlined
                style={{ fontSize: 24, cursor: "pointer", color: "#2563EB" }}
              />
            </Col>
          </Row>
          <Title level={2} style={{ color: "#1E3A8A" }}>
            Marketplace
          </Title>
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col span={6}>
              <Select
                defaultValue="All"
                style={{ width: "100%" }}
                onChange={setCategory}
              >
                <Option value="All">All Categories</Option>
                <Option value="Clothing">Clothing</Option>
                <Option value="Food">Food</Option>
                <Option value="Handicrafts">Handicrafts</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select
                defaultValue="All"
                style={{ width: "100%" }}
                onChange={setLocation}
              >
                <Option value="All">All Locations</Option>
                <Option value="West Bengal">West Bengal</Option>
                <Option value="Himachal Pradesh">Himachal Pradesh</Option>
                <Option value="Rajasthan">Rajasthan</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Button type="primary" onClick={handleFilterChange}>
                Apply Filters
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            {filteredProducts.map((product) => (
              <Col span={8} key={product.id}>
                <Card
                  hoverable
                  bordered={false}
                  cover={
                    <img
                      alt={product.name}
                      src={product.image}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                  }
                >
                  <Title level={5}>{product.name}</Title>
                  <Text type="secondary">{product.seller}</Text>
                  <Text strong style={{ display: "block", marginTop: 5 }}>
                    {product.price}
                  </Text>
                  <Text type="secondary">{product.location}</Text>
                  <Text>
                    <StarFilled style={{ color: "#FBBF24" }} /> {product.rating}
                  </Text>
                  <Row justify="space-between" style={{ marginTop: 10 }}>
                    <Button type="default">Add to Cart</Button>
                    <Button type="primary">View Details</Button>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Marketplace;
