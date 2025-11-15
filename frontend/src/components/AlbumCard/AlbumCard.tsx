// AlbumCard.tsx
"use client";

import styles from "./AlbumCard.module.scss";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDotsBtn/ThreeDotsBtn";
import ThreeDotsList from "../ThreeDotsList/ThreeDotsList";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import { getRandomUnique } from "../../utils/getRandomUnique";

interface AlbumCardProps {
  title?: string;
  artistName?: string;
  coverUrl?: string | StaticImageData;
  onClick?: () => void;
  hideHoverEfect?: boolean;
  artist?: string;
}

export default function AlbumCard({
  title,
  artistName,
  coverUrl,
  onClick,
  hideHoverEfect = false,
}: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [randomCover, setRandomCover] = useState<string | null>(null);
  const [imgKey, setImgKey] = useState<number>(0); // force re-render

  useEffect(() => {
    const imgNum = getRandomUnique(31, "albumCard");
    const url = `/Images/Albums/${imgNum}.png`;
    setRandomCover(url);
    setImgKey(prev => prev + 1); // force Image re-render
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    middleware: [
      offset(8),
      flip({ padding: 96, fallbackPlacements: ["top-end"], fallbackStrategy: "bestFit" }),
      shift({ padding: 96 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { event: "click" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const showHoverControls = (isHovered || isMenuOpen) && !hideHoverEfect;

  const floatingDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (floatingDivRef.current) refs.setFloating(floatingDivRef.current);
  }, [refs, isMenuOpen]);

  if (!randomCover) return null;

  return (
    <div
      className={`${styles.card} ${artistName ? "" : styles.cardHightPx}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={styles.imageWrapperBox}>
        <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
          <Image
            key={imgKey}
            src={coverUrl || randomCover}
            alt={`${title}${artistName ? ` — ${artistName}` : ""}`}
            className={styles.musicImage}
            height={220}
            width={234} />
        </div>

        {showHoverControls && (
          <div className={styles.heartButton}>
            <div className={styles.btnWhiteBackground} onMouseDown={stop} onClick={stop}>
              <HeartBtn
                liked={isLiked}
                iconColor={isLiked ? "black" : "gray"}
                onToggle={() => setIsLiked((v) => !v)}
              />
            </div>

            <div
              ref={(el) => refs.setReference(el)}
              {...getReferenceProps({
                className: styles.btnWhiteBackground,
                onMouseDown: stop,
                onPointerDown: stop,
                onClick: stop,
                "aria-expanded": isMenuOpen,
                "aria-haspopup": "menu",
              })}
            >
              <ThreeDotsBtn iconColor="black" open={isMenuOpen} />
            </div>
          </div>
        )}

        {isMenuOpen && (
          <FloatingPortal>
            <div
              ref={floatingDivRef}
              {...getFloatingProps({
                style: { ...floatingStyles, zIndex: 9999 },
                className: styles.threeDotsMeniuCoordinates,
                onMouseDown: stop,
                onClick: stop,
              })}
              data-open="true"
            >
              <ThreeDotsList />
            </div>
          </FloatingPortal>
        )}
      </div>

      <div className={styles.textWrapper}>
        {artistName && <p className={styles.textBottom}>{artistName}</p>}
        <p className={styles.textTop}>{title}</p>
      </div>
    </div>
  );
}
