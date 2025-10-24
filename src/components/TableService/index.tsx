import ModalEditService from '../ModalEditService';
import styles from "./styles.module.css";

type Props = {
    id: number;
    nameService: string;
    description: string;
    observations: string;
    price: number;
};

export default function TableService({
  id,
  nameService,
  description,
  observations,
  price,
}: Props) {

  return (
    <tr>
      <td className={styles.td}>{id}</td>
      <td className={styles.td}>{nameService}</td>
      <td className={styles.document}>{description}</td>
      <td className={styles.td}>{observations}</td>
      <td className={styles.td}>{price}</td>
      <td className={styles.td}>
        <ModalEditService />
      </td>
    </tr>
  );
}
