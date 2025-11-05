import styles from "./styles.module.css";
import Client from "@/models/client";
import SelectClient from "../SelectClient";

type Props = {
    clients: Client[];
};

export default function SelectClientList({ clients }: Props) {
    return (
        <div className={styles.tableContainer}>
            <select className={styles.formSelect}>
                {clients.map((client) => (
                    <SelectClient
                        key={client.id}
                        client={client} />
                ))}
            </select>
        </div>
    );
}
