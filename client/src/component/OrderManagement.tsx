import React from "react";
import {
  Card,
  Table,
  Typography,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  Input,
  Tag,
} from "antd";

interface Order {
  orderId: string;
  customer: string;
  date: string;
  total: string;
  status: "Delivered" | "Processing" | "Shipped" | "Pending";
}

const orders: Order[] = [
  {
    orderId: "ORD001",
    customer: "John Doe",
    date: "2023-06-15",
    total: "₹1,200",
    status: "Delivered",
  },
  {
    orderId: "ORD002",
    customer: "Jane Smith",
    date: "2023-06-16",
    total: "₹850",
    status: "Processing",
  },
  {
    orderId: "ORD003",
    customer: "Bob Johnson",
    date: "2023-06-17",
    total: "₹2,100",
    status: "Shipped",
  },
  {
    orderId: "ORD004",
    customer: "Alice Brown",
    date: "2023-06-18",
    total: "₹750",
    status: "Pending",
  },
  {
    orderId: "ORD005",
    customer: "Charlie Wilson",
    date: "2023-06-19",
    total: "₹1,500",
    status: "Delivered",
  },
];

const OrderManagement: React.FC = () => {
  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "blue";
        if (status === "Delivered") color = "green";
        else if (status === "Processing") color = "orange";
        else if (status === "Shipped") color = "purple";
        else if (status === "Pending") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: () => <Button type="link">View Details</Button>,
    },
  ];

  return (
    <Card
      title="Order Management"
      extra={<Button type="primary">Export Orders</Button>}
    >
      <Table dataSource={orders} columns={columns} rowKey="orderId" />
    </Card>
  );
};

export default OrderManagement;
