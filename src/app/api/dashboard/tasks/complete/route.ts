import dbConnect from "@/lib/dbConnection";
import { errorResponse, successResponse } from "@/lib/response";
import sessionAuthJs from "@/lib/sessionAuthJs";
import Day from "@/models/Day.model";
import { ITask } from "@/types/Models.Types";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const user = await sessionAuthJs();
    if (!user) return errorResponse(404, "user not found");
    const userId = user?._id;
    if (!userId) return errorResponse(404, "user id not found");

    const { taskId, dayId, resultStatus } = await request.json();
    if (!taskId) return errorResponse(404, "Quests not found");

    // const result = taskList.find((task: ITask) => task._id === taskId);
    // console.log("result:", result);

    const day = await Day.findOneAndUpdate(
      { userId, _id: dayId, "taskList._id": taskId },
      { $set: { "taskList.$.isCompleted": resultStatus } },
      { new: true },
    );

    /*
    // scoring logic
    const tasks = day.taskList;
    const completedMainQuestCount = tasks.filter(
      (task: ITask) =>
        task.taskType === "mainQuest" && task.isCompleted === true,
    ).length;

    const completedSideQuestCount = tasks.filter(
      (task: ITask) =>
        task.taskType === "sideQuest" && task.isCompleted === true,
    ).length;

    const totalTasks = tasks.length;

    const sideQuestsCount = totalTasks - 3;
    const sideQuestPoints = sideQuestsCount > 0 ? 40 / sideQuestsCount : 0;

    console.log("completed main quests: ", completedMainQuestCount);
    console.log("completed side quests: ", completedSideQuestCount);
    console.log("total tasks: ", totalTasks);

    // let sideQuestScore = (totalTasks - mainQuestCount) / 100;
    // let mainQuestScore = mainQuestCount * 15;
    // let totalScore = mainQuestScore + sideQuestScore;
*/
    if (!day) return errorResponse(404, "Day not found");

    return successResponse(200, "Task updated", day.taskList);
  } catch (error) {
    return errorResponse(400, "Task update failed", error);
  }
}
