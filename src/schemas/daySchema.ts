import { z } from "zod";
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
});
