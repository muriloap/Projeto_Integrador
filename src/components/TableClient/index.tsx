import ModalEditClient from "../ModalEditClient";
import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css";

type Props = {
  id: number;
  name: string;
  document: string;
  phone: string;
  address: string;
};

export default function TableClient({
  id,
  name,
  document,
  phone,
  address,
}: Props) {

  return (
    <tr>
      <td className={styles.td}>{id}</td>
      <td className={styles.td}>{name}</td>
      <td className={styles.document}>{document}</td>
      <td className={styles.td}>{address}</td>
      <td className={styles.td}>{phone}</td>
      <td className={styles.td}>
        <ModalEditClient />
      </td>
    </tr>
  );
}
