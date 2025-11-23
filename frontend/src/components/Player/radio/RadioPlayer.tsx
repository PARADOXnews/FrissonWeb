"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./radio.module.css";

// Radio ტიპი
interface Radio {
  name: string; // რადიოს სახელი
  url: string;  // აუდიოს URL
  logo: string; // ლოგოს სურათის URL
  language: "GE" | "ITA" | "FRA"; // ენა
}

const RadioPlayer: React.FC = () => {
  // State-ები
  const [radios, setRadios] = useState<Radio[]>([]); // ყველა რადიო
  const [currentIndex, setCurrentIndex] = useState<number>(0); // მიმდინარე რადიო ინდექსი
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // თუ მუსიკა უკრავს
  const [volume, setVolume] = useState<number>(1); // ხმის დონე 0-დან 1-მდე
  const [isMuted, setIsMuted] = useState<boolean>(false); // Mute სტატუსი
  const [selectedLanguage, setSelectedLanguage] = useState<"GE" | "ITA" | "FRA">("GE"); // არჩეული ენა
  const [showAll, setShowAll] = useState<boolean>(false); // თუ უნდა აჩვენოს ყველა რადიო

  const audioRef = useRef<HTMLAudioElement | null>(null); // audio ელემენტი

  // 🔹 რადიოს ჩამოტვირთვა JSON–დან
  useEffect(() => {
    fetch("/radios.json")
      .then((res) => res.json())
      .then((data) => setRadios(data))
      .catch((err) => console.error("რადიო ვერ ჩაიტვირთა:", err));
  }, []);

  // 🔹 ფილტრირებული რადიო ენის მიხედვით
  const filteredRadios = radios.filter((r) => r.language === selectedLanguage);
  const currentRadio = filteredRadios[currentIndex];

  // 🔹 ხმის დონე / მუტის სტატუსის კონტროლი
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // 🔹 დაკვრა / პაუზა
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(console.error);
    setIsPlaying(!isPlaying);
  };

  // 🔹 შემდეგი რადიო
  const nextRadio = () => {
    if (filteredRadios.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredRadios.length);
    setIsPlaying(false);
  };

  // 🔹 წინა რადიო
  const prevRadio = () => {
    if (filteredRadios.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredRadios.length) % filteredRadios.length);
    setIsPlaying(false);
  };

  // 🔹 ენის ცვლილება
  const handleLanguageChange = (lang: "GE" | "ITA" | "FRA") => {
    setSelectedLanguage(lang);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  // 🔹 რადიოს სია, თუ showAll=false, აჩვენებს მხოლოდ 3–ს
  const radiosToShow = showAll ? filteredRadios : filteredRadios.slice(0, 3);

  return (
    <div className={styles.playerContainer}>
      {/* ===== ენის ღილაკები ===== */}
      <div className={styles.languageButtons}>
        {["GE", "ITA", "FRA"].map((lang) => (
          <button
            key={lang}
            className={selectedLanguage === lang ? styles.activeLang : ""}
            onClick={() => handleLanguageChange(lang as "GE" | "ITA" | "FRA")}
          >
            📻 {lang}
          </button>
        ))}
      </div>

      {/* ===== მიმდინარე რადიო ===== */}
      {currentRadio && (
        <>
          <div className={styles.currentRadio}>
            <h3>{currentRadio.name}</h3>

            {/* 🔹 Image rotating animation */}
            <div
                  className={`${styles.radioLogo} ${isPlaying ? styles.rotating : ""}`}
                  style={{ width: 180, height: 180, borderRadius: "50%", overflow: "hidden" }}>
                    <Image
                      src={currentRadio.logo}
                      alt={currentRadio.name}
                      width={180}
                      height={180}
                      style={{ objectFit: "cover" }}
                      />
            </div>

          </div>

          {/* ===== Player Controls ===== */}
          <div className={styles.playersBox}>
            {/* წინა */}
            <button className={styles.playerButton} onClick={prevRadio}>
              <Image
                src="/playicon/backicon.svg"
                alt="Back"
                width={40}
                height={40}
              />
            </button>

            {/* დაკვრა / პაუზა */}
            <button className={styles.playerButton} onClick={togglePlay}>
              <Image
                src={isPlaying ? "/playicon/pauseicon.svg" : "/playicon/playimg.svg"}
                alt={isPlaying ? "Pause" : "Play"}
                width={50}
                height={50}
              />
            </button>

            {/* შემდეგი */}
            <button className={styles.playerButton} onClick={nextRadio}>
              <Image
                src="/playicon/nexticon.svg"
                alt="Next"
                width={40}
                height={40}
              />
            </button>

            {/* ===== Volume Control ===== */}
            <div className={styles.volumeControl}>
                  <button
                    onClick={() => setIsMuted((prev) => !prev)}
                    className={styles.volumeButton}
                  >
                    <Image
                      src={isMuted ? "/playicon/muteicon.svg" : "/playicon/volumeicon.svg"}
                      alt={isMuted ? "Muted" : "Volume"}
                      width={28}
                      height={28}
                      className={styles.volumeIcon}
                    />
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className={styles.volumeSlider}
                    style={{
                      background: `linear-gradient(90deg, #ff6f61 ${((isMuted ? 0 : volume) * 100).toFixed(0)}%, #fff ${((isMuted ? 0 : volume) * 100).toFixed(0)}%)`,
                    }}
                  />
                </div>


          </div>

          {/* 🔹 Audio element */}
          <audio
            ref={audioRef}
            src={currentRadio.url}
            autoPlay={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </>
      )}

      {/* ===== Radio List ===== */}
      <div className={styles.radioList}>
      {radiosToShow.map((radio, index) => (
    <div
      key={index}
      className={`${styles.radioItem} ${index === currentIndex ? styles.active : ""}`}
      onClick={() => {
        setCurrentIndex(index);
        setIsPlaying(true);
      }}
    >
      {/* მრგვალი სურათი */}
      <div className={styles.radioThumb}>
        <Image
          src={radio.logo}
          alt={radio.name}
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </div>
      <span>{radio.name}</span>
    </div>
  ))}

        {/* Show All / Fold button */}
        {filteredRadios.length > 3 && (
          <button className={styles.showAllButton } onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Folded ⬆️" : "Show All ⬇️"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RadioPlayer;
