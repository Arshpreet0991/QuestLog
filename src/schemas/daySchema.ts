import { z } from "zod";

export const daySchema = z.object({
  reflection: z.object({
    wentRight: z.string().optional(),
    wentWrong: z.string().optional(),
    improve: z.string().optional(),
  }),
});
