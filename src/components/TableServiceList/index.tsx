import styles from "./styles.module.css";
import TableService from "../TableService";
import Service from "@/models/service";

type Props = {
  services: Service[];
};

export default function TableServiceList({ services }: Props) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableServices}>
        <thead>
          <tr>
            <th className={styles.name}>Nome do Serviço</th>
            <th className={styles.description}>Descrição</th>
            <th className={styles.observations}>Observações</th>
            <th className={styles.price}>Preço</th>
            <th className={styles.actions}>Editar/Deletar</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <TableService
              key={service.id}
              service={service}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
