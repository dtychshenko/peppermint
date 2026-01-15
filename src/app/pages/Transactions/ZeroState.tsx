import Leafy from "../../shared/leafy.svg?react";
import styles from "./transactions.module.css";

export default function ZeroState() {
  return (
    <div className={styles.emptyContainer}>
      <Leafy />
      <h2>Nothing to review</h2>
      <p>
        There are no transactions in your account yet. Let's get you started by importing some data!
      </p>
    </div>
  );
}
