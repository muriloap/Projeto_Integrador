import styles from './styles.module.css'

export default function Contato() {
    return (
        <>
        <h2 className={styles.contato}>CONTATO</h2>
        <span id='contato' className={styles.span}>
            <div className={styles.divFaleConosco}>
                <h2 className={styles.faleConosco}>FALE CONOSCO</h2>
                <p className={styles.p}>Em caso de dúvidas entre em contato conosco clicando no botão abaixo.</p>
            </div>
            <div>
                <h2>CONTATOS</h2>
            </div>
        </span>
        </>
    )
}