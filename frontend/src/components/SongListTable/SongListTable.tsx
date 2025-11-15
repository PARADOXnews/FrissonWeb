"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./SongListTable.module.scss";
import HeartBtn from "../HeartBtn/HeartBtn";
import photo from "../../assets/images/table/artistphoto.png";
import ThreeDotsBtn from "../ThreeDotsBtn/ThreeDotsBtn";
import ThreeDotsList from "../ThreeDotsList/ThreeDotsList";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  size,
} from "@floating-ui/react";

type Song = {
  id: number | string;
  image: string;
  title: string;
  albumId: string;
  duration: string;
  artist?: string;
};

const usedImages = new Set<number>();

// Dummy name pools
const songTitles = [
  "Midnight Drive",
  "Echoes",
  "Golden Hour",
  "Lost in Thought",
  "Neon Sky",
  "Waves",
  "Afterglow",
  "Chasing Shadows",
  "Solitude",
  "Firelight",
  "Moonlit Path",
  "Dreamcatcher",
  "Fading Memories",
  "Aurora",
  "Gravity",
  "Heartbeat",
  "Silver Lining",
  "Daybreak",
  "Velvet Night",
  "Starlight",
];
const albumNames = [
  "Reflections",
  "Horizons",
  "Timeless",
  "Voyager",
  "Odyssey",
  "Eclipse",
  "Momentum",
  "Reverie",
  "Paradox",
  "Infinity",
];
const artistNames = [
  "Luna Ray",
  "Echo Smith",
  "Nova Star",
  "Aria Vale",
  "Kairo Moon",
  "Solace",
  "Orion Blue",
  "Vera Sky",
  "Zephyr",
  "Aurora Lane",
];

export default function SongListTable() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<number | string | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const floatingDivRef = useRef<HTMLDivElement | null>(null);

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const PLAYER_H = 96;
  const { refs, floatingStyles } = useFloating({
    open: menuOpen,
    onOpenChange: setMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(2),
      flip({
        crossAxis: true,
        rootBoundary: "viewport",
        fallbackPlacements: ["bottom-start", "top-end", "top-start"],
        fallbackStrategy: "bestFit",
        padding: 8,
      }),
      shift({
        crossAxis: true,
        rootBoundary: "viewport",
        padding: PLAYER_H + 8,
      }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.max(availableWidth, 220)}px`,
            maxHeight: `${Math.max(availableHeight - PLAYER_H - 8, 180)}px`,
            overflow: "auto",
          });
        },
        rootBoundary: "viewport",
        padding: 8,
      }),
    ],
  });

  useEffect(() => {
    if (floatingDivRef.current) refs.setFloating(floatingDivRef.current);
  }, [refs, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const trg = e.target as Node;
      const floatingEl = refs.floating.current;
      const refEl = refs.reference.current as Node | null;
      if (floatingEl && floatingEl.contains(trg)) return;
      if (refEl && refEl.contains(trg)) return;
      setMenuOpen(false);
      setActiveRowId(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen, refs.floating, refs.reference]);

  const onThreeDotsClick = (e: React.MouseEvent<HTMLElement>, rowId: number | string) => {
    stop(e);
    const el = e.currentTarget as HTMLElement;
    lastTriggerRef.current = el;
    refs.setReference(el);
    setActiveRowId(rowId);
    setMenuOpen((v) => !v);
  };

  useEffect(() => {
    const dummySongs: Song[] = [];
    for (let i = 0; i < 20; i++) {
      // pick a random image 1–31 not used
      let available = Array.from({ length: 31 }, (_, i) => i + 1).filter((n) => !usedImages.has(n));
      if (available.length === 0) available = Array.from({ length: 31 }, (_, i) => i + 1);
      const pick = available[Math.floor(Math.random() * available.length)];
      usedImages.add(pick);

      dummySongs.push({
        id: i + 1,
        title: songTitles[i % songTitles.length],
        albumId: albumNames[i % albumNames.length],
        duration: `${Math.floor(Math.random() * 4) + 2}:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")}`,
        artist: artistNames[i % artistNames.length],
        image: `/Images/Albums/${pick}.png`,
      });
    }
    setSongs(dummySongs);
  }, []);

  return (
    <div className={styles.table}>
      <table className={styles.list}>
        <thead>
          <tr className={styles.thead}>
            <th>#</th>
            <th>Song Name</th>
            <th>album</th>
            <th>duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {songs.map((song, i) => (
            <tr key={song.id}>
              <td className={styles.songId}>{i + 1}</td>
              <td className={styles.songName}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={song.image || photo}
                    alt={song.title ?? "song"}
                    width={48}
                    height={48}
                  />
                </div>
                <div className={styles.songNameBox}>
                  <span className={styles.songNameText}>{song.title}</span>
                  <span className={styles.songArtistText}>{song.artist}</span>
                </div>
              </td>
              <td>{song.albumId}</td>
              <td>{song.duration}</td>
              <td>
                <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <span onMouseDown={stop} onClick={stop}>
                    <HeartBtn iconColor="gray" onToggle={() => {}} />
                  </span>
                  <span
                    onMouseDown={stop}
                    onClick={(e) => onThreeDotsClick(e, song.id)}
                    aria-expanded={menuOpen && activeRowId === song.id}
                    aria-haspopup="menu"
                    style={{ display: "inline-flex", cursor: "pointer" }}
                  >
                    <ThreeDotsBtn iconColor="white" open={menuOpen && activeRowId === song.id} />
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {menuOpen && (
        <FloatingPortal>
          <div
            ref={floatingDivRef}
            style={{ ...floatingStyles, zIndex: 99999 }}
            onMouseDown={stop}
            onClick={stop}
            data-open="true"
          >
            <ThreeDotsList withoutPlaylist />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
