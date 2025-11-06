import styles from "./styles.module.css";
import CardOs from "../CardOs";
import Order from "@/models/order";

type Props = {
    orders: Order[];
};

export default function CardOsList({ orders }: Props) {
    return (
        <>
            <div className={styles.containerp}>
                {orders.map((order) => (
                    <CardOs
                        key={order.id}
                        order={order} />
                ))}
            </div>
        </>
    );
}
