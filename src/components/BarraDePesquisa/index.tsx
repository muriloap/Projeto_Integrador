import React from "react";
import styles from './styles.module.css'
import SearchIcon from '@mui/icons-material/Search';

export default function BarraDePesquisa() {

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>
          <SearchIcon sx={{fontSize: 25}}/>
        </span>
        <input
          type="text"
          placeholder="Digite o Número da Ordem de Serviço que deseja Buscar"
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
