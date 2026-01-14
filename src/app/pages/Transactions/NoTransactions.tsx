import Leafy from "../../shared/leafy.svg?react";
import styles from "./transactions.module.css";

export default function NoTransactions() {
  return (
    <div className={styles.emptyContainer}>
      <Leafy />
      <h2>Nothing to review</h2>
      <p>
        It looks like you haven't uploaded any transactions yet. Please go to the Upload page to add
        your transaction data.
      </p>
    </div>
  );
}
