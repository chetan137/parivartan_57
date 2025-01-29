import React, { useState } from "react";
import { Table, Button, Input, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// Define TypeScript interfaces for product data
interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    stock: 100,
    price: "₹40/kg",
  },
  { id: 2, name: "Fresh Milk", category: "Dairy", stock: 50, price: "₹60/L" },
  {
    id: 3,
    name: "Whole Wheat Bread",
    category: "Bakery",
    stock: 30,
    price: "₹35/loaf",
  },
  {
    id: 4,
    name: "Free Range Eggs",
    category: "Poultry",
    stock: 200,
    price: "₹90/dozen",
  },
  {
    id: 5,
    name: "Organic Honey",
    category: "Sweeteners",
    stock: 40,
    price: "₹250/500g",
  },
];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState<string>("");

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
    message.success("Product deleted successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Product) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Management</h2>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search products..."
          onSearch={setSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Add New Product
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="id"
      />
    </div>
  );
};

export default ProductManagement;
