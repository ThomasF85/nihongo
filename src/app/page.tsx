"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { Result } from "@/domain/Result";
import { Vocab } from "@/domain/Vocab";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { on } from "events";

export default function Home() {
  const [running, setRunning] = useState<boolean>(false);
  return (
    <>
      {running ? (
        <Game onEnd={() => setRunning(false)} />
      ) : (
        <Button text="start game" onClick={() => setRunning(true)} />
      )}
    </>
  );
}

async function getVocabs(): Promise<Vocab[]> {
  const response = await fetch("/api/vocabs");
  const result = await response.json();
  return result.vocabs;
}

async function sendResults(results: Result[]) {
  const response = await fetch("/api/vocabs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });
  await response.json();
}

function Game({ onEnd }: { onEnd: () => void }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [results, setResults] = useState<Result[]>([]);
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    getVocabs().then((vocabs) => {
      setVocabs(vocabs);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  if (current >= vocabs.length) {
    sendResults(results).then(() => {
      onEnd();
    });
    return <div>done</div>;
  }

  return (
    <>
      <Card
        flipped={flipped}
        toggleFlipped={() => setFlipped((prev) => !prev)}
        key={current}
        vocab={vocabs[current]}
      />
      <div className={styles.buttons}>
        <Button
          disabled={!flipped}
          text="not yet"
          onClick={() => {
            setCurrent((prev) => prev + 1);
            setFlipped(false);
            setResults((prev) => [
              ...prev,
              { _id: vocabs[current]._id, result: false },
            ]);
          }}
          secondary
        />
        <Button
          disabled={!flipped}
          text="got it"
          onClick={() => {
            setCurrent((prev) => prev + 1);
            setFlipped(false);
            setResults((prev) => [
              ...prev,
              { _id: vocabs[current]._id, result: true },
            ]);
          }}
        />
      </div>
    </>
  );
}
