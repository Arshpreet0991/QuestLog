import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
import User from "@/models/user.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, verifyCode } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(404, "user does not exists");
    }

    const isVerifyCodeValid = new Date(user.verifyCodeExpiry) > new Date();

    if (!isVerifyCodeValid) {
      return errorResponse(403, "Verify code expired");
    }

    if (user.verifyCode !== verifyCode) {
      return errorResponse(403, "Invalid Verify code");
    }

    user.isVerified = true;
    await user.save();

    return successResponse(200, "User verified");
  } catch (error) {
    console.error("error verifying the user", error);
    return errorResponse(500, "error verifying the user");
  }
}
