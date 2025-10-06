import styles from './styles.module.css'

export default function Menu() {
    return (
        <nav>
            <div className={styles.div}>
                <link className={styles.link} href="/">Página inicial</link>
                <link className={styles.link} href="#sobrenos">Sobre nós</link>
                <link className={styles.link} href="#assinatura">Assinaturas</link>
                <link className={styles.link} href="#contato">Contato</link>
                <link className={styles.button} href="/login">Cadastrar/Entrar</link>
            </div>
        </nav>
    )
}