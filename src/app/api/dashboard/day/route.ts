import Day from "@/models/Day.Model";
import { NextRequest } from "next/server";
import sessionAuthJs from "@/lib/sessionAuthJs";
import { errorResponse, successResponse } from "@/lib/response";
import dbConnect from "@/lib/dbConnection";
import User from "@/models/User.Model";
import { ITask } from "@/types/Models.Types";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await sessionAuthJs();
    if (!userId) {
      return errorResponse(500, "cannot get the user from session");
    }

    const { currentDate, yesterday } = await request.json();
    if (!currentDate) return errorResponse(500, "cant fetch current date");

    // create day logic
    const day = await Day.findOneAndUpdate(
      { userId, date: currentDate }, // find by this
      {
        // only set these on creation
        $setOnInsert: {
          date: currentDate,
          userId,
          reflection: "",
          taskList: [],
        },
      },
      {
        upsert: true,
        new: true, // create if not found, return the doc
      },
    );

    const wasJustCreated = day.createdAt.getTime() === day.updatedAt.getTime();

    const user = await User.findById(userId);

    if (!user) return errorResponse(404, "user not found");

    if (wasJustCreated) {
      // streak logic

      const prevDay = await Day.findOne({
        userId,
        date: yesterday,
      }).populate("taskList");

      let isYesterdayTaskCompleted = false;

      if (prevDay?.taskList?.length) {
        isYesterdayTaskCompleted = prevDay.taskList.some(
          (task: ITask) => task.isCompleted,
        );
      }

      if (prevDay && isYesterdayTaskCompleted) {
        user.streak = user.streak + 1;
      } else {
        user.streak = 0;
      }
    }

    await user.save();

    return successResponse(200, "day created successfully", {
      day,
      username: user.username,
      streak: user.streak,
    });
  } catch (error) {
    console.error("Day creation failed ", error);
    return errorResponse(500, "Day creation failed");
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await sessionAuthJs();
    if (!userId) {
      return errorResponse(500, "cannot get the user from session");
    }

    const newDate = request.nextUrl.searchParams.get("date");
    if (!newDate) return errorResponse(400, "Date is required");

    const day = await Day.findOne({ userId, date: newDate });

    if (!day) return successResponse(200, "no day found", null);

    return successResponse(200, "day fetched", day);
  } catch (error) {
    return errorResponse(400, "day not found");
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await sessionAuthJs();
    if (!userId) {
      return errorResponse(401, "unauthorized");
    }

    const { dayId, score } = await request.json();

    await Day.findOneAndUpdate({ _id: dayId, userId }, { score });

    return successResponse(200, "score updated");
  } catch (error) {
    return errorResponse(500, "score update failed");
  }
}
