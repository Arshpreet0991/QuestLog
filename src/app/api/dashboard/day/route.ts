import Day from "@/models/Day.Model";
import { NextRequest } from "next/server";
import sessionAuthJs from "@/lib/sessionAuthJs";
import { errorResponse, successResponse } from "@/lib/response";
import dbConnect from "@/lib/dbConnection";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await sessionAuthJs();
    if (!userId) {
      return errorResponse(500, "cannot get the user from session");
    }

    const { currentDate } = await request.json();
    if (!currentDate) return errorResponse(500, "cant fetch current date");

    // create day logic
    const day = await Day.findOneAndUpdate(
      { userId, date: currentDate }, // find by this
      {
        // only set these on creation
        $setOnInsert: {
          date: currentDate,
          userId,
          reflection: {
            wentRight: "",
            wentWrong: "",
            improve: "",
          },
          taskList: [],
        },
      },
      {
        upsert: true,
        new: true, // create if not found, return the doc
      },
    );

    return successResponse(200, "day created successfully", {
      day,
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
    //if (!day) return errorResponse(404, "day not found");

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
