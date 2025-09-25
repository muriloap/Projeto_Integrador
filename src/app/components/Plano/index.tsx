import { Typography, List, ListItem } from "@mui/material";
import styles from './styles.module.css';

type Props = {
  plano: string;
  descricao: string[];
  valor: number;
};

export default function Plano({ plano, descricao, valor }: Props) {
  return (
    <div className={styles.card}>
      <Typography className={styles.tituloPlano}>
        {plano.toUpperCase()}
      </Typography>

      <Typography className={styles.valor}>
        R$ {valor},00 / mês
      </Typography>

      <List className={styles.lista}>
        {descricao.map((item, i) => (
          <ListItem key={i} className={styles.listaItem}>
            {item}
          </ListItem>
        ))}
      </List>

      <button className={styles.botao}>Assinar</button>
    </div>
  );
}