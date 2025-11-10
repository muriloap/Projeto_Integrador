import styles from "./styles.module.css";
import CardOs from "../CardOs";
import Order from "@/models/order";
import Client from "@/models/client";
import Product from "@/models/product";
import Service from "@/models/service";

type Props = {
    orders: Order[];
    clients: Client[];
    products: Product[];
    services: Service[];
};

export default function CardOsList({ orders, clients, products, services }: Props) {
    return (
        <>
            <div className={styles.containerp}>
                {orders.map((order) => (
                    <CardOs
                        key={order.id}
                        orders={order} 
                        clients={clients} 
                        products={products} 
                        services={services} />
                ))}
            </div>
        </>
    );
}
