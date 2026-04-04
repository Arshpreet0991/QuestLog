import User from "@/models/user.model";
import Task from "@/models/task.model";
import Day from "@/models/day.model";
import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session) return errorResponse(401, "Unauthorized, please login");

    const userId = session.user._id;
  } catch (error) {}
}
