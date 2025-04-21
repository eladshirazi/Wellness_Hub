import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  googleId?: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Only for local authentication
    profileImage: {
      type: String,
      default: "/uploads/default-avatar.png", //  Default profile image
    },
    googleId: { type: String, default: "" }, // Only for Google login
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
