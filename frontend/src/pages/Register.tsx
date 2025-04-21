import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddPhotoAlternate } from "@mui/icons-material";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    "/default-avatar.png"
  ); // Default avatar
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.post("http://localhost:4000/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/login");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Card
        sx={{
          p: 4,
          mt: 8,
          textAlign: "center",
          bgcolor: "#F5F5F5",
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* 🔹 Logo */}
        <Box
          component="img"
          src="/logo.png"
          alt="Wellness Hub Logo"
          sx={{ width: 80, height: "auto", mx: "auto", mb: 2 }}
        />

        <Typography
          variant="h5"
          fontWeight="bold"
          color="#009688"
          sx={{ mb: 3 }}
        >
          Create Your Account
        </Typography>

        {/* 🔹 Profile Picture Upload */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar src={previewImage} sx={{ width: 100, height: 100, mb: 1 }} />
          <IconButton component="label">
            <AddPhotoAlternate />
            <input type="file" hidden onChange={handleImageChange} />
          </IconButton>
          <Typography variant="caption" color="textSecondary">
            Upload Profile Picture
          </Typography>
        </Box>

        {/* 🔹 Register Form */}
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
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
            sx={{ bgcolor: "#009688", "&:hover": { bgcolor: "#00796B" } }}
          >
            Register
          </Button>
        </form>

        {/* 🔹 Divider */}
        <Divider sx={{ my: 3 }} />

        {/* 🔹 Login Navigation */}
        <Typography variant="body2">Already have an account?</Typography>
        <Button
          variant="text"
          fullWidth
          onClick={() => navigate("/login")}
          sx={{ color: "#009688", fontWeight: "bold" }}
        >
          Login Here
        </Button>
      </Card>
    </Container>
  );
};

export default Register;
