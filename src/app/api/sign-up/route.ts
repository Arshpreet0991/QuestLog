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
      //   const expiryDate = new Date();
      //   expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        timezone,
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

    return successResponse(
      200,
      "Sign up successfull, please verify your account",
    );
  } catch (error) {
    return errorResponse(500, "Sign up failed" + error);
  }
}
