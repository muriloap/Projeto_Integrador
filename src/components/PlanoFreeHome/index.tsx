import { Typography, List, ListItem } from "@mui/material";
import styles from './styles.module.css';
import Link from "next/link";

type Props = {
  plano: string;
  descricao: string[];
  valor: number;
  botao?: string;
};

export default function PlanoFreeHome(props: Props) {
  return (
    <div className={styles.card}>
      <Typography className={styles.tituloPlano}>
        {props.plano.toUpperCase()}
      </Typography>

      <Typography className={styles.valor}>
        R$ {props.valor},00 / mês
      </Typography>

      <List className={styles.lista}>
        {props.descricao.map((item, i) => (
          <ListItem key={i} className={styles.listaItem}>
            {item}
          </ListItem>
        ))}
      </List>

      <Link href="" className={styles.botao1}>
        {props.botao}
      </Link>
    </div>
  );
}