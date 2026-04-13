import { z } from "zod";
<<<<<<< HEAD
import { taskSchema } from "./taskSchema";

export const daySchema = z.object({
  reflection: z
    .object({
      wentRight: z.string().optional(),
      wentWrong: z.string().optional(),
      improve: z.string().optional(),
    })
    .optional(),
  taskList: z.array(taskSchema),
=======

export const daySchema = z.object({
  reflection: z.object({
    wentRight: z.string().optional(),
    wentWrong: z.string().optional(),
    improve: z.string().optional(),
  }),
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
});
