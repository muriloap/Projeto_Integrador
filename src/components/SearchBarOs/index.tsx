import React from "react";
import styles from './styles.module.css'
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  onSearch: (valor: string) => void;
}

export default function SearchBarOs({onSearch}: Props) {

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>
          <SearchIcon sx={{fontSize: 25}}/>
        </span>
        <input
          type="text"
          placeholder="Digite o Número da Ordem de Serviço que dejesa Buscar"
          className={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
