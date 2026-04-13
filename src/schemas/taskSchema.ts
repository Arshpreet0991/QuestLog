import { z } from "zod";

export const taskSchema = z.object({
<<<<<<< HEAD
  task: z.string(),
  taskType: z.enum(["mainQuest", "sideQuest"]),
  category: z.enum(["body", "mind", "wealth", "relationships"]),
  points: z.number(),
=======
  content: z.string(),
  taskType: z.enum(["mainQuest", "sideQuest"]),
  category: z.enum(["body", "mind", "wealth"]),
  dayId: z.string(),
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
});
