import { ServerVocab } from "@/server/ServerVocab";
import { getAll } from "@/server/db/mongodbService";
import fs from "fs";

export async function GET() {
  const allVocabs: ServerVocab[] = await getAll();
  fs.writeFileSync("vocabs.json", JSON.stringify(allVocabs, null, 2));
}
