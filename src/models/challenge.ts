export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  createdAt: Date;
  updatedAt: Date;
}

export type NewChallengeInput = Omit<Challenge, "id" | "createdAt" | "updatedAt">;
