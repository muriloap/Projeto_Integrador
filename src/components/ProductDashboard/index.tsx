"use client"
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import InventoryIcon from "@mui/icons-material/Inventory";

type Props = {
  quantityop: number;
};

export default function ProductDashboard(props: Props) {
    const router = useRouter();
    
        function product(){
            router.push("/home/produtos");
        }
    return (
        <>
            <div className={styles.atBtnProduct} onClick={product}>
                <InventoryIcon className={styles.icon} sx={{ fontSize: 35 }} />
                <div className={styles.nameProduct}>
                    <a className={styles.number}>{props.quantityop}</a> 
                    <a className={styles.name}> Produtos </a>
                </div>
            </div>
        </>
    )
}