import Task from "@/models/task.model";
import Day from "@/models/day.model";
import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { taskSchema } from "@/schemas/taskSchema";
import { getSession } from "@/helpers/getSession";
import { NextRequest } from "next/server";
import { error } from "console";

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
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
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
