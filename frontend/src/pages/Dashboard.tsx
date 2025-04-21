import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/wellness-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 5px 15px rgba(0, 121, 107, 0.3)",
            borderRadius: "12px",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: "#00796B", mb: 2 }}
          >
            Welcome to Wellness Hub 🌿
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: "#444" }}>
            Your personal space for health, wellness, and community support.
            Share insights, get AI-powered recommendations, and connect with
            others.
          </Typography>

          {/* Buttons for Quick Navigation */}
          <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#00796B",
                "&:hover": { backgroundColor: "#005951" },
              }}
              onClick={() => navigate("/forum")}
            >
              Explore the Forum
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderColor: "#00796B",
                color: "#00796B",
                "&:hover": { backgroundColor: "#E0F2F1" },
              }}
              onClick={() => navigate("/ai-recommend")}
            >
              Get AI Recommendations
            </Button>
          </Box>
        </Card>

        {/* Additional Info Section */}
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#00796B" }}
          >
            Why Join Wellness Hub?
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            flexWrap="wrap"
            mt={3}
          >
            <Card sx={{ maxWidth: 280, p: 2, backgroundColor: "#F7F8FA" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  🤝 Community Support
                </Typography>
                <Typography variant="body2">
                  Connect with like-minded individuals and share your journey.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ maxWidth: 280, p: 2, backgroundColor: "#F7F8FA" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  🤖 AI Health Insights
                </Typography>
                <Typography variant="body2">
                  Get personalized AI recommendations based on your symptoms.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ maxWidth: 280, p: 2, backgroundColor: "#F7F8FA" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  📚 Knowledge Sharing
                </Typography>
                <Typography variant="body2">
                  Learn about the best wellness practices from experts and
                  peers.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
