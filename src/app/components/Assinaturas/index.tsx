import styles from './styles.module.css'

export default function Assinaturas() {
    return (
        <>
        <body>
            <section id="assinatura">
            <h1 className={styles.h1}>ASSINATURAS</h1>
            <span className={styles.corpo}>
            <div className={styles.tabelaFree}>
            <h2 className={styles.free}>FREE</h2>
            <ul className={styles.listaFree}>
                <li>primeiro</li>
                <li>segundo</li>
                <li>terceiro</li>
                <li>quarto</li>
            </ul>
            </div>
            <div className={styles.tabelaPremium}>
            <h2 className={styles.premium}>PREMIUM</h2> 
            <ul className={styles.listaPremium}>
                <li>primeiro</li>
                <li>segundo</li>
                <li>terceiro</li>
                <li>quarto</li>
            </ul>
            </div>
            </span>
            </section>
        </body>
        </>
    )
}