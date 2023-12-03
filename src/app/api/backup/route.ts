import { ServerVocab } from "@/server/ServerVocab";
import { getAll } from "@/server/db/mongodbService";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const allVocabs: ServerVocab[] = await getAll();
  fs.writeFileSync("vocabs.json", JSON.stringify(allVocabs, null, 2));
  return NextResponse.json({
    message: `Wrote vocabs to file`,
  });
}
