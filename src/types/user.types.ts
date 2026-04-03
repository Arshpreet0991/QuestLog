import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  avatar: string;
  timezone: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
