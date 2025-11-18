"use client"
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import AssignmentIcon from "@mui/icons-material/Assignment";

type Props = {
  quantityos: number;
};

export default function OsDashboard(props: Props) {
    const router = useRouter();
    
        function os(){
            router.push("/home/ordem-servico");
        }
    return (
        <>
            <div className={styles.atBtnOs} onClick={os}>
                <AssignmentIcon className={styles.icon} sx={{ fontSize: 35 }} />
                <div className={styles.nameOs}>
                    <a className={styles.number}>{props.quantityos}</a> 
                    <a className={styles.name}> Ordens de Serviços </a>
                </div>
            </div>
        </>
    )
}