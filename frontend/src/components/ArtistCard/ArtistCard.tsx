"use client";

import styles from "./ArtistCard.module.scss";
import Image from "next/image";
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
  FloatingPortal,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";

interface ArtistCardProps {
  id: number | string;
  name: string;
  onClick?: () => void;
  hideHoverEfect?: boolean;
}

const usedImages = new Set<number>();

export default function ArtistCard({
  id,
  name,
  onClick,
  hideHoverEfect = false,
}: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imgKey, setImgKey] = useState(0);

  // pick a random album image (1–31) that hasn't been used
  useEffect(() => {
    let available = Array.from({ length: 31 }, (_, i) => i + 1).filter(n => !usedImages.has(n));
    if (available.length === 0) available = Array.from({ length: 31 }, (_, i) => i + 1);
    const pick = available[Math.floor(Math.random() * available.length)];
    usedImages.add(pick);
    setImageUrl(`/Images/Albums/${pick}.png`);
    setImgKey(prev => prev + 1); // force re-render
  }, []);

  const PLAYER_H = 96;
  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    middleware: [
      offset(8),
      flip({ padding: PLAYER_H, fallbackPlacements: ["top-end"], fallbackStrategy: "bestFit" }),
      shift({ padding: PLAYER_H }),
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

  if (!imageUrl) return null;

  return (
    <div
      className={styles.card}
      data-id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
        <Image
          key={imgKey}
          src={imageUrl}
          alt={`${name} Artist`}
          className={styles.artistImage}
          width={234}
          height={226}
        />
      </div>

      {showHoverControls && (
        <div className={styles.heartButton}>
          <div className={styles.btnWhiteBackground} onMouseDown={stop} onClick={stop}>
            <HeartBtn
              iconColor={isLiked ? "black" : "gray"}
              liked={isLiked}
              onToggle={() => setIsLiked(v => !v)}
            />
          </div>

          <div
            ref={el => refs.setReference(el)}
            {...getReferenceProps({
              className: styles.btnWhiteBackground,
              onMouseDown: stop,
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
              style: { ...floatingStyles, zIndex: 99999 },
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

      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{name}</p>
      </div>
    </div>
  );
}
