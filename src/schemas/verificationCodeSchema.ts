import { z } from "zod";

export const verificationCodeSchema = z.object({
  vefificationCode: z
    .string()
    .length(6, { message: "Verification code must be 6 digits" }),
});
