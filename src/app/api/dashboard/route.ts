import Day from "@/models/Day.model";
import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getSession } from "@/helpers/getSession";
import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   await dbConnect();

//   try {
//     const userId = await getSession();
//     if (!userId) return errorResponse(404, "userId not found");

//     const today = request.nextUrl.searchParams.get("date");
//     console.log(today);

//     const day = await Day.find({ userId });
//     if (!day) return errorResponse(404, "day not found");

//     return successResponse(200, "day fetched", day);
//   } catch (error) {
//     return errorResponse(400, "day not found");
//   }
// }
