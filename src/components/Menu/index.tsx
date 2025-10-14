import Link from "next/link";
import styles from "./styles.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Menu() {
  return (
    <nav>
      <div className={styles.containerp}>
        <Link className={styles.link} href="/">Página inicial</Link>
        <Link className={styles.link} href="#sobrenos">Sobre nós</Link>
        <Link className={styles.link} href="#assinatura">Assinaturas</Link>
        <Link className={styles.link} href="#contato">Contato</Link>
        
        <div className={styles.containers}>
          <Link className={styles.button} href="/login">
            <AccountCircleIcon className={styles.icon} sx={{ fontSize: 65, color: 'white' }} />
            <span className={styles.span}>Login</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
