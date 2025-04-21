import express from "express";
import { addComment, getComments } from "../controllers/commentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, addComment);
router.get("/:postId", protect, getComments);

export default router;
