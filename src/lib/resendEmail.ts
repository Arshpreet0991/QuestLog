import { Resend } from "resend";
import { EmailTemplate } from "@/email/email-template";
import { ApiResponse } from "@/types/ApiResponse";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: number,
): Promise<ApiResponse<null>> {
  try {
    await resend.emails.send({
      from: "The Main Quest <no-reply@arshpreetsingh.dev>",
      to: email,
      subject: "The Main Quest | Verification code",
      react: EmailTemplate({ username, verifyCode }),
    });

    return { success: true, message: "verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email: ", error);
    return { success: false, message: "failed to send verification email" };
  }
}
