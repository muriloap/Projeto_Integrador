import styles from "./page.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
export default function Home() {







    return (
        <div className={styles.containerp}>
            <nav className={styles.sidebar}>
                <header>
                    <div className={styles.imagetext}>
                        <span className={styles.image}>
                            <AccountCircleIcon sx={{ fontSize: 50}} />                </span>
                        <div className={styles.textheadertext}>
                            <span className={styles.name}>OS Control</span>

                        </div>
                    </div>
                    <ChevronRightIcon className={styles.toggle} sx={{fontSize: 30}}/>
                </header>
                <div className={styles.menubar}>
                    <div className={styles.menu}>
                        <ul className={styles.menulinks}>
                            <li className={styles.navlink}>
                                <a href="#">
                                    <HomeIcon className={styles.icon}></HomeIcon>
                                    <span className={styles.navtext}>Página Inicial</span>
                                </a>
                            </li>
                            <li className={styles.navlink}>
                                <a href="#">
                                    <HomeIcon className={styles.icon}></HomeIcon>
                                    <span className={styles.navtext}>Página Inicial</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    )
}