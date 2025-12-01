// Authors.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "@/components/ArtistCard/ArtistCard"; // adjust path if needed
import "../../styles/Defaults/defaultGrid.scss"; // optional grid styling

interface Author {
  id: number;
  name: string;
  artistUrl: string;
  bio?: string;
}

interface AuthorsProps {
  onClick?: () => void;
}

const Authors: React.FC<AuthorsProps> = ({ onClick }) => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    axios
      .get<Author[]>("http://localhost:4000/authors")
      .then((res) => setAuthors(res.data))
      .catch((err) => console.error("Error loading authors:", err));
  }, []);

  return (
    <div className="Grid">
      {authors.map((author) => (
        <ArtistCard
          key={author.id}
          id={author.id}
          name={author.name}
          artistUrl={author.artistUrl}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default Authors;
