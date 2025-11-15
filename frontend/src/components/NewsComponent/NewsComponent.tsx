"use client";

import Button from "../Button/Button";
import styles from "./NewsComponent.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";

interface NewsComponentProps {
  title: string;
  artist?: string;
  verified?: boolean;
  button?: string;
}

// simple helper to track used numbers globally (so no repeats)
const usedNumbers: Record<string, number[]> = {};

function getRandomUnique(max: number, key: string) {
  if (!usedNumbers[key]) usedNumbers[key] = [];
  let num = Math.floor(Math.random() * max) + 1;
  while (usedNumbers[key].includes(num)) {
    num = Math.floor(Math.random() * max) + 1;
  }
  usedNumbers[key].push(num);
  return num;
}

export default function NewsComponent({ title, artist, verified, button }: NewsComponentProps) {
  const [plays, setPlays] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
setPlays(Math.floor(Math.random() * 10_000_000) + 1);
    const imgNum = getRandomUnique(9, "news"); // 1–9
    setImageUrl(`/Images/Banner/${imgNum}.png`);
  }, []);

  return (
    <div className={styles.wrapper} >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="banner"
          fill
          className={styles.card}
          style={{ objectFit: "cover" }}
        />
      )}

      <div className={styles.content}>
        <div className={styles.textBox}>
          {verified && (
            <div className={styles.verified}>
              <Image
                src="/Images/NewsComponent/Vector.png"
                width={22}
                height={21}
                alt="verified icon"
              />
              <p>verified artist</p>
            </div>
          )}
          <h1 className={styles.title}>{artist || title}</h1>
          <p className={styles.plays}>{plays.toLocaleString()}</p>
        </div>

        <Button
          className={styles.button}
          text={button || "Listen Now"}
          height={50}
          icon="/icons/Button/Play.svg"
        />
      </div>
    </div>
  );
}
