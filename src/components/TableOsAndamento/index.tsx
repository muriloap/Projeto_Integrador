import styles from "./styles.module.css";
import Order from "@/models/order";

type Props = {
    order: Order;
};

export default function TableOsAndameto({ order }: Props) {
    return (
        <tr className={styles.row}>
            <td>{order.id}</td>
            <td>{order.client?.name || order.client?.companyName}</td>
            <td>{order.status}</td>
            <td>{new Date(order.dateDelivery).toLocaleDateString("pt-BR")}</td>
            <td>
                
            </td>
        </tr>
    );
}
