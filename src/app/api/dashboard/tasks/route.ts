import dbConnect from "@/lib/dbConnection";
import { errorResponse, successResponse } from "@/lib/response";
import sessionAuthJs from "@/lib/sessionAuthJs";
import Day from "@/models/Day.Model";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const user = await sessionAuthJs();
    if (!user) return errorResponse(400, "user not found");
    const userId = user?._id;
    if (!userId) return errorResponse(400, "user id not found");

    const { todo, dayId } = await request.json();

    const day = await Day.findOneAndUpdate(
      { _id: dayId, userId },
      { $push: { taskList: todo } }, // add to an existing array
      { new: true },
    );

    if (!day) return errorResponse(400, "day doesn't exists to add task");

    return successResponse(200, "task added");
  } catch (error) {
    return errorResponse(400, "error adding task", error);
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const user = await sessionAuthJs();
    if (!user) return errorResponse(404, "user not found");
    const userId = user?._id;
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
    const user = await sessionAuthJs();
    if (!user) return errorResponse(404, "user not found");
    const userId = user?._id;
    if (!userId) return errorResponse(404, "user id not found");

    const { taskId, dayId, updatedText } = await request.json();
    if (!taskId) return errorResponse(404, "Quests not found");

    const day = await Day.findOneAndUpdate(
      { userId, _id: dayId, "taskList._id": taskId },
      { $set: { "taskList.$.task": updatedText } },
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
    const user = await sessionAuthJs();
    if (!user) return errorResponse(404, "user not found");
    const userId = user?._id;
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
