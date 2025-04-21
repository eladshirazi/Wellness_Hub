import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";

interface Post {
  _id: string;
  text: string;
  image?: string;
  likes: string[];
  createdAt: string;
}

interface User {
  username: string;
  profileImage: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(""); // 🔹 Stores the preview image URL

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data);
      setUsername(data.username);
      setPreviewImage(`http://localhost:4000${data.profileImage}`); // 🔹 Set initial profile image
    };

    const fetchMyPosts = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:4000/api/posts/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(data);
    };

    fetchProfile();
    fetchMyPosts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // 🔹 Show preview without saving
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("username", username);
    if (profileImage) formData.append("profileImage", profileImage);

    await axios.put("http://localhost:4000/api/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    window.location.reload();
  };

  return (
    <Container maxWidth="md">
      {user && (
        <Card
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            bgcolor: "white",
          }}
        >
          {/* 🔹 Display selected image preview */}
          <Avatar
            src={previewImage} // 🔹 Show preview instead of the saved image
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              border: "4px solid #009688",
            }}
          />
          <Typography variant="h5" fontWeight="bold" color="#009688">
            {user.username}
          </Typography>

          <TextField
            label="Edit Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mt: 2 }}
          />

          {/* 🔹 Image Upload Button */}
          <Button
            variant="contained"
            component="label"
            startIcon={<Edit />}
            sx={{
              mt: 2,
              bgcolor: "#009688",
              "&:hover": { bgcolor: "#00796B" },
            }}
          >
            Upload Photo
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          {/* 🔹 Save Changes Button */}
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleUpdateProfile}
            sx={{
              mt: 2,
              ml: 1,
              bgcolor: "#009688",
              "&:hover": { bgcolor: "#00796B" },
            }}
          >
            Save Changes
          </Button>
        </Card>
      )}

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mt: 5, mb: 2, color: "#00796B" }}
      >
        My Posts
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {posts.map((post) => (
          <Grid item xs={12} key={post._id}>
            <Card
              sx={{
                p: 2,
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography sx={{ mb: 1 }}>{post.text}</Typography>
                {post.image && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 1,
                    }}
                  >
                    <img
                      src={`http://localhost:4000${post.image}`}
                      alt="Post"
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
