import { Result } from "@/domain/Result";
import { ServerVocab } from "@/server/ServerVocab";
import { ServerVocabWithWeight, toVocab } from "@/server/ServerVocabWithWeight";
import { select } from "@/server/calculations/vocabSelector";
import { withExponentialWeight } from "@/server/calculations/weightCalculator";
import { getAll, update } from "@/server/db/mongodbService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allVocabs: ServerVocab[] = await getAll();
  //console.log(JSON.stringify(allVocabs));
  const allVocabsWithWeight: ServerVocabWithWeight[] = allVocabs.map(
    withExponentialWeight
  );
  const vocabs = select(allVocabsWithWeight, 15);
  return NextResponse.json({
    vocabs: vocabs.map(toVocab),
  });
}

export async function POST(request: NextRequest) {
  const results: Result[] = await request.json();

  const currentVocabs = await getAll();
  const updatedVocabs = currentVocabs
    .filter((vocab) => results.find((result) => result._id === vocab._id))
    .map((vocab) => {
      const result = results.find((result) => result._id === vocab._id);
      if (!result) {
        throw new Error("This should never happen");
      }
      const newVocab: ServerVocab = {
        ...vocab,
        results: [
          result.result,
          vocab.results[0],
          vocab.results[1],
          vocab.results[2],
        ],
        lastSeen: Date.now(),
      };
      return newVocab;
    });

  await update(updatedVocabs);

  return NextResponse.json({
    message: `Updated vocabs`,
  });
}
