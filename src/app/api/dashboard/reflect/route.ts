import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/lib/response";
import Day from "@/models/Day.Model";
import sessionAuthJs from "@/lib/sessionAuthJs";
import dbConnect from "@/lib/dbConnection";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(401, "Unauthorized");

    const { dayId, reflectionText } = await request.json();

    if (!dayId) return errorResponse(500, "user id not found");
    if (!reflectionText)
      return errorResponse(400, "reflection text not received");
    if (!reflectionText.trim()) {
      return errorResponse(400, "reflection cannot be empty");
    }

    const day = await Day.findOneAndUpdate(
      { _id: dayId, userId },
      { $set: { reflection: reflectionText } },
      { new: true },
    );
    if (!day) return errorResponse(500, "day not found");

    return successResponse(200, "Reflection notes added");
  } catch (error) {
    return errorResponse(400, "failed to add reflection notes", error);
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(401, "Unauthorized");

    const dayId = request.nextUrl.searchParams.get("dayId");
    if (!dayId) return errorResponse(500, "user id not found");

    const day = await Day.findOne({ _id: dayId, userId });
    if (!day) return errorResponse(500, "day not found");

    return successResponse(200, "Reflection notes added", day.reflection);
  } catch (error) {
    return errorResponse(400, "failed to add reflection notes", error);
  }
}
