import dbConnect from "@/lib/dbConnection";
import { errorResponse, successResponse } from "@/lib/response";
import sessionAuthJs from "@/lib/sessionAuthJs";
import Day from "@/models/Day.Model";
import { ITask } from "@/types/Models.Types";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(404, "user not found");

    const { taskId, dayId, isCompleted } = await request.json();
    if (!taskId) return errorResponse(404, "Quests not found");

    const day = await Day.findOneAndUpdate(
      { userId, _id: dayId, "taskList._id": taskId },
      { $set: { "taskList.$.isCompleted": isCompleted } },
      { new: true },
    );

    if (!day) return errorResponse(404, "Day not found");

    return successResponse(200, "Task updated", isCompleted);
  } catch (error) {
    return errorResponse(400, "Task update failed", error);
  }
}
