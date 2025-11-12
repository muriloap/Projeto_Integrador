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
      <td>{service.nameService}</td>
      <td>{service.description}</td>
      <td>{service.observations}</td>
      <td> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(service.price)}</td>
      <td>
        <ActionService service={service} />
      </td>
    </tr>
  );
}
