import { Request, Response } from "express";
import Comment from "../models/commentModel";
import Post from "../models/postModel";

interface AuthenticatedRequest extends Request {
  user?: any;
}

// **Add a Comment**
export const addComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId, text } = req.body;
    if (!text) {
      res.status(400).json({ message: "Comment text is required" });
      return; //Ensures the function exits properly
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return; //Ensures the function exits properly
    }

    const comment = new Comment({
      post: postId,
      user: req.user.id,
      text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Error adding comment",
      error: (error as Error).message,
    });
  }
};

// **Get Comments for a Post**
export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username profileImage")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};
