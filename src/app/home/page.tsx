'use client'
import styles from "./page.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SellIcon from '@mui/icons-material/Sell';
import HelpIcon from '@mui/icons-material/Help';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Divisao from "../components/Divisao";
import { useState } from "react";
import { tree } from "next/dist/build/templates/app-page";
export default function Home() {

    const [isOpen, setIsOpen] = useState(true);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }



    return (
        <div className={styles.containerp}>

            <div className={`${styles.sidebarWrapper} ${isOpen ? styles.open : styles.close}`}>


                <nav className={`${styles.sidebar} ${isOpen ? '' : styles.close}`}>
                    <header>
                        <div className={`${styles.imagetext} ${isOpen ? '' : styles.close}`}>
                            <span className={styles.image}>
                                <AccountCircleIcon sx={{ fontSize: 50 }} />
                            </span>
                            <div className={styles.textheadertext}>
                                <span className={styles.name}>OS Control</span>

                            </div>
                        </div>

                    </header>
                    <div className={styles.menubar}>
                        <div className={styles.menu}>
                            <ul className={styles.menulinks}>
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <HomeIcon className={styles.icon} />
                                        <span className={styles.navtext}>Página Inicial</span>
                                    </a>
                                </li>
                                <Divisao title="Cadastros" variant="default" className={styles.divbar} />
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <AssignmentIcon className={styles.icon} />
                                        <span className={styles.navtext}>Ordem de Serviço</span>
                                    </a>
                                </li>
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <GroupIcon className={styles.icon} />
                                        <span className={styles.navtext}>Clientes</span>
                                    </a>
                                </li>
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <BuildIcon className={styles.icon} />
                                        <span className={styles.navtext}>Serviços</span>
                                    </a>
                                </li>
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <InventoryIcon className={styles.icon} />
                                        <span className={styles.navtext}>Produtos</span>
                                    </a>
                                </li>
                                <Divisao className={styles.divbar} variant="full" />
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <SettingsIcon className={styles.icon} />
                                        <span className={styles.navtext}>Configurações</span>
                                    </a>
                                </li>
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <HelpIcon className={styles.icon} />
                                        <span className={styles.navtext}>Suporte</span>
                                    </a>
                                </li>
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <SellIcon className={styles.icon} />
                                        <span className={styles.navtext}>Assinaturas</span>
                                    </a>
                                </li>
                                <li className={styles.navlink}>
                                    <a href="#">
                                        <AssessmentIcon className={styles.icon} />
                                        <span className={styles.navtext}>Relatório</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.bottomcontent}>
                            <li>
                                <a href="#">
                                    <LogoutIcon className={styles.iconSair} />
                                    <span className={styles.navtext}>Sair</span>
                                </a>
                            </li>

                        </div>
                    </div>
                </nav>

                <div className={styles.toggleFixed} onClick={toggleSidebar}>
                    <ChevronRightIcon
                        className={`${styles.toggleIcon} ${isOpen ? styles.rotated : ''}`}
                        sx={{ fontSize: 25, cursor: 'pointer' }}
                    />
                </div>

            </div>
        </div>
    )
}