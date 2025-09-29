import styles from "./styles.module.css";

export default function Contato() {
  return (
    <footer id="contato" className={styles.root}>
        <h2 className={styles.h2contato}>CONTATO</h2>
        <span className={styles.tabela}>
          <div className={styles.tabelaFaleConosco}>
            <h2 className={styles.faleConosco}>FALE CONOSCO</h2>
            <p className={styles.p}>
              Em caso de dúvidas, entre em contato conosco clicando no botão
              abaixo.
            </p>
            <button className={styles.button}>Entre em contato</button>
          </div>
          <div className={styles.tabelaContatos}>
            <h2>CONTATOS</h2>
            <p>Whatsapp: (16) 99999-8888</p>
            <p>E-mail: lumma123@gmail.com</p>
          </div>
        </span>
    </footer>
  );
}
