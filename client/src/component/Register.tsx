import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Button } from "antd";

import { googleAuthBuyer } from "../services/api.tsx";

const { Option } = Select;

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleUserTypeChange = (value: string) => {
    if (value === "buyer") {
      googleAuthBuyer(); // Redirect buyers to Google OAuth
    } else if (value === "seller") {
      navigate("/seller-register"); // Redirect sellers to a new registration page
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: 20,
        textAlign: "center",
      }}
    >
      <h2>Register</h2>
      <Select
        placeholder="Are you a Buyer or Seller?"
        style={{ width: "100%", marginBottom: 20 }}
        onChange={handleUserTypeChange}
      >
        <Option value="buyer">I am a Buyer</Option>
        <Option value="seller">I am a Seller</Option>
      </Select>
    </div>
  );
};

export default Register;
