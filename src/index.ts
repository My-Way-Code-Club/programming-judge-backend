import path from "path";
import express from "express";
import { ChallengeRepository } from "./repositories/challengeRepository";

const app = express();
const challengeRepository = new ChallengeRepository(
  path.join(__dirname, "../data/challenges.json"),
);

app.use(express.json());

app.get("/challenges", async (_req, res) => {
  const challenges = await challengeRepository.findAll();
  res.json(challenges);
});

app.post("/challenges", async (req, res) => {
  const challenge = await challengeRepository.create({
    title: req.body.title,
    description: req.body.description,
    difficulty: req.body.difficulty,
  });
  res.status(201).json(challenge);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
