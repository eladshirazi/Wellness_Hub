import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Favorite,
  Delete,
  Comment,
  AddPhotoAlternate,
  Edit,
  Save,
  Cancel,
} from "@mui/icons-material";

interface Post {
  _id: string;
  user: { _id: string; username: string; profileImage: string };
  text: string;
  image?: string;
  likes: string[];
  createdAt: string;
  commentsCount?: number;
}

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [editedPreviewImage, setEditedPreviewImage] = useState<string | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserId(data._id);
    };

    fetchUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("http://localhost:4000/api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedPosts = await Promise.all(
      data.map(async (post: Post) => {
        const { data: comments } = await axios.get(
          `http://localhost:4000/api/comments/${post._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return { ...post, commentsCount: comments.length };
      })
    );

    setPosts(updatedPosts);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedImage(file);
      setEditedPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async () => {
    if (!text) return alert("Post text cannot be empty");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    await axios.post("http://localhost:4000/api/posts", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setText("");
    setImage(null);
    setPreviewImage(null);
    fetchPosts();
  };

  const handleLikePost = async (postId: string) => {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:4000/api/posts/${postId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchPosts();
  };

  const handleDeletePost = async (postId: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:4000/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchPosts();
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post._id);
    setEditedText(post.text);
    setEditedImage(null);
    setEditedPreviewImage(null);
  };

  const handleSaveEdit = async (postId: string) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("text", editedText);
    if (editedImage) formData.append("image", editedImage);

    await axios.put(`http://localhost:4000/api/posts/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setEditingPost(null);
    setEditedPreviewImage(null);
    fetchPosts();
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        color="#009688"
      >
        Community Forum
      </Typography>

      <Card sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton component="label">
            <AddPhotoAlternate />
            <input type="file" hidden onChange={handleImageChange} />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </Box>
        {previewImage && (
          <CardMedia
            component="img"
            image={previewImage}
            sx={{ mt: 2, maxHeight: 250 }}
          />
        )}
      </Card>

      {posts.map((post) => (
        <Card key={post._id} sx={{ mb: 3 }}>
          <CardHeader
            avatar={
              <Avatar src={`http://localhost:4000${post.user.profileImage}`} />
            }
            title={post.user.username}
            subheader={new Date(post.createdAt).toLocaleString()}
          />
          <CardContent>
            {editingPost === post._id ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <IconButton component="label">
                  <AddPhotoAlternate />
                  <input
                    type="file"
                    hidden
                    onChange={handleEditedImageChange}
                  />
                </IconButton>
                {editedPreviewImage && (
                  <CardMedia
                    component="img"
                    image={editedPreviewImage}
                    sx={{ mt: 2, maxHeight: 250 }}
                  />
                )}
              </>
            ) : (
              <Typography>{post.text}</Typography>
            )}
          </CardContent>
          {post.image && !editingPost && (
            <CardMedia
              component="img"
              image={`http://localhost:4000${post.image}`}
              sx={{ maxHeight: 300 }}
            />
          )}
          <CardActions>
            <IconButton
              onClick={() => handleLikePost(post._id)}
              color="primary"
            >
              <Favorite />
              <Typography variant="body2" ml={0.5}>
                {post.likes.length}
              </Typography>
            </IconButton>
            <IconButton
              onClick={() => navigate(`/comments/${post._id}`)}
              color="primary"
            >
              <Comment />
              <Typography variant="body2" ml={0.5}>
                {post.commentsCount || 0} {/* Show number of comments */}
              </Typography>
            </IconButton>

            {userId === post.user._id && (
              <>
                {editingPost === post._id ? (
                  // ✅ Show Save & Cancel only in edit mode
                  <>
                    <IconButton
                      onClick={() => handleSaveEdit(post._id)}
                      color="success"
                    >
                      <Save />
                    </IconButton>
                    <IconButton
                      onClick={() => setEditingPost(null)}
                      color="error"
                    >
                      <Cancel />
                    </IconButton>
                  </>
                ) : (
                  // ✅ Show Edit & Delete when not in edit mode
                  <>
                    <IconButton
                      onClick={() => handleEditPost(post)}
                      color="secondary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeletePost(post._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </>
                )}
              </>
            )}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Forum;
