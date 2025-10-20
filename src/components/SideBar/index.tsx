"use client";
import styles from "./styles.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SellIcon from "@mui/icons-material/Sell";
import HelpIcon from "@mui/icons-material/Help";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { useState } from "react";
import { tree } from "next/dist/build/templates/app-page";
import Divisao from "../Divisao";
import Link from "next/link";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Props = {
  onClick(): void;
};


export default function Sidebar(props: Props) {
    const auth = useAuth();
    const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  function Logout() {
    auth.logout();
    router.push('/login');
  }

  return (
    <>
      <div className={styles.containerp}>
        <div
          className={`${styles.sidebarWrapper} ${
            isOpen ? styles.open : styles.close
          }`}
        >
          <nav className={`${styles.sidebar} ${isOpen ? "" : styles.close}`}>
            <header>
              <div className={styles.cont}>
                <div
                  className={`${styles.imagetext} ${
                    isOpen ? "" : styles.close
                  }`}
                >
                  <div className={styles.textheadertext}>
                    <span className={styles.name}>OS Control</span>
                  </div>
                </div>

                <div
                  className={`${styles.textuser} ${isOpen ? "" : styles.close}`}
                >
                  <span className={styles.image}>
                    <AccountCircleIcon sx={{ fontSize: 50 }} />
                  </span>
                  <div className={styles.textheadertext}>
                    <span className={styles.name}>Olá {auth.user?.name}</span>
                  </div>
                </div>
              </div>
            </header>
            <div className={styles.menubar}>
              <div className={styles.menu}>
                <ul className={styles.menulinks}>
                  <li className={styles.navlink}>
                    <Link href="/home">
                      <HomeIcon className={styles.icon} />
                      <span className={styles.navtext}>Página Inicial</span>
                    </Link>
                  </li>
                  <Divisao
                    title="Cadastros"
                    variant="default"
                    className={styles.divbar}
                  />
                  <li className={styles.navlink}>
                    <Link href="/home/ordem-servico">
                      <AssignmentIcon className={styles.icon} />
                      <span className={styles.navtext}>Ordem de Serviço</span>
                    </Link>
                  </li>
                  <li className={styles.navlink}>
                    <Link href="/home/clientes">
                      <GroupIcon className={styles.icon} />
                      <span className={styles.navtext}>Clientes</span>
                    </Link>
                  </li>
                  <li className={styles.navlink}>
                    <Link href="/home/servicos">
                      <BuildIcon className={styles.icon} />
                      <span className={styles.navtext}>Serviços</span>
                    </Link>
                  </li>
                  <li className={styles.navlink}>
                    <Link href="/home/produtos">
                      <InventoryIcon className={styles.icon} />
                      <span className={styles.navtext}>Produtos</span>
                    </Link>
                  </li>
                  <Divisao className={styles.divbar} variant="full" />
                  <li className={styles.navlink}>
                    <Link href="/home/configuracoes">
                      <SettingsIcon className={styles.icon} />
                      <span className={styles.navtext}>Configurações</span>
                    </Link>
                  </li>
                  <li className={styles.navlink}>
                    <Link href="/home/suporte">
                      <HelpIcon className={styles.icon} />
                      <span className={styles.navtext}>Suporte</span>
                    </Link>
                  </li>
                  <li className={styles.navlink}>
                    <Link href="/home/assinaturas">
                      <SellIcon className={styles.icon} />
                      <span className={styles.navtext}>Assinaturas</span>
                    </Link>
                  </li>
                  <li className={styles.navlink}>
                    <Link href="/home/relatorios">
                      <AssessmentIcon className={styles.icon} />
                      <span className={styles.navtext}>Relatórios</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.logout}>
                <li>
                  <a onClick={Logout}>
                    <LogoutIcon className={styles.iconSair} />
                    <span className={styles.navtext}>Sair</span>
                  </a>
                </li>
              </div>
            </div>
          </nav>
          <div onClick={props.onClick}>
            <div className={styles.toggleFixed} onClick={toggleSidebar}>
              <ChevronRightIcon
                className={`${styles.toggleIcon} ${
                  isOpen ? styles.rotated : ""
                }`}
                sx={{ fontSize: 25, cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
