<<<<<<< HEAD
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
=======
import Task from "@/models/task.model";
import Day from "@/models/day.model";
import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { taskSchema } from "@/schemas/taskSchema";
import { getSession } from "@/helpers/getSession";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session) return errorResponse(401, "Unauthorized, please login");
    const userId = session.user._id;

    const validation = taskSchema.safeParse(await request.json());
    if (!validation.success)
      return errorResponse(400, validation.error.issues[0].message);

    const { content, taskType, category, dayId } = validation.data;
    console.log("userId:", userId);

    const day = await Day.findOne({ userId, _id: dayId });
    if (!day) {
      return errorResponse(404, "No day exists to add the task to");
    }

    const newTask = new Task({
      content,
      taskType,
      category,
      userId,
      isCompleted: false,
      dayId,
    });

    await newTask.save();

    return successResponse(201, "New Task Added", newTask);
  } catch (error) {
    console.log("Task creation failed ", error);
    return errorResponse(500, "Task creation failed");
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
<<<<<<< HEAD
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
=======
    const userId = await getSession();
    if (!userId) return errorResponse(401, "unauthorized, please log in");

    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);

    const { taskId } = await request.json();
    if (!taskId) return errorResponse(500, "task id does not exists");

    const task = await Task.findOne({ userId, _id: taskId });
    if (!task) return errorResponse(404, "Task not found to delete");

    const day = await Day.findById(task.dayId);
    if (!day)
      return errorResponse(404, "cant find the day that the task belongs to");

    if (day.date.getTime() === todaysDate.getTime())
      return errorResponse(401, "Cant delete today's task");

    await task.deleteOne();

    return successResponse(200, "Task deleted");
  } catch (error) {
    return errorResponse(500, "task deletetion failed, " + error);
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await getSession();
    if (!userId) return errorResponse(401, "unauthorized, please log in");

    const requestBody = await request.json();
    const result = taskSchema.safeParse(requestBody);

    if (!result.success)
      return errorResponse(400, "Invalid taskType, category or Task Content");

    const { content, taskType, category } = result.data;

    const { taskId, isCompleted } = requestBody;
    if (!taskId) return errorResponse(500, "task id does not exists");
    if (!mongoose.Types.ObjectId.isValid(taskId))
      return errorResponse(400, "Invalid task id");

    const task = await Task.findOneAndUpdate(
      { userId, _id: taskId },
      { content, taskType, isCompleted, category },
    );

    if (!task) return errorResponse(404, "Task not found to update");

    return successResponse(200, "Task updated");
  } catch (error) {
    return errorResponse(500, "task updation failed, " + error);
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await getSession();
    if (!userId) return errorResponse(401, "unauthorized, please log in");

    const dayId = request.nextUrl.searchParams.get("dayId");
    const category = request.nextUrl.searchParams.get("category");
    if (!dayId) return errorResponse(400, "dayId is required");

    const taskArray = await Task.find({ userId, dayId, category });

    return successResponse(200, "Task List for today", taskArray);
  } catch (error) {
    return errorResponse(500, "fetching tasks failed, " + error);
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
  }
}
