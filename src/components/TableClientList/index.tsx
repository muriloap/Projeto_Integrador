import styles from "./styles.module.css";
import TableClient from "../TableClient";
import Client from "@/models/client";

type Props = {
  clients: Client[];
};

export default function TableClientList({ clients }: Props) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableClients}>
        <thead>
          <tr>
            <th className={styles.clientName}>Nome do Cliente</th>
            <th className={styles.clientDocument}>CPFJ/CNPJ</th>
            <th className={styles.clientAddress}>Endereço</th>
            <th className={styles.clientPhone}>Telefone</th>
            <th className={styles.clientAction}>Ação</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <TableClient
              key={client.id}
              client={client}
              
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
