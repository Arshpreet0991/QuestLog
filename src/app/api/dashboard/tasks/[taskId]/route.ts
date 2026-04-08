import Task from "@/models/task.model";
import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import { getSession } from "@/helpers/getSession";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> },
) {
  await dbConnect();

  try {
    const userId = await getSession();
    if (!userId) return errorResponse(401, "unauthorized, please log in");

    const { taskId } = await params;
    const { isCompleted } = await request.json();

    if (!taskId) return errorResponse(500, "task id does not exists");
    if (!mongoose.Types.ObjectId.isValid(taskId))
      return errorResponse(400, "Invalid task id");

    const task = await Task.findOneAndUpdate(
      { userId, _id: taskId },
      { isCompleted },
    );

    if (!task) return errorResponse(404, "Task not found to update");

    return successResponse(200, "Task updated");
  } catch (error) {
    return errorResponse(500, "task updation failed, " + error);
  }
}
