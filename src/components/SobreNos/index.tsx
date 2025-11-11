import styles from "./styles.module.css";

export default function SobreNos() {
  return (
    <>
      <div className={styles.titulo}>
        <h2 id="sobrenos">SOBRE NÓS</h2>
      </div>

      <div className={styles.containerp}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>❕</div>
          <h3>INTRODUÇÃO</h3>
          <p>
            {" "}
            Na OS CONTROL, empresas e prestadores de serviços poderão usufruir
            do nosso sistema para um gerenciamento aprimorado do seu NEGÓCIO.
            Gerenciamento de produtos, clientes, serviços e Ordens de Serviço em
            um único sistema.
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🎯</div>
          <h3>OBJETIVO</h3>
          <p>
            {" "}
            Nosso objetivo é simplificar a rotina empresarial, oferecendo uma
            plataforma intuitiva, segura e eficiente. Com a OS CONTROL, você tem
            controle total sobre suas operações, reduz erros manuais e otimiza o
            tempo de execução das suas atividades.{" "}
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>✅</div>
          <h3>PRÁTICO</h3>
          <p>
            {" "}
            Desenvolvida pensando na praticidade e na organização, nossa solução
            permite acompanhar cada etapa do processo — desde o cadastro de
            clientes até a finalização de uma ordem de serviço — tudo de forma
            integrada e acessível de qualquer lugar.
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>💭</div>
          <h3>PENSAMOS EM VOCÊ</h3>
          <p>
            {" "}
            Acreditamos que tecnologia e gestão andam lado a lado. Por isso, a
            OS CONTROL foi criada para ajudar sua empresa a crescer com mais
            controle, produtividade e profissionalismo.
          </p>
        </div>
      </div>
    </>
  );
}
