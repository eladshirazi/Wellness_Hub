import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import passport from "passport";
import session from "express-session";
import "./config/passport";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import aiRoutes from "./routes/aiRoutes";
import path from "path";
import swaggerDocs from "./swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Wellness Hub API is running...");
});

app.use(
  session({
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai-recommend", aiRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

swaggerDocs(app);

const PORT = process.env.PORT || 4000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
