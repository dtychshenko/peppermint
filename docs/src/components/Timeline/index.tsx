import React from "react";
import styles from "./styles.module.css";

export const TimelineItem = ({ children, label }) => (
  <div className={styles.timelineItem}>
    <div className={styles.timelineDot} />
    {label && (
      <small style={{ color: "var(--ifm-color-emphasis-600)" }}>{label}</small>
    )}
    <div className={styles.timelineContent}>{children}</div>
  </div>
);

export const Timeline = ({ children }) => (
  <div className={styles.timelineContainer}>{children}</div>
);
