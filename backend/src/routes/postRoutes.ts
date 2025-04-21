import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  likePost,
  getMyPosts,
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware";
import multer from "multer";

const router = express.Router();

// Multer setup for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", protect, upload.single("image"), createPost);
router.get("/", protect, getPosts);
router.put("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, likePost);
router.get("/mine", protect, getMyPosts);

export default router;
