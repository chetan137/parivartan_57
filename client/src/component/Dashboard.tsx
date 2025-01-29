import React from "react";
import {
  Card,
  Table,
  Typography,
  Row,
  Col,
  Button,
  Space,
  Statistic,
  Input,
} from "antd";
import { ArrowUpOutlined, PlusOutlined } from "@ant-design/icons";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const { Title } = Typography;

// Define TypeScript interfaces for dashboard data
interface Product {
  id: number;
  name: string;
  sales: number;
  stock: number;
}

const mockProducts: Product[] = [
  { id: 1, name: "Organic Tomatoes", sales: 120, stock: 50 },
  { id: 2, name: "Fresh Milk", sales: 85, stock: 30 },
  { id: 3, name: "Whole Wheat Bread", sales: 70, stock: 25 },
  { id: 4, name: "Free Range Eggs", sales: 60, stock: 100 },
  { id: 5, name: "Organic Honey", sales: 40, stock: 15 },
];

const revenueData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Revenue",
      data: [6000, 3500, 2800, 4500],
      backgroundColor: "#4CAF50",
    },
  ],
};

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Welcome back, Seller!</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={45231.89}
              prefix="₹"
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix={<ArrowUpOutlined />}
            />
            <p>+20.1% from last month</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Orders"
              value={573}
              prefix="+"
              suffix={<ArrowUpOutlined />}
            />
            <p>+201 from last month</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Products" value={24} />
            <p>+3 new this month</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Customer Satisfaction" value={98} suffix="%" />
            <p>+2% from last month</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Revenue Overview">
            <Bar data={revenueData} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Top Selling Products">
            <Table
              dataSource={mockProducts}
              columns={[
                { title: "Product", dataIndex: "name", key: "name" },
                { title: "Sales", dataIndex: "sales", key: "sales" },
                { title: "Stock", dataIndex: "stock", key: "stock" },
              ]}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

    </div>

  );
};

export default Dashboard;
