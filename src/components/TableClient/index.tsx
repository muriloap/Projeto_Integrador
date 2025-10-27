import Client from "@/models/client";
import ActionClient from "../ActionClient";
import ModalEditClient from "../ModalEditClient";
import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css";

type Props = {
  client: Client;
};

export default function TableClient({
 client
}: Props) {

  return (
    <tr>
      <td className={styles.td}>{client.name}</td>
      <td className={styles.document}>{client.document}</td>
      <td className={styles.td}>{client.address}</td>
      <td className={styles.td}>{client.phone}</td>
      <td className={styles.td}>
        <ActionClient client={client}/>
      </td>
    </tr>
  );
}
