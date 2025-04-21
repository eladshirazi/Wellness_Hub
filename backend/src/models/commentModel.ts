import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  post: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
