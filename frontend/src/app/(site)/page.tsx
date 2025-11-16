"use client";
import styles from "./page.module.scss";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import MusicCard from "@/components/MusicCard/MusicCard";
import TopCharts from "@/components/TopCharts/TopCharts";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Link from "next/link";
import "@/styles/Defaults/defaultGrid.scss";

const songs = [
  { id: 1, name: "ed sheeran", song: "Photograph", coverUrl: "/Images/Albums/1.png" },
  { id: 2, name: "billie eilish", song: "Lovely", coverUrl: "/Images/Albums/2.png" },
  { id: 3, name: "drake", song: "God's Plan", coverUrl: "/Images/Albums/3.png" },
  { id: 4, name: "biggie", song: "Juicy", coverUrl: "/Images/Albums/4.png" },
  { id: 5, name: "tupac", song: "Changes", coverUrl: "/Images/Albums/5.png" },
  { id: 6, name: "selena gomez", song: "Lose You to Love Me", coverUrl: "/Images/Albums/6.png" },
  { id: 7, name: "weeknd", song: "Starboy", coverUrl: "/Images/Albums/7.png" },
  { id: 8, name: "dua lipa", song: "Levitating", coverUrl: "/Images/Albums/8.png" },
  { id: 9, name: "eminem", song: "Lose Yourself", coverUrl: "/Images/Albums/9.png" },
  { id: 10, name: "kendrick", song: "HUMBLE.", coverUrl: "/Images/Albums/10.png" },
  { id: 11, name: "frank ocean", song: "Nights", coverUrl: "/Images/Albums/11.png" },
  { id: 12, name: "lana del rey", song: "Summertime Sadness", coverUrl: "/Images/Albums/12.png" },
  { id: 13, name: "travis scott", song: "Goosebumps", coverUrl: "/Images/Albums/13.png" },
  { id: 14, name: "post malone", song: "Circles", coverUrl: "/Images/Albums/14.png" },
  { id: 15, name: "olivia rodrigo", song: "Vampire", coverUrl: "/Images/Albums/15.png" },
  { id: 16, name: "sza", song: "Kill Bill", coverUrl: "/Images/Albums/16.png" },
  { id: 17, name: "rihanna", song: "Diamonds", coverUrl: "/Images/Albums/17.png" },
  { id: 18, name: "ariana grande", song: "7 Rings", coverUrl: "/Images/Albums/18.png" },
  { id: 19, name: "future", song: "Mask Off", coverUrl: "/Images/Albums/19.png" },
  { id: 20, name: "metro boomin", song: "Creepin'", coverUrl: "/Images/Albums/20.png" },
  { id: 21, name: "ice spice", song: "Munch", coverUrl: "/Images/Albums/21.png" },
  { id: 22, name: "juice wrld", song: "Lucid Dreams", coverUrl: "/Images/Albums/22.png" },
  { id: 23, name: "doja cat", song: "Woman", coverUrl: "/Images/Albums/23.png" },
  { id: 24, name: "wiz khalifa", song: "See You Again", coverUrl: "/Images/Albums/24.png" },
  { id: 25, name: "nicki minaj", song: "Super Bass", coverUrl: "/Images/Albums/25.png" },
  { id: 26, name: "tyler the creator", song: "See You Again", coverUrl: "/Images/Albums/26.png" },
  { id: 27, name: "21 savage", song: "a lot", coverUrl: "/Images/Albums/27.png" },
  { id: 28, name: "michael jackson", song: "Billie Jean", coverUrl: "/Images/Albums/28.png" },
  { id: 29, name: "rihanna", song: "Work", coverUrl: "/Images/Albums/29.png" },
  { id: 30, name: "taylor swift", song: "Anti-Hero", coverUrl: "/Images/Albums/30.png" },
  { id: 31, name: "coldplay", song: "Adventure of a Lifetime", coverUrl: "/Images/Albums/31.png" },
];





export default function Home() {
  return (
    <main className={styles.main}>
      <NewsComponent
        title="Top Hit Of The Week"
        imageUrl="/Images/NewsComponent/NewComponentTest.jpg"
        plays={`22222 Plays`}
      />

      <section className={styles.topHitsSection}>
        <div className={styles.topHitsSectionTextBox}>
          <h2>Top Hits</h2>

          <Link href={"/top-hits-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={`scrollbar`}>
          {" "}
          {/*styles.topHitsSectionCardsBox*/}
          {songs.slice(0, 8).map((song, i) => (
            <MusicCard
              key={i}
              title={song.name}
              artist="Genesys II"
              imageUrl={song.coverUrl}
            />
          ))}
        </div>
      </section>

      <section className={styles.topChartsSection}>
        <div className={styles.topChartsSectionTextBox}>
          <h2>Top Charts</h2>
          <Link href={"/top-charts-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={` scrollbar`}>
          {[...Array(6)].map((_, i) => {
            const first = songs[i * 2 % songs.length];
            const second = songs[i * 2 + 1 % songs.length];
            return (
              <div className={styles.topCharts} key={i}>
                <TopCharts
                  title={first.song}
                  artist={first.name}
                  imageUrl={first.coverUrl}
                  duration={345}
                />
                <TopCharts
                  title={second.song}
                  artist={second.name}
                  imageUrl={second.coverUrl}
                  duration={345}
                />
              </div>
            );
          })}


        </div>
      </section>

      <section className={styles.albumSection}>
        <div className={styles.albumSectionTextBox}>
          <h2>Popular Albums</h2>
          <Link href={"/album-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={`scrollbar`}>
          {songs.slice(17,25).map((song, i) => (
            <AlbumCard
              key={i}
              title={song.song}
              artist={song.name}
              coverUrl={song.coverUrl}
            />
          ))}
        </div>
      </section>

      <section className={styles.artistSection}>
        <div className={styles.artistSectionTextBox}>
          <h2>Popular Artists</h2>
          <Link href={"/artist-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={`scrollbar`}>
          {songs.slice(5,13).map((song, i) => (
            <ArtistCard
              key={i}
              id={i}
              name={song.name}
              artistUrl={song.coverUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
