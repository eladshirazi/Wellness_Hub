import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Send,
  ArrowBack,
  Edit,
  Save,
  Cancel,
  Delete,
} from "@mui/icons-material";

interface Comment {
  _id: string;
  user: { _id: string; username: string; profileImage: string };
  text: string;
  createdAt: string;
}

const Comments: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
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
      setUserId(data._id); // ✅ Store logged-in user ID
    };

    fetchUser();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `http://localhost:4000/api/comments/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setComments(data);
  };

  const handleAddComment = async () => {
    if (!text) return alert("Comment cannot be empty");

    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:4000/api/comments",
      { postId, text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setText("");
    fetchComments();
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditedText(comment.text);
  };

  const handleSaveEdit = async (commentId: string) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:4000/api/comments/${commentId}`,
      { text: editedText },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditingCommentId(null);
    fetchComments();
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:4000/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchComments();
  };

  return (
    <Container maxWidth="md">
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/forum")}
        sx={{ mt: 2, color: "#00796B" }}
      >
        <ArrowBack />
      </IconButton>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mt: 2, textAlign: "center", color: "#00796B" }}
      >
        Comments
      </Typography>

      {/* Add Comment Section */}
      <Card
        sx={{
          p: 3,
          mt: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <TextField
          fullWidth
          label="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#F7F8FA",
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<Send />}
          sx={{
            bgcolor: "#00796B",
            "&:hover": { bgcolor: "#005951" },
          }}
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </Card>

      {/* Display Comments */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {comments.map((comment) => (
          <Grid item xs={12} key={comment._id}>
            <Card
              sx={{
                p: 2,
                borderRadius: "10px",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    src={`http://localhost:4000${comment.user.profileImage}`}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#00796B"
                  >
                    {comment.user.username}
                  </Typography>
                </Box>

                {editingCommentId === comment._id ? (
                  <>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#F7F8FA",
                        },
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        color="success"
                        onClick={() => handleSaveEdit(comment._id)}
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setEditingCommentId(null)}
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <Typography>{comment.text}</Typography>
                )}

                {/* Show Edit/Delete only for the comment owner */}
                {userId === comment.user.username &&
                  editingCommentId !== comment._id && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditComment(comment)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <Delete />
                      </IconButton>
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

export default Comments;
