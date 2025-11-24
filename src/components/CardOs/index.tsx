import Order from "@/models/order";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import ActionOs from "../ActionOs";
import Client from "@/models/client";
import Product from "@/models/product";
import Service from "@/models/service";
import User from "@/models/user";

type Props = {
    orders: Order;
    clients: Client[];
    products: Product[];
    services: Service[];
};

export default function CardOs({ orders, clients, products, services }: Props) {

     const getStatusColor = (status: string): string => {
        const colors: Record<string, string> = {
            "Em Orçamento": "rgb(250, 204, 21)",
            "Aguardando Material": "rgb(251, 146, 60)",
            "Aprovado": "rgb(34, 197, 94)",
            "Em Progresso": "rgb(59, 130, 246)",
            "Cancelado": "rgb(239, 68, 68)",
            "Finalizado": "rgb(21, 128, 61)",
            "Faturado": "rgb(139, 92, 246)",
        };

        return colors[status]; 
    };

    return (
        <>
            <div className={styles.containerp}>

                <div className={styles.card}>
                    <div className={styles.teste}>

                        <div className={styles.dados1}>
                            <a className={styles.campoDados}>{orders.client?.name || orders.client?.companyName}</a>
                            <a className={styles.campoDados}>{orders.dateCreate.split("-").reverse().join("/")}</a>
                        </div>

                        <div className={styles.dados1}>
                            <a className={styles.campoDados}># {orders.id}</a>
                            <a className={styles.campoDados}>{new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(orders.total)}</a>
                        </div>
                        <div className={styles.dados1}>
                            <a className={styles.campoDados}>Status</a>
                            <a className={styles.campoDados}>{orders.status}</a>
                        </div>
                        <Divisao />
                        <ActionOs clients={clients} services={services} products={products} order={orders} />
                    </div>
                    <div className={styles.statusColor} 
                    style={{ background: getStatusColor(orders.status) }}/>
                </div>



            </div>
        </>
    );
}
