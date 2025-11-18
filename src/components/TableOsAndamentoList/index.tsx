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
                        <th>Nº OS</th>
                        <th>Cliente</th>
                        <th>Status</th>
                        <th>Previsão de Entrega</th>
                        <th>Ação</th>
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
