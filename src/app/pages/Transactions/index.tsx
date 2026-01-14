"use client";

import NoTransactions from "./NoTransactions";
import styles from "./transactions.module.css";

export default function Transactions() {
  return (
    <div className={styles.mainContainer}>
      <NoTransactions />
    </div>
  );
}
