"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import SongListTable from "@/components/SongListTable/SongListTable";
import AlbumFetch from "@/components/Fetcher/Albums";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import "@/../styles/defaults/defaultGrid.scss";
import styles from "./page.module.scss";

interface Album {
  id: number;
  title: string;
  artistName: string;
  coverUrl: string;
}

export default function AlbumPage() {
  const { activeTab, setActiveTab } = useActiveTab();

  const { activeTab } = useActiveTab();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data } = await axios.get<Album[]>(
          "http://localhost:4000/albums"
        );
        setAlbums(data);
      } catch (err: any) {
        console.error(err);
        setError("Ошибка при загрузке альбомов");
      } finally {
        setLoading(false);
      }
    };

  const albums = useMemo(() => Array.from({ length: 6 }), []);
  const goDetails = useCallback(() => setActiveTab(2), [setActiveTab]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎵 Список альбомов</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {albums.map((album) => (
          <div key={album.id} style={{ width: "150px", textAlign: "center" }}>
            <img
              src={album.coverUrl}
              alt={album.title}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <p style={{ marginTop: "8px", fontWeight: "bold" }}>
              {album.title}
            </p>
            <p style={{ fontSize: "14px", color: "#888" }}>
              {album.artistName}
            </p>
          </div>
        ))}
      </div>
      <AlbumFetch />

      {activeTab === 2 && (
        <>
          <NewsComponent
            plays="Released 07/12/2023"
            title="Seek For Marktoop"
            imageUrl="/Images/NewsComponent/banner.jpg"
          />
          <SongListTable />
        </>
      )}
    </div>
  );
}
