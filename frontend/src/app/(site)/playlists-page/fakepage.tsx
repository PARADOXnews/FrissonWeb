import { useState } from "react";
import styles from "./page.module.scss";
import defaults from "../page.module.scss";

export default function FakePlayListPage() {
  const [number, setNumber] = useState("");
  const [activeTab, setActiveTab] = useState(1); // 1 = show <p>, 2 = hidden

  return (
    <>
      <div className={styles.nigo}>
        <input
          type="text"
          className={`${styles.div} ${defaults.anzori}`}
          value={number}
          onChange={(e: any) => setNumber(e.target.value)}
          onFocus={() => setActiveTab(1)} // restore <p> on typing
        />

        {activeTab === 1 &&
          Array.from({ length: 3 }).map((_, index) => (
            <p
              key={index}
              className={styles.paragrapi}
              onClick={() => setActiveTab(2)} // hide <p> on click
            >
              {number}
            </p>
          ))}
      </div>
    </>
  );
}
