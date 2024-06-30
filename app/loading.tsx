import React from "react";
import styles from '../public/styles/loading.module.css';

export default function Loading() {
  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
      </div>
    </main>
  );
}