import { ServerVocab } from "../ServerVocab";
import ServerVocabModel from "./ServerVocabModel";
import dbConnect from "./connect";

export async function getAll(): Promise<ServerVocab[]> {
  await dbConnect();
  return ServerVocabModel.find({}).lean();
}

export async function insertMany(vocabs: ServerVocab[]) {
  await dbConnect();
  return ServerVocabModel.create(vocabs);
}

export async function update(vocabs: ServerVocab[]) {
  await dbConnect();
  vocabs.forEach(async (vocab) => {
    await ServerVocabModel.findByIdAndUpdate(vocab._id, vocab);
  });
}
