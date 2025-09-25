import Link from 'next/link'
import styles from './styles.module.css'

export default function Menu() {
    return (
        <nav>
            <div className={styles.div}>
                <a className={styles.link} href="http://localhost:3000/">Página inicial</a>
                <a className={styles.link} href="">Sobre nós</a>
                <a className={styles.link} href="#assinatura">Assinaturas</a>
                <a className={styles.link} href="">Contato</a>
                <Link className={styles.button} href='/login'>Cadastrar/Entrar</Link>
            </div>
        </nav>
    )
}