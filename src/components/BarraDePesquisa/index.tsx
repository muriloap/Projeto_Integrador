import React from "react";
import styles from './styles.module.css'

export default function BarraDePesquisa() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Digite o que deseja buscar"
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
