import dbConnect from "@/lib/dbConnection";
import { errorResponse, successResponse } from "@/lib/response";
import sessionAuthJs from "@/lib/sessionAuthJs";
import Day from "@/models/Day.model";
import { NextRequest } from "next/server";
import { ITask } from "@/types/Models.Types";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(400, "user not found");

    const { task, dayId } = await request.json();

    const day = await Day.findOneAndUpdate(
      {
        _id: dayId,
        userId,
        $expr: { $lt: [{ $size: "$taskList" }, 15] }, // only update if less than 15
      },
      { $push: { taskList: task } },
      { new: true },
    );

    if (!day) return errorResponse(422, "Task limit reached or day not found");

    return successResponse(200, "task added", day.taskList);
  } catch (error) {
    return errorResponse(400, "error adding task", error);
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(400, "user not found");
    const dayId = request.nextUrl.searchParams.get("dayId");

    const day = await Day.findOne({ userId, _id: dayId });
    if (!day) return errorResponse(404, "day not found");

    return successResponse(200, "task list fetched successfully", day.taskList);
  } catch (error) {
    return errorResponse(400, "task list fetch failed", error);
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(400, "user not found");
    if (!userId) return errorResponse(404, "user id not found");

    const { taskId, dayId, updatedTitle } = await request.json();
    if (!taskId) return errorResponse(404, "Quests not found");

    const day = await Day.findOneAndUpdate(
      { userId, _id: dayId, "taskList._id": taskId },
      { $set: { "taskList.$.title": updatedTitle } },
      { new: true },
    );
    if (!day) return errorResponse(404, "Day not found");

    return successResponse(200, "Task updated", day.taskList);
  } catch (error) {
    return errorResponse(400, "Task update failed", error);
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await sessionAuthJs();
    if (!userId) return errorResponse(400, "user not found");
    if (!userId) return errorResponse(404, "user id not found");

    const taskId = request.nextUrl.searchParams.get("taskId");
    if (!taskId) return errorResponse(404, "Quests not found");

    const dayId = request.nextUrl.searchParams.get("dayId");
    if (!taskId) return errorResponse(404, "Day not found");

    const day = await Day.findOneAndUpdate(
      { userId, _id: dayId },
      { $pull: { taskList: { _id: taskId } } },
      { new: true },
    );
    if (!day) return errorResponse(404, "Day not found");

    return successResponse(200, "Task deleted", day.taskList);
  } catch (error) {
    return errorResponse(400, "Task deletion failed", error);
  }
}
