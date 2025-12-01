// Artists.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Author {
  id: number;
  name: string;
  artistUrl: string;
  bio?: string;
}

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Author[]>([]);

  useEffect(() => {
    axios
      .get<Author[]>("http://localhost:4000/authors")
      .then((response) => {
        console.log("🎨 Received from backend:", response.data);
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error loading authors:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>🎨 Artists</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {artists.map((artist) => (
          <div
            key={artist.id}
            style={{
              backgroundColor: "#1e1e1e",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            {artist.artistUrl && (
              <Image
                src={artist.artistUrl}
                alt={artist.name}
                width={200}
                height={200}
                style={{ borderRadius: "10px", marginBottom: "10px" }}
              />
            )}
            <h3>{artist.name}</h3>
            {artist.bio && <p style={{ color: "#aaa" }}>{artist.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
