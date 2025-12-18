import Service from '@/models/service';
import ActionService from '../ActionService';
import styles from "./styles.module.css";

type Props = {
  service: Service;
};

export default function TableService({
  service
}: Props) {

  return (
    <tr className={styles.row}>
      <td className={styles.name}>{service.nameService}</td>
      <td className={styles.description}>{service.description}</td>
      <td className={styles.observations}>{service.observations}</td>
      <td className={styles.price}> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(service.price)}</td>
      <td className={styles.actions}>
        <ActionService service={service} />
      </td>
    </tr>
  );
}
