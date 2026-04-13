import { z } from "zod";

export const taskSchema = z.object({
  task: z.string(),
  taskType: z.enum(["mainQuest", "sideQuest"]),
  category: z.enum(["body", "mind", "wealth", "relationships"]),
  points: z.number(),
});
