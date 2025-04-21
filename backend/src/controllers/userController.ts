import { RequestHandler } from "express";
import User from "../models/userModel";

// **Get User Profile**
export const getUserProfile: RequestHandler = async (req, res) => {
  try {
    //Use Type Assertion to tell TypeScript that `req.user` exists
    const userId = (req as any).user.id;

    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user profile",
      error: (error as Error).message,
    });
  }
};

// **Update User Profile**
export const updateUserProfile: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (req.body.username) user.username = req.body.username;
    if (req.file) user.profileImage = `/uploads/${req.file.filename}`;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: (error as Error).message,
    });
  }
};
