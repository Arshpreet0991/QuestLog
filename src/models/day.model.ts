import { IDay } from "@/types/Models.Types";
import mongoose from "mongoose";

const DaySchema = new mongoose.Schema<IDay>(
  {
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },

    reflection: {
      wentRight: { type: String },
      wentWrong: { type: String },
      improve: { type: String },
    },
    taskList: [
      {
        task: {
          type: String,
          required: [true, "cant have empty task"],
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
          enum: ["body", "mind", "wealth", "relationships"],
          required: true,
        },

        points: {
          type: Number,
          required: true,
        },
      },
    ],
    dayStatus: {
      type: String,
      enum: ["open", "closed", "skipped"],
      default: "open",
    },
  },

  { timestamps: true },
);

// 1. Get all days for a user
DaySchema.index({ userId: 1 });

// 2. Ensure one day per date per user
DaySchema.index({ userId: 1, date: 1 }, { unique: true });

const Day = mongoose.models.Day || mongoose.model("Day", DaySchema);

export default Day;
