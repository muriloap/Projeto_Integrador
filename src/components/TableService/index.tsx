import ModalEditService from '../ModalEditService';
import styles from "./styles.module.css";

type Props = {
    nameService: string;
    description: string;
    observations: string;
    price: number;
};

export default function TableService({
  nameService,
  description,
  observations,
  price,
}: Props) {

  return (
    <tr>
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
