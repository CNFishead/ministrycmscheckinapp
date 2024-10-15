"use client";
import CheckIn from "@/views/checkin/CheckIn.view";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <CheckIn />
    </div>
  );
}
