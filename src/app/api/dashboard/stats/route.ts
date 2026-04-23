import Day from "@/models/Day.Model";
import dbConnect from "@/lib/dbConnection";
import { NextRequest } from "next/server";
import sessionAuthJs from "@/lib/sessionAuthJs";
import { errorResponse, successResponse } from "@/lib/response";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(400, "user not found");

    const days = await Day.find({ userId });
    if (days.length === 0) return errorResponse(404, "no records found");

    const historyData = days.map((day) => ({
      id: day._id,
      date: day.date,
      score: day.score,
      reflection: day.reflection,
    }));

    return successResponse(200, "user day records found", historyData);
  } catch (error) {
    errorResponse(500, "failed to fetch the day records", error);
  }
}
