import { z } from "zod";

export const newChallengeBodySchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});
