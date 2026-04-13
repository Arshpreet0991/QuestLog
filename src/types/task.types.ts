import mongoose from "mongoose";

interface ITask extends mongoose.Document {
  content: string;
  isCompleted: boolean;
  taskType: "mainQuest" | "sideQuest";
  category: "body" | "mind" | "wealth";
  userId: mongoose.Types.ObjectId;
  dayId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default ITask;
