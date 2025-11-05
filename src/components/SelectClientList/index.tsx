import styles from "./styles.module.css";
import Client from "@/models/client";
import SelectClient from "../SelectClient";

type Props = {
    clients: Client[];
};

export default function SelectClientList({ clients }: Props) {
    return (
        <>
            <select className={styles.formSelect}>
                <div className={styles.tableContainer}>
                    {clients.map((client) => (
                        <SelectClient
                            key={client.id}
                            client={client} />
                    ))}
                </div >
            </select>
        </>
    );
}
