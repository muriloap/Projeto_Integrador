import Link from "next/link";
import styles from "./styles.module.css";

export default function Menu() {
  return (
    <nav>
      <div className={styles.div}>
        <Link className={styles.link} href="/">Página inicial</Link>
        <Link className={styles.link} href="#sobrenos">Sobre nós</Link>
        <Link className={styles.link} href="#assinatura">Assinaturas</Link>
        <Link className={styles.link} href="#contato">Contato</Link>
        <Link className={styles.button} href="/login">Cadastrar/Entrar</Link>
      </div>
    </nav>
  );
}
