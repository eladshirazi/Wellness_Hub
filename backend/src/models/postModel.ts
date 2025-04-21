import mongoose from "mongoose";

interface IPost extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  image?: string;
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const PostSchema = new mongoose.Schema<IPost>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
