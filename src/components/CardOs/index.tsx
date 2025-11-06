import Order from "@/models/order";
import styles from "./styles.module.css";

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
                        <a className={styles.campoDados}>{order.id}</a>
                    </div>

                    <div className={styles.dados1}>
                        <a className={styles.campoDados}>Status</a>
                        <a className={styles.campoDados}>{order.status}</a>
                    </div>
                </div>

            </div>
        </>
    );
}
