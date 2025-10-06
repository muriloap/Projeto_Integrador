import Typography from "@mui/material/Typography";
import Plano from "../Plano";
import styles from "./styles.module.css";

type Props = {
  variant?: "landpage" | "logado";
};

export default function Assinaturas(props: Props) {
  const cls = `${styles.btn} ${
    props.variant === "landpage" ? styles["landpage"] : styles["logado"]
  }`;
  return (
    <>
      <div className={styles.containerp}>
        <h2 className={styles.titulo}>ASSINATURAS</h2>
        <div id="assinatura" className={styles.teste}>
          <Plano
            plano="Free"
            valor={0}
            descricao={[
              "✔ Criação de ordem de serviço(Limitado);",
              "✔ Gerenciamento de Produtos;",
              "✔ Gerenciamento de Clientes;",
              "✔ Gerenciamento de Serviços;",
              "✖ Suporte mensal;",
              "✖ Relatório mensais;",
              "✖ Alertas.",
            ]}
          />

          <Plano
            plano="Premium"
            valor={49}
            descricao={[
              "✔ Criação de ordem de serviço(Ilimitado);",
              "✔ Gerenciamento de Produtos;",
              "✔ Gerenciamento de Clientes;",
              "✔ Gerenciamento de Serviços;",
              "✔ Suporte mensal;",
              "✔ Relatório mensais;",
              "✔ Alertas.",
            ]}
          />
        </div>
      </div>
    </>
  );
}
