import styles from './styles.module.css'

export default function Menu() {
    return (
        <nav>
            <div className={styles.div}>
                <a href="http://localhost:3000/">Página inicial</a>
                <a href="#assinatura">Assinaturas</a>
                <a href="">Contato</a>
                <a href="">Sobre nós</a>
                <a href="">Cadastrar/Entrar</a>
            </div>
        </nav>
    )
}