import Order from "@/models/order";
import TableOsAndameto from "../TableOsAndamento";
import styles from "./styles.module.css";

type Props = {
    orders: Order[];
};

export default function TableOsAndamentoList({ orders }: Props) {

    const hoje = new Date().toISOString().split("T")[0];

    const filteredOrders = orders.filter((order) => {
        const dataEntrega = order.dateDelivery;

        return (
            order.status !== "Finalizado" &&
            dataEntrega >= hoje
        );

    });

    return (
        <div className={styles.tableContainer}>
            <table className={styles.tableClients}>
                <thead>
                    <tr>
                        <th className={styles.osId}>Nº OS</th>
                        <th className={styles.osClient}>Cliente</th>
                        <th className={styles.osStatus}>Status</th>
                        <th className={styles.osEntrega}>Previsão de Entrega</th>
                        <th className={styles.osAcao}>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.map((order) => (
                        <TableOsAndameto
                            key={order.id}
                            order={order}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
