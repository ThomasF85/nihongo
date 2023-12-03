import { Vocab } from "@/domain/Vocab";
import styles from "./Card.module.css";

export default function Card({
  vocab,
  flipped,
  toggleFlipped,
}: {
  vocab: Vocab;
  flipped: boolean;
  toggleFlipped: () => void;
}) {
  return (
    <div className={styles.card} onClick={toggleFlipped}>
      {flipped ? (
        <>
          <div>{vocab.romanji}</div>
          <div>{vocab.japanese}</div>
        </>
      ) : (
        <div>{vocab.english}</div>
      )}
    </div>
  );
}
