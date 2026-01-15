"use client";

import ZeroState from "./ZeroState";
import styles from "./transactions.module.css";

export default function Transactions() {
  return (
    <div className={styles.mainContainer}>
      <ZeroState />
    </div>
  );
}
