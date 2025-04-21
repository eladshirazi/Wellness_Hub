import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  Box,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL and store it
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard"); //Redirect after storing token
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <Container maxWidth="xs">
      <Card
        sx={{
          p: 4,
          mt: 8,
          textAlign: "center",
          bgcolor: "#F5F5F5", // Cream/White Background
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* 🔹 Logo */}
        <Box
          component="img"
          src="/logo.png" //Update with your logo path
          alt="Wellness Hub Logo"
          sx={{ width: 80, height: "auto", mx: "auto", mb: 2 }}
        />

        <Typography
          variant="h5"
          fontWeight="bold"
          color="#009688"
          sx={{ mb: 3 }}
        >
          Welcome to Wellness Hub
        </Typography>

        {/* 🔹 Login Form */}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              bgcolor: "#009688",
              "&:hover": { bgcolor: "#00796B" },
            }}
          >
            Login
          </Button>
        </form>

        {/* 🔹 Divider */}
        <Divider sx={{ my: 3 }}>or</Divider>

        {/* 🔹 Google Login Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          sx={{
            bgcolor: "white",
            color: "#009688",
            "&:hover": { bgcolor: "#E9ECEF" },
          }}
        >
          Login with Google
        </Button>

        {/* 🔹 Register Section */}
        <Typography variant="body2" sx={{ mt: 3 }}>
          Don't have an account?
        </Typography>
        <Button
          variant="text"
          fullWidth
          onClick={() => navigate("/register")}
          sx={{ color: "#009688", fontWeight: "bold" }}
        >
          Register Now
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
