import { Typography, List, ListItem } from "@mui/material";
import styles from './styles.module.css';
import Link from "next/link";
import { useState } from "react";
import Divisao from "../Divisao";
import axios from "axios";

type Props = {
  plano: string;
  descricao: string[];
  valor: number;
  botao?: string;
};

export default function PlanoPremiumHome(props: Props) {

 

  async function assinar() {

    try {
      const res = await axios.post(
        "http://localhost:3000/signatures/checkout",
      );

      window.location.href = res.data.url;

    } catch (err) {
      console.error(err);
      alert("Erro ao iniciar pagamento");
    }

  }

  return (
    <>
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

        <div className={styles.botao} onClick={assinar}>
          {props.botao}
        </div>
      </div>

    </>
  );
}