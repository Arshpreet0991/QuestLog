import { z } from "zod";

export const usernameValidations = z
  .string()
  .min(1, "Username must be atleast 1 character.")
  .max(20, "Username must be no more than 20 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "Username cannot contain special characters.");

export const signUpSchema = z.object({
  username: usernameValidations,
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" })
    .max(20, { message: "Password cannot be longer than 20 characters" }),
});

export const logInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const profileSchema = z.object({
  avatar: z.string(),
});
