import styles from './styles.module.css'

export default function Logo() {
    return (<>
        <img className={styles.img} width="150px" height="auto" src="./images/oslogo.png" alt="Logo Empresa" />
    </>
    )
}