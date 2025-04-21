import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="#00796B" sx={{ mb: 3 }}>
        About Wellness-Hub
      </Typography>

      <Card sx={{ p: 3, mb: 4, textAlign: "left", backgroundColor: "#f8f9fa" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="secondary">
            Our Mission 🌿
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Wellness Hub is a social network designed to promote health,
            well-being, and community-driven support. Our platform allows users
            to share their wellness journeys, ask for advice, and receive
            AI-powered health recommendations. By combining technology and human
            connection, we aim to make health information more accessible and
            engaging.
          </Typography>
        </CardContent>
      </Card>

      <Typography
        variant="h5"
        fontWeight="bold"
        color="secondary"
        sx={{ mb: 3 }}
      >
        Meet the Founders 👨‍💻👨‍💻
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* 🔹 Founder: Elad Shirazi */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              src="/images/elad.jpg"
              alt="Elad Shirazi"
              sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6" fontWeight="bold">
              Elad Shirazi
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Fullstack Developer
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Passionate about innovation, problem-solving, and creating
              intuitive applications.
            </Typography>
          </Card>
        </Grid>

        {/* 🔹 Founder: Zur Shani */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              src="/images/zur.jpg"
              alt="Zur Shani"
              sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6" fontWeight="bold">
              Zur Shani
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Fullstack Developer
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Passionate about web development, AI, and building user-friendly
              digital experiences.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* 🔹 Closing Message */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="secondary">
          Join Us on Our Mission 🚀
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Whether you're here to connect, learn, or improve your well-being,
          Wellness Hub is your go-to platform. Join our growing community and
          embark on a healthier, happier journey today!
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
