import mongoose from "mongoose";
import { IUser } from "../types/Models.Types";

const UserSchema = new mongoose.Schema<IUser>(
  {
    avatar: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    verifyCode: {
      type: Number,
      required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify Code Expiry is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
