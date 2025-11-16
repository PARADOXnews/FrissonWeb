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

// type Song = {
//   id: number | string;
//   image: string;
//   title: string;
//   albumId: string;
//   duration: string;
//   artist?: string;
// };

export default function SongListTable() {
  const songs = [
    { id: 1, name: "ed sheeran", coverUrl: "/Images/Albums/13.png", duration: "4:24" },
    { id: 2, name: "bellie Eilish", coverUrl: "/Images/Albums/14.png", duration: "2:14" },
    { id: 3, name: "drake", coverUrl: "/Images/Albums/15.png", duration: "1:52" },
    { id: 4, name: "Biggie", coverUrl: "/Images/Albums/16.png", duration: "2:56" },
    { id: 5, name: "tupac", coverUrl: "/Images/Albums/17.png", duration: "3:59" },
    { id: 6, name: "selena gomez", coverUrl: "/Images/Albums/18.png", duration: "1:32" },
    { id: 7, name: "weeknd", coverUrl: "/Images/Albums/19.png", duration: "2:41" },
    { id: 8, name: "dua lipa", coverUrl: "/Images/Albums/20.png", duration: "3:12" },
    { id: 9, name: "eminem", coverUrl: "/Images/Albums/21.png", duration: "4:03" },
    { id: 10, name: "kendrick", coverUrl: "/Images/Albums/22.png", duration: "3:25" },
    { id: 11, name: "frank ocean", coverUrl: "/Images/Albums/23.png", duration: "2:48" },
    { id: 12, name: "lana del rey", coverUrl: "/Images/Albums/24.png", duration: "4:11" },
    { id: 13, name: "travis scott", coverUrl: "/Images/Albums/25.png", duration: "3:07" },
    { id: 14, name: "post malone", coverUrl: "/Images/Albums/26.png", duration: "2:59" },
    { id: 15, name: "olivia rodrigo", coverUrl: "/Images/Albums/27.png", duration: "1:46" },
    { id: 16, name: "sza", coverUrl: "/Images/Albums/28.png", duration: "3:18" },
    { id: 17, name: "rihanna", coverUrl: "/Images/Albums/29.png", duration: "2:33" },
    { id: 18, name: "ariana grande", coverUrl: "/Images/Albums/30.png", duration: "2:04" },
  ];

  // const [songs, setSongs] = useState<Song[]>([]);

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
    if (floatingDivRef.current) {
      refs.setFloating(floatingDivRef.current);
    }
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
                    src={song.coverUrl || photo}
                    alt={song.name ?? "song"}
                    width={48}
                    height={48}
                  />
                </div>
                <div className={styles.songNameBox}>
                  <span className={styles.songNameText}>{song.name}</span>
                  <span className={styles.songArtistText}>{song.name}</span>
                </div>
              </td>
              <td>{song.id}</td>
              <td>{song.duration}</td>
              <td>
                <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <span onMouseDown={stop} onClick={stop}>
                    <HeartBtn
                      iconColor="gray"
                      onToggle={() => {
                        /* wire later */
                      }}
                    />
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
