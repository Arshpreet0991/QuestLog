import Day from "@/models/Day.Model";
import { NextRequest } from "next/server";
import sessionAuthJs from "@/lib/sessionAuthJs";
import { errorResponse, successResponse } from "@/lib/response";
import dbConnect from "@/lib/dbConnection";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const user = await sessionAuthJs();
    if (!user) {
      return errorResponse(500, "cannot get the user from session");
    }
    const userId = user._id;

    const { currentDate } = await request.json();
    if (!currentDate) return errorResponse(500, "cant fetch current date");

    const day = await Day.findOneAndUpdate(
      { userId, date: currentDate }, // find by this
      {
        // only set these on creation
        $setOnInsert: {
          date: currentDate,
          userId: user._id,
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

    return successResponse(200, "day fetched or created successfully", day);
  } catch (error) {
    console.error("Day creation failed ", error);
    return errorResponse(500, "Day creation failed");
  }
}
