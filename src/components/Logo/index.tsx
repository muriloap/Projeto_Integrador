import styles from './styles.module.css'

export default function Logo() {
    return (
        <img className={styles.img} width="70px" height="auto" src="./images/logo.jpg" alt="Logo Empresa" />
    )
}