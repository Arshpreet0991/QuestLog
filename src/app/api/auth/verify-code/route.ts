import dbConnect from "@/lib/dbConnection";
import { successResponse, errorResponse } from "@/lib/response";
<<<<<<< HEAD
import User from "@/models/User.Model";
=======
import User from "@/models/user.model";
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948

export async function POST(request: Request) {
  await dbConnect();

  try {
<<<<<<< HEAD
    const { userEmail, verifyCode } = await request.json();

    const user = await User.findOne({ email: userEmail });
=======
    const { email, verifyCode } = await request.json();
    const user = await User.findOne({ email });
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948

    if (!user) {
      return errorResponse(404, "user does not exists");
    }

    const isVerifyCodeValid = new Date(user.verifyCodeExpiry) > new Date();

<<<<<<< HEAD
    //console.log(isVerifyCodeValid);

=======
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
    if (!isVerifyCodeValid) {
      return errorResponse(403, "Verify code expired");
    }

<<<<<<< HEAD
    if (user.verifyCode !== Number(verifyCode)) {
=======
    if (user.verifyCode !== verifyCode) {
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
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
