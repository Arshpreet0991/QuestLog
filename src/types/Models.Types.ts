import mongoose from "mongoose";

// interface for day model
// interface extending mongoose, because we want mongoose to be ablet to add its own _id, and methods like .save() etc.
// Interface is used for models because we need them the abilty to merge (add new fields).
// types are rigid, they dont allow adding more fields.
// therefore, we use interface in models and types everywhere else, to define types.

export interface IDay extends mongoose.Document {
  date: Date;
  userId: mongoose.Types.ObjectId;
  score: number;
  reflection: IReflection;
  taskList: ITask[];
  dayStatus: "open" | "closed" | "skipped";
}

export interface IReflection {
  wentRight: string;
  wentWrong: string;
  improve: string;
}

// interface for Task model

export type TaskType = "mainQuest" | "sideQuest";
export type Category = "body" | "mind" | "wealth";

export interface ITask {
  _id?: string;
  task: string;
  isCompleted: boolean;
  taskType: TaskType;
  category: Category;
  points: number;
}

// interface for User model
export interface IUser extends mongoose.Document {
  avatar: string;
  username: string;
  email: string;
  password: string;
  verifyCode: number;
  verifyCodeExpiry: Date;
  isVerified: boolean;
}
