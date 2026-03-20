import type { Request, Response } from "express";
import type { ChallengeRepository } from "../repositories/challengeRepository";
import { newChallengeBodySchema } from "../schemas/challenge";

export function createChallengeController(repository: ChallengeRepository) {
  return {
    async list(_req: Request, res: Response) {
      const challenges = await repository.findAll();
      res.json(challenges);
    },

    async create(req: Request, res: Response) {
      const parsed = newChallengeBodySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request body" });
      }
      const challenge = await repository.create(parsed.data);
      res.status(201).json(challenge);
    },
  };
}
