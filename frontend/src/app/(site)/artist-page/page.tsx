"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";
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

  // NEW FETCH ONLY – using authors.tsx logic
  useEffect(() => {
    axios
      .get("http://localhost:4000/author")
      .then((response) => {
        if (response.data?.data) {
          setRes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
      });
  }, []);

  return (
    <main className={styles.main}>
      {activeTab === 1 && (
        <div className={styles.artistPage}>
          <h4>trending now</h4>
          <div className={styles.artistCard}>
            {res.length > 0 &&
              res.map((item, i) => (
                <ArtistCard
                  key={i}
                  id={item.id}
                  artistUrl={item.artistUrl}
                  name={item.name}
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
