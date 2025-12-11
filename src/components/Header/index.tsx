import Logo from "../Logo";
import Menu from "../Menu";
import styles from './styles.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.imagem}>
                <Logo />
                <h1 className={styles.h1}>OS CONTROL</h1>
            </div>
            <Menu />

        </header>
    )
}