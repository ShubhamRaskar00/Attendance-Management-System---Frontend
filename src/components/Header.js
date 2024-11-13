import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const menus = [
    {
      label: "Logout",
      actions: () => {
        localStorage.removeItem("token");
        navigate("/");
      },
    },
  ];

  //   Toggle menu
  const handleMenuToggle = (event) => {
    setIsOpen(!isOpen);
    setAnchorElNav(event.currentTarget);
  };
  return (
    <AppBar position="static" color="white">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/home">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LoGO
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleMenuToggle}>
              <Avatar
                alt="Profile image"
                src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorEl={anchorElNav}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(isOpen)}
              onClose={handleMenuToggle}
            >
              {menus.map((menu) => (
                <MenuItem
                  key={menu}
                  onClick={(event) => {
                    menu.actions();
                    handleMenuToggle(event);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {menu.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
