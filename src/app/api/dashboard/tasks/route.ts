import Task from "@/models/task.model";
import Day from "@/models/day.model";
import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session) return errorResponse(401, "Unauthorized, please login");

    const { content, taskType, category } = await request.json();

    const userId = session.user._id;

    // get the day Id
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // find the day document, if it doesnt exists, then create one
    // $setOnInsert: only set fields when a new document is being inserted.
    // upsert: create the document if it does not exists
    // new: return the new document
    const day = await Day.findOneAndUpdate(
      {
        userId,
        date: startOfDay,
      },
      { $setOnInsert: { date: startOfDay, userId } },
      { upsert: true, new: true },
    );

    const newTask = new Task({
      content,
      taskType,
      category,
      userId,
      isCompleted: false,
      dayId: day._id,
    });

    await newTask.save();

    return successResponse(201, "New Task Added", newTask);
  } catch (error) {
    console.log("Task creation failed ", error);
    return errorResponse(500, "Task creation failed");
  }
}
