import Client from "@/models/client";
import ActionClient from "../ActionClient";
import ModalEditClient from "../ModalEditClient";
import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css";

type Props = {
  client: Client;
};

export default function TableClient({ client }: Props) {
  return (
    <tr className={styles.row}>
      <td>{client.name}</td>
      <td>{client.document}</td>
      <td>{client.address}</td>
      <td>{client.phone}</td>
      <td>
        <ActionClient client={client} />
      </td>                                                                                                     
    </tr>
  );
}
