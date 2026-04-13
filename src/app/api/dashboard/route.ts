import User from "@/models/user.model";
import Task from "@/models/task.model";
import Day from "@/models/day.model";
import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getSession } from "@/helpers/getSession";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const userId = await getSession();
    if (!userId) return errorResponse(404, "userId not found");
  } catch (error) {}
}
