"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import "../../../styles/Defaults/defaultGrid.scss";
import "../../../styles/Defaults/default.scss";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
// import styles from "./page.module.scss"
import Table from "@/components/Table/Table";
import AlbumCard from "@/components/AlbumCard/AlbumCard";

export default function AlbumPage() {
  const { activeTab, setActiveTab } = useActiveTab();

  const songs = [
    { id: 1, name: "ed sheeran", coverUrl: "/Images/Albums/1.png" },
    { id: 2, name: "bellie Eilish", coverUrl: "/Images/Albums/2.png" },
    { id: 3, name: "drake", coverUrl: "/Images/Albums/3.png" },
    { id: 4, name: "Biggie", coverUrl: "/Images/Albums/4.png" },
    { id: 5, name: "tupac", coverUrl: "/Images/Albums/5.png" },
    { id: 6, name: "selena gomez", coverUrl: "/Images/Albums/6.png" },
  ];

  return (
    <>
      <div className={`Grid`}>
        {activeTab === 1 &&
          songs.map((song, i) => (
            <AlbumCard
              key={song.id}
              title={song.name}
              coverUrl={song.coverUrl}
              onClick={() => setActiveTab(2)}
            />
          ))}
      </div>

      {activeTab === 2 && (
        <div className="cflex ocdatormeti">
          <NewsComponent
            plays="Released 07/12/2023"
            title="Seek For Marktoop"
            imageUrl="/Images/NewsComponent/banner.jpg"
          />
          <Table />
        </div>
      )}
    </>
  );
}
