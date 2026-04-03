import { z } from "zod";

export const taskSchema = z.object({
  content: z.string(),
  taskType: z.enum(["mainQuest", "sideQuest"]),
  category: z.enum(["body", "mind", "wealth"]),
});
