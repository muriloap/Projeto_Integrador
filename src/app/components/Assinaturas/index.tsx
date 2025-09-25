import Typography from "@mui/material/Typography";
import Plano from "../Plano";
import styles from './styles.module.css';

export default function Assinaturas() {
  return (
    <>
      <h2 className={styles.h2} >ASSINATURAS</h2>

      <div id="assinatura" className={styles.container}>
        <Plano
          plano="Free"
          valor={0}
          descricao={["✔ Criação de ordem de serviço(Limitado).", "✔ Gerenciamento de Produtos.", "✔ Gerenciamento de Clientes.", "✔ Gerenciamento de Serviços.", "✖ Suporte mensal", "✖ Relatório mensais", "✖ Alertas",]}
        />

        <Plano
          plano="Premium"
          valor={49}
          descricao={["✔ Criação de ordem de serviço(Ilimitado);", "✔ Gerenciamento de Produtos;", "✔ Gerenciamento de Clientes.", "✔ Gerenciamento de Serviços.", "✔ Suporte mensal", "✔ Relatório mensais", "✔ Alertas"]}
        />
      </div>
    </>
  );
}
