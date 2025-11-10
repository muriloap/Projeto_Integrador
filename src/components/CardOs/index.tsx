import Order from "@/models/order";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import EditIcon from "@mui/icons-material/Edit";
import { PictureAsPdf } from "@mui/icons-material";
import ActionOs from "../ActionOs";
import Client from "@/models/client";
import Product from "@/models/product";
import Service from "@/models/service";

type Props = {
    orders: Order;
    clients: Client[];
    products: Product[];
    services: Service[];
};

export default function CardOs({ orders, clients, products, services }: Props) {
    return (
        <>
            <div className={styles.containerp}>

                <div className={styles.card}>
                    <div className={styles.dados1}>
                        <a className={styles.campoDados}>{orders.client?.name || orders.client?.companyName}</a>
                        <a className={styles.campoDados}>{new Date(orders.dateRecipt).toLocaleDateString("pt-BR")}</a>
                    </div>

                    <div className={styles.dados1}>
                        <a className={styles.campoDados}># {orders.id}</a>
                        <a className={styles.campoDados}>R$: {orders.total}</a>
                    </div>
                    <div className={styles.dados1}>
                        <a className={styles.campoDados}>Status</a>
                        <a className={styles.campoDados}>{orders.status}</a>
                    </div>
                    <Divisao />
                    <ActionOs clients={clients} services={services} products={products} order={orders}  />
                </div>

            </div>
        </>
    );
}
