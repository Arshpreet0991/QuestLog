import { EmailTemplate } from "@/components/email-template";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse<null>> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Quest Logger | Verification code",
      react: EmailTemplate({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "verification email sent successfully",
    };
  } catch (error) {
    console.error("error sending verification email", error);
    return {
      success: false,
      message: "error sending verification email",
    };
  }
}
