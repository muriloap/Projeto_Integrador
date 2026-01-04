'use client'
import PlanoFreeHome from "../PlanoFreeHome";
import PlanoPremiumHome from "../PlanoPremiumHome";
import styles from "./styles.module.css";



export default function AssinaturasLogado() {
  return (
    <>
      <div className={styles.containerp}>
        <h2 className={styles.titulo}>ASSINATURAS</h2>
        <div id="assinatura" className={styles.containers}>
          <PlanoFreeHome
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
            botao="Você ja possui"
            />

          <PlanoPremiumHome
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
            botao="Assinar"
          />
        </div>
      </div>
    </>
  );
}
