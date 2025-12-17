import styles from "./styles.module.css";
import Order from "@/models/order";

type Props = {
    order: Order;
};

export default function TableOsAtraso({ order }: Props) {
    return (
        <tr className={styles.row}>
            <td className={styles.osId}>{order.id}</td>
            <td className={styles.osClient}>{order.client?.name || order.client?.companyName}</td>
            <td className={styles.osStatus}>{order.status}</td>
            <td className={styles.osEntrega}>{order.dateCreate.split("-").reverse().join("/")}</td>
        </tr>
    );
}
