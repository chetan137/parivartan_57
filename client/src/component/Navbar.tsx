import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Learning Platform
      </Typography>
      <Button color="inherit"> Home</Button>
      <Button color="inherit">Courses</Button>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
