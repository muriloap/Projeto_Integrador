import Client from "@/models/client";
import ActionClient from "../ActionClient";
import styles from "./styles.module.css";

type Props = {
  client: Client;
};

export default function TableClient({ client }: Props) {
  return (
    <tr className={styles.row}>
      <td className={styles.clientName}>{client.name
    ? `${client.name} ${client.lastName}`
    : client.companyName}
</td>
      <td className={styles.clientDocument}>{client.document}</td>
      <td className={styles.clientAddress}>{client.address}</td>
      <td className={styles.clientPhone}>{client.phone}</td>
      <td className={styles.clientPhone}>
        <ActionClient client={client} />
      </td>                                                                                                     
    </tr>
  );
}
