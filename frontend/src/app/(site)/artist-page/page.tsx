"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useEffect, useState } from "react";
// import { Colors } from "../../../../styles/colors.enum";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";
// import AlbumCard from "@/components/AlbumCard/AlbumCard";
import { usePathname } from "next/navigation";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import axios from "axios";

export default function ArtistPage() {
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useActiveTab();

  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  type Artist = {
    id: number | string;
    artistUrl: string;
    name: string;
  };

  const [res, setRes] = useState<Artist[]>([]);


  const songs = [
    { id: 1, name: "ed sheeran", coverUrl: "/Images/Albums/7.png" },
    { id: 2, name: "bellie Eilish", coverUrl: "/Images/Albums/8.png" },
    { id: 3, name: "drake", coverUrl: "/Images/Albums/9.png" },
    { id: 4, name: "Biggie", coverUrl: "/Images/Albums/10.png" },
    { id: 5, name: "tupac", coverUrl: "/Images/Albums/11.png" },
    { id: 6, name: "selena gomez", coverUrl: "/Images/Albums/12.png" },
  ];



  return (
    <main className={styles.main}>
      {activeTab === 1 && (
        <div className={styles.artistPage}>
          <h4>trending now</h4>
          <div className={styles.artistCard}>
            {songs.map((song, i) => (
              <ArtistCard
                key={song.id}
                name={song.name}
                artistUrl={song.coverUrl}
                onClick={() => setActiveTab(2)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <>
          <NewsComponent
            title="peggy gou"
            button="follow"
            imageUrl="/Images/NewsComponent/peggyGou.jpg"
            verified
            plays={`745,090 fans`}
          />
          <Table />
        </>
      )}
    </main>
  );
}
