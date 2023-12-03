import { Vocab } from "@/domain/Vocab";
import { ServerVocab } from "./ServerVocab";

export type ServerVocabWithWeight = ServerVocab & { weight: number };

export function toVocab(serverVocabWithWeight: ServerVocabWithWeight): Vocab {
  return {
    _id: serverVocabWithWeight._id,
    english: serverVocabWithWeight.english,
    romanji: serverVocabWithWeight.romanji,
    japanese: serverVocabWithWeight.japanese,
  };
}
