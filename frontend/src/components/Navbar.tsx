import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#00796B",
        boxShadow: "0px 4px 10px rgba(0, 121, 107, 0.3)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* 🔹 Left Side - Logo & App Name (Flush Left) */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Wellness Hub Logo"
              sx={{ height: 40, width: "auto", mr: 1 }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "white",
                "&:hover": { opacity: 0.8 },
                transition: "0.3s ease",
              }}
            >
              Wellness Hub
            </Typography>
          </Box>

          {/* 🔹 Right Side - Navigation Links + Profile + Logout */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              color="inherit"
              sx={{ fontSize: "16px", textTransform: "none" }}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: "16px", textTransform: "none" }}
              onClick={() => navigate("/forum")}
            >
              Forum
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: "16px", textTransform: "none" }}
              onClick={() => navigate("/ai-recommend")}
            >
              AI Recommendation
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: "16px", textTransform: "none" }}
              onClick={() => navigate("/about")}
            >
              About Us
            </Button>

            {/* 🔹 Profile & Logout at the Far Right */}
            <Button
              color="inherit"
              sx={{ fontSize: "16px", textTransform: "none" }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                bgcolor: "white",
                color: "#009688",
                "&:hover": { bgcolor: "#E9ECEF" },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
