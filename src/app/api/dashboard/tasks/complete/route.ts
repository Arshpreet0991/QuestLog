import dbConnect from "@/lib/dbConnection";
import { errorResponse, successResponse } from "@/lib/response";
import sessionAuthJs from "@/lib/sessionAuthJs";
import Day from "@/models/Day.Model";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const user = await sessionAuthJs();
    if (!user) return errorResponse(404, "user not found");
    const userId = user?._id;
    if (!userId) return errorResponse(404, "user id not found");

    const { taskId, dayId, isCompleted } = await request.json();
    if (!taskId) return errorResponse(404, "Quests not found");

    console.log("recu isCompleted: ", isCompleted);

    const day = await Day.findOneAndUpdate(
      { userId, _id: dayId, "taskList._id": taskId },
      { $set: { "taskList.$.isCompleted": isCompleted } },
      { new: true },
    );
    if (!day) return errorResponse(404, "Day not found");

    return successResponse(200, "Task updated", day.taskList);
  } catch (error) {
    return errorResponse(400, "Task update failed", error);
  }
}
