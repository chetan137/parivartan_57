import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Register from "./component/Register";
import AppFooter from "./component/AppFooter";
import AppListing from "./component/AddListing"
import ProductManagement from "./component/ProductManagement";
import Dashboard from "./component/Dashboard";
import OrderManagement from "./component/OrderManagement";
import AppNavbar from "./component/AppNavbar";
import BuyerDashboard from "./component/BuyerDashboard";
import Marketplace from "./component/Marketplace"
import Order from "./component/Orders"
import BuyInfo from "./component/DashboardB"
import SellerRegister from "./component/SellerRegister";
import SellerLogin from "./component/SellerLogin";
import BuyerReviews from "./component/BuyerReviews";
const { Content } = Layout; // ✅ Fix: Import Content from Ant Design

const App = () => {
  return (
    <Router>
      <Layout>
        {/* ✅ Navbar at the top */}
        <AppNavbar />

        {/* ✅ Main Content */}
        <Content style={{ padding: "20px", minHeight: "80vh" }}>
          <Routes>
            <Route
              path="/AddListing"
              element={
                <AppListing
                  sellerId={""}
                  onSubmit={function (formData: any): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            <Route path="/login" element={<Register />} />
            <Route path="/productM" element={<ProductManagement />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/seller-register" element={<SellerRegister />} />
            <Route path="/seller-login" element={<SellerLogin />} />
            <Route path="/orderManagement" element={<OrderManagement />} />
            <Route path="/BuyerDashboard" element={<BuyerDashboard />} />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/BuyInfo" element={<BuyInfo />} />
            <Route path="/orders" element={<Order />} />
             
            <Route path="/BuyerReviews" element={<BuyerReviews />} />
          </Routes>
        </Content>

        {/* ✅ Single Footer */}
        <AppFooter />
      </Layout>
    </Router>
  );
};

export default App;
