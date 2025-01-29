import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Badge } from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
} from "@mui/icons-material";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const BuyerTopNav: React.FC = () => {
  const [, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Create an Ant Design Menu for Dropdown
  const menu = (
    <Menu
      onClick={handleClose}
      items={[
        { key: "1", label: "Profile" },
        { key: "2", label: "Settings" },
        { key: "3", label: "Log out" },
      ]}
    />
  );

  return (
    <AppBar
      position="static"
      color="default"
      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <div
            style={{
              position: "relative",
              borderRadius: "4px",
              backgroundColor: "#f1f3f4",
              marginRight: "16px",
              width: "250px",
            }}
          >
            <InputBase
              placeholder="Search products..."
              inputProps={{ "aria-label": "search" }}
              style={{ padding: "8px 12px", width: "100%" }}
            />
          </div>
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
        </div>

        {/* Icons Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          {/* User Dropdown */}
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="text"
              icon={<AccountCircle />}
              onClick={(e) => e.preventDefault()}
            >
              My Account <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BuyerTopNav;
