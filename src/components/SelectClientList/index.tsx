import styles from "./styles.module.css";
import Client from "@/models/client";
import SelectClient from "../SelectClient";
import { ChangeEvent } from "react";

type Props = {
    clients: Client[];
    onChange?(texto: string): void;
};

export default function SelectClientList({ clients, onChange }: Props) {

    function handleInputChange(e: ChangeEvent<HTMLSelectElement>) {
            onChange?.(e.target.value);
        }
    return (
        <>
            <select className={styles.formSelect} onChange={handleInputChange}>
                <option value="">Selecione um cliente</option>
                    {clients.map((client) => (
                        <SelectClient
                            key={client.id}
                            client={client} />
                    ))}
            </select>
        </>
    );
}
