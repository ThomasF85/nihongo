import { ServerVocabWithWeight } from "../ServerVocabWithWeight";

export function select(
  vocabs: ServerVocabWithWeight[],
  amount: number
): ServerVocabWithWeight[] {
  const result: ServerVocabWithWeight[] = [];
  let currentVocabs = vocabs.slice();
  for (let i = 0; i < amount; i++) {
    const index = selectOne(currentVocabs);
    result.push(currentVocabs[index]);
    currentVocabs = currentVocabs.filter((_, i) => i !== index);
  }
  return result;
}

function selectOne(vocabs: ServerVocabWithWeight[]): number {
  const totalWeight = vocabs.reduce((acc, cur) => acc + cur.weight, 0);
  const random = Math.random() * totalWeight;
  let sum = 0;
  for (let i = 0; i < vocabs.length; i++) {
    sum += vocabs[i].weight;
    if (random < sum) {
      return i;
    }
  }
  throw new Error("This should never happen");
}
