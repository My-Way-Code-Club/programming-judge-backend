import path from "path";
import express from "express";
import { createChallengeController } from "./controllers/challengeController";
import { ChallengeRepository } from "./repositories/challengeRepository";

const app = express();
const challengeRepository = new ChallengeRepository(
  path.join(__dirname, "../data/challenges.json"),
);
const challenges = createChallengeController(challengeRepository);

app.use(express.json());

app.get("/challenges", challenges.list);
app.post("/challenges", challenges.create);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
