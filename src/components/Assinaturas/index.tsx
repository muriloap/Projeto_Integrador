import PlanoPaginaPrincipal from "../PlanoPaginaPrincipal";
import styles from "./styles.module.css";

export default function Assinaturas() {
  return (
    <>
      <div className={styles.containerp}>
        <h2 className={styles.titulo}>ASSINATURAS</h2>
        <div id="assinatura" className={styles.containers}>
          <PlanoPaginaPrincipal
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

          <PlanoPaginaPrincipal
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
