import express from "express";
import { getRecommendations } from "../controllers/aiController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, getRecommendations);

export default router;
