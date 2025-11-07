import Order from "@/models/order";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import EditIcon from "@mui/icons-material/Edit";
import { PictureAsPdf } from "@mui/icons-material";
import ActionOs from "../ActionOs";

type Props = {
    order: Order;
};

export default function CardOs({ order }: Props) {
    return (
        <>
            <div className={styles.containerp}>

                <div className={styles.card}>
                    <div className={styles.dados1}>
                        <a className={styles.campoDados}>{order.client?.name || order.client?.companyName}</a>
                        <a className={styles.campoDados}>{order.dateRecipt}</a>
                    </div>

                    <div className={styles.dados1}>
                        <a className={styles.campoDados}># {order.id}</a>
                        <a className={styles.campoDados}>R$: {order.total}</a>
                    </div>
                    <div className={styles.dados1}>
                        <a className={styles.campoDados}>Status</a>
                        <a className={styles.campoDados}>{order.status}</a>
                    </div>
                    <Divisao />
                    {/* <ActionOs order={order} /> */}
                </div>

            </div>
        </>
    );
}
