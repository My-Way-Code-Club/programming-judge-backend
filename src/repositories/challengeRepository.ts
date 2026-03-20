import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { Challenge, NewChallengeInput } from "../models/challenge";

type Row = Omit<Challenge, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

function rowToChallenge(row: Row): Challenge {
  return {
    ...row,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  };
}

function challengeToRow(c: Challenge): Row {
  return {
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}

export class ChallengeRepository {
  constructor(private readonly filePath: string) {}

  private async ensureFile(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, "[]", "utf-8");
    }
  }

  private async readRows(): Promise<Row[]> {
    await this.ensureFile();
    const raw = JSON.parse(await fs.readFile(this.filePath, "utf-8")) as unknown;
    return Array.isArray(raw) ? (raw as Row[]) : [];
  }

  private async writeRows(rows: Row[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(rows, null, 2), "utf-8");
  }

  async findAll(): Promise<Challenge[]> {
    const rows = await this.readRows();
    return rows.map(rowToChallenge);
  }

  async create(input: NewChallengeInput): Promise<Challenge> {
    const now = new Date();
    const challenge: Challenge = {
      id: randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    const rows = await this.readRows();
    rows.push(challengeToRow(challenge));
    await this.writeRows(rows);
    return challenge;
  }
}
