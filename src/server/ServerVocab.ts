import { Vocab } from "@/domain/Vocab";

export type Results = [boolean, boolean, boolean, boolean];

export type ServerVocab = Vocab & {
  results: Results;
  createdAt: number;
  lastSeen: number;
};
