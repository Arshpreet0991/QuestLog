import ITask from "@/types/task.types";
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    taskType: {
      type: String,
      enum: ["mainQuest", "sideQuest"],
      required: true,
    },
    category: {
      type: String,
      enum: ["body", "mind", "wealth"],
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dayId: {
      type: mongoose.Types.ObjectId,
      ref: "Day",
      required: true,
    },
  },
  { timestamps: true },
);

TaskSchema.index(
  { dayId: 1, category: 1, taskType: 1 },
  { unique: true, partialFilterExpression: { taskType: "mainQuest" } },
);

const Task =
  (mongoose.models.Task as mongoose.Model<ITask>) ||
  mongoose.model<ITask>("Task", TaskSchema);

export default Task;
