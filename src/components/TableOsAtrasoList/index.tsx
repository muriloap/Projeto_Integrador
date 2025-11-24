import Order from "@/models/order";
import styles from "./styles.module.css";
import TableOsAtraso from "../TableOsAtraso";

type Props = {
    orders: Order[];
};

export default function TableOsAtrasoList({ orders }: Props) {

    const hoje = new Date().toISOString().split("T")[0]; 

    const filteredOrders = orders.filter((order) => {
        const dataEntrega = order.dateDelivery; 

        return (
            order.status !== "Finalizado" && 
            order.status !== "Cancelado" && 
            dataEntrega < hoje                 
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
                        <TableOsAtraso
                            key={order.id}
                            order={order}

                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
