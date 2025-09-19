import Logo from "../Logo";
import Menu from "../Menu";
import styles from './styles.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <Logo/>
            <h1 className={styles.h1}>Nome da empresa</h1>
            <Menu />

        </header>
    )
}