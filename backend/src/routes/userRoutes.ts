import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import multer from "multer";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/profile", protect, getUserProfile);
router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateUserProfile
);

export default router;
