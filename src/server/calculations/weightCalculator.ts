import { ServerVocab } from "../ServerVocab";
import { ServerVocabWithWeight } from "../ServerVocabWithWeight";

export function withExponentialWeight(
  serverVocab: ServerVocab
): ServerVocabWithWeight {
  let deduction = 0;
  for (let i = 0; i < serverVocab.results.length; i++) {
    if (serverVocab.results[i]) {
      deduction += 1 / Math.pow(2, i + 1);
    }
  }
  return { ...serverVocab, weight: 1 - deduction };
}
