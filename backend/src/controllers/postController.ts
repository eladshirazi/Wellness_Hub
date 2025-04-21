import { Request, Response } from "express";
import Post from "../models/postModel";
import mongoose from "mongoose";
import { RequestHandler } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

// **Create a Post**
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: "Post text is required" });
      return;
    }

    const userReq = req as AuthenticatedRequest;
    if (!userReq.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const newPost = new Post({
      user: userReq.user.id,
      text,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: (error as Error).message,
    });
  }
};

// **Get All Posts**
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profileImage")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// **Update Post**
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const userReq = req as AuthenticatedRequest;
    if (!userReq.user || post.user.toString() !== userReq.user.id) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    post.text = req.body.text || post.text;
    if (req.file) post.image = `/uploads/${req.file.filename}`;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error updating post",
      error: (error as Error).message,
    });
  }
};

// **Delete Post**
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const userReq = req as AuthenticatedRequest;
    if (!userReq.user || post.user.toString() !== userReq.user.id) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting post",
      error: (error as Error).message,
    });
  }
};

// **Like/Unlike Post**
export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const userReq = req as AuthenticatedRequest;
    if (!userReq.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = new mongoose.Types.ObjectId(userReq.user.id).toString();
    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(new mongoose.Types.ObjectId(userId) as any);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error liking post",
      error: (error as Error).message,
    });
  }
};

export const getMyPosts: RequestHandler = async (req, res) => {
  try {
    const userReq = req as AuthenticatedRequest;

    if (!userReq.user || !userReq.user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const posts = await Post.find({ user: userReq.user.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user posts",
      error: (error as Error).message,
    });
  }
};
