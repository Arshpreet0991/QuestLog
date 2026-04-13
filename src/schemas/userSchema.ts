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
<<<<<<< HEAD
});

export const logInSchema = z.object({
  email: z.string(),
=======
  timezone: z.string(),
});

export const logInSchema = z.object({
  identifier: z.string(),
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
  password: z.string(),
});

export const profileSchema = z.object({
  avatar: z.string(),
});
