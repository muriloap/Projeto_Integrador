"use client"
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import GroupIcon from "@mui/icons-material/Group";

type Props = {
  quantityc: number;
};

export default function ClientDashboard(props: Props) {

    const router = useRouter();

    function client(){
        router.push("/home/clientes");
    }
    return (
        <>
            <div className={styles.atBtnClient} onClick={client}>
                <GroupIcon className={styles.icon} sx={{ fontSize: 35 }} />
                <div className={styles.nameClient}>
                    <a className={styles.number}>{props.quantityc}</a> 
                    <a className={styles.name}> Clientes </a>
                </div>
            </div>
        </>
    )
}