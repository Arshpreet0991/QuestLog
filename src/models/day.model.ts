import IDay from "@/types/day.types";
import mongoose from "mongoose";

const DaySchema = new mongoose.Schema(
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
    isChillDay: {
      type: Boolean,
      default: false,
    },
    reflection: {
      wentRight: { type: String },
      wentWrong: { type: String },
      improve: { type: String },
    },
  },
  { timestamps: true },
);

DaySchema.index({ userId: 1 });
DaySchema.index({ date: 1 });

const Day =
  (mongoose.models.Day as mongoose.Model<IDay>) ||
  mongoose.model<IDay>("Day", DaySchema);

export default Day;
