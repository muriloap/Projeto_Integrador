import styles from "./styles.module.css";
import TableClient from "../TableClient";
import Client from "@/models/client";

type Props = {
  clients: Client[];
};

export default function TableClientList({ clients }: Props) {
  return (
    <div className={styles.tabelaContainer}>
      <table className={styles.tabelaClients}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Cliente</th>
            <th>CPFJ/CNPJ</th>
            <th>Endereço</th>
            <th>Telefone</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <TableClient
              key={client.id}
              id={client.id}
              name={client.name}
              document={client.document}
              phone={client.phone}
              address={client.address}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
