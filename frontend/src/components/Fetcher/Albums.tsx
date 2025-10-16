"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Authors.module.scss";
import "@/../styles/Defaults/defaultGrid.scss";

interface Album {
  id?: number;
  name?: string;
  avatarFileName?: string;
  coverUrl: string;
  cover?: string;
  title?: string;
  releaseDate?: string;
  author?: {
    id: number;
    name: string;
  };
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get<Album[]>(`https://frisson-music-app.s3.eu-north-1.amazonaws.com/albums`)
      .then((response) => {
        console.log("📦 Received from backend:", response.data);
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error loading albums:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>🎵 Albums</h1>
      <div className={`${styles.grid} Grid`}>
        {albums.map((a) => (
          <div
            key={a.id}
            style={{
              backgroundColor: "#1e1e1e",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            {a.name && (
              <img
                src={a.coverUrl}
                alt={a.title || "cover"}
                width="200"
                style={{ borderRadius: "10px", marginBottom: "10px" }}
              />
            )}
            <h3>{a.name}</h3>
            <p>{a.avatarFileName}</p>
            {a.author?.name && (
              <p style={{ color: "#aaa" }}>by {a.author.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
