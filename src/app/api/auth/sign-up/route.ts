<<<<<<< HEAD
import { successResponse, errorResponse } from "@/lib/response";
import dbConnect from "@/lib/dbConnection";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/User.Model";
import { sendVerificationEmail } from "@/lib/resendEmail";
import { signUpSchema } from "@/schemas/userSchema";

export async function POST(request: NextRequest) {
  await dbConnect(); // connect to DB
  try {
    // verify incoming credentials using ZOD
    const result = signUpSchema.safeParse(await request.json());

    if (!result.success) {
      return errorResponse(400, "Invalid username, email, password");
    }

    const { username, email, password } = result.data;

    // create a verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000);

    // Check existing user
    const existingUser = await User.findOne({ email });

=======
import User from "@/models/user.model";
import dbConnect from "@/lib/dbConnection";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { successResponse, errorResponse } from "@/lib/response";
import { signUpSchema } from "@/schemas/userSchema";

export async function POST(request: NextRequest): Promise<NextResponse> {
  await dbConnect();
  try {
    // check the fields via zod
    const result = signUpSchema.safeParse(await request.json());
    if (!result.success) {
      return errorResponse(400, "Invalid username,email or password");
    }

    const { username, email, password, timezone } = result.data;

    const existingUser = await User.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
    if (existingUser) {
      if (existingUser.isVerified) {
        return errorResponse(409, "user already registered with this email");
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        existingUser.password = hashedPassword;
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUser.save();
      }
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
<<<<<<< HEAD
=======
      //   const expiryDate = new Date();
      //   expiryDate.setHours(expiryDate.getHours() + 1);
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
<<<<<<< HEAD
=======
        timezone,
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
        verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 3600000),
        isVerified: false,
      });

      await newUser.save();
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode,
    );
    if (!emailResponse.success) {
      return errorResponse(500, emailResponse.message);
    }

<<<<<<< HEAD
    // return response
=======
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
    return successResponse(
      200,
      "Sign up successfull, please verify your account",
    );
  } catch (error) {
<<<<<<< HEAD
    console.error("Error registering user: ", error); // shown in our terminal
    return errorResponse(500, "Error registering user: ", error); // send to front end
  }
}

=======
    return errorResponse(500, "Sign up failed" + error);
  }
}
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
