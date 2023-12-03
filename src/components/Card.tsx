import { Vocab } from "@/domain/Vocab";
import { useState } from "react";
import styles from "./Card.module.css";

export default function Card({ vocab }: { vocab: Vocab }) {
  const [flipped, setFlipped] = useState<boolean>(false);
  return (
    <div className={styles.card} onClick={() => setFlipped((prev) => !prev)}>
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
