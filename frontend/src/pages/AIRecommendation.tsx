import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const AIRecommendation: React.FC = () => {
  const [symptoms, setSymptoms] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleGetRecommendations = async () => {
    if (!symptoms) return alert("Please enter symptoms");

    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "http://localhost:4000/api/ai-recommend",
      { symptoms },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const formattedRecommendations = data.recommendations
      .split("\n")
      .filter((line: string) => line.trim() !== "");

    setRecommendations(formattedRecommendations);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage: "url('/images/health-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 3,
        }}
      >
        {/* 🔹 AI Feature Explanation */}
        <Card
          sx={{
            p: 3,
            maxWidth: 700,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 4px 10px rgba(0, 121, 107, 0.3)",
            borderRadius: "12px",
            mb: 3, // Adds spacing below the explanation
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#00796B"
            sx={{ mb: 1 }}
          >
            How AI Health Recommendations Work
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Our AI Health Recommendations feature is designed to help you find
            the right supplements based on your symptoms. Simply enter how
            you're feeling (e.g., fatigue, headaches, or muscle cramps), and our
            AI will analyze your input to suggest vitamins, minerals, or other
            wellness products that might help. We also provide direct links to
            trusted products on iHerb, making it easier for you to find what you
            need.
          </Typography>
        </Card>

        {/* 🔹 AI Search Section */}
        <Card
          sx={{
            p: 4,
            maxWidth: 600,
            width: "100%",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 5px 15px rgba(0, 121, 107, 0.3)",
            borderRadius: "12px",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3, color: "#00796B" }}
          >
            AI Health Recommendations
          </Typography>
          <TextField
            fullWidth
            label="Enter symptoms (e.g., tiredness, headache)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
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
            startIcon={<Search />}
            sx={{
              bgcolor: "#00796B",
              "&:hover": { bgcolor: "#005951" },
            }}
            fullWidth
            onClick={handleGetRecommendations}
          >
            Get Recommendations
          </Button>

          {/* 🔹 Display Recommendations */}
          {recommendations.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                mt: 3,
                p: 3,
                textAlign: "left",
                backgroundColor: "#F7F8FA",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Recommended Supplements:
              </Typography>
              <List>
                {recommendations.map((line, index) => {
                  const linkMatch = line.match(
                    /\[Product Link\]\((https?:\/\/[^\s]+)\)/
                  );
                  if (linkMatch) {
                    return (
                      <ListItem key={index} sx={{ pb: 1 }}>
                        <ListItemText
                          primary={
                            <Typography variant="body1">
                              <a
                                href={linkMatch[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#00796B", fontWeight: "bold" }}
                              >
                                {linkMatch[1]}
                              </a>
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  }
                  return (
                    <ListItem key={index}>
                      <ListItemText primary={line} />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default AIRecommendation;
