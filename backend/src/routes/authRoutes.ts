import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import upload from "../middleware/uploadMiddleware";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

const FRONTEND_URL = "http://localhost:3000"; // Adjust if needed

//Google Authentication Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Google Callback Route - Now Sends Token to Frontend
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as { id: string }; // Ensure `user` exists
    if (!user) {
      return res.redirect(`${FRONTEND_URL}/login?error=unauthorized`);
    }

    //Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    //Redirect to frontend with token in URL
    res.redirect(`${FRONTEND_URL}/login?token=${token}`);
  }
);

// Standard Auth Routes
router.post("/login", loginUser);
router.post("/register", upload.single("profileImage"), registerUser);

export default router;
