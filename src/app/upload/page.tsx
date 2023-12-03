"use client";

import { Vocab } from "@/domain/Vocab";
import { useState } from "react";

async function upload(vocab: Omit<Vocab, "_id">) {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocab),
  });
  const result = await response.json();
  alert(JSON.stringify(result));
}

export default function Page() {
  const [english, setEnglish] = useState<string>("");
  const [romanji, setRomanji] = useState<string>("");
  const [japanese, setJapanese] = useState<string>("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          upload({ english, romanji, japanese });
        }}
      >
        <label>
          english:{" "}
          <input
            type="text"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
          />
        </label>
        <label>
          romanji:{" "}
          <input
            type="text"
            value={romanji}
            onChange={(e) => setRomanji(e.target.value)}
          />
        </label>
        <label>
          japanese:{" "}
          <input
            type="text"
            value={japanese}
            onChange={(e) => setJapanese(e.target.value)}
          />
        </label>
        <button type="submit">Upload</button>
      </form>
    </>
  );
}
