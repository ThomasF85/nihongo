import { Vocab } from "@/domain/Vocab";
import { ServerVocab } from "@/server/ServerVocab";
import { getAll, insertMany } from "@/server/db/mongodbService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const upload: Omit<Vocab, "_id"> = await request.json();

  const currentVocabs = await getAll();
  if (currentVocabs.find((vocab) => vocab.english === upload.english)) {
    return NextResponse.json({
      message: `Already present`,
    });
  }
  const now = Date.now();
  const newVocab: ServerVocab = {
    ...upload,
    _id: crypto.randomUUID(),
    results: [false, false, false, false],
    createdAt: now,
    lastSeen: 0,
  };
  await insertMany([newVocab]);

  return NextResponse.json({
    message: `Uploaded new vocab`,
  });
}
