"use client"
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Build } from "@mui/icons-material";

type Props = {
  quantitys: number;
};

export default function ServiceDashboard(props: Props) {
    const router = useRouter();
    
        function service(){
            router.push("/home/servicos");
        }
    return (
        <>
            <div className={styles.atBtnService} onClick={service}>
                <Build className={styles.icon} sx={{ fontSize: 35 }} />
                <div className={styles.nameService}>
                    <a className={styles.number}>{props.quantitys}</a> 
                    <a className={styles.name}> Serviços</a>
                </div>
            </div>
        </>
    )
}