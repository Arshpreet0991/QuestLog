import Day from "@/models/day.model";
import dbConnect from "@/lib/dbConnection";
import Task from "@/models/task.model";
import User from "@/models/user.model";
import { getSession } from "@/helpers/getSession";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/lib/response";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await getSession();
    if (!userId) return errorResponse(401, "unauthorized, please log in");

    const { date } = await request.json();

    if (!date) {
      return errorResponse(400, "invalid date");
    }

    const todaysDate = new Date(date);
    todaysDate.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 6);

    if (todaysDate > maxDate) {
      return errorResponse(400, "cant plan more than 7 days ahead");
    }

    const day = await Day.findOneAndUpdate(
      { userId, date: todaysDate },
      { $setOnInsert: { date: todaysDate, userId } },
      { upsert: true, new: true },
    );

    return successResponse(201, "day added", day);
  } catch (error) {
    return errorResponse(500, "error adding a new day");
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await getSession();
    if (!userId) return errorResponse(401, "unauthorized, please log in");

    const dateString = request.nextUrl.searchParams.get("date");
    const date = dateString ? new Date(dateString) : new Date();
    const normalizedDate = date.setHours(0, 0, 0, 0);

    const day = await Day.findOne({ userId, date: new Date(normalizedDate) });
    if (!day) return errorResponse(404, "day not found");

    //console.log("DAY: ", day);

    return successResponse(200, "Day found", day);
  } catch (error) {
    console.log(error);

    return errorResponse(404, "could not find the day");
  }
}
