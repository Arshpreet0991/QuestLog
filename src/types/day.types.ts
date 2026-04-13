import mongoose from "mongoose";

interface IReflection {
  wentRight: string;
  wentWrong: string;
  improve: string;
}

interface IDay extends mongoose.Document {
  date: Date;

  userId: mongoose.Types.ObjectId;

  score: number;

  isChillDay: boolean;

  reflection: IReflection;

  createdAt: Date;
  updatedAt: Date;
}

export default IDay;
