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
    <tr>
      <td className={styles.td}>{service.nameService}</td>
      <td className={styles.document}>{service.description}</td>
      <td className={styles.td}>{service.observations}</td>
      <td className={styles.td}>{service.price}</td>
      <td className={styles.td}>
        <ActionService service={service} />
      </td>
    </tr>
  );
}
