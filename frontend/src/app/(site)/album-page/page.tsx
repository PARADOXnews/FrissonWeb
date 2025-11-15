"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import "../../../styles/Defaults/defaultGrid.scss";
import "../../../styles/Defaults/default.scss";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import Table from "@/components/Table/Table";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import { getRandomUnique } from "@/utils/getRandomUnique";

const ALBUM_TITLES = [
  "Eclipse of Sound",
  "Neon Dreams",
  "Midnight Echoes",
  "Vivid Skies",
  "Crystal Waves",
  "Silent Horizon",
  "Luminous Paths",
  "Electric Pulse",
  "Aurora Nights",
  "Digital Sunset",
];

const ARTIST_NAMES = [
  "Nova Starr",
  "Liam Vega",
  "Aria Moon",
  "Kai Phoenix",
  "Selene Sky",
  "Orion Blaze",
  "Lyra Vale",
  "Jett Rain",
  "Sora Vibe",
  "Echo Ray",
];

export default function AlbumPage() {
  const { activeTab, setActiveTab } = useActiveTab();

  const generateAlbums = () => {
    const usedCoverNums: number[] = [];
    return Array.from({ length: 8 }).map(() => {
      const title = ALBUM_TITLES[Math.floor(Math.random() * ALBUM_TITLES.length)];
      const artistName = ARTIST_NAMES[Math.floor(Math.random() * ARTIST_NAMES.length)];
      const coverNum = getRandomUnique(31, "albumPage", usedCoverNums);
      usedCoverNums.push(coverNum);
      const coverUrl = `/Images/Albums/${coverNum}.png`;
      return { title, artistName, coverUrl };
    });
  };

  const albums = generateAlbums();

  return (
    <div style={{ padding: "20px" }}>
      {activeTab === 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {albums.map((album, index) => (
            <AlbumCard
              key={index}
              title={album.title}
              artistName={album.artistName}
              coverUrl={album.coverUrl}
              onClick={() => setActiveTab(2)}
            />
          ))}
        </div>
      )}

      {activeTab === 2 && (
        <div className="cflex ocdatormeti">
          <NewsComponent title="Seek For Marktoop" />
          <Table />
        </div>
      )}
    </div>
  );
}
